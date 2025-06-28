import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Zap, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import axios from '../../api/apiClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Veuillez saisir votre adresse email');
      return;
    }
    
    try {
      setLoading(true);
      
      // Call our password reset API endpoint
      await axios.post('/api/auth/forgot-password', { email });
      
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BATUTA
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Mot de passe oublié
          </h2>
          <p className="text-gray-600">
            Nous vous enverrons un lien pour réinitialiser votre mot de passe
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email envoyé !
              </h3>
              <p className="text-gray-600 mb-6">
                Si un compte existe avec cette adresse email, vous recevrez un lien pour réinitialiser votre mot de passe.
              </p>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à la connexion</span>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="votre@email.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:transform-none disabled:hover:shadow-none"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      <span>Envoi en cours...</span>
                    </div>
                  ) : (
                    'Envoyer le lien de réinitialisation'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Retour à la connexion</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;