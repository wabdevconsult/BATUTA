import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PenTool as Tool, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Wrench, 
  Calendar, 
  Settings 
} from 'lucide-react';
import axios from 'axios';
interface Equipment {
  _id?: string;
  name?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  clientId?: { name?: string };
  location?: { address?: string };
  installationDate?: string;
  technicianId?: { firstName?: string; lastName?: string; _id?: string };
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  status?: string;
  type?: string;
}
import { useAuthStore } from '../../store/authStore';

const EquipmentsPage = () => {
   const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/equipments');
      // Ensure the response data is an array
      setEquipments(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching equipments:', err);
      setError('Erreur lors du chargement des équipements');
      setEquipments([]); // Set to empty array on error
      setLoading(false);
    }
  };

 const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
      return;
    }
    
    try {
      await axios.delete(`/equipments/${id}`);
      setEquipments(equipments.filter(equipment => equipment._id !== id));
      setSuccess(`Équipement supprimé avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting equipment:', err);
      setError('Erreur lors de la suppression de l\'équipement');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Get unique equipment types for filter
  const equipmentTypes = [...new Set(equipments.map(equipment => equipment.type))];

  // Ensure equipments is always an array before filtering
  const filteredEquipments = (Array.isArray(equipments) ? equipments : []).filter(equipment => {
    const matchesSearch = 
      equipment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.clientId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || equipment.status === statusFilter;
    const matchesType = typeFilter === 'all' || equipment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

   const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'maintenance_required':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'defective':
        return 'bg-red-100 text-red-800';
      case 'retired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'operational':
        return 'Opérationnel';
      case 'maintenance_required':
        return 'Maintenance requise';
      case 'under_maintenance':
        return 'En maintenance';
      case 'defective':
        return 'Défectueux';
      case 'retired':
        return 'Retiré';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des équipements</h1>
          {(user?.role === 'admin' || user?.role === 'technicien') && (
            <Link 
              to="/dashboard/equipments/new" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Nouvel équipement</span>
            </Link>
          )}
        </div>

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un équipement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="all">Tous les statuts</option>
              <option value="operational">Opérationnel</option>
              <option value="maintenance_required">Maintenance requise</option>
              <option value="under_maintenance">En maintenance</option>
              <option value="defective">Défectueux</option>
              <option value="retired">Retiré</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="all">Tous les types</option>
              {equipmentTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Équipement
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Installation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Maintenance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipments.length > 0 ? (
                  filteredEquipments.map((equipment) => (
                    <tr key={equipment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start flex-col">
                          <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {equipment.brand} {equipment.model}
                          </div>
                          {equipment.serialNumber && (
                            <div className="text-xs text-gray-500">
                              S/N: {equipment.serialNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start flex-col">
                          <div className="text-sm font-medium text-gray-900">{equipment.clientId?.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{equipment.location?.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(equipment.installationDate)}</div>
                        <div className="text-xs text-gray-500">
                          {equipment.technicianId ? `Par: ${equipment.technicianId.firstName} ${equipment.technicianId.lastName}` : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {equipment.lastMaintenanceDate ? (
                            <>Dernière: {formatDate(equipment.lastMaintenanceDate)}</>
                          ) : (
                            <>Aucune maintenance</>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {equipment.nextMaintenanceDate ? `Prochaine: ${formatDate(equipment.nextMaintenanceDate)}` : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(equipment.status)}`}>
                          {getStatusLabel(equipment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/dashboard/equipments/${equipment._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Voir les détails"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          
                          {user?.role === 'technicien' && equipment.technicianId?._id === user.id && (
                            <Link 
                              to={`/dashboard/equipments/${equipment._id}/edit`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Modifier"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                          )}
                          
                          {user?.role === 'admin' && (
                            <>
                              <Link 
                                to={`/dashboard/equipments/${equipment._id}/edit`}
                                className="text-blue-600 hover:text-blue-900"
                                title="Modifier"
                              >
                                <Edit className="h-5 w-5" />
                              </Link>
                              <button 
                                onClick={() => handleDelete(equipment._id)}
                                className="text-red-600 hover:text-red-900"
                                title="Supprimer"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Tool className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Aucun équipement trouvé</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentsPage;