import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Unauthorized = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
        
        <p className="text-gray-600 mb-8">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          {user?.role && (
            <span> Votre rôle actuel est <strong>{user.role}</strong>.</span>
          )}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="h-5 w-5" />
            <span>Accueil</span>
          </Link>
          
          <button
            onClick={() => logout()}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;