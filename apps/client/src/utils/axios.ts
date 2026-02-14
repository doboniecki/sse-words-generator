import axios from 'axios';

const createAxiosInstance = () => {
  const baseUrl = import.meta.env.VITE_SSE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error('Axios instance: Missing base url');
  }

  return axios.create({
    baseURL: `${baseUrl}`,
    timeout: 300000
  });
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
