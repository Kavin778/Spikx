import prisma from "../config/dbconfig.js";

export async function createRoomService(roomData){
    const {name,videoId,tmdbId,creatorId} = roomData;

    const newRoom = await prisma.room.create({
        data:{
            name,
            videoId,
            tmdbId,
            creatorId,
        },
    })

    return newRoom;
}