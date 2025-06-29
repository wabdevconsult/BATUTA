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
  MessageSquare, 
  Phone, 
  Mail, 
  Wrench, 
  Shield, 
  Plus, 
  Download, 
  Paperclip 
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const EquipmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'preventive',
    description: '',
    cost: ''
  });

  useEffect(() => {
    fetchEquipment();
  }, [id]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/equipments/${id}`);
      setEquipment(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching equipment:', err);
      setError('Erreur lors du chargement de l\'équipement');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
      return;
    }
    
    try {
      await axios.delete(`/equipments/${id}`);
      setSuccess('Équipement supprimé avec succès');
      setTimeout(() => {
        navigate('/dashboard/equipments');
      }, 2000);
    } catch (err) {
      console.error('Error deleting equipment:', err);
      setError('Erreur lors de la suppression de l\'équipement');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleMaintenanceChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaintenanceSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`/equipments/${id}/maintenance`, maintenanceForm);
      setEquipment(response.data);
      setShowMaintenanceModal(false);
      setMaintenanceForm({
        date: new Date().toISOString().split('T')[0],
        type: 'preventive',
        description: '',
        cost: ''
      });
      setSuccess('Maintenance ajoutée avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error adding maintenance:', err);
      setError('Erreur lors de l\'ajout de la maintenance');
      setTimeout(() => setError(''), 3000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const getStatusBadgeClass = (status) => {
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

  const getMaintenanceTypeLabel = (type) => {
    switch (type) {
      case 'installation':
        return 'Installation';
      case 'preventive':
        return 'Préventive';
      case 'corrective':
        return 'Corrective';
      case 'inspection':
        return 'Inspection';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !equipment) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Équipement non trouvé</span>
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
              onClick={() => navigate('/dashboard/equipments')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{equipment.name}</h1>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(equipment.status)}`}>
              {getStatusLabel(equipment.status)}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {(user?.role === 'admin' || (user?.role === 'technicien' && equipment.technicianId?._id === user.id)) && (
              <>
                <Link 
                  to={`/dashboard/equipments/${id}/edit`}
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
            {/* Equipment Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de l'équipement</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Tool className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Type</div>
                    <div className="text-sm text-gray-900">{equipment.type}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Marque / Modèle</div>
                    <div className="text-sm text-gray-900">{equipment.brand} {equipment.model}</div>
                  </div>
                </div>
                
                {equipment.serialNumber && (
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Numéro de série</div>
                      <div className="text-sm text-gray-900">{equipment.serialNumber}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Date d'installation</div>
                    <div className="text-sm text-gray-900">{formatDate(equipment.installationDate)}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Adresse</div>
                    <div className="text-sm text-gray-900">{equipment.location?.address}</div>
                  </div>
                </div>
                
                {equipment.notes && (
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Notes</div>
                      <div className="text-sm text-gray-900 whitespace-pre-line">{equipment.notes}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Specifications */}
            {equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Spécifications techniques</h2>
                
                <div className="space-y-2">
                  {Object.entries(equipment.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-gray-700">{key}</span>
                      <span className="text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Warranty */}
            {equipment.warranty && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Garantie</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Période</div>
                      <div className="text-sm text-gray-900">
                        {formatDate(equipment.warranty.startDate)} - {formatDate(equipment.warranty.endDate)}
                      </div>
                    </div>
                  </div>
                  
                  {equipment.warranty.provider && (
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Fournisseur</div>
                        <div className="text-sm text-gray-900">{equipment.warranty.provider}</div>
                      </div>
                    </div>
                  )}
                  
                  {equipment.warranty.details && (
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Détails</div>
                        <div className="text-sm text-gray-900">{equipment.warranty.details}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Attachments */}
            {equipment.attachments && equipment.attachments.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
                
                <div className="space-y-3">
                  {equipment.attachments.map((attachment, index) => (
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
                    <div className="text-sm text-gray-900">{equipment.clientId?.name}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Email</div>
                    <div className="text-sm text-gray-900">
                      <a href={`mailto:${equipment.clientId?.email}`} className="text-blue-600 hover:text-blue-800">
                        {equipment.clientId?.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Téléphone</div>
                    <div className="text-sm text-gray-900">
                      <a href={`tel:${equipment.clientId?.phone}`} className="text-blue-600 hover:text-blue-800">
                        {equipment.clientId?.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Technician Information */}
            {equipment.technicianId && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Technicien responsable</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Technicien</div>
                      <div className="text-sm text-gray-900">
                        {equipment.technicianId?.firstName} {equipment.technicianId?.lastName}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Email</div>
                      <div className="text-sm text-gray-900">
                        <a href={`mailto:${equipment.technicianId?.email}`} className="text-blue-600 hover:text-blue-800">
                          {equipment.technicianId?.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Téléphone</div>
                      <div className="text-sm text-gray-900">
                        <a href={`tel:${equipment.technicianId?.phone}`} className="text-blue-600 hover:text-blue-800">
                          {equipment.technicianId?.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Maintenance History */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Historique de maintenance</h2>
                {(user?.role === 'admin' || (user?.role === 'technicien' && equipment.technicianId?._id === user.id)) && (
                  <button 
                    onClick={() => setShowMaintenanceModal(true)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ajouter</span>
                  </button>
                )}
              </div>
              
              {equipment.maintenanceHistory && equipment.maintenanceHistory.length > 0 ? (
                <div className="space-y-4">
                  {equipment.maintenanceHistory
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((record, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {getMaintenanceTypeLabel(record.type)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(record.date)}
                            </div>
                          </div>
                          {record.cost && (
                            <div className="text-sm font-medium text-gray-900">
                              {record.cost} €
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          {record.description}
                        </div>
                        {record.technicianId && (
                          <div className="mt-2 text-xs text-gray-500">
                            Technicien: {record.technicianId.firstName} {record.technicianId.lastName}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Aucun historique de maintenance
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          {(user?.role === 'admin' || (user?.role === 'technicien' && equipment.technicianId?._id === user.id)) && (
            <button 
              onClick={() => setShowMaintenanceModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Wrench className="h-5 w-5" />
              <span>Ajouter une maintenance</span>
            </button>
          )}
        </div>
      </div>

      {/* Maintenance Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter une maintenance</h2>
            
            <form onSubmit={handleMaintenanceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={maintenanceForm.date}
                  onChange={handleMaintenanceChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={maintenanceForm.type}
                  onChange={handleMaintenanceChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="installation">Installation</option>
                  <option value="preventive">Préventive</option>
                  <option value="corrective">Corrective</option>
                  <option value="inspection">Inspection</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={maintenanceForm.description}
                  onChange={handleMaintenanceChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Décrivez les travaux effectués..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coût (€)
                </label>
                <input
                  type="number"
                  name="cost"
                  value={maintenanceForm.cost}
                  onChange={handleMaintenanceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowMaintenanceModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentDetailPage;