var Game = require('../schema.js').Game;

var alertFunction = null;

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

var handleBuzzer = function(buzzerId, callback){
    Game.findOne({}, function(err,game){
        if(game.buzzerListening){
            game.buzzerListening = false;
            game.buzzerName = buzzerId.toString();
            game.save();
            alertFunction(buzzerId);
        }
    });
    
}

var setAlertFunction = function(_alertFunction){
    alertFunction = _alertFunction;
}



module.exports = {
    clearBuzzer: clearBuzzer,
    startListening: startListening,
    handleBuzzer: handleBuzzer,
    getBuzzer: getBuzzer,
    setAlertFunction: setAlertFunction
}