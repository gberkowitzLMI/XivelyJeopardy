angular.module('Jeopardy').factory('score', ['$http', function($http){
    return {
        addPoints: function(team, points, success, failure){
            $http.post('/api/score',{
                "team": team,
                "points": points
            })
            .success(success)
            .error(failure);
        },
        getScore: function(success,failure){
            $http.get('/api/score')
            .success(success)
            .error(failure)
        }
    }
}]);