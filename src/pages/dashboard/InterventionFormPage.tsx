import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  User, 
  Building, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Save,
  FileText,
  Flag
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const InterventionFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientId: '',
    technicianId: '',
    scheduledDate: '',
    status: 'scheduled',
    location: {
      address: '',
      coordinates: {
        lat: null,
        lng: null
      }
    },
    priority: 'medium',
    notes: ''
  });
  
  const [clients, setClients] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [addressSearchResults, setAddressSearchResults] = useState([]);
  const [showAddressResults, setShowAddressResults] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchTechnicians();
    
    if (isEditMode) {
      fetchIntervention();
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

  const fetchIntervention = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/interventions/${id}`);
      const intervention = response.data;
      
      // Format date for input
      const scheduledDate = new Date(intervention.scheduledDate);
      const formattedDate = scheduledDate.toISOString().slice(0, 16);
      
      setFormData({
        title: intervention.title,
        description: intervention.description || '',
        clientId: intervention.clientId?._id,
        technicianId: intervention.technicianId?._id,
        scheduledDate: formattedDate,
        status: intervention.status,
        location: {
          address: intervention.location?.address || '',
          coordinates: intervention.location?.coordinates || { lat: null, lng: null }
        },
        priority: intervention.priority,
        notes: intervention.notes || ''
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching intervention:', err);
      setError('Erreur lors du chargement de l\'intervention');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      let response;
      
      if (isEditMode) {
        response = await axios.put(`/interventions/${id}`, formData);
        setSuccess('Intervention mise à jour avec succès');
      } else {
        response = await axios.post('/interventions', formData);
        setSuccess('Intervention créée avec succès');
      }
      
      setTimeout(() => {
        navigate(`/dashboard/interventions/${response.data._id}`);
      }, 2000);
    } catch (err) {
      console.error('Error saving intervention:', err);
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement de l\'intervention');
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
            onClick={() => navigate('/dashboard/interventions')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-3"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
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
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'intervention *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Ex: Installation électrique"
                />
              </div>
            </div>
            
            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priorité
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Flag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
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
                Technicien *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="technicianId"
                  name="technicianId"
                  required
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scheduled Date */}
            <div>
              <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date planifiée *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  id="scheduledDate"
                  name="scheduledDate"
                  required
                  value={formData.scheduledDate}
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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="scheduled">Planifiée</option>
                  <option value="in_progress">En cours</option>
                  <option value="completed">Terminée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Address */}
          <div>
            <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="location.address"
                name="location.address"
                required
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
            <p className="mt-1 text-xs text-gray-500">
              Saisissez l'adresse complète pour permettre la géolocalisation
            </p>
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Description détaillée de l'intervention"
            ></textarea>
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes internes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Notes internes (non visibles par le client)"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard/interventions')}
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
                  <span>{isEditMode ? 'Mettre à jour' : 'Créer l\'intervention'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterventionFormPage;