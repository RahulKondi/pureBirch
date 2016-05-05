//libraries
let irc = require('slate-irc');
let net = require('net');
const cbs = [];
//Data
let connections = {};
/* connections data structure
connections = {
  userID = {
    server = {
      nickname : ,
      channels = [],
      client : client,
    }
  }
}
*/
console.log("\n----------------------------------------------------------\n\n[*] ENTERED BIRCH \n\n----------------------------------------------------------");

//APIs

let connectUser = function(args, callback) {
  let userID = args.userID,
      server = args.server,
      channel= args.channel;
      console.log("\n----------------------------------------------------------\n\n");
      console.log("\nuserID : " + userID + "\nserver : " + server + "channel : " + channel);
      console.log("\n----------------------------------------------------------\n\n");

  let stream = net.connect({
    port : 6667,
    host : server
  }, function (stream){
    console.log("Connected to stream : " + stream);
  });

  console.log(stream);
  let client;

  if (!connections[userID]) {
    client = irc(stream);
    connections[userID] = {};
    connections[userID][server]= {
      client: client,
      channels: []
      };
    client.user(userID, "WHOIS");
    client.nick(userID, function (){
      client.on('data', function (data) {
        if (data.command === 'ERR_NICKNAMEINUSE') {
          console.log("[ X ]\tNick in use. Trying : " + userID + "_");
          client.nick(userID+"_");
          client.join(channel);
          connections[userID][server].nickname = userID+"_";
        }
        else connections[userID][server].nickname = userID;
      });
    });
  }
  else {
    client = connections[userID][server].client;
  }

  client.join(channel, null, function(){
    client.on('data', function (data) {
      if (data.command === 'RPL_ENDOFNAMES') {
        //console.log(data);
        connections[userID][server].channels.push(channel);
        console.log("Joined channel : " + channel);
      }
    });
  });

  if (callback) callback(client);
};
//connectUser()

let connectBirch = function(args, callback) {
  connectUser(args, function (client) {
    client.on('message', handleMessage);
    if (callback) callback();
  });
};

let say = function (args, callback) {
  let userID = args.userID,
      server = args.server,
      channel = args.channel,
      message = args.message;

  let client = connections[userID][server].client;
  client.send(channel, message, callback);
}; // say()

let part = function (args, callback) {
  let client = connections[args.userID][args.server].client;
  client.part(args.channel, args.message);
  if (callback) callback();
}; // part()

/* let userAway = function (args, callback) {
  let client = connections[args.userID][args.server].client;
  client.away(args.message);
  console.log(connections[args.userID][args.server]);
}
*/
// NAMES
let namesList = function (args, callback) {
  let client = connections[args.userID][args.server].client;
  let namesInChannel = client.names(args.channel);
  console.log(namesInChannel);
};

//HANDLERS
let handleMessage = function (message) {
  if (connections[message.hostmask.nick]) {
    console.log("delivered");
  }
  else {
    console.log("\n@" + message.hostmask.nick + " : " + message.message);
    cbs.forEach(cb => {
      cb(message);
    });
    //client.names(channel, function (error, names){
      //console.log(error);
  //  });
  }
};

function onMessage(cb) {
  cbs.push(cb);
}
//EXPOSING FUCNTIONS
module.exports = {
  connectBirch,
  connectUser,
  say,
  part,
  namesList,
  onMessage
};
