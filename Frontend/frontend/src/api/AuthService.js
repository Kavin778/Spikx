import axios from 'axios';

const BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

export const register = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data.message;
  } catch (error) {
    console.log('Registration Failed');
  }
};

export const login = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData);
    return response.data.accessToken;
  } catch (error) {
    console.log("Login Failed");
  }
};
