import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PenTool as Tool, 
  Calendar, 
  MapPin, 
  User, 
  Building, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  Save, 
  FileText, 
  Shield 
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const EquipmentFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    brand: '',
    model: '',
    serialNumber: '',
    installationDate: '',
    nextMaintenanceDate: '',
    status: 'operational',
    location: {
      address: '',
      coordinates: {
        lat: null,
        lng: null
      }
    },
    clientId: '',
    technicianId: '',
    warranty: {
      startDate: '',
      endDate: '',
      provider: '',
      details: ''
    },
    specifications: {},
    notes: ''
  });
  
  const [clients, setClients] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [addressSearchResults, setAddressSearchResults] = useState([]);
  const [showAddressResults, setShowAddressResults] = useState(false);
  const [specs, setSpecs] = useState([{ key: '', value: '' }]);

  useEffect(() => {
    fetchClients();
    fetchTechnicians();
    
    if (isEditMode) {
      fetchEquipment();
    }
    
    // Initialize Google Places Autocomplete
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [id]);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/clients');
      setClients(response.data);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Erreur lors du chargement des clients');
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('/users');
      // Filter only technicians
      const technicianUsers = response.data.filter(user => user.role === 'technicien');
      setTechnicians(technicianUsers);
    } catch (err) {
      console.error('Error fetching technicians:', err);
      setError('Erreur lors du chargement des techniciens');
    }
  };

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/equipments/${id}`);
      const equipment = response.data;
      
      // Format dates for input
      const installationDate = equipment.installationDate ? new Date(equipment.installationDate).toISOString().split('T')[0] : '';
      const nextMaintenanceDate = equipment.nextMaintenanceDate ? new Date(equipment.nextMaintenanceDate).toISOString().split('T')[0] : '';
      const warrantyStartDate = equipment.warranty?.startDate ? new Date(equipment.warranty.startDate).toISOString().split('T')[0] : '';
      const warrantyEndDate = equipment.warranty?.endDate ? new Date(equipment.warranty.endDate).toISOString().split('T')[0] : '';
      
      // Convert specifications object to array for form
      const specificationsArray = equipment.specifications ? 
        Object.entries(equipment.specifications).map(([key, value]) => ({ key, value })) : 
        [{ key: '', value: '' }];
      
      setFormData({
        name: equipment.name,
        type: equipment.type,
        brand: equipment.brand || '',
        model: equipment.model || '',
        serialNumber: equipment.serialNumber || '',
        installationDate,
        nextMaintenanceDate,
        status: equipment.status,
        location: {
          address: equipment.location?.address || '',
          coordinates: equipment.location?.coordinates || { lat: null, lng: null }
        },
        clientId: equipment.clientId?._id,
        technicianId: equipment.technicianId?._id || '',
        warranty: {
          startDate: warrantyStartDate,
          endDate: warrantyEndDate,
          provider: equipment.warranty?.provider || '',
          details: equipment.warranty?.details || ''
        },
        specifications: equipment.specifications || {},
        notes: equipment.notes || ''
      });
      
      setSpecs(specificationsArray);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching equipment:', err);
      setError('Erreur lors du chargement de l\'équipement');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        address
      }
    }));
    
    // Simulate address search results
    if (address.length > 3) {
      setAddressSearchResults([
        { address: `${address}, Paris, France`, lat: 48.856614, lng: 2.3522219 },
        { address: `${address}, Lyon, France`, lat: 45.764043, lng: 4.835659 },
        { address: `${address}, Marseille, France`, lat: 43.296482, lng: 5.36978 }
      ]);
      setShowAddressResults(true);
    } else {
      setAddressSearchResults([]);
      setShowAddressResults(false);
    }
  };

  const selectAddress = (address) => {
    setFormData(prev => ({
      ...prev,
      location: {
        address: address.address,
        coordinates: {
          lat: address.lat,
          lng: address.lng
        }
      }
    }));
    setShowAddressResults(false);
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addSpecField = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const removeSpecField = (index) => {
    const newSpecs = [...specs];
    newSpecs.splice(index, 1);
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Convert specs array to object
    const specificationsObject = specs.reduce((acc, spec) => {
      if (spec.key && spec.value) {
        acc[spec.key] = spec.value;
      }
      return acc;
    }, {});
    
    const dataToSubmit = {
      ...formData,
      specifications: specificationsObject
    };
    
    try {
      let response;
      
      if (isEditMode) {
        response = await axios.put(`/equipments/${id}`, dataToSubmit);
        setSuccess('Équipement mis à jour avec succès');
      } else {
        response = await axios.post('/equipments', dataToSubmit);
        setSuccess('Équipement créé avec succès');
      }
      
      setTimeout(() => {
        navigate(`/dashboard/equipments/${response.data._id}`);
      }, 2000);
    } catch (err) {
      console.error('Error saving equipment:', err);
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement de l\'équipement');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/dashboard/equipments')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-3"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Modifier l\'équipement' : 'Nouvel équipement'}
          </h1>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'équipement *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tool className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Ex: Pompe à chaleur air/eau"
                />
              </div>
            </div>
            
            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Type d'équipement *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Ex: Chauffage, Climatisation, etc."
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brand */}
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Marque
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Ex: Daikin, Mitsubishi, etc."
              />
            </div>
            
            {/* Model */}
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Modèle
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Ex: Altherma 3, etc."
              />
            </div>
            
            {/* Serial Number */}
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de série
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Ex: SN12345678"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client */}
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                Client *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="clientId"
                  name="clientId"
                  required
                  value={formData.clientId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map(client => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Technician */}
            <div>
              <label htmlFor="technicianId" className="block text-sm font-medium text-gray-700 mb-2">
                Technicien responsable
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="technicianId"
                  name="technicianId"
                  value={formData.technicianId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Sélectionner un technicien</option>
                  {technicians.map(tech => (
                    <option key={tech._id} value={tech._id}>
                      {tech.firstName} {tech.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Installation Date */}
            <div>
              <label htmlFor="installationDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date d'installation
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="installationDate"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>
            
            {/* Next Maintenance Date */}
            <div>
              <label htmlFor="nextMaintenanceDate" className="block text-sm font-medium text-gray-700 mb-2">
                Prochaine maintenance
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="nextMaintenanceDate"
                  name="nextMaintenanceDate"
                  value={formData.nextMaintenanceDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>
            
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="operational">Opérationnel</option>
                <option value="maintenance_required">Maintenance requise</option>
                <option value="under_maintenance">En maintenance</option>
                <option value="defective">Défectueux</option>
                <option value="retired">Retiré</option>
              </select>
            </div>
          </div>
          
          {/* Address */}
          <div>
            <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse d'installation
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="location.address"
                name="location.address"
                value={formData.location.address}
                onChange={handleAddressChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Adresse complète"
              />
              
              {/* Address search results */}
              {showAddressResults && addressSearchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {addressSearchResults.map((result, index) => (
                    <div 
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectAddress(result)}
                    >
                      {result.address}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Warranty */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informations de garantie</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="warranty.startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="warranty.startDate"
                    name="warranty.startDate"
                    value={formData.warranty.startDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="warranty.endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Date de fin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="warranty.endDate"
                    name="warranty.endDate"
                    value={formData.warranty.endDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="warranty.provider" className="block text-sm font-medium text-gray-700 mb-2">
                  Fournisseur
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="warranty.provider"
                    name="warranty.provider"
                    value={formData.warranty.provider}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Ex: Daikin France"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="warranty.details" className="block text-sm font-medium text-gray-700 mb-2">
                  Détails
                </label>
                <input
                  type="text"
                  id="warranty.details"
                  name="warranty.details"
                  value={formData.warranty.details}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Ex: Garantie pièces et main d'œuvre"
                />
              </div>
            </div>
          </div>
          
          {/* Specifications */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Spécifications techniques</h2>
              <button 
                type="button"
                onClick={addSpecField}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Ajouter
              </button>
            </div>
            
            {specs.map((spec, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Caractéristique (ex: Puissance)"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Valeur (ex: 8 kW)"
                  />
                  {specs.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeSpecField(index)}
                      className="px-2 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Notes supplémentaires sur l'équipement"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard/equipments')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>{isEditMode ? 'Mettre à jour' : 'Créer l\'équipement'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EquipmentFormPage;