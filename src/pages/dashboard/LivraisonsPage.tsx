import React, { useState } from 'react';
import { Truck, Search, Filter, Eye, CheckCircle, AlertCircle, MapPin, Calendar } from 'lucide-react';

const LivraisonsPage = () => {
  const [livraisons, setLivraisons] = useState([
    { 
      id: 'LIV-2025-001', 
      commande: 'CMD-2025-003',
      client: 'BATUTA Admin', 
      date: '10/05/2025', 
      adresse: '123 Rue de Paris, 75001 Paris',
      statut: 'en_cours' 
    },
    { 
      id: 'LIV-2025-002', 
      commande: 'CMD-2025-004',
      client: 'BATUTA Admin', 
      date: '07/05/2025', 
      adresse: '45 Avenue Victor Hugo, 75016 Paris',
      statut: 'livree' 
    },
    { 
      id: 'LIV-2025-003', 
      commande: 'CMD-2025-005',
      client: 'BATUTA Admin', 
      date: '03/05/2025', 
      adresse: '8 Boulevard Haussmann, 75009 Paris',
      statut: 'livree' 
    },
    { 
      id: 'LIV-2025-004', 
      commande: 'CMD-2025-006',
      client: 'BATUTA Admin', 
      date: '20/05/2025', 
      adresse: '22 Rue de la Paix, 75002 Paris',
      statut: 'planifiee' 
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const filteredLivraisons = livraisons.filter(livraison => {
    const matchesSearch = 
      livraison.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      livraison.commande.toLowerCase().includes(searchTerm.toLowerCase()) ||
      livraison.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      livraison.adresse.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || livraison.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'planifiee':
        return 'bg-blue-100 text-blue-800';
      case 'en_cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'livree':
        return 'bg-green-100 text-green-800';
      case 'annulee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planifiee':
        return 'Planifiée';
      case 'en_cours':
        return 'En cours';
      case 'livree':
        return 'Livrée';
      case 'annulee':
        return 'Annulée';
      default:
        return status;
    }
  };

  const updateStatus = (id, newStatus) => {
    setLivraisons(livraisons.map(livraison => 
      livraison.id === id ? { ...livraison, statut: newStatus } : livraison
    ));
    setSuccess(`Livraison ${id} mise à jour avec succès`);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des livraisons</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Planifier une livraison</span>
          </button>
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
              placeholder="Rechercher une livraison..."
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
              <option value="tous">Tous les statuts</option>
              <option value="planifiee">Planifiée</option>
              <option value="en_cours">En cours</option>
              <option value="livree">Livrée</option>
              <option value="annulee">Annulée</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adresse
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
              {filteredLivraisons.map((livraison) => (
                <tr key={livraison.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {livraison.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {livraison.commande}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {livraison.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {livraison.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {livraison.adresse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(livraison.statut)}`}>
                      {getStatusLabel(livraison.statut)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <MapPin className="h-5 w-5" />
                      </button>
                      {livraison.statut === 'planifiee' && (
                        <button 
                          className="text-yellow-600 hover:text-yellow-900"
                          onClick={() => updateStatus(livraison.id, 'en_cours')}
                          title="Marquer comme en cours"
                        >
                          <Truck className="h-5 w-5" />
                        </button>
                      )}
                      {livraison.statut === 'en_cours' && (
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={() => updateStatus(livraison.id, 'livree')}
                          title="Marquer comme livrée"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLivraisons.length === 0 && (
          <div className="text-center py-4">
            <Truck className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Aucune livraison trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivraisonsPage;