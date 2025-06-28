import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Eye, Edit, Truck, CheckCircle, AlertCircle } from 'lucide-react';

const CommandesPage = () => {
  const [commandes, setCommandes] = useState([
    { 
      id: 'CMD-2025-001', 
      client: 'BATUTA Admin', 
      date: '15/05/2025', 
      montant: '2 450,00 €', 
      statut: 'en_attente' 
    },
    { 
      id: 'CMD-2025-002', 
      client: 'BATUTA Admin', 
      date: '12/05/2025', 
      montant: '1 850,00 €', 
      statut: 'en_preparation' 
    },
    { 
      id: 'CMD-2025-003', 
      client: 'BATUTA Admin', 
      date: '08/05/2025', 
      montant: '3 200,00 €', 
      statut: 'expedie' 
    },
    { 
      id: 'CMD-2025-004', 
      client: 'BATUTA Admin', 
      date: '05/05/2025', 
      montant: '750,00 €', 
      statut: 'livre' 
    },
    { 
      id: 'CMD-2025-005', 
      client: 'BATUTA Admin', 
      date: '01/05/2025', 
      montant: '1 800,00 €', 
      statut: 'livre' 
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const filteredCommandes = commandes.filter(commande => {
    const matchesSearch = 
      commande.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || commande.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_preparation':
        return 'bg-blue-100 text-blue-800';
      case 'expedie':
        return 'bg-purple-100 text-purple-800';
      case 'livre':
        return 'bg-green-100 text-green-800';
      case 'annule':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'en_attente':
        return 'En attente';
      case 'en_preparation':
        return 'En préparation';
      case 'expedie':
        return 'Expédiée';
      case 'livre':
        return 'Livrée';
      case 'annule':
        return 'Annulée';
      default:
        return status;
    }
  };

  const updateStatus = (id, newStatus) => {
    setCommandes(commandes.map(commande => 
      commande.id === id ? { ...commande, statut: newStatus } : commande
    ));
    setSuccess(`Commande ${id} mise à jour avec succès`);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des commandes</h1>
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
              placeholder="Rechercher une commande..."
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
              <option value="en_attente">En attente</option>
              <option value="en_preparation">En préparation</option>
              <option value="expedie">Expédiée</option>
              <option value="livre">Livrée</option>
              <option value="annule">Annulée</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numéro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
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
              {filteredCommandes.map((commande) => (
                <tr key={commande.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {commande.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {commande.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {commande.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {commande.montant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(commande.statut)}`}>
                      {getStatusLabel(commande.statut)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      {commande.statut === 'en_preparation' && (
                        <button 
                          className="text-purple-600 hover:text-purple-900"
                          onClick={() => updateStatus(commande.id, 'expedie')}
                          title="Marquer comme expédiée"
                        >
                          <Truck className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCommandes.length === 0 && (
          <div className="text-center py-4">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Aucune commande trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandesPage;