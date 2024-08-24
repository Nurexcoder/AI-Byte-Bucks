// lib/axiosInstance.ts
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add Authorization token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken({ req: config.headers?.request }); // Get token from NextAuth session
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (response?.status === 401 && !config.__isRetryRequest) {
      config.__isRetryRequest = true;
      // Handle token refresh logic here if needed
      try {
        const refreshToken = await getToken({ req: config.headers?.request });
        // Implement token refresh logic
        const res = await axios.post('https://your-api-base-url.com/refresh-token', {
          refreshToken,
        });
        const newToken = res.data.token;
        config.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(config);
      } catch (err) {
        console.error('Token refresh failed:', err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
