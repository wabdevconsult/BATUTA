import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'technicien' | 'client' | 'fournisseur')[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const { user, loading, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    console.log('AuthGuard: Checking authentication');
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    console.log('AuthGuard: Loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    console.log('AuthGuard: No user, redirecting to login');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(`AuthGuard: User role ${user.role} not in allowed roles`, allowedRoles);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('AuthGuard: Authentication successful, rendering children');
  return <>{children}</>;
};

export default AuthGuard;