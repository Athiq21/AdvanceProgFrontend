import axios from 'axios';
export const BASE_URL = 'http://localhost:8080/api';
// export const BASE_URL = 'http://147.79.68.107:8080/Vehicle/api';

// export const BASE_URL = 'http://172.20.10.3:8080/api';


const apiConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiConfig.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default apiConfig;
