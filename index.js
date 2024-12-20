const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
require('dotenv').config()
require("./db/connection")
const cors = require("cors")
const port = process.env.PORT || 5000
const userRouter = require('./Router/userRouter')
const messageRouter = require('./Router/MessageRouter')

const http = require("http");
const createSocketServer = require('./SocketConnection/Socket.js')
const server = http.createServer(app);

const io = createSocketServer(server);

app.use(cookieParser());
  // Enable cookieParser to parse cookies from requests
app.use(cors({
  origin: ['http://localhost:5173', 'https://salimchat.netlify.app'],
  sameSite: "lax",
  credentials: true, 
  
  methods: ['GET', 'POST', 'PUT', 'DELETE']  
  
}));


app.use(express.urlencoded({ extended: true }))  // Enable bodyParser for handling form data

app.use(express.json())
app.use("/user", userRouter)
app.use("/message",messageRouter )
app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://salimchat.netlify.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.send('Hello World!')
})

const userMap=new Map();



io.on("connection", (socket) => {
  // Add user to userMap
  console.log(`User connected: ${socket.id}`);
  console.log("your connected user",socket.handshake)
  userMap.set(socket.handshake.query.id, socket.id);


  console.log("usermap", userMap);
  socket.on("sendMsg", (msg) => {
   
    const recipientSocketId = userMap.get(msg.toUserId); // Get recipient's socket ID
    if (recipientSocketId) {
      // Send the message to the recipient
      socket.to(recipientSocketId).emit("rcv_message", {
        fromUserId: socket.handshake.query.id,
        message: msg.msg,
      });
 
    } else {
      console.log(`User with ID ${msg.toUserId} not found`);
    }
  });


  socket.on("OnlineUser",()=>{
    io.emit("allUsers",Array.from(userMap.keys()))  // Broadcast to all users
  })
 
  
  socket.on("disconnect", () =>{
    console.log(`User disconnected: ${socket.id}`);
    userMap.delete(socket.handshake.query.id);
    console.log("usermap after disconnect", userMap);
  })
});
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
