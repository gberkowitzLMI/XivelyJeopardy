var mongoose = require('mongoose');

var scoreSchema = new mongoose.Schema({
    team: String,
    points: Number
});

var gameSchema = new mongoose.Schema({
    buzzerListening: Boolean,
    buzzerName: String,
    score: [scoreSchema]
});

var Game = mongoose.model('Game', gameSchema);

console.log('Schema registered');

exports.Game = Game;