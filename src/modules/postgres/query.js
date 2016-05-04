
import * as pg from '../../lib/pg';
import { TABLES, TYPES } from '../../lib/schema';

const MAX_LIMIT = 1024;

const operators = {
	gt: '>',
	lt: '<',
	in: 'IN',
	neq: '<>',
	gte: '>=',
	lte: '<=',
	cts: '@>',
	ctd: '<@',
	mts: 'like'
};

function getPropOp(prop) {
	const i = prop.lastIndexOf('_');

	if (i > 0) {
		return [ prop.substr(i + 1, prop.length), prop.substr(0, i) ];
	} else {
		return '';
	}
}

function fromPart (slice) {
	const fields = [], joins = [];

	fields.push('row_to_json("' + TABLES[TYPES[slice.type]] + '".*)::jsonb as "' + slice.type + '"');
	joins.push('"' + TABLES[TYPES[slice.type]] + '"');

	if (slice.join) {
		for (const type in slice.join) {
			joins.push(
				'LEFT OUTER JOIN "' + TABLES[TYPES[type]] + '" ON "' +
				TABLES[TYPES[type]] + '"."' + slice.join[type] + '" = "' +
				TABLES[TYPES[slice.type]] + '"."id"'
			);
			fields.push('row_to_json("' + TABLES[TYPES[type]] + '".*)::jsonb as "' + type + '"');
		}
	}

	if (slice.link) {
		for (const type in slice.link) {
			joins.push(
				'LEFT OUTER JOIN "' + TABLES[TYPES[type]] + '" ON "' +
				TABLES[TYPES[slice.type]] + '"."' + slice.link[type] + '" = "' +
				TABLES[TYPES[type]] + '"."id"'
			);

			fields.push('row_to_json("' + TABLES[TYPES[type]] + '".*)::jsonb as "' + type + '"');
		}
	}

	return pg.cat([ 'SELECT ', pg.cat(fields, ','), 'FROM', pg.cat(joins, ' ') ], ' ');
}

function wherePart (f) {
	const sql = [];
	let filter = f.filter;


	for (const prop in filter) {
		const [ op, name ] = getPropOp(prop);

		if (Number.POSITIVE_INFINITY === filter[prop] || Number.NEGATIVE_INFINITY === filter[prop]) {
			continue;
		}
		switch (op) {
		case 'mts':
			filter[prop] = filter[prop].replace(/\*$/, ''); /* eslint-disable no-fallthrough */
		case 'gt':
		case 'lt':
		case 'neq':
		case 'gte':
		case 'lte':
		case 'in':
		case 'cts':
		case 'ctd':
			sql.push(`"${name.toLowerCase()}" ${operators[op]} &{${prop}}`);
			break;
		default:
			sql.push(`"${prop.toLowerCase()}" = &{${prop}}`);
		}
	}

	if (sql.length) {
		filter = Object.create(filter);
		switch (TABLES[TYPES[f.type]]) {
		case 'items':
		case 'rooms':
		case 'texts':
		case 'threads':
		case 'topics':
		case 'privs':
		case 'users':
		case 'notes':
			sql.push(`"${TABLES[TYPES[f.type]]}".deletetime IS NULL`);
		}

		filter.$ = 'WHERE ' + sql.join(' AND ');
		return filter;
	} else {
		return '';
	}
}

function orderPart(type, order, limit) {
	if (limit < 0) {
		return `ORDER BY "${TABLES[TYPES[type]]}".${order.toLowerCase()} DESC LIMIT ${-limit}`;
	} else {
		return `ORDER BY "${TABLES[TYPES[type]]}".${order.toLowerCase()} ASC LIMIT ${limit}`;
	}
}

function simpleQuery(slice, limit) {
	return pg.cat([
		fromPart(slice),
		wherePart(slice),
		orderPart(slice.type, slice.order, limit)
	], ' ');
}

function boundQuery (slice, start, end) {
	slice.filter[slice.order + '_gte'] = start;
	slice.filter[slice.order + '_lte'] = end;
	const query = simpleQuery(slice, MAX_LIMIT);

	delete slice.filter[slice.order + '_gte'];
	delete slice.filter[slice.order + '_lte'];

	return query;
}

function beforeQuery (slice, start, before, exclude) {
	slice.filter[slice.order + (exclude ? '_lt' : '_lte')] = start;
	const query = simpleQuery(slice, Math.max(-MAX_LIMIT, -before));

	delete slice.filter[slice.order + (exclude ? '_lt' : '_lte')];

	return pg.cat([
		'SELECT * FROM (',
		query,
		{
			$: `) r ORDER BY ${slice.type.toLowerCase()}->&{order} ASC`,
			order: slice.order.toLowerCase()
		}

	], ' ');
}

function afterQuery (slice, start, after, exclude) {
	if (!slice.filter) slice.filter = {};
	slice.filter[slice.order + (exclude ? '_gt' : '_gte')] = start;
	const query = simpleQuery(slice, Math.min(MAX_LIMIT, after));

	delete slice.filter[slice.order + (exclude ? '_gt' : '_gte')];

	return query;
}

export default function (slice, range) {
	let query;

	if (slice.order) {
		if (range.length === 2) {
			query = boundQuery(slice, range[0], range[1]);
		} else {
			if (range[1] > 0 && range[2] > 0) {
				query = pg.cat([
					'(',
					beforeQuery(slice, range[0], range[1], true),
					')',
					'UNION ALL',
					'(',
					afterQuery(slice, range[0], range[2]),
					')'
				], ' ');
			} else if (range[1] > 0) {
				query = beforeQuery(slice, range[0], range[1]);
			} else if (range[2] > 0) {
				query = afterQuery(slice, range[0], range[2]);
			}
		}
	} else {
		query = simpleQuery(slice, MAX_LIMIT);
	}

	return query;
}
