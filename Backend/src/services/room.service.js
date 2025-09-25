import prisma from "../config/dbconfig.js";
import bcrypt from "bcrypt";

export async function createRoomService(roomData) {
  const { name, creatorId, isPublic, password, currentMovieId,description } = roomData;
  console.log(roomData)
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

  const isPassValid = bcrypt.compare(roomData.password,room.password)

  if (!room || !isPassValid) {
    return { success: false, status: 401, message: "Invalid room or Password" };
  }

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
