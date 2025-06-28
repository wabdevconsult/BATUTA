import React, { useState, useEffect } from 'react';
import { usePersonalizationStore } from '../../store/personalizationStore';
import { useAuthStore } from '../../store/authStore';
import { 
  Brush, 
  Save, 
  Eye, 
  Palette, 
  Type, 
  Layout, 
  Image, 
  Menu, 
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import SimulateurUniversel from '../../components/SimulateurUniversel';
import formules from '../../data/formules.json';

const UserPersonalization = () => {
  const { personalization, fetchPersonalization, updatePersonalization, loading, error } = usePersonalizationStore();
  const { user } = useAuthStore();
  const [editData, setEditData] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [previewMode, setPreviewMode] = useState(false);
  const [success, setSuccess] = useState('');
  const [selectedSimulateur, setSelectedSimulateur] = useState(null);

  useEffect(() => {
    fetchPersonalization();
  }, [fetchPersonalization]);

  useEffect(() => {
    if (personalization) {
      setEditData(personalization);
      
      // Find the selected simulator
      if (personalization.simulateur?.selectedSimulateur) {
        const simulator = formules.find(
          f => f.id === personalization.simulateur.selectedSimulateur
        );
        setSelectedSimulateur(simulator);
      }
    }
  }, [personalization]);

  const handleChange = (e, section = null, index = null, field = null) => {
    const { name, value } = e.target;
    
    if (section && index !== null && field) {
      // Handle nested array objects (services, activities, etc.)
      setEditData(prev => {
        const newData = { ...prev };
        newData[section][index][field] = value;
        return newData;
      });
    } else if (section && field) {
      // Handle nested objects (theme, contact, etc.)
      setEditData(prev => {
        const newData = { ...prev };
        newData[section][field] = value;
        return newData;
      });
    } else {
      // Handle top-level fields
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSimulateurChange = (e) => {
    const simulateurId = e.target.value;
    
    setEditData(prev => ({
      ...prev,
      simulateur: {
        ...prev.simulateur,
        selectedSimulateur: simulateurId
      }
    }));
    
    const simulator = formules.find(f => f.id === simulateurId);
    setSelectedSimulateur(simulator);
  };

  const handleToggleSimulateur = (e) => {
    const { checked } = e.target;
    
    setEditData(prev => ({
      ...prev,
      simulateur: {
        ...prev.simulateur,
        enabled: checked
      }
    }));
  };

  const handleSave = async () => {
    setSuccess('');
    try {
      await updatePersonalization(editData);
      setSuccess('Personnalisation enregistrée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to save personalization:', err);
    }
  };

  if (loading && !editData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !editData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md">
          <h2 className="text-lg font-semibold mb-2">Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!editData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg max-w-md">
          <h2 className="text-lg font-semibold mb-2">Aucune personnalisation</h2>
          <p>Vous n'avez pas encore personnalisé votre site. Commencez maintenant !</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Personnalisation du site</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              previewMode 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            <Eye className="h-5 w-5" />
            <span>{previewMode ? 'Éditer' : 'Prévisualiser'}</span>
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Enregistrer</span>
              </>
            )}
          </button>
        </div>
      </div>

      {success && (
        <div className="m-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="m-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {previewMode ? (
        <div className="p-6">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              Mode prévisualisation. Cliquez sur "Éditer" pour revenir au mode d'édition.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <iframe 
              src="/personnaliser" 
              className="w-full h-[600px] rounded-lg"
              title="Prévisualisation du site"
            ></iframe>
          </div>
        </div>
      ) : (
        <div className="p-6">
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
                <Brush className="h-5 w-5 inline mr-2" />
                Général
              </button>
              <button
                onClick={() => setActiveTab('theme')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'theme'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Palette className="h-5 w-5 inline mr-2" />
                Thème
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'content'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Type className="h-5 w-5 inline mr-2" />
                Contenu
              </button>
              <button
                onClick={() => setActiveTab('simulateur')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'simulateur'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Layout className="h-5 w-5 inline mr-2" />
                Simulateur
              </button>
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du site
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={editData.siteName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                    URL du logo
                  </label>
                  <input
                    type="text"
                    id="logo"
                    name="logo"
                    value={editData.logo || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Laissez vide pour utiliser le logo par défaut.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Navigation</h3>
                  <div className="space-y-3">
                    {editData.navigation.map((item, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleChange(e, 'navigation', index, 'label')}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Libellé"
                        />
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => handleChange(e, 'navigation', index, 'url')}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder="URL"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur primaire
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        id="primaryColor"
                        value={editData.theme.primaryColor}
                        onChange={(e) => handleChange(e, 'theme', null, 'primaryColor')}
                        className="h-10 w-10 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={editData.theme.primaryColor}
                        onChange={(e) => handleChange(e, 'theme', null, 'primaryColor')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur secondaire
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        id="secondaryColor"
                        value={editData.theme.secondaryColor}
                        onChange={(e) => handleChange(e, 'theme', null, 'secondaryColor')}
                        className="h-10 w-10 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={editData.theme.secondaryColor}
                        onChange={(e) => handleChange(e, 'theme', null, 'secondaryColor')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur de fond
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        id="backgroundColor"
                        value={editData.theme.backgroundColor}
                        onChange={(e) => handleChange(e, 'theme', null, 'backgroundColor')}
                        className="h-10 w-10 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={editData.theme.backgroundColor}
                        onChange={(e) => handleChange(e, 'theme', null, 'backgroundColor')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur de texte
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        id="textColor"
                        value={editData.theme.textColor}
                        onChange={(e) => handleChange(e, 'theme', null, 'textColor')}
                        className="h-10 w-10 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={editData.theme.textColor}
                        onChange={(e) => handleChange(e, 'theme', null, 'textColor')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-2">
                    Police de caractères
                  </label>
                  <select
                    id="fontFamily"
                    value={editData.theme.fontFamily}
                    onChange={(e) => handleChange(e, 'theme', null, 'fontFamily')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="Inter, sans-serif">Inter</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                    <option value="Poppins, sans-serif">Poppins</option>
                    <option value="Montserrat, sans-serif">Montserrat</option>
                    <option value="Open Sans, sans-serif">Open Sans</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="borderRadius" className="block text-sm font-medium text-gray-700 mb-2">
                      Rayon des bordures
                    </label>
                    <input
                      type="text"
                      id="borderRadius"
                      value={editData.theme.borderRadius}
                      onChange={(e) => handleChange(e, 'theme', null, 'borderRadius')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="boxShadow" className="block text-sm font-medium text-gray-700 mb-2">
                      Ombre des boîtes
                    </label>
                    <input
                      type="text"
                      id="boxShadow"
                      value={editData.theme.boxShadow}
                      onChange={(e) => handleChange(e, 'theme', null, 'boxShadow')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Services</h3>
                  <div className="space-y-4">
                    {editData.services.map((service, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Titre
                            </label>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => handleChange(e, 'services', index, 'title')}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={service.image}
                              onChange={(e) => handleChange(e, 'services', index, 'image')}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={service.description}
                            onChange={(e) => handleChange(e, 'services', index, 'description')}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Activités</h3>
                  <div className="space-y-4">
                    {editData.activities.map((activity, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Titre
                            </label>
                            <input
                              type="text"
                              value={activity.title}
                              onChange={(e) => handleChange(e, 'activities', index, 'title')}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={activity.image}
                              onChange={(e) => handleChange(e, 'activities', index, 'image')}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={activity.description}
                            onChange={(e) => handleChange(e, 'activities', index, 'description')}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Fonctionnalités</h3>
                  <div className="space-y-4">
                    {editData.features.map((feature, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Titre
                            </label>
                            <input
                              type="text"
                              value={feature.title}
                              onChange={(e) => handleChange(e, 'features', index, 'title')}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Icône
                            </label>
                            <select
                              value={feature.icon}
                              onChange={(e) => handleChange(e, 'features', index, 'icon')}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            >
                              <option value="Zap">Zap</option>
                              <option value="Shield">Shield</option>
                              <option value="Star">Star</option>
                              <option value="Heart">Heart</option>
                              <option value="Bell">Bell</option>
                              <option value="Link">Link</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={feature.description}
                            onChange={(e) => handleChange(e, 'features', index, 'description')}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editData.contact.email}
                        onChange={(e) => handleChange(e, 'contact', null, 'email')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={editData.contact.phone}
                        onChange={(e) => handleChange(e, 'contact', null, 'phone')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={editData.contact.address}
                      onChange={(e) => handleChange(e, 'contact', null, 'address')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Google Maps
                    </label>
                    <input
                      type="text"
                      value={editData.contact.mapUrl}
                      onChange={(e) => handleChange(e, 'contact', null, 'mapUrl')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'simulateur' && (
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="enableSimulateur"
                    checked={editData.simulateur.enabled}
                    onChange={handleToggleSimulateur}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enableSimulateur" className="ml-2 block text-sm text-gray-700">
                    Activer le simulateur sur la page d'accueil
                  </label>
                </div>
                
                {editData.simulateur.enabled && (
                  <>
                    <div>
                      <label htmlFor="selectedSimulateur" className="block text-sm font-medium text-gray-700 mb-2">
                        Choisir un simulateur
                      </label>
                      <select
                        id="selectedSimulateur"
                        value={editData.simulateur.selectedSimulateur}
                        onChange={handleSimulateurChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      >
                        {formules.map((formule) => (
                          <option key={formule.id} value={formule.id}>
                            {formule.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {selectedSimulateur && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu du simulateur</h3>
                        <SimulateurUniversel config={selectedSimulateur} />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPersonalization;