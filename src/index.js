const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

//server(emit) => client(receive) - countUpdated
//client(emit) => server(receive) - increment

io.on("connection", (socket) => {
  console.log("new websocket connection");
  // socket.emit("countUpdated", count);
  // socket.on("increment", () => {
  //   count++;
  //   // socket.emit("countUpdated", count); cái này chỉ emit an event to that specific connection no ko tự update có các connection khác
  //   io.emit("countUpdated", count); //emit cho mọi connection
  // });
  socket.emit("message", "Welcome !!!");
  socket.broadcast.emit("message", "New user has joined"); //emit cho mọi người trừ thằng gửi
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("sendLocation", (location) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${location.latitude},${location.longitude}`
    );
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log("listen to port", +port);
});
