/* @flow */

import * as Constants from './Constants';

export const TABLES = {};
export const COLUMNS = {};
export const TYPES = {};
export const ROLES = {};
export const TYPE_NAMES = {};

ROLES[Constants.ROLE_BANNED] = 'banned';
ROLES[Constants.ROLE_FOLLOWER] = 'follower';
ROLES[Constants.ROLE_MENTIONED] = 'mentioned';
ROLES[Constants.ROLE_NONE] = 'none';
ROLES[Constants.ROLE_VISITOR] = 'visitor';
ROLES[Constants.ROLE_MODERATOR] = 'moderator';
ROLES[Constants.ROLE_OWNER] = 'owner';

TABLES[Constants.TYPE_ITEM] = 'items';
TABLES[Constants.TYPE_ROOM] = 'rooms';
TABLES[Constants.TYPE_TEXT] = 'texts';
TABLES[Constants.TYPE_THREAD] = 'threads';
TABLES[Constants.TYPE_TOPIC] = 'topics';
TABLES[Constants.TYPE_PRIV] = 'privs';
TABLES[Constants.TYPE_USER] = 'users';
TABLES[Constants.TYPE_REL] = 'rels';
TABLES[Constants.TYPE_ROOMREL] = 'roomrels';
TABLES[Constants.TYPE_TEXTREL] = 'textrels';
TABLES[Constants.TYPE_THREADREL] = 'threadrels';
TABLES[Constants.TYPE_TOPICREL] = 'topicrels';
TABLES[Constants.TYPE_PRIVREL] = 'privrels';
TABLES[Constants.TYPE_USERREL] = 'userrels';
TABLES[Constants.TYPE_NOTE] = 'notes';

TYPES.item = Constants.TYPE_ITEM;
TYPES.room = Constants.TYPE_ROOM;
TYPES.text = Constants.TYPE_TEXT;
TYPES.thread = Constants.TYPE_THREAD;
TYPES.topic = Constants.TYPE_TOPIC;
TYPES.priv = Constants.TYPE_PRIV;
TYPES.user = Constants.TYPE_USER;
TYPES.rel = Constants.TYPE_REL;
TYPES.roomrel = Constants.TYPE_ROOMREL;
TYPES.textrel = Constants.TYPE_TEXTREL;
TYPES.threadrel = Constants.TYPE_THREADREL;
TYPES.topicrel = Constants.TYPE_TOPICREL;
TYPES.privrel = Constants.TYPE_PRIVREL;
TYPES.userrel = Constants.TYPE_USERREL;
TYPES.note = Constants.TYPE_NOTE;

TYPE_NAMES[Constants.TYPE_ITEM] = 'item';
TYPE_NAMES[Constants.TYPE_ROOM] = 'room';
TYPE_NAMES[Constants.TYPE_TEXT] = 'text';
TYPE_NAMES[Constants.TYPE_THREAD] = 'thread';
TYPE_NAMES[Constants.TYPE_TOPIC] = 'topic';
TYPE_NAMES[Constants.TYPE_PRIV] = 'priv';
TYPE_NAMES[Constants.TYPE_USER] = 'user';
TYPE_NAMES[Constants.TYPE_REL] = 'rel';
TYPE_NAMES[Constants.TYPE_ROOMREL] = 'roomrel';
TYPE_NAMES[Constants.TYPE_TEXTREL] = 'textrel';
TYPE_NAMES[Constants.TYPE_THREADREL] = 'threadrel';
TYPE_NAMES[Constants.TYPE_TOPICREL] = 'topicrel';
TYPE_NAMES[Constants.TYPE_PRIVREL] = 'privrel';
TYPE_NAMES[Constants.TYPE_USERREL] = 'userrel';
TYPE_NAMES[Constants.TYPE_NOTE] = 'note';

COLUMNS[Constants.TYPE_USER] = [
	'counts',
	'createTime',
	'deleteTime',
	'id',
	'identities',
	'locale',
	'name',
	'params',
	'presence',
	'presenceTime',
	'profile',
	'resources',
	'tags',
	'timezone',
	'type',
	'updateTime'
];

COLUMNS[Constants.TYPE_ITEM] =
COLUMNS[Constants.TYPE_ROOM] =
COLUMNS[Constants.TYPE_TEXT] =
COLUMNS[Constants.TYPE_THREAD] =
COLUMNS[Constants.TYPE_TOPIC] =
COLUMNS[Constants.TYPE_PRIV] = [
	'body',
	'counts',
	'createTime',
	'creator',
	'deleteTime',
	'id',
	'identities',
	'meta',
	'name',
	'params',
	'parents',
	'score',
	'tags',
	'type',
	'updater',
	'updateTime',
];

COLUMNS[Constants.TYPE_REL] =
COLUMNS[Constants.TYPE_ROOMREL] =
COLUMNS[Constants.TYPE_TEXTREL] =
COLUMNS[Constants.TYPE_THREADREL] =
COLUMNS[Constants.TYPE_TOPICREL] =
COLUMNS[Constants.TYPE_PRIVREL] = [
	'admin',
	'expireTime',
	'interest',
	'item',
	'message',
	'presence',
	'presenceTime',
	'resources',
	'role',
	'roleTime',
	'tags',
	'transitRole',
	'transitType',
	'type',
	'user',
];

COLUMNS[Constants.TYPE_NOTE] = [
	'count',
	'data',
	'dismissTime',
	'event',
	'eventTime',
	'group',
	'readTime',
	'score',
	'type',
	'user',
];
