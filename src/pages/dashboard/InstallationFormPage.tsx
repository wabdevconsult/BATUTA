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
  FileText 
} from 'lucide-react';
import { getInstallationById, createInstallation, updateInstallation } from '../../api/installations';
import { getEquipments } from '../../api/equipments';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { Installation, NewInstallation } from '../../types/installations';
import { Client } from '../../types/clients';

const InstallationFormPage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<NewInstallation>({
    name: '',
    description: '',
    equipmentId: '',
    clientId: '',
    technicianId: '',
    installationDate: '',
    status: 'scheduled',
    location: {
      address: ''
    },
    notes: ''
  });
  
  const [clients, setClients] = useState<Client[]>([]);
  const [equipments, setEquipments] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [addressSearchResults, setAddressSearchResults] = useState<any[]>([]);
  const [showAddressResults, setShowAddressResults] = useState<boolean>(false);

  useEffect(() => {
    fetchClients();
    fetchEquipments();
    fetchTechnicians();
    
    if (isEditMode && id) {
      fetchInstallation(id);
    }
  }, [id, isEditMode]);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/clients');
      setClients(response.data);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Erreur lors du chargement des clients');
    }
  };

  const fetchEquipments = async () => {
    try {
      const data = await getEquipments();
      setEquipments(data);
    } catch (err) {
      console.error('Error fetching equipments:', err);
      setError('Erreur lors du chargement des équipements');
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('/users');
      // Filter only technicians
      const technicianUsers = response.data.filter((user: any) => user.role === 'technicien');
      setTechnicians(technicianUsers);
    } catch (err) {
      console.error('Error fetching technicians:', err);
      setError('Erreur lors du chargement des techniciens');
    }
  };

  const fetchInstallation = async (installationId: string) => {
    try {
      setLoading(true);
      const data = await getInstallationById(installationId);
      
      // Format dates for input
      const installationDate = data.installationDate ? new Date(data.installationDate).toISOString().split('T')[0] : '';
      const completionDate = data.completionDate ? new Date(data.completionDate).toISOString().split('T')[0] : '';
      
      setFormData({
        name: data.name,
        description: data.description || '',
        equipmentId: typeof data.equipmentId === 'object' ? data.equipmentId._id : data.equipmentId,
        clientId: typeof data.clientId === 'object' ? data.clientId._id : data.clientId,
        technicianId: typeof data.technicianId === 'object' ? data.technicianId._id : data.technicianId || '',
        installationDate,
        completionDate,
        status: data.status,
        location: {
          address: data.location?.address || '',
          coordinates: data.location?.coordinates
        },
        notes: data.notes || ''
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching installation:', err);
      setError('Erreur lors du chargement de l\'installation');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof NewInstallation] as any,
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

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const selectAddress = (address: any) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      let response;
      
      if (isEditMode && id) {
        response = await updateInstallation(id, formData);
        setSuccess('Installation mise à jour avec succès');
      } else {
        response = await createInstallation(formData);
        setSuccess('Installation créée avec succès');
      }
      
      setTimeout(() => {
        navigate(`/dashboard/installations/${response._id}`);
      }, 2000);
    } catch (err: any) {
      console.error('Error saving installation:', err);
      setError(err.message || 'Erreur lors de l\'enregistrement de l\'installation');
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
            onClick={() => navigate('/dashboard/installations')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-3"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Modifier l\'installation' : 'Nouvelle installation'}
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
                Nom de l'installation *
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
                  placeholder="Ex: Installation pompe à chaleur"
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
                <option value="scheduled">Planifiée</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Equipment */}
            <div>
              <label htmlFor="equipmentId" className="block text-sm font-medium text-gray-700 mb-2">
                Équipement *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tool className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="equipmentId"
                  name="equipmentId"
                  required
                  value={formData.equipmentId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Sélectionner un équipement</option>
                  {equipments.map(equipment => (
                    <option key={equipment._id} value={equipment._id}>
                      {equipment.name} - {equipment.brand} {equipment.model}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Installation Date */}
            <div>
              <label htmlFor="installationDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date d'installation *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="installationDate"
                  name="installationDate"
                  required
                  value={formData.installationDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>
            
            {/* Completion Date */}
            <div>
              <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="completionDate"
                  name="completionDate"
                  value={formData.completionDate || ''}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>
          </div>
          
          {/* Technician */}
          <div>
            <label htmlFor="technicianId" className="block text-sm font-medium text-gray-700 mb-2">
              Technicien
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="technicianId"
                name="technicianId"
                value={formData.technicianId || ''}
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
          
          {/* Address */}
          <div>
            <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse d'installation *
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
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Description détaillée de l'installation"
            ></textarea>
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
              placeholder="Notes supplémentaires sur l'installation"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard/installations')}
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
                  <span>{isEditMode ? 'Mettre à jour' : 'Créer l\'installation'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstallationFormPage;