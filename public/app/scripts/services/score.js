angular.module('Jeopardy').factory('score', function(){
    //register socket listener for score changes
      var socket = io.connect(window.location.hostname);
      var score = 300;
      var updateScoreValue = function(){
        //GET score
      };
      //socket.on('scoreChanged', updateScoreValue);

      return {
        value: score,
        correct: function(team,scoreValue){
            //Add score to team
        },
        incorrect: function(team,scoreValue){
            //Subtract score from team
        }
      }
});