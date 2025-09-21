import prisma from "../config/dbconfig.js";

export async function createRoomService(roomData) {
  const { name,creatorId ,currentMovieId} = roomData;

  const newRoom = await prisma.room.create({
    data: {
      name,
      creator:{
        connect:{
          id:creatorId
        },
      },
      currentMovie:{
        connect:{
          id:currentMovieId
        },
      }
    },
  });

  return newRoom;
}
