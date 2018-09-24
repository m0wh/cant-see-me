const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 3000);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('Starting server on port 3000');
});

const framerate = 60; //fps
const players = {};

io.on('connection', socket => {

  socket.on('newPlayer', () => {
    players[socket.id] = {
      x: 400,
      y: 300,
      speed: 5
    };
  });

  socket.on('movement', data => {
    const player = players[socket.id] || {};
    
    if (data.x !== 0 && data.y !== 0) {
      speed = player.speed * Math.cos(Math.PI/4);
    } else {
      speed = player.speed;
    }

    if (data.x < 0) {
      player.x -= speed;
    } else if (data.x > 0) {
      player.x += speed;
    }

    if (data.y < 0) {
      player.y -= speed;
    } else if (data.y > 0) {
      player.y += speed;
    }
  });
  
});

setInterval(() => {
  io.sockets.emit('state', players);
}, 1000 / framerate);