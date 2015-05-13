var mqtt = require('mqtt');
var config = require('./config.js')
var buzzer = require('./api/buzzer.js')

var host = config.mqtt.host;
var port = config.mqtt.port;
var username = config.mqtt.username;
var password = config.mqtt.password;
var topicPrefix = config.mqtt.topic;

var client = mqtt.connect({
   host: host,
   port: port,
   clientId: username,
   username: username,
   password: password
});

exports.connectMQTT = function(req, res) {

   // Listening to messages on the mqtt queue
   console.log("Connecting to Broker");
   client.on('connect', function() {
      console.log("Connected");
      client.subscribe(topicPrefix);

      }, function(err) {
         console.log(err);
   });

   client.on('message', function(topic, buzzerId) {
      console.log('Topic: ' + topic + ' Message: ' + buzzerId);
      buzzer.handleBuzzer(buzzerId);
   });

   var publishTestMessages = function(){
    for (var i = 0; i < 11; i++){
        console.log('Publishing message ' + i);
        client.publish(topicPrefix, "HELLO!");
      }
    }

}