'use strict';

angular.module('Jeopardy')
  .controller('Main',  function ($scope, score) {
    debugger;
    $scope.score = score.value;
  });
