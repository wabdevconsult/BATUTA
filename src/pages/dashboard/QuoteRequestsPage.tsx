import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Mail,
  Phone,
  User,
  MessageSquare
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const QuoteRequestsPage = () => {
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notes, setNotes] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    fetchQuoteRequests();
  }, []);

  const fetchQuoteRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/quote-requests');
      setQuoteRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching quote requests:', err);
      setError('Erreur lors du chargement des demandes de devis');
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/quote-requests/${id}`, { status: newStatus });
      setQuoteRequests(quoteRequests.map(request => 
        request._id === id ? { ...request, status: newStatus } : request
      ));
      setSuccess(`Statut mis à jour avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Erreur lors de la mise à jour du statut');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleAssign = async (id) => {
    try {
      const response = await axios.put(`/quote-requests/${id}`, { 
        assignedTo: user.id,
        status: 'assigned'
      });
      
      setQuoteRequests(quoteRequests.map(request => 
        request._id === id ? response.data : request
      ));
      
      setSuccess(`Demande assignée avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error assigning request:', err);
      setError('Erreur lors de l\'assignation de la demande');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette demande de devis ?')) {
      return;
    }
    
    try {
      await axios.delete(`/quote-requests/${id}`);
      setQuoteRequests(quoteRequests.filter(request => request._id !== id));
      setSuccess(`Demande supprimée avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting request:', err);
      setError('Erreur lors de la suppression de la demande');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedRequest) return;
    
    try {
      const response = await axios.put(`/quote-requests/${selectedRequest._id}`, { notes });
      setQuoteRequests(quoteRequests.map(request => 
        request._id === selectedRequest._id ? { ...request, notes } : request
      ));
      setSelectedRequest(null);
      setNotes('');
      setSuccess('Notes enregistrées avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving notes:', err);
      setError('Erreur lors de l\'enregistrement des notes');
      setTimeout(() => setError(''), 3000);
    }
  };

  const openNotesModal = (request) => {
    setSelectedRequest(request);
    setNotes(request.notes || '');
  };

  const filteredRequests = quoteRequests.filter(request => {
    const matchesSearch = 
      request.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.entreprise?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.metier?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'assigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new':
        return 'Nouvelle';
      case 'assigned':
        return 'Assignée';
      case 'contacted':
        return 'Contactée';
      case 'completed':
        return 'Complétée';
      case 'rejected':
        return 'Rejetée';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Demandes de devis</h1>
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
              placeholder="Rechercher une demande..."
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
              <option value="new">Nouvelles</option>
              <option value="assigned">Assignées</option>
              <option value="contacted">Contactées</option>
              <option value="completed">Complétées</option>
              <option value="rejected">Rejetées</option>
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
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Métier
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Région/Dép.
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
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{request.nom}</div>
                            <div className="text-sm text-gray-500">{request.email}</div>
                            <div className="text-sm text-gray-500">{request.telephone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.metier || 'Non spécifié'}</div>
                        <div className="text-sm text-gray-500">{request.entreprise || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{request.region || '-'}</div>
                        <div>{request.departement || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                          {getStatusLabel(request.status)}
                        </span>
                        {request.assignedTo && (
                          <div className="text-xs text-gray-500 mt-1">
                            Assigné à: {request.assignedTo.firstName} {request.assignedTo.lastName}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => openNotesModal(request)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Ajouter des notes"
                          >
                            <MessageSquare className="h-5 w-5" />
                          </button>
                          
                          <a 
                            href={`mailto:${request.email}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Envoyer un email"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                          
                          {request.telephone && (
                            <a 
                              href={`tel:${request.telephone}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Appeler"
                            >
                              <Phone className="h-5 w-5" />
                            </a>
                          )}
                          
                          {request.status === 'new' && (
                            <button 
                              onClick={() => handleAssign(request._id)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="M'assigner cette demande"
                            >
                              <User className="h-5 w-5" />
                            </button>
                          )}
                          
                          {(request.status === 'new' || request.status === 'assigned') && (
                            <button 
                              onClick={() => handleStatusChange(request._id, 'contacted')}
                              className="text-purple-600 hover:text-purple-900"
                              title="Marquer comme contacté"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          )}
                          
                          {request.status === 'contacted' && (
                            <button 
                              onClick={() => handleStatusChange(request._id, 'completed')}
                              className="text-green-600 hover:text-green-900"
                              title="Marquer comme complété"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          )}
                          
                          {user?.role === 'admin' && (
                            <button 
                              onClick={() => handleDelete(request._id)}
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
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Aucune demande de devis trouvée</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Notes Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Notes - {selectedRequest.nom}</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes internes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ajoutez vos notes concernant cette demande..."
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteRequestsPage;