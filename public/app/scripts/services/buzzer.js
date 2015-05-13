angular.module('Jeopardy').factory('buzzer', ['$http',function($http){
    var buzzerName = 'Test';
    var socket = io('http://localhost:4000');

    socket.on('buzz', function(buzzerId){
        buzzerName = buzzerId;
    });

    return {
        buzzerName: buzzerName,
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
}]);