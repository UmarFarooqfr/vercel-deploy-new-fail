import express from "express";
import mongoose from "mongoose";
import http from "http";
import { routes } from "./route";
// const socketIo = require('socket.io')
import Ably from 'ably';
const bodyParser = require("body-parser");
const cors = require("cors");
const ably = new Ably.Realtime('rAWpPA.WHP_Yg:Q-D8Wsrnd3wk9TNTLYwYyWBQYljuCloNnoJYiY4N0Ck');
export const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});

export async function requestNotification(name: string, memberName: string, memberId: string): Promise<void> {
  //  console.log(`Sending notification to ${name}`);
  //   const socketId = connectedUsers.get(memberId);
  // console.log(`Socket ID for user ${name}: ${socketId}`);
  // if (socketId) {
  //   io.to(socketId).emit('notification', ` ${name}, ${memberName}! wants to join your circle`);
  //  console.log(`Notification sent to ${name}`);
  // } else {
  //   console.log(`No socket ID found for user ${name}`);
  // }
  const channel = ably.channels.get(`notifications:${memberId}`);
  try {
    await channel.publish('notification', ` ${name}, ${memberName}! wants to join your circle`);
    console.log(`Notification sent to user ${memberId}`);
  } catch (err) {
    console.error(`Error sending notification to user ${memberId}:`, err.message);
  }
  }

  // const sendNotificationToUser = async (userId: string, message: string) => {
  //   const channel = ably.channels.get(`notifications:${userId}`);
  //   try {
  //     await channel.publish('notification', { message });
  //     console.log(`Notification sent to user ${userId}`);
  //   } catch (err) {
  //     console.error(`Error sending notification to user ${userId}:`, err.message);
  //   }
  // };


  export async function approvalRequestNotification(name: string, memberName: string, userId: string): Promise<void> {
  //    const socketId = connectedUsers.get(userId);
  //  if (socketId) {
  //    io.to(socketId).emit('notification', ` ${memberName}, ${name}! approve your request to join circle`);
  //  } else {
  //    console.log(`No socket ID found for user ${name}`);
  //  }
   const channel = ably.channels.get(`notifications:${userId}`);
  try {
    await channel.publish('notification', ` ${memberName}, ${name}! approve your request to join circle`);
    console.log(`Notification sent to user ${userId}`);
  } catch (err) {
    console.error(`Error sending notification to user ${userId}:`, err.message);
  }
   }

   export async function rejectRequestNotification(name: string, memberName: string,userId: string): Promise<void> {
  //   const socketId = connectedUsers.get(userId);
  // if (socketId) {
  //   io.to(socketId).emit('notification', ` ${memberName} , ${name}! reject your request to join circle`);
  // } else {
  //   console.log(`No socket ID found for user ${userId}`);
  // }
  const channel = ably.channels.get(`notifications:${userId}`);
  try {
    await channel.publish('notification', ` ${memberName}, ${name}!  reject your request to join circle`);
    console.log(`Notification sent to user ${userId}`);
  } catch (err) {
    console.error(`Error sending notification to user ${userId}:`, err.message);
  }
  }

  export async function removeUserNotification(name: string, memberName: string,userId: string): Promise<void> {
  //   const socketId = connectedUsers.get(userId);
  // if (socketId) {
  //   io.to(socketId).emit('notification', ` ${name} ,${memberName}! removed you from circle`);
  // } else {
  //   console.log(`No socket ID found for user ${userId}`);
  // }
  const channel = ably.channels.get(`notifications:${userId}`);
  try {
    await channel.publish('notification', ` ${memberName}, ${name}!  removed you from circle`);
    console.log(`Notification sent to user ${userId}`);
  } catch (err) {
    console.error(`Error sending notification to user ${userId}:`, err.message);
  }
  }

  export async function bannedUserNotification(name: string, memberName: string,userId: string): Promise<void> {
  //   const socketId = connectedUsers.get(userId);
  // if (socketId) {
  //   io.to(socketId).emit('notification', ` ${name} , ${memberName}! banned you from circle`);
  // } else {
  //   console.log(`No socket ID found for user ${userId}`);
  // }
  const channel = ably.channels.get(`notifications:${userId}`);
  try {
    await channel.publish('notification', ` ${memberName}, ${name}!  banned you from circle`);
    console.log(`Notification sent to user ${userId}`);
  } catch (err) {
    console.error(`Error sending notification to user ${userId}:`, err.message);
  }
  }


// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//   },
// });


const connectedUsers = new Map();


// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   //io.emit('notification', `Congratulations, sdsdsds! You have successfully logged in.`);

//   socket.on('register', (data:any) => {
//   console.log(`Register event received for user: ${data}`);
//     connectedUsers.set(data.userId, socket.id);
//     console.log(connectedUsers)
//     console.log(`User registered: ${data.userName} with socket ID: ${socket.id}`);
//   });


//   socket.on('registered', (data:any)=>{
//     console.log('hello',data)
//   })
  
//   socket.on('connection', ()=>{
//     console.log('hello')
//   })
//   //sendNotification("Fakhar")
//   // socket.on('disconnect', () => {
//   //   for (let [userName, socketId] of connectedUsers.entries()) {
//   //     if (socketId === socket.id) {
//   //       connectedUsers.delete(userName);
//   //       console.log(`User disconnected: ${userName}`);
//   //       break;
//   //     }
//   //   }
//   // });
// });

// sendNotificationToUser('sdsdsdsdg','hy mysdsdsd namsdsde is umar')


app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(bodyParser.json({ limit: "150mb" }));
app.use(express.json());
app.use(cors({ origin: "*"}));

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
const port = 3000;
export const TOKEN_KEY = "11223344";
routes(app);
const url = `mongodb+srv://wwwburjsoft:gBLTbWrZsDYS9kR5@cluster0.k2bwmju.mongodb.net/`;
// const url = `mailto:mongodb+srv://wwwburjsoft:gbltbwrzsdys9kr5@cluster0.k2bwmju.mongodb.net/?retryWrites=true&w=majority`;
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
});

app.get('/', function (req, res) {
  res.send('* Hello World! *');
});

export default app;