angular.module('Jeopardy').factory('buzzer',function($http, $rootScope){
    var socket = io('http://localhost:4000');

    socket.on('buzz', function(buzzerId){
        console.log("Received buzz message for buzzer " + buzzerId);
        $rootScope.$broadcast('buzz', buzzerId);
    });

    return {
        startListening: function(s,e){
            $http.post('/api/startListening')
            .success(s)
            .error(e);
        },
        clearBuzzer: function(s,e){
            $http.post('/api/clearBuzzer')
            .success(s)
            .error(e)
        },
        getBuzzer: function(s,e){
            $http.get('/api/buzzer')
            .success(s)
            .error(e)
        }
    }
});