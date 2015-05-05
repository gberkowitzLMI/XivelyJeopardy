var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

//TODO: Probably can make this better
app.use(express.static(__dirname + '/public'));
//add api routes first

//all others will default to angular router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});