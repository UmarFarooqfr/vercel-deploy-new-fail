import express from "express";
import mongoose from "mongoose";
import http from "http";
import { routes } from "./route";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";

export const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("register", (data) => {
    console.log(`Register event received for user: ${data}`);
    connectedUsers.set(data.userId, socket.id);
    const socketId = connectedUsers.get("dsdsdsddsdsdsds");
    if (socketId) {
      io.to(socketId).emit("notification", ` $sdsdsd! banned you from circle`);
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
  });
});

app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(bodyParser.json({ limit: "150mb" }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT, POST, PATCH, DELETE, OPTIONS");
  next();
});

const port = 3000;
export const TOKEN_KEY = "11223344";
routes(app);

const url = `mongodb+srv://wwwburjsoft:gBLTbWrZsDYS9kR5@cluster0.k2bwmju.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database!", url);
  })
  .catch((error) => {
    console.log("Connection failed!:", error);
  });

server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  app.get("/", (req, res) => {
    res.send("**** Hello World! ****");
  });
});

export default app;
