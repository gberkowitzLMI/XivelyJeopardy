var Game = require('../schema.js').Game;
var config = require ('../config.js').game;

var alertFunction = null;

var addPoints = function(team,points){
    Game.findOne({}, function(err,doc){
        for (var i in doc.score)
            if(doc.score[i].team == team)
                doc.score[i].points += points;
        doc.save();
        alertFunction(doc.score);
    });
}

var getScore = function(callback){
    Game.findOne({}, function(err,doc){
        callback(null,doc.score);
    });
}

var resetGame = function(){
    Game.remove({}, function(){
        newGame().save();
    });
}

var setupNewGame = function(){
    Game.findOne({}, function(err,doc){
        if(!doc && !err)
            newGame().save();
    });
}

var setAlertFunction = function(_alertFunction){
    alertFunction = _alertFunction;
}

var newGame = function(){
    var game = new Game({
            buzzerListening: false,
            buzzerName: "",
            score: []
        });

        for(var i = 1; i <= config.numTeams ; i++)
            game.score.push({team: i, points:0});

    return game;
}

setupNewGame();


module.exports = {
    addPoints: addPoints,
    getScore: getScore,
    resetGame: resetGame,
    setAlertFunction: setAlertFunction
}