var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var config = require('./config.js');
var mqttClient = require('./mqtt.js');

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

server.listen(app.get('port'));
var mongooseURI = process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database
mongoose.connect(mongooseURI);

require('./schema.js');

mqttClient.connectMQTT();


app.use(express.static(__dirname + '/public'));

//add api routes first
var score = require('./api/score.js');
score.setAlertFunction(function(score){
    io.emit("score", score);
});

app.get('/api/score', function(req,res){
    score.getScore(function(err,doc){
        res.send(doc);
    });
});
app.post('/api/score', function(req,res){
    score.addPoints(req.body.team, req.body.points);
});

var buzzer = require('./api/buzzer.js');
buzzer.setAlertFunction(function(buzzerId){
    io.emit("buzz", buzzerId.toString());
});

app.post('/api/startListening', function(req,res){
    buzzer.startListening();
    res.sendStatus(200);
});

app.post('/api/clearBuzzer', function(req,res){
    buzzer.clearBuzzer();
    io.emit("buzz", "");
    res.sendStatus(200);
});

app.get('/api/buzzer', function(req,res){
    buzzer.getBuzzer(function(err,doc){
        res.send(doc);
    });
});

app.post('/api/buzzer', function(req,res){
    mqttClient.pressBuzzer(req.body.buzzerId);
    res.sendStatus(200);
})

//all other routes should default to angular router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});


