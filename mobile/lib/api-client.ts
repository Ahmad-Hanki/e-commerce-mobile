// lib/apiClient.ts
import { auth } from '@/config/firebaseConfig';
import axios, { AxiosError } from 'axios';

// Extend axios types with declaration merging
declare module 'axios' {
  export interface AxiosRequestConfig {
    requireAuth?: boolean;
  }
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  // Add other fields your backend might return
}

// Use AxiosError with your response type
type ApiError = AxiosError<ApiErrorResponse>;

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log('[Axios Request] Full URL:', fullUrl);
    // If requireAuth is true, add Firebase token to headers
    if (config.requireAuth) {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn('requireAuth is true but no user is authenticated');
        }
      } catch (error) {
        const axiosError = error as ApiError;

        if (axiosError.response?.status === 401) {
          // Token invalid or no user - redirect to login
          console.log('Please log in again');
          // navigation.navigate('Login');
        } else if (axiosError.response?.status === 403) {
          // User doesn't have permission
          console.log('Access denied');
        } else {
          // Other errors (network, server, etc.)
          console.log('Request failed:', axiosError.message);
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', message);

    // Optional: Handle authentication errors
    if (error.response?.status === 401) {
      // You might want to redirect to login or refresh token here
      console.error('Authentication failed, redirecting to login...');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
