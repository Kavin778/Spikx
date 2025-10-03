import express from "express";
import errorHandler from "./src/middleware/errorHandler.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import socketHandler from "./src/chat/socketHandler.js";
import userRoutes from "./src/routes/user.routes.js";
import roomRoutes from "./src/routes/room.routes.js";
import movieRoutes from "./src/routes/movies.routes.js";
import tmdbRoutes from "./src/routes/tmdb.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { socketAuthHandler } from "./src/middleware/socketAuthHandler.js";
import { LocalIpAddress } from "./src/config/ipconfig.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const ip = LocalIpAddress();

app.use(
  cors({
    origin: [`http://${ip}:5173`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: [`http://${ip}:5173`],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
 
io.use(socketAuthHandler);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

socketHandler(io);

server.listen(PORT,"0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
