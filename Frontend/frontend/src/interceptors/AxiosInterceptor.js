import axios from "axios";
import { clearAccessToken, getAccessToken, refreshToken, setAccessToken } from "../api/AuthService";

const BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

const apiClient = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

apiClient.interceptors.request.use(
    (config)=>{
        const token = getAccessToken();

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response)=>response,
    async (error) =>{
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                const newAccessToken = await refreshToken();
                setAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            }
            catch(error){
                clearAccessToken();
                window.location.href = '/'
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default apiClient;