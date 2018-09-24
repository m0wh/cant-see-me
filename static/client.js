var framerate = 60;

var movement = {
  x: 0,
  y: 0
}

document.addEventListener('keydown', function(e) {
  switch (e.key) {
    case "q":
      movement.x --;
      break;
    case "z":
      movement.y --;
      break;
    case "d":
      movement.x ++;
      break;
    case "s":
      movement.y ++;
      break;
  }
});

document.addEventListener('keyup', function(e) {
  switch (e.key) {
    case "q":
      movement.x ++;
      break;
    case "z":
      movement.y ++;
      break;
    case "d":
      movement.x --;
      break;
    case "s":
      movement.y --;
      break;
  }
});


var socket = io();

socket.emit("newPlayer");

setInterval(function() {
  socket.emit("movement", movement);
}, 1000 / framerate);


var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');

socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';

  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});