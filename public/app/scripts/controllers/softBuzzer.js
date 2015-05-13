angular.module('Jeopardy').controller('SoftBuzzer', function($scope, $http){
    $scope.pressBuzzer = function(){
        $http.post('/api/buzzer',{buzzerId: $scope.buzzerId})
    }
});