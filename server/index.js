const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const roomsm = []
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on('create_room', () => {
    let roomID = Math.random().toString(36).substring(2, 7);
    roomsm.push(roomID);
    console.log(roomID)
    socket.join(roomID);
    socket.emit('created_room', roomID);

  });
  socket.on("join_room", (data) => {
    console.log(data)
    if (!roomsm.includes(data)) {
      socket.emit('room_not_found');
      return;
    }
    socket.join(data);
    socket.emit("joined_room", { room: data, user: socket.id });
  });
  socket.on("check-rooms", () => {
    let rooms = io.sockets.adapter.rooms;
    console.log(rooms)
    console.log(roomsm)
    socket.emit('rooms', rooms);
  })
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);

  });
  socket.on('send_question', (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_question", data);
  })
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
