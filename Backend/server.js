import express from 'express';
import userRoutes from './src/routes/user.routes.js';
import roomRoutes from './src/routes/room.routes.js';
import errorHandler from './src/middleware/errorHandler.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import socketHandler from './src/socket/socketHandler.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin: "*",
    methods: ["GET","POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);


app.use(errorHandler);

socketHandler(io);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});