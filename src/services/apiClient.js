import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const authStorage = localStorage.getItem('batuta-auth-storage');
    if (authStorage) {
      const parsedStorage = JSON.parse(authStorage);
      const token = parsedStorage?.state?.token;
      
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

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 Unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const authStorage = localStorage.getItem('batuta-auth-storage');
        if (authStorage) {
          const parsedStorage = JSON.parse(authStorage);
          const token = parsedStorage?.state?.token;
          
          if (token) {
            // Set the token in the header for the refresh request
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Call refresh token endpoint
            const response = await apiClient.post('/auth/refresh');
            const { token: newToken } = response.data;
            
            // Update token in localStorage
            const newState = { ...parsedStorage.state, token: newToken };
            localStorage.setItem('batuta-auth-storage', JSON.stringify({ state: newState }));
            
            // Update Authorization header for the original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            
            // Retry the original request
            return apiClient(originalRequest);
          }
        }
        
        // If no token or refresh fails, redirect to login
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