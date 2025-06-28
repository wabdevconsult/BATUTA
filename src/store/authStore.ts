import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../api/auth';
import { AuthState, LoginCredentials, RegisterData, User } from '../types/auth';

export const useAuthStore = create<AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const { user, token } = await loginUser(credentials);
          set({ user, token, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      register: async (data) => {
        try {
          set({ loading: true, error: null });
          const { user, token } = await registerUser(data);
          set({ user, token, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null });
          await logoutUser();
          set({ user: null, token: null, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      checkAuth: async () => {
        try {
          set({ loading: true, error: null });
          const user = await getCurrentUser();
          if (user) {
            // For demo purposes, we'll keep the token from storage
            const authStorage = localStorage.getItem('batuta-auth-storage');
            let token = null;
            if (authStorage) {
              const parsedStorage = JSON.parse(authStorage);
              token = parsedStorage?.state?.token;
            }
            set({ user, token, loading: false });
          } else {
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