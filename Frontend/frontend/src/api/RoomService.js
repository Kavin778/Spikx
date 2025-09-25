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

export const getRooms