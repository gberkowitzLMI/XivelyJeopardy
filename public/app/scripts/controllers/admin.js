angular.module('Jeopardy').controller('Admin', function($scope,score,buzzer){
    $scope.scoreValue = 0;

    score.getScore(function(res){
        $scope.scores = res;
    });

    $scope.buzzerName = buzzer.buzzerName;

    $scope.correct = function(teamId){
        score.addPoints(teamId,$scope.scoreValue, function(data){
            $scope.scores = data;
        });
    }

    $scope.incorrect = function(teamId){
        score.addPoints(teamId,-$scope.scoreValue, function(data){
            $scope.scores = data;
        });
    }

    $scope.startListening = function(){
        buzzer.startListening(function(){});
    }

    $scope.clearBuzzer = function(){
        buzzer.clearBuzzer(function(){});
    }
});