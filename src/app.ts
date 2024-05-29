import express from "express";
import mongoose from "mongoose";
import http from "http";
import { routes } from "./route";
const socketIo = require('socket.io')

const bodyParser = require("body-parser");
const cors = require("cors");

export const app = express();
const server = http.createServer(app);

export async function requestNotification(name: string, memberName: string, memberId: string): Promise<void> {
   console.log(`Sending notification to ${name}`); 
    const socketId = connectedUsers.get(memberId);
  console.log(`Socket ID for user ${name}: ${socketId}`);
  if (socketId) {
    io.to(socketId).emit('notification', ` ${name}, ${memberName}! wants to join your circle`);
   console.log(`Notification sent to ${name}`);
  } else {
    console.log(`No socket ID found for user ${name}`);
  }
  }

  export async function approvalRequestNotification(name: string, memberName: string, userId: string): Promise<void> { 
     const socketId = connectedUsers.get(userId);
   if (socketId) {
     io.to(socketId).emit('notification', ` ${memberName}, ${name}! approve your request to join circle`);
   } else {
     console.log(`No socket ID found for user ${name}`);
   }
   }

   export async function rejectRequestNotification(name: string, memberName: string,userId: string): Promise<void> { 
    const socketId = connectedUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit('notification', ` ${memberName} , ${name}! reject your request to join circle`);
  } else {
    console.log(`No socket ID found for user ${userId}`);
  }
  }

  export async function removeUserNotification(name: string, memberName: string,userId: string): Promise<void> { 
    const socketId = connectedUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit('notification', ` ${name} ,${memberName}! removed you from circle`);
  } else {
    console.log(`No socket ID found for user ${userId}`);
  }
  }

  export async function bannedUserNotification(name: string, memberName: string,userId: string): Promise<void> { 
    const socketId = connectedUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit('notification', ` ${name} , ${memberName}! banned you from circle`);
  } else {
    console.log(`No socket ID found for user ${userId}`);
  }
  }


const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});
const port = 3000;


const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  //io.emit('notification', `Congratulations, sdsdsds! You have successfully logged in.`);

  socket.on('register', (data) => {
    //console.log(`Register event received for user: ${data.userName}`);
    connectedUsers.set(data.userId, socket.id);
   // console.log(connectedUsers)
    //console.log(`User registered: ${data.userName} with socket ID: ${socket.id}`);
  });

  //sendNotification("Fakhar")
  // socket.on('disconnect', () => {
  //   for (let [userName, socketId] of connectedUsers.entries()) {
  //     if (socketId === socket.id) {
  //       connectedUsers.delete(userName);
  //       console.log(`User disconnected: ${userName}`);
  //       break;
  //     }
  //   }
  // });
});


app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(bodyParser.json({ limit: "150mb" }));
app.use(express.json());
app.use(cors({ 
  origin: "*", 
  methods: ["GET", "POST"], // Include WebSocket methods
  allowedHeaders: ["Content-Type", "Authorization"], // Adjust headers if needed
}));
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
export const TOKEN_KEY = "11223344";
routes(app);
const url = `mongodb+srv://wwwburjsoft:gBLTbWrZsDYS9kR5@cluster0.k2bwmju.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {-
    console.log("Connected to database!", url);
  })
  .catch((error) => {
    console.log("Connection failed!:", error);
  });
server.listen(port, () => {
  console.log(`Express server listening ${port}`);
  app.get('/', function (req, res) {
    res.send('**** Hello World! ****');
  });
});
export default app;

