import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SSE_API_BASE_URL,
  timeout: 300000
});

export default axiosInstance;
