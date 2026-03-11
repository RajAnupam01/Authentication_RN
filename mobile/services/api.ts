import { getAccessToken } from '@/utils/storage';
import axios from 'axios';

const API = axios.create({
  baseURL: "http://10.160.153.197:3000/api/"
});

API.interceptors.request.use(async (config) => {
  const token = await getAccessToken(); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;