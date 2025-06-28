import apiClient from './apiClient';
import { jwtDecode } from 'jwt-decode';

// Register a new user
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get current user');
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to refresh token');
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to process forgot password request');
  }
};

// Reset password
export const resetPassword = async (token, password) => {
  try {
    const response = await apiClient.post('/auth/reset-password', { token, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reset password');
  }
};

// Check if token is valid
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export default {
  register,
  login,
  getCurrentUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  isTokenValid
};