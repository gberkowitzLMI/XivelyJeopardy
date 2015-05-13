var Game = require('../schema.js').Game;
var io = require('socket.io')(4000);

var clearBuzzer = function(){
    Game.findOne({}, function(err,game){
        game.buzzerName = '';
        game.save();
    });
}

var getBuzzer = function(callback){
    Game.findOne({}, function(err,game){
        callback(null, game.buzzerName);
    });
}

var startListening = function(){
    Game.findOne({}, function(err,game){
        game.buzzerListening = true;
        game.save();
    });
}

var handleBuzzer = function(buzzerId){
    Game.findOne({}, function(err,game){
        if(game.buzzerListening){
            game.buzzerListening = false;
            game.buzzerName = 'Team ' + buzzerId;
            game.save();
        }
    });
    alertClients(buzzerId);
}

var alertClients = function(buzzerId){
    io.emit('buzz', {buzzerId: buzzerId});
}

module.exports = {
    clearBuzzer: clearBuzzer,
    startListening: startListening,
    handleBuzzer: handleBuzzer,
    getBuzzer: getBuzzer
}