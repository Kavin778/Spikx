import { time } from "console";
import prisma from "../config/dbconfig.js";
import{ v4 as uuidv4 }from 'uuid'

export default function socketHandler(io) {
  const roomStates = {};

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join_room", ({ roomId, username }) => {
      socket.roomId = roomId;
      socket.username = username;
      socket.join(roomId);
      console.log(`${username} joined room: ${roomId}`);

      socket.to(roomId).emit("user_joined", {
        username: "Bot",
        message: `${username} has joined the room.`,
      });

      if (roomStates[roomId]) {
        socket.emit("sync_playback", roomStates[roomId]);
      }
    });

    socket.on("send_message", (data) => {
      if (socket.roomId) {
        const messagePayload = { 
            id:uuidv4(),
          message: data.message,
          username: data.username,
          timestamp: new Date().toLocaleTimeString(),
        };
        io.to(socket.roomId).emit("receive_message", messagePayload);
      }
    });

    const isHost = async (roomId) => {
      if (!socket.userId) return false;
      const room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
      });
      return room && room.creatorId === socket.userId;
    };

    socket.on("host_play", async (data) => {
      if (!(await isHost(data.roomId))) {
        return console.log(
          `Permission denied ${socket.username}, you are not roomOwner bro, only he can control`
        );
      }
      const newState = { state: "playing", time: data.currenttime };
      roomStates[data.roomId] = newState;
      socket.to(data.roomId).emit("sync_playback", newState);
    });

    socket.on("host_pause", async (data) => {
      if (!(await isHost(data.roomId))) {
        return console.log(
          `Permission denied ${socket.username}, you are not roomOwner bro, only he can control`
        );
      }
      const newState = { state: "paused", time: data.currenttime };
      roomStates[data.roomId] = newState;
      socket.to(data.roomId).emit("sync_playback", newState);
    });

    socket.on("host_seek", async (data) => {
      if (!(await isHost(data.roomId))) {
        return console.log(
          `Permission denied ${socket.username}, you are not roomOwner bro, only he can control`
        );
      }
      if (roomStates[data.roomId]) {
        roomStates[data.roomId].time = data.currenttime;
      }

      const currentState = roomStates[data.roomId] || {
        state: "paused",
        time: data.currenttime,
      };

      socket.to(data.roomId).emit("sync_playback", currentState);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      if (socket.roomId && socket.username) {
        socket.to(socket.roomId).emit("user_left", {
          username: "Bot",
          message: `${socket.username} has left the room.`,
        });
      }
    });
  });
}
