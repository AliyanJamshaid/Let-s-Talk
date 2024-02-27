const express = require("express");
const app = express();
const cors = require("cors");
// const io = require("socket.io")(3000);
const auth = require("./Routes/authRoutes");
require("dotenv").config({ path: "backend/config/config.env" });
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(cookieParser());
// app.use(notFound);
// app.use(errorHandler);
app.use(cors());
app.use("/api/v1", auth);

// io.on("connection", (socket) => {
//   socket.on("setup", (userData) => {
//     socket.join(userData.io);
//     socket.emit("connected");
//   });

//   socket.on("join room", (room) => {
//     socket.join(room);
//   });

//   socket.on("typing", (room) => {
//     socket.in(room).emit("typing");
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
//   });

//   socket.on("new message", (message) => {
//     var chat = message.chatId;

//     if (!chat.users) {
//       console.log("users not defined");
//     }

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieve.sender._id) return;
//       socket.in(user._id).emit("message recieved", newMessageRecieve);
//     });
//   });
// });
module.exports = app;
