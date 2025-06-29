import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const authStorage = localStorage.getItem('batuta-auth-storage');
    if (authStorage) {
      try {
        const parsedStorage = JSON.parse(authStorage);
        const token = parsedStorage?.state?.token;
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    const originalRequest = error.config;
    
    // If 401 Unauthorized or 403 Forbidden and not already retrying
    if ((error.response?.status === 401 || error.response?.status === 403) && 
        !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // In a real app, this would refresh the token
        // For demo purposes, we'll just redirect to login
        window.location.href = '/auth/login';
        return Promise.reject(error);
      } catch (refreshError) {
        // If refresh fails, logout user
        localStorage.removeItem('batuta-auth-storage');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;