import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from './api/apiClient';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'technicien' | 'client' | 'fournisseur';
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const response = await axios.post('/api/auth/login', credentials);
          const { user, token } = response.data;
          set({ user, token, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Login failed', loading: false });
        }
      },

      register: async (data) => {
        try {
          set({ loading: true, error: null });
          const response = await axios.post('/api/auth/register', data);
          const { user, token } = response.data;
          set({ user, token, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Registration failed', loading: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null });
          await axios.post('/api/auth/logout');
          set({ user: null, token: null, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Logout failed', loading: false });
        }
      },

      checkAuth: async () => {
        try {
          set({ loading: true, error: null });
          
          // Check if token exists and is valid
          const token = localStorage.getItem('batuta-auth-storage');
          if (!token) {
            set({ user: null, token: null, loading: false });
            return;
          }
          
          const parsedState = JSON.parse(token);
          if (!parsedState?.state?.token) {
            set({ user: null, token: null, loading: false });
            return;
          }
          
          // Verify token expiration
          try {
            const decoded = jwtDecode(parsedState.state.token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp && decoded.exp < currentTime) {
              // Token expired, try to refresh
              const response = await axios.post('/api/auth/refresh');
              const { user, token } = response.data;
              set({ user, token, loading: false });
            } else {
              // Token still valid, get current user
              const response = await axios.get('/api/auth/me');
              set({ user: response.data.user, loading: false });
            }
          } catch (error) {
            // Invalid token or refresh failed
            set({ user: null, token: null, loading: false });
          }
        } catch (error: any) {
          set({ user: null, token: null, error: error.message, loading: false });
        }
      }
    }),
    {
      name: 'batuta-auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);