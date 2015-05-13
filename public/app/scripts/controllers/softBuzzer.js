angular.module('Jeopardy').controller('SoftBuzzer', function($scope){
    $scope.buzzerId = 0;
    var client = new Paho.MQTT.Client('broker.xively.com', Number(1883), "5409abb5-c12c-4e49-acf0-359b8a758596"); 


    // connect the client
    client.connect({
      userName: '5409abb5-c12c-4e49-acf0-359b8a758596',
      password: 'KB4oLIlPLKE3rzVFi7FWeA==',
      hosts: ['broker.xively.com'],
      ports: [1883]
    });

    var publishButtonPress = function(){
        client.send('xi/blue/v1/9860a5f8-3b12-4086-963c-2830ce434835/d/8f78aac2-5a26-460b-ac9e-bd6f6e04bdc4/buzzer', $scope.buzzerId);
    }
});