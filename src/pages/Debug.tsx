import React from 'react';
import { useAuthStore } from '../store/authStore';

const Debug = () => {
  const { user, token, loading, error, login, logout } = useAuthStore();

  const handleTestLogin = async () => {
    try {
      await login({ email: 'admin@batuta.fr', password: 'admin123' });
    } catch (err) {
      console.error('Test login failed:', err);
    }
  };

  const handleTestLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Test logout failed:', err);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Auth State</h2>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify({ user, token, loading, error }, null, 2)}
            </pre>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Local Storage</h2>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(
                Object.entries(localStorage).reduce((acc, [key, value]) => {
                  try {
                    acc[key] = JSON.parse(value);
                  } catch (e) {
                    acc[key] = value;
                  }
                  return acc;
                }, {} as Record<string, any>),
                null,
                2
              )}
            </pre>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleTestLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            Test Login (admin)
          </button>
          
          <button
            onClick={handleTestLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={loading}
          >
            Test Logout
          </button>
          
          <button
            onClick={clearLocalStorage}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Clear LocalStorage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Debug;