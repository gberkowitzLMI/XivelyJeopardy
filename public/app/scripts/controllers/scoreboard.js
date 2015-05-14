angular.module('Jeopardy').controller('Scoreboard', function($scope, $routeParams, score, buzzer){
    var getTeamPointsFromScoreArray = function(scores){
        for(var i in scores){
            if (scores[i].team == $scope.teamId){
                return scores[i].points;
            }
        }
    }

    $scope.teamId = $routeParams.teamId;

    score.getScore(function(scores){
        $scope.teamPoints = getTeamPointsFromScoreArray(scores);
    });

    buzzer.getBuzzer(function(buzzerId){
        $scope.buzzedIn = buzzerId==$scope.teamId;
    });

    $scope.$on('buzz', function(event, buzzerId){
        $scope.buzzedIn = buzzerId==$scope.teamId;
        $scope.$apply();
    });

    $scope.$on('score', function(event, score){
        $scope.teamPoints = getTeamPointsFromScoreArray(score);
        $scope.$apply();
    });
});