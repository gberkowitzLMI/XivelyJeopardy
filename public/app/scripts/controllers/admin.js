angular.module('Jeopardy').controller('Admin', function($scope,score,buzzer){
    $scope.scoreValue = 100;

    score.getScore(function(res){
        $scope.scores = res;
    });

    buzzer.getBuzzer(function(res){
        $scope.buzzerName = res;
    });

    $scope.$on('buzz', function(event, buzzerId){
        $scope.buzzerName = buzzerId;
        $scope.$apply();
    });

    $scope.$on('score', function(event, _scores){
        $scope.scores = _scores;
        $scope.$apply();
    });

    $scope.correct = function(teamId){
        score.addPoints(teamId,$scope.scoreValue, function(){});
    }

    $scope.incorrect = function(teamId){
        score.addPoints(teamId,-$scope.scoreValue, function(){});
    }

    $scope.startListening = function(){
        buzzer.startListening(function(){});
    }

    $scope.clearBuzzer = function(){
        buzzer.clearBuzzer(function(){});
        $scope.buzzerName = '';
    }
});