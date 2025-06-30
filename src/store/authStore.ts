import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../api/auth';
import { AuthState, LoginCredentials, RegisterData } from '../types/auth';

export const useAuthStore = create<AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          console.log('Auth store: login attempt with', credentials);
          const { user, token } = await loginUser(credentials);
          console.log('Auth store: login successful', { user, token });
          set({ user, token, loading: false });
        } catch (error: any) {
          console.error('Auth store: login error', error);
          set({ error: error.message, loading: false });
          throw error; // Re-throw to allow component to handle
        }
      },

      register: async (data) => {
        try {
          set({ loading: true, error: null });
          console.log('Auth store: register attempt');
          const { user, token } = await registerUser(data);
          console.log('Auth store: register successful');
          set({ user, token, loading: false });
        } catch (error: any) {
          console.error('Auth store: register error', error);
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null });
          console.log('Auth store: logout attempt');
          await logoutUser();
          console.log('Auth store: logout successful');
          set({ user: null, token: null, loading: false });
        } catch (error: any) {
          console.error('Auth store: logout error', error);
          set({ error: error.message, loading: false });
        }
      },

      checkAuth: async () => {
        try {
          const currentState = get();
          // Skip if already loading or if we already have a user
          if (currentState.loading) {
            console.log('Auth store: already checking auth, skipping');
            return;
          }
          
          set({ loading: true, error: null });
          console.log('Auth store: checking auth');
          const user = await getCurrentUser();
          
          if (user) {
            console.log('Auth store: user found', user);
            // For demo purposes, we'll keep the token from storage
            const authStorage = localStorage.getItem('batuta-auth-storage');
            let token = null;
            if (authStorage) {
              try {
                const parsedStorage = JSON.parse(authStorage);
                token = parsedStorage?.state?.token;
              } catch (error) {
                console.error('Error parsing auth storage:', error);
              }
            }
            set({ user, token, loading: false });
          } else {
            console.log('Auth store: no user found');
            set({ user: null, token: null, loading: false });
          }
        } catch (error: any) {
          console.error('Auth store: check auth error', error);
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