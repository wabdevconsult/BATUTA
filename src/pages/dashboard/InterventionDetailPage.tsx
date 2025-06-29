import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  User, 
  Building, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  Paperclip,
  Download
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const InterventionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [intervention, setIntervention] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notes, setNotes] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);

  useEffect(() => {
    fetchIntervention();
  }, [id]);

  const fetchIntervention = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/interventions/${id}`);
      setIntervention(response.data);
      setNotes(response.data.notes || '');
      setLoading(false);
    } catch (err) {
      console.error('Error fetching intervention:', err);
      setError('Erreur lors du chargement de l\'intervention');
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.put(`/interventions/${id}`, { status: newStatus });
      setIntervention(response.data);
      setSuccess(`Statut mis à jour avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Erreur lors de la mise à jour du statut');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSaveNotes = async () => {
    try {
      const response = await axios.put(`/interventions/${id}`, { notes });
      setIntervention(response.data);
      setShowNotesModal(false);
      setSuccess('Notes enregistrées avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving notes:', err);
      setError('Erreur lors de l\'enregistrement des notes');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
      return;
    }
    
    try {
      await axios.delete(`/interventions/${id}`);
      setSuccess('Intervention supprimée avec succès');
      setTimeout(() => {
        navigate('/dashboard/interventions');
      }, 2000);
    } catch (err) {
      console.error('Error deleting intervention:', err);
      setError('Erreur lors de la suppression de l\'intervention');
      setTimeout(() => setError(''), 3000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !intervention) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!intervention) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Intervention non trouvée</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/dashboard/interventions')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{intervention.title}</h1>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(intervention.status)}`}>
              {getStatusLabel(intervention.status)}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityBadgeClass(intervention.priority)}`}>
              Priorité: {getPriorityLabel(intervention.priority)}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {user?.role === 'admin' && (
              <>
                <Link 
                  to={`/dashboard/interventions/${id}/edit`}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <Edit className="h-5 w-5 text-blue-600" />
                </Link>
                <button 
                  onClick={handleDelete}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-5 w-5 text-red-600" />
                </button>
              </>
            )}
            <Link 
              to={`/dashboard/interventions/${id}/map`}
              className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
            >
              <MapPin className="h-5 w-5 text-green-600" />
            </Link>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Intervention Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de l'intervention</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Date planifiée</div>
                    <div className="text-sm text-gray-900">{formatDate(intervention.scheduledDate)}</div>
                  </div>
                </div>
                
                {intervention.endDate && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Date de fin</div>
                      <div className="text-sm text-gray-900">{formatDate(intervention.endDate)}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Adresse</div>
                    <div className="text-sm text-gray-900">{intervention.location?.address}</div>
                    {intervention.location?.coordinates && (
                      <div className="text-xs text-gray-500 mt-1">
                        Lat: {intervention.location.coordinates.lat}, Lng: {intervention.location.coordinates.lng}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Description</div>
                    <div className="text-sm text-gray-900">{intervention.description || 'Aucune description'}</div>
                  </div>
                </div>
                
                {intervention.notes && (
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Notes</div>
                      <div className="text-sm text-gray-900 whitespace-pre-line">{intervention.notes}</div>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => setShowNotesModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {intervention.notes ? 'Modifier les notes' : 'Ajouter des notes'}
                </button>
              </div>
            </div>
            
            {/* Attachments */}
            {intervention.attachments && intervention.attachments.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Pièces jointes</h2>
                
                <div className="space-y-3">
                  {intervention.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <Paperclip className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-900">{attachment.name}</span>
                      </div>
                      <a 
                        href={attachment.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations client</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Client</div>
                    <div className="text-sm text-gray-900">{intervention.clientId?.name}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Email</div>
                    <div className="text-sm text-gray-900">
                      <a href={`mailto:${intervention.clientId?.email}`} className="text-blue-600 hover:text-blue-800">
                        {intervention.clientId?.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Téléphone</div>
                    <div className="text-sm text-gray-900">
                      <a href={`tel:${intervention.clientId?.phone}`} className="text-blue-600 hover:text-blue-800">
                        {intervention.clientId?.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Technician Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations technicien</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Technicien</div>
                    <div className="text-sm text-gray-900">
                      {intervention.technicianId?.firstName} {intervention.technicianId?.lastName}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Email</div>
                    <div className="text-sm text-gray-900">
                      <a href={`mailto:${intervention.technicianId?.email}`} className="text-blue-600 hover:text-blue-800">
                        {intervention.technicianId?.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Téléphone</div>
                    <div className="text-sm text-gray-900">
                      <a href={`tel:${intervention.technicianId?.phone}`} className="text-blue-600 hover:text-blue-800">
                        {intervention.technicianId?.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                {intervention.technicianLocation && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Dernière position</div>
                      <div className="text-sm text-gray-900">
                        Lat: {intervention.technicianLocation.lat}, Lng: {intervention.technicianLocation.lng}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Mise à jour: {formatDate(intervention.technicianLocation.lastUpdated)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          {user?.role === 'technicien' && intervention.technicianId?._id === user.id && (
            <>
              {intervention.status === 'scheduled' && (
                <button 
                  onClick={() => handleStatusChange('in_progress')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                >
                  <ArrowRight className="h-5 w-5" />
                  <span>Démarrer l'intervention</span>
                </button>
              )}
              
              {intervention.status === 'in_progress' && (
                <button 
                  onClick={() => handleStatusChange('completed')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Terminer l'intervention</span>
                </button>
              )}
            </>
          )}
          
          {user?.role === 'admin' && intervention.status !== 'cancelled' && (
            <button 
              onClick={() => handleStatusChange('cancelled')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Annuler l'intervention
            </button>
          )}
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Notes d'intervention</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ajoutez vos notes concernant cette intervention..."
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNotesModal(false)}
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

export default InterventionDetailPage;