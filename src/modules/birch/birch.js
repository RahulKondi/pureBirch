import birch from '../../lib/birch';
import { bus } from '../../core-server';
import * as Constants from '../../lib/Constants';
import Text from '../../models/text';
import uuid from 'node-uuid';

//BIRCH BOT
birch.connectBirch({
  userID : 'birchBot',
  server : 'irc.freenode.org',
  channel : '#birch'
}, function () {
  console.log("Connected BirchBot.");
});

//USERS
birch.connectUser({
  userID : 'ABCD',
  server : 'irc.freenode.org',
  channel : '#birch'}, function () {
    console.log("Connected ABCD");
  });

birch.connectUser({
  userID : 'alvina-cole',
  server : 'irc.freenode.org',
  channel : '#birch'});

birch.connectUser({
    userID : 'CurrentUser',
    server : 'irc.freenode.org',
    channel : '#birch'}, function () {
      console.log("Connected ABCD");
  });

// MESSAGING
birch.say({
  userID : 'ABCD',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "Hi!"
} , function () {
  console.log("SAID Hi!");
});

birch.say({
  userID : 'alvina-cole',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "Hello!"
}, function () {
  console.log("SAID Hello!");
});

//LISTENERS

bus.on("postchange", (changes => {
  if (!changes.entities) return;

  console.log('postchange:', changes.entities);
  for (const i in changes.entities) {
    if (changes.entities[i].type === Constants.TYPE_TEXT &&
      changes.entities[i].tags &&
      !changes.entities[i].tags.includes(10000)) {
      birch.say({
        userID : changes.entities[i].creator,
        server : 'irc.freenode.org',
        channel : '#birch',
        message : changes.entities[i].body,
      }, function () {
        console.log(changes.entities[i].body);
      });
    }
  }
}));

// room="f4f56f3d-1a1c-43ee-b60d-3e9a4560c693" thread="28f8150d-1c14-4a8f-b656-7578fcba8e00"

birch.onMessage(e => {
  console.log(e);
  const id = uuid.v4();
  bus.emit('change', {
    entities: {
      [id]: new Text({
        id,
        body: e.message,
        creator: e.hostmask.nick.replace(/[^a-z0-9\-]/g, '-'),
        parents: ['2abcdf70-ce40-4de8-92a4-01ba71059588', '39c8a8fc-5494-49b8-a8c1-5f9b09931b6e'],
        tags: [ 10000 ],
        createTime: Date.now(),
      })
    }
  });
});
