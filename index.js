'use strict';

var five = require('johnny-five');
var board = new five.Board();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



board.on('ready', function() {
  console.log('ready');
  var leftWheel = new five.Servo({ pin: 12, type: 'continuous' }).stop();
  var rightWheel = new five.Servo({ pin: 13, type: 'continuous' }).stop();

  app.get('/', function(req, res){
    res.sendfile('public/index.html');
  });

  io.on('connection', function(socket){
    console.log('>>> New user');
    socket.on('move', function(direction){
      switch(direction) {
        case 'up':
          leftWheel.ccw();
          rightWheel.cw();
          break;
        case 'down':
          leftWheel.cw();
          rightWheel.ccw();
          break;
        case 'right':
          leftWheel.ccw();
          rightWheel.ccw();
          break;
        case 'left':
          leftWheel.cw();
          rightWheel.cw();
          break;
        default:
          leftWheel.stop();
          rightWheel.stop();
      }
    });
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
});
