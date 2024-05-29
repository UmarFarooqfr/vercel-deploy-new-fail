import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { routes } from './route';

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('register', (data) => {
    connectedUsers.set(data.userId, socket.id);
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

export async function requestNotification(name: string, memberName: string, memberId: string): Promise<void> {
  const socketId = connectedUsers.get(memberId);
  if (socketId) {
    io.to(socketId).emit('notification', `${name}, ${memberName}! wants to join your circle`);
  }
}

// Other notification functions...

app.use(express.urlencoded({ limit: '150mb', extended: true }));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
  next();
});

const PORT = process.env.PORT || 3000;
export const TOKEN_KEY = '11223344';
routes(app);

const url = `mongodb+srv://wwwburjsoft:gBLTbWrZsDYS9kR5@cluster0.k2bwmju.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.log('Connection failed!:', error);
  });

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: '*** API is running fast! ***' });
});

// Export the server for Vercel
export default server;
