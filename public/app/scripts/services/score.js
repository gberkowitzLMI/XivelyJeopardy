angular.module('Jeopardy').factory('score', function($http, $rootScope){
    var socket = io(window.location.host);

    socket.on('score', function(score){
        $rootScope.$broadcast('score', score);
    });

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
});