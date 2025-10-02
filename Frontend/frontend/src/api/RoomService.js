import apiClient from "../interceptors/AxiosInterceptor"


export const getRoomDetails = async (roomId)=>{
    try{
        const response = await apiClient.get(`/rooms/getRoom/${roomId}`)
        return response.data.room;
    }
    catch(error){
        console.error("Failed fetching movie details");
    }
}

export const getRooms = async()=>{
    try{
        const response = await apiClient.get("/rooms/getRooms");
        return response.data.rooms;
    }
    catch(error){
        console.error("Error while fetching movies");
    }
}

export const createRoom = async(roomData)=>{
    try{
        const response = await apiClient.post("/rooms/createRoom",roomData);
        return response.data.room
    }
    catch(error){
        console.error("Error while creating room");
    }
}