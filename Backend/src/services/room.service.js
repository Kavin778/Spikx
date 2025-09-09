import prisma from "../config/dbconfig.js";

export async function createRoomService(roomData){
    const {name,videoUrl,creatorId} = roomData;

    const newRoom = await prisma.room.create({
        data:{
            name,
            videoUrl,
            creatorId,
        },
    })

    return newRoom;
}