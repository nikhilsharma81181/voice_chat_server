import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join-room', (roomId: string, userId: string) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});