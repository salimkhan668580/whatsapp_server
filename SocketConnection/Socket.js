// server/Socket.js
const { Server } = require("socket.io");

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },


  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    // Add socket event handlers as needed
  });

  

  return io;
};

module.exports = createSocketServer;
