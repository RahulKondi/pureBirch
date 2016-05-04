var birch = require('./BirchPure');

//BOT
birch.connectBirch({
  userID : 'birchBot',
  server : 'irc.freenode.org',
  channel : '#birch'});

//USERS
birch.connectUser({
  userID : 'ABCD',
  server : 'irc.freenode.org',
  channel : '#birch'});

birch.connectUser({
  userID : 'WXYZ',
  server : 'irc.freenode.org',
  channel : '#birch'});

birch.connectUser({
  userID : 'ABCD',
  server : 'irc.freenode.org',
  channel : '#birch2'});

//MESSAGES
birch.say({
  userID : 'ABCD',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "Hi!"
});

birch.say({
  userID : 'WXYZ',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "Hello!"
});

// PARTING
/*
birch.part({
  userID : 'ABCD',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "Death did us part"
}, function () {
console.log("[ - ]\tParted with message");
});

// AWAY
birch.userAway({
  userID : 'ABCD',
  server : 'irc.freenode.org',
  channel : '#birch',
  message : "Up up and away"
}, function () {
console.log("[ - ]\tParted with message");
});
*/
// NAMES
birch.namesList({
  userID : 'birchBot',
  server : 'irc.freenode.org',
  channel : "birch"
});
