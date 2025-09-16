import express from 'express';
import errorHandler from './src/middleware/errorHandler.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import socketHandler from './src/socket/socketHandler.js';
import userRoutes from "./src/routes/user.routes.js";
import roomRoutes from "./src/routes/room.routes.js";
import movieRoutes from './src/routes/movies.routes.js';
import tmdbRoutes from './src/routes/tmdb.routes.js';

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

app.use(cors(
  {origin: "*", // Allow requests from any origin
  methods: ["GET","POST","PUT","DELETE"], // Allow specific HTTP methods
  credentials: true // Allow cookies and credentials
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/tmdb',tmdbRoutes);


app.use(errorHandler);

socketHandler(io);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});