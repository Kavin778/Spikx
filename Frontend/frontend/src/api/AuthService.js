import axios from 'axios';
import apiClient from '../interceptors/AxiosInterceptor';

const BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

export const setAccessToken = accessToken => {
  localStorage.setItem('accessToken', accessToken);
};

export const clearAccessToken = () => {
  localStorage.removeItem('accessToken');
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const register = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    return response.data.message;
  } catch (error) {
    console.log('Registration Failed');
  }
};

export const loginService = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData,{
      withCredentials:true
    });
    setAccessToken(response.data.accessToken);
    return response.data.accessToken;
    
  } catch (error) {
    console.log('Login Failed');
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`,{},{
      withCredentials:true
    })
    setAccessToken(response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.log('Token refresh failed');
    clearAccessToken()
    throw error;
  }
};

export const logoutService = async () => {
  try {
     await axios.post(`${BASE_URL}/auth/logout`, {},{
      withCredentials: true,
    });
  } catch (error) {
    console.log('Error while logging out');
  } finally {
    clearAccessToken();
  }
};
