import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Search, Filter, Eye, Edit, Trash2, CheckCircle, AlertCircle, Plus, Calendar, Home, PenTool as Tool } from 'lucide-react';
import { useInstallations } from '../../hooks/useInstallations';
import { useAuthStore } from '../../store/authStore';
import { Installation } from '../../types/installations';

const InstallationsPage = () => {
  const { installations, loading, error, fetchInstallations, removeInstallation } = useInstallations();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [success, setSuccess] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    fetchInstallations();
  }, [fetchInstallations]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette installation ?')) {
      return;
    }
    
    const result = await removeInstallation(id);
    if (result) {
      setSuccess(`Installation supprimée avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  // Filter installations based on search term and status
  const filteredInstallations = installations.filter((installation: Installation) => {
    const matchesSearch = 
      installation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      installation.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof installation.clientId === 'object' && installation.clientId.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof installation.equipmentId === 'object' && installation.equipmentId.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || installation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
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

  const getStatusLabel = (status: string) => {
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des installations</h1>
          {(user?.role === 'admin' || user?.role === 'technicien') && (
            <Link 
              to="/dashboard/installations/new" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Nouvelle installation</span>
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
              placeholder="Rechercher une installation..."
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
              <option value="scheduled">Planifiée</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminée</option>
              <option value="cancelled">Annulée</option>
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
                    Installation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Équipement
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
                {filteredInstallations.length > 0 ? (
                  filteredInstallations.map((installation: Installation) => (
                    <tr key={installation._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start flex-col">
                          <div className="text-sm font-medium text-gray-900">{installation.name}</div>
                          {installation.description && (
                            <div className="text-xs text-gray-500 mt-1">
                              {installation.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {typeof installation.clientId === 'object' ? installation.clientId.name : 'Client'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {installation.location?.address}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {typeof installation.equipmentId === 'object' ? installation.equipmentId.name : 'Équipement'}
                          </div>
                          {typeof installation.equipmentId === 'object' && (
                            <div className="text-xs text-gray-500 mt-1">
                              {installation.equipmentId.brand} {installation.equipmentId.model}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(installation.installationDate)}</div>
                        {installation.completionDate && (
                          <div className="text-xs text-gray-500">
                            Terminée: {formatDate(installation.completionDate)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(installation.status)}`}>
                          {getStatusLabel(installation.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/dashboard/installations/${installation._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Voir les détails"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          
                          {user?.role === 'admin' && (
                            <>
                              <Link 
                                to={`/dashboard/installations/${installation._id}/edit`}
                                className="text-blue-600 hover:text-blue-900"
                                title="Modifier"
                              >
                                <Edit className="h-5 w-5" />
                              </Link>
                              <button 
                                onClick={() => handleDelete(installation._id)}
                                className="text-red-600 hover:text-red-900"
                                title="Supprimer"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          
                          {user?.role === 'technicien' && installation.status !== 'completed' && installation.status !== 'cancelled' && (
                            <Link 
                              to={`/dashboard/installations/${installation._id}/edit`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Modifier"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Tool className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Aucune installation trouvée</p>
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

export default InstallationsPage;