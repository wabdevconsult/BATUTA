import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import authService from '../services/authService';

export const useAuth = () => {
  const { user, token, login, logout, checkAuth, loading, error } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsInitialized(true);
    };
    
    initAuth();
  }, [checkAuth]);

  // Check if token is valid
  const isAuthenticated = useCallback(() => {
    if (!token) return false;
    return authService.isTokenValid(token);
  }, [token]);

  // Check if user has required role
  const hasRole = useCallback((requiredRoles) => {
    if (!user) return false;
    
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    
    return user.role === requiredRoles;
  }, [user]);

  return {
    user,
    token,
    login,
    logout,
    loading,
    error,
    isInitialized,
    isAuthenticated,
    hasRole
  };
};

export default useAuth;