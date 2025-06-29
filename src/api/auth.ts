import apiClient from './apiClient';
import { LoginCredentials, RegisterData, User } from '../types/auth';

// Login user with email and password
export const loginUser = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  console.log('Login API call with:', credentials);
  
  // For demo accounts, use mock data
  if (
    (credentials.email === 'admin@batuta.fr' && credentials.password === 'admin123') ||
    (credentials.email === 'tech@batuta.fr' && credentials.password === 'tech123') ||
    (credentials.email === 'client@batuta.fr' && credentials.password === 'client123') ||
    (credentials.email === 'fournisseur@batuta.fr' && credentials.password === 'fournisseur123')
  ) {
    console.log('Using demo account');
    
    // Create mock user based on email
    let role: 'admin' | 'technicien' | 'client' | 'fournisseur';
    let firstName: string;
    
    if (credentials.email === 'admin@batuta.fr') {
      role = 'admin';
      firstName = 'Admin';
    } else if (credentials.email === 'tech@batuta.fr') {
      role = 'technicien';
      firstName = 'Technicien';
    } else if (credentials.email === 'client@batuta.fr') {
      role = 'client';
      firstName = 'Client';
    } else {
      role = 'fournisseur';
      firstName = 'Fournisseur';
    }
    
    const mockUser: User = {
      id: '123456789',
      email: credentials.email,
      role: role,
      firstName: firstName,
      lastName: 'BATUTA',
      company: 'BATUTA SAS',
      phone: '01 23 45 67 89',
      createdAt: new Date().toISOString()
    };
    
    // Mock token
    const token = 'mock-jwt-token-' + role;
    
    return { user: mockUser, token };
  }
  
  // For real accounts, try to call the API
  try {
    console.log('Calling real API for login');
    const response = await apiClient.post('/auth/login', credentials);
    console.log('API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Login API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Register new user
export const registerUser = async (data: RegisterData): Promise<{ user: User; token: string }> => {
  try {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    // In a real app, this would call the API
    // For demo, we just return successfully
    return Promise.resolve();
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // For demo purposes, we'll just return the user from local storage
    // In a real app, this would validate the token with the server
    const authStorage = localStorage.getItem('batuta-auth-storage');
    if (authStorage) {
      try {
        const parsedStorage = JSON.parse(authStorage);
        if (parsedStorage?.state?.user) {
          return parsedStorage.state.user;
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }
    return null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// Refresh token
export const refreshToken = async (): Promise<{ user: User; token: string } | null> => {
  try {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    return null;
  }
};