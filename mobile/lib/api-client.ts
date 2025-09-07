// lib/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true, // includes cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Optional: interceptors for errors / auth
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', message);

    return Promise.reject(error);
  }
);

export default apiClient;
