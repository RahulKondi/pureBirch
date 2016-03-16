/* @flow */

import { Constants, bus, cache } from '../../core-server';
import Counter from '../../lib/counter';
import ThreadRel from '../../models/note';

bus.on('change', (changes, next) => {
	if (!changes.entities) {
		next();
		return;
	}
	const counter = new Counter();

	for (const id in changes.entities) {
		const entity = changes.entities[id];
		let text, role, user;

		if (entity.type === Constants.TYPE_TEXTREL && entity.roles.indexOf(Constants.ROLE_MENTIONED) > -1) {
			text = changes.entities[entity.item];
			role = [ Constants.ROLE_MENTIONED ];
			user = entity.user;
			if (!text) {
				counter.inc();
				cache.getEntity(entity.item, (err, item) => {
					if (!err) text = item;
					counter.dec();
				});
				counter.then(() => {
					const threadRel = {
						item: text.parents[0],
						user,
						type: Constants.TYPE_THREADREL,
						roles: role
					};
					const relation = new ThreadRel(threadRel);

					relation.create = true;
					changes.entities[relation.id] = relation;
					console.log('All Relations created:', relation);
					next();
				});

			}
		} else if (entity.type === Constants.TYPE_TEXT) {
			text = entity;
			role = [ Constants.ROLE_FOLLOWER ];
			user = entity.creator;
			const threadRel = {
				item: text.parents[0],
				user,
				type: Constants.TYPE_THREADREL,
				roles: role
			};
			const relation = new ThreadRel(threadRel);

			relation.create = true;
			changes.entities[relation.id] = relation;
			console.log('All Relations created:', relation);
			next();
		} else {
			next();
		}
	}
});
