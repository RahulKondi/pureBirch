import birch from '../../lib/birch';
import { bus, cache, Constants } from '../../core-server';

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
  userID : 'WXYZ',
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
  userID : 'WXYZ',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "Hello!"
}, function () {
  console.log("SAID Hello!");
});

//LISTENERS

bus.on("postchange", (e => {
  if (!changes.entities) return;

  for (const i in changes.entities) {
    if (changes.entities[i].type === Constants.TYPE_TEXT) {
      birch.say({
        userID : 'WXYZ',
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

// birch.onMessage(e => {
//   bus.emit('changes', {
//     entities: {
//       id: new Text({
//         id,
//         body: "",
//         creator: ""
//       })
//     }
//   });
// });
