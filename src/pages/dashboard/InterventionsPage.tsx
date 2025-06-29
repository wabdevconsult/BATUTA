import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  Clock,
  User,
  Building,
  Plus,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const InterventionsPage = () => {
  const [interventions, setInterventions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/interventions');
      // Ensure the response data is an array
      setInterventions(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching interventions:', err);
      setError('Erreur lors du chargement des interventions');
      setInterventions([]); // Set to empty array on error
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`/interventions/${id}`, { status: newStatus });
      setInterventions(interventions.map(intervention => 
        intervention._id === id ? response.data : intervention
      ));
      setSuccess(`Statut mis à jour avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Erreur lors de la mise à jour du statut');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
      return;
    }
    
    try {
      await axios.delete(`/interventions/${id}`);
      setInterventions(interventions.filter(intervention => intervention._id !== id));
      setSuccess(`Intervention supprimée avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting intervention:', err);
      setError('Erreur lors de la suppression de l\'intervention');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Ensure interventions is always an array before filtering
  const filteredInterventions = (Array.isArray(interventions) ? interventions : []).filter(intervention => {
    const matchesSearch = 
      intervention.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.clientId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.location?.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || intervention.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Planifiée';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'low':
        return 'Basse';
      case 'medium':
        return 'Moyenne';
      case 'high':
        return 'Haute';
      case 'urgent':
        return 'Urgente';
      default:
        return priority;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des interventions</h1>
          <Link 
            to="/dashboard/interventions/new" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Nouvelle intervention</span>
          </Link>
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
              placeholder="Rechercher une intervention..."
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
              <option value="scheduled">Planifiées</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminées</option>
              <option value="cancelled">Annulées</option>
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
                    Intervention
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technicien
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                {filteredInterventions.length > 0 ? (
                  filteredInterventions.map((intervention) => (
                    <tr key={intervention._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start flex-col">
                          <div className="text-sm font-medium text-gray-900">{intervention.title}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(intervention.priority)}`}>
                              {getPriorityLabel(intervention.priority)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start flex-col">
                          <div className="text-sm font-medium text-gray-900">{intervention.clientId?.name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {intervention.location?.address}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {intervention.technicianId?.firstName} {intervention.technicianId?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{intervention.technicianId?.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(intervention.scheduledDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(intervention.status)}`}>
                          {getStatusLabel(intervention.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/dashboard/interventions/${intervention._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Voir les détails"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          
                          <Link 
                            to={`/dashboard/interventions/${intervention._id}/map`}
                            className="text-green-600 hover:text-green-900"
                            title="Voir sur la carte"
                          >
                            <MapPin className="h-5 w-5" />
                          </Link>
                          
                          {user?.role === 'admin' && (
                            <Link 
                              to={`/dashboard/interventions/${intervention._id}/edit`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Modifier"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                          )}
                          
                          {user?.role === 'technicien' && intervention.technicianId?._id === user.id && intervention.status === 'scheduled' && (
                            <button 
                              onClick={() => handleStatusChange(intervention._id, 'in_progress')}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Démarrer l'intervention"
                            >
                              <ArrowRight className="h-5 w-5" />
                            </button>
                          )}
                          
                          {user?.role === 'technicien' && intervention.technicianId?._id === user.id && intervention.status === 'in_progress' && (
                            <button 
                              onClick={() => handleStatusChange(intervention._id, 'completed')}
                              className="text-green-600 hover:text-green-900"
                              title="Terminer l'intervention"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          )}
                          
                          {user?.role === 'admin' && (
                            <button 
                              onClick={() => handleDelete(intervention._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Supprimer"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Aucune intervention trouvée</p>
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

export default InterventionsPage;