import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/sign-in';
        }
      }
      return Promise.reject(error);
    }
  );
  