import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Setup axios instance
const api = axios.create({
  baseURL: 'https://j70x7qx5pk.execute-api.ap-south-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json',
  },
});
const otherapi = axios.create({
  baseURL: 'https://2b8cpjbnk5.execute-api.ap-south-1.amazonaws.com/default',
  headers: {
    'Content-Type': 'application/json',
  },
});
// Interceptor to add the JWT token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
otherapi.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const verifyOtp = async (phone, otp) => {
  try {
    const response = await api.post('/verify-otp', { phoneNumber: phone, otp });
    const { token } = response.data;
    await SecureStore.setItemAsync('jwt_token', token);   
    console.log("Token stored");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const Maillogin = async (email, password) => {
  try {
    const response = await otherapi.post('/passwordmaillogin', { email, password });
    const { token } = response.data;
    await SecureStore.setItemAsync('jwt_token', token);   
    console.log("Token stored");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendOTP = async () => {
  try {
    const response = await api.post('/generate-otp',{phoneNumber: fullPhoneNumber});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//userdata
export const userProfile = async () => {
  try {
    const response = await api.get('/userpro',{phoneNumber: fullPhoneNumber});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
