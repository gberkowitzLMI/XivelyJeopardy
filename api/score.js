var Game = require('../schema.js').Game;
var config = require ('../config.js').game;

var addPoints = function(team,points,callback){
    Game.update({'score.team': team},{'$inc' : {'score.$.points': points}}).exec();
    getScore(callback);
}

var getScore = function(callback){
    Game.findOne({}, function(err,doc){
        callback(null,doc.score);
    });
}

var resetGame = function(){
    //delete old games and initialize a new one
    Game.remove({}, function(){
        var game = new Game({
            buzzerListening: false,
            buzzerName: "",
            score: []
        });

        for(var i = 1; i <= config.numTeams ; i++)
            game.score.push({team: i, points:0});

        game.save();
    });
}

resetGame();

module.exports = {
    addPoints: addPoints,
    getScore: getScore,
    resetGame: resetGame
}