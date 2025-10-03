import prisma from "../config/dbconfig.js";
import bcrypt from "bcrypt";
import { getMovieImagesService } from "./tmdb.service.js";

export async function createRoomService(roomData) {
  const { name, creatorId, isPublic, password, currentMovieId,description } = roomData;
  let hashedPassword = null;
  if (!isPublic) {
    if (!password) {
      return {
        success: false,
        status: 400,
        message: "Required Password for room creation",
      };
    }
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const newRoom = await prisma.room.create({
    data: {
      name,
      isPublic,
      password:hashedPassword,
      creatorId,
      currentMovieId,
      description
    },
  });

  delete newRoom.password;

  return {success:true,newRoom};
}

export async function getRoomsService() {
  const rooms = await prisma.room.findMany({
    where: {
      isOnline: true,
    },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
        },
      },
      currentMovie: true,
    },
  });

  if (!rooms) {
    return { success: false, status: 404, message: "No rooms are online" };
  }

  delete rooms.password

  return {success:true,rooms};
}

export async function joinRoomService(roomData) {
  const room = await prisma.room.findUnique({
    where: {
      id: roomData.id,
    },
  });

  if(!room){
    return{ success:false,status:404,message:"Room not found"}
  }
  
  if(room.isPublic){
    delete room.password
    return { success: true, room };
  }

  const isPassValid = bcrypt.compare(roomData.password,room.password)

  if (!isPassValid) {
    return { success: false, status: 401, message: "Invalid room or Password" };
  }

  delete room.password;
  return {success:true,room};
}

export async function getRoomByIdService(roomId) {
  const room = await prisma.room.findUnique({
    where:{
      id:roomId,
    },
    include:{
      creator:{
        select:{
          id:true,
          username:true
        }
      },
    }
  })

  return room;
}
