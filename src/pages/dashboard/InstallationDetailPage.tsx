import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  PenTool as Tool, 
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
  MessageCircle, 
  Phone, 
  Mail, 
  Wrench, 
  Shield, 
  Plus, 
  Download, 
  Paperclip, 
  Eye
} from 'lucide-react';
import { getInstallationById, updateInstallation, deleteInstallation } from '../../api/installations';
import { useAuthStore } from '../../store/authStore';
import { Installation } from '../../types/installations';

const InstallationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [installation, setInstallation] = useState<Installation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchInstallation(id);
    }
  }, [id]);

  const fetchInstallation = async (installationId: string) => {
    try {
      setLoading(true);
      const data = await getInstallationById(installationId);
      setInstallation(data);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching installation:', err);
      setError('Erreur lors du chargement de l\'installation');
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: 'scheduled' | 'in_progress' | 'completed' | 'cancelled') => {
    if (!installation || !id) return;
    
    try {
      const updatedInstallation = await updateInstallation(id, { status: newStatus });
      setInstallation(updatedInstallation);
      setSuccess(`Statut mis à jour avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error updating status:', err);
      setError('Erreur lors de la mise à jour du statut');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette installation ?')) {
      return;
    }
    
    try {
      await deleteInstallation(id);
      setSuccess('Installation supprimée avec succès');
      setTimeout(() => {
        navigate('/dashboard/installations');
      }, 2000);
    } catch (err: any) {
      console.error('Error deleting installation:', err);
      setError('Erreur lors de la suppression de l\'installation');
      setTimeout(() => setError(''), 3000);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !installation) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!installation) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Installation non trouvée</span>
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
              onClick={() => navigate('/dashboard/installations')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{installation.name}</h1>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(installation.status)}`}>
              {getStatusLabel(installation.status)}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {(user?.role === 'admin' || (user?.role === 'technicien' && installation.status !== 'completed' && installation.status !== 'cancelled')) && (
              <>
                <Link 
                  to={`/dashboard/installations/${id}/edit`}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <Edit className="h-5 w-5 text-blue-600" />
                </Link>
                {user?.role === 'admin' && (
                  <button 
                    onClick={handleDelete}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </button>
                )}
              </>
            )}
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
            {/* Installation Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de l'installation</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Tool className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Description</div>
                    <div className="text-sm text-gray-900">{installation.description || 'Aucune description'}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Date d'installation</div>
                    <div className="text-sm text-gray-900">{formatDate(installation.installationDate)}</div>
                  </div>
                </div>
                
                {installation.completionDate && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Date de fin</div>
                      <div className="text-sm text-gray-900">{formatDate(installation.completionDate)}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Adresse</div>
                    <div className="text-sm text-gray-900">{installation.location?.address}</div>
                  </div>
                </div>
                
                {installation.notes && (
                  <div className="flex items-start">
                    <MessageCircle className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Notes</div>
                      <div className="text-sm text-gray-900 whitespace-pre-line">{installation.notes}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Attachments */}
            {installation.attachments && installation.attachments.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
                
                <div className="space-y-3">
                  {installation.attachments.map((attachment, index) => (
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
            {/* Equipment Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Équipement</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Tool className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Équipement</div>
                    <div className="text-sm text-gray-900">
                      {typeof installation.equipmentId === 'object' ? installation.equipmentId.name : 'Équipement'}
                    </div>
                  </div>
                </div>
                
                {typeof installation.equipmentId === 'object' && (
                  <>
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Type</div>
                        <div className="text-sm text-gray-900">{installation.equipmentId.type}</div>
                      </div>
                    </div>
                    
                    {installation.equipmentId.brand && installation.equipmentId.model && (
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-700">Marque / Modèle</div>
                          <div className="text-sm text-gray-900">{installation.equipmentId.brand} {installation.equipmentId.model}</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                <div className="mt-2">
                  <Link 
                    to={`/dashboard/equipments/${typeof installation.equipmentId === 'object' ? installation.equipmentId._id : installation.equipmentId}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Voir les détails de l'équipement
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Client Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Client</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Client</div>
                    <div className="text-sm text-gray-900">
                      {typeof installation.clientId === 'object' ? installation.clientId.name : 'Client'}
                    </div>
                  </div>
                </div>
                
                {typeof installation.clientId === 'object' && installation.clientId.email && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Email</div>
                      <div className="text-sm text-gray-900">
                        <a href={`mailto:${installation.clientId.email}`} className="text-blue-600 hover:text-blue-800">
                          {installation.clientId.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {typeof installation.clientId === 'object' && installation.clientId.phone && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Téléphone</div>
                      <div className="text-sm text-gray-900">
                        <a href={`tel:${installation.clientId.phone}`} className="text-blue-600 hover:text-blue-800">
                          {installation.clientId.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Technician Information */}
            {installation.technicianId && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Technicien</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Technicien</div>
                      <div className="text-sm text-gray-900">
                        {typeof installation.technicianId === 'object' ? 
                          `${installation.technicianId.firstName} ${installation.technicianId.lastName}` : 
                          'Technicien'}
                      </div>
                    </div>
                  </div>
                  
                  {typeof installation.technicianId === 'object' && installation.technicianId.email && (
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Email</div>
                        <div className="text-sm text-gray-900">
                          <a href={`mailto:${installation.technicianId.email}`} className="text-blue-600 hover:text-blue-800">
                            {installation.technicianId.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {typeof installation.technicianId === 'object' && installation.technicianId.phone && (
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Téléphone</div>
                        <div className="text-sm text-gray-900">
                          <a href={`tel:${installation.technicianId.phone}`} className="text-blue-600 hover:text-blue-800">
                            {installation.technicianId.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          {user?.role === 'technicien' && installation.status === 'scheduled' && (
            <button 
              onClick={() => handleStatusChange('in_progress')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
            >
              Démarrer l'installation
            </button>
          )}
          
          {user?.role === 'technicien' && installation.status === 'in_progress' && (
            <button 
              onClick={() => handleStatusChange('completed')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Terminer l'installation
            </button>
          )}
          
          {user?.role === 'admin' && installation.status !== 'cancelled' && (
            <button 
              onClick={() => handleStatusChange('cancelled')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Annuler l'installation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallationDetailPage;