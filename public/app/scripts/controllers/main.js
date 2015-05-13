'use strict';

angular.module('Jeopardy').controller('Main', function ($scope, score, buzzer) {
    score.getScore(function(res){
        $scope.scores = res;
    });

    $scope.buzzerName = buzzer.buzzerName;
});
