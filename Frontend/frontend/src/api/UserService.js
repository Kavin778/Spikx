import apiClient from "../interceptors/AxiosInterceptor"

export const getUserDetails = async()=>{
    try{
        const response = await apiClient.get("/users/getUserDetails");
        console.log(response.data.user);
        return response.data.user;

    }
    catch(error){
        console.error("Error while fetching user data");
    }
}