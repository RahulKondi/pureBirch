//libraries
var irc = require('slate-irc');
var net = require('net');

//Data
var connections = {};
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

//APIs
var connectBirch = function(args, callback) {
  connectUser(args, function (client) {
    client.on('message', handleMessage);
  });
  if (callback) callback();
}

var connectUser = function(args, callback) {
  var userID = args.userID,
      server = args.server,
      channel= args.channel;

  var stream = net.connect({
    port : 6667,
    host : server
  }, function (stream) {
    console.log("Connected to stream : " + server);
  });

  if (!connections[userID]) {
    var client = irc(stream);
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
    var client = connections[userID][server].client;
  }

  client.join(channel, null, function(){
    client.on('data', function (data) {
      if (data.command == 'RPL_ENDOFNAMES') {
        //console.log(data);
        connections[userID][server].channels.push(channel);
        console.log("Joined channel : " + channel);
      }
    });
  });

  if (callback) callback(client);
}//connectUser()

var say = function (args, callback) {
  var userID = args.userID,
      server = args.server,
      channel = args.channel,
      message = args.message;

  var client = connections[userID][server].client;
  client.send(channel, message, function () {
  });
} // say()

var part = function (args, callback) {
  var client = connections[args.userID][args.server].client;
  client.part(args.channel, args.message);
  if (callback) callback();
} // part()

/* var userAway = function (args, callback) {
  var client = connections[args.userID][args.server].client;
  client.away(args.message);
  console.log(connections[args.userID][args.server]);
}
*/
// NAMES
var namesList = function (args, callback) {
  var client = connections[args.userID][args.server].client;
  var namesInChannel = client.names(args.channel);
  console.log(namesInChannel);
}

//HANDLERS
var handleMessage = function (message) {
  if (connections[message.hostmask.nick]) {
    console.log("delivered");
  }
  else {
    console.log("\n@" + message.hostmask.nick + " : " + message.message);
    //client.names(channel, function (error, names){
      //console.log(error);
  //  });
  }
}

//EXPOSING FUCNTIONS
module.exports = {
  connectBirch,
  connectUser,
  say,
  part,
  namesList
}
