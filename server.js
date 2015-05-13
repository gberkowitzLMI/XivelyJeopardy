var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config.js');
var mqttClient = require('./mqtt.js');

app.use(bodyParser.json());

server.listen(3000);
mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database);

require('./schema.js');

mqttClient.connectMQTT();


app.use(express.static(__dirname + '/public'));

//add api routes first
var score = require('./api/score.js');

app.get('/api/score', function(req,res){
    score.getScore(function(err,doc){
        res.json(doc);
    });
});
app.post('/api/score', function(req,res){
    score.addPoints(req.body.team, req.body.points, function(err,_score){
        res.send(_score);
    });
});

var buzzer = require('./api/buzzer.js');
app.post('/api/startListening', function(req,res){
    buzzer.startListening();
    res.sendStatus(200);
});

app.post('/api/clearBuzzer', function(req,res){
    buzzer.clearBuzzer();
    res.sendStatus(200);
});

app.get('/api/buzzer', function(req,res){
    buzzer.getBuzzer(function(err,doc){
        res.send(doc);
    });
});

//all other routes should default to angular router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});


