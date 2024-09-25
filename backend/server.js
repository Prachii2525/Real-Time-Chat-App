const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Vite server URL
    methods: ['GET', 'POST']
  }
});

let onlineUsers = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Add user to online users list
  socket.on('join', (username) => {
    onlineUsers.push(username);
    io.emit('users', onlineUsers);
  });

  // Handle incoming messages
  socket.on('message', (message) => {
    io.emit('message', message);
  });

  // Handle typing status
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    onlineUsers = onlineUsers.filter((user) => user !== socket.id);
    io.emit('users', onlineUsers);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
