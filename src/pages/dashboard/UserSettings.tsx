import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Settings, Bell, Lock, Eye, EyeOff, Save, AlertCircle } from 'lucide-react';

const UserSettings = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('general');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
    marketing: false
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    // In a real app, you would update the password here
    // For now, we'll just simulate a successful update
    setTimeout(() => {
      setSuccess('Mot de passe mis à jour avec succès');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 500);
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // In a real app, you would update the notification settings here
    // For now, we'll just simulate a successful update
    setTimeout(() => {
      setSuccess('Préférences de notification mises à jour avec succès');
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'general'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="h-5 w-5 inline mr-2" />
            Paramètres généraux
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Lock className="h-5 w-5 inline mr-2" />
            Sécurité
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bell className="h-5 w-5 inline mr-2" />
            Notifications
          </button>
        </nav>
      </div>

      <div className="p-6">
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {activeTab === 'general' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Paramètres généraux</h2>
            <p className="text-gray-600 mb-4">
              Gérez vos préférences générales et les paramètres de votre compte.
            </p>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-md font-medium text-gray-900 mb-3">Langue</h3>
              <select className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200">
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-md font-medium text-gray-900 mb-3">Fuseau horaire</h3>
              <select className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200">
                <option value="Europe/Paris">Europe/Paris (UTC+01:00)</option>
                <option value="Europe/London">Europe/London (UTC+00:00)</option>
                <option value="America/New_York">America/New_York (UTC-05:00)</option>
              </select>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-md font-medium text-gray-900 mb-3">Format de date</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="date-format-1"
                    name="date-format"
                    value="DD/MM/YYYY"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="date-format-1" className="ml-2 block text-sm text-gray-700">
                    DD/MM/YYYY (31/12/2025)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="date-format-2"
                    name="date-format"
                    value="MM/DD/YYYY"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="date-format-2" className="ml-2 block text-sm text-gray-700">
                    MM/DD/YYYY (12/31/2025)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="date-format-3"
                    name="date-format"
                    value="YYYY-MM-DD"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="date-format-3" className="ml-2 block text-sm text-gray-700">
                    YYYY-MM-DD (2025-12-31)
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Enregistrer les paramètres</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Sécurité</h2>
            <p className="text-gray-600 mb-4">
              Gérez vos paramètres de sécurité et mettez à jour votre mot de passe.
            </p>
            
            <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Le mot de passe doit contenir au moins 8 caractères.
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Mettre à jour le mot de passe</span>
                </button>
              </div>
            </form>
            
            <div className="border-t border-gray-200 pt-6 mt-8">
              <h3 className="text-md font-medium text-gray-900 mb-3">Sessions actives</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Session actuelle</p>
                    <p className="text-sm text-gray-500">Dernière activité: {new Date().toLocaleString()}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Actif
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
            <p className="text-gray-600 mb-4">
              Gérez vos préférences de notification pour rester informé des événements importants.
            </p>
            
            <form onSubmit={handleNotificationSubmit} className="mt-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email"
                      name="email"
                      type="checkbox"
                      checked={notifications.email}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email" className="font-medium text-gray-700">Notifications par email</label>
                    <p className="text-gray-500">Recevez des notifications par email pour les événements importants.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sms"
                      name="sms"
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sms" className="font-medium text-gray-700">Notifications par SMS</label>
                    <p className="text-gray-500">Recevez des notifications par SMS pour les événements urgents.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="app"
                      name="app"
                      type="checkbox"
                      checked={notifications.app}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="app" className="font-medium text-gray-700">Notifications dans l'application</label>
                    <p className="text-gray-500">Recevez des notifications dans l'application pour toutes les activités.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing"
                      name="marketing"
                      type="checkbox"
                      checked={notifications.marketing}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing" className="font-medium text-gray-700">Communications marketing</label>
                    <p className="text-gray-500">Recevez des informations sur les nouvelles fonctionnalités et offres.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Enregistrer les préférences</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;