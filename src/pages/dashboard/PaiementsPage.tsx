import React, { useState } from 'react';
import { CreditCard, Search, Filter, Eye, Download, CheckCircle, AlertCircle } from 'lucide-react';

const PaiementsPage = () => {
  const [paiements, setPaiements] = useState([
    { 
      id: 'PAY-2025-001', 
      facture: 'FAC-2025-001',
      client: 'Dupont SAS', 
      date: '15/05/2025', 
      montant: '1 250,00 €', 
      methode: 'carte_bancaire',
      statut: 'complete' 
    },
    { 
      id: 'PAY-2025-002', 
      facture: 'FAC-2025-003',
      client: 'Leroy Entreprise', 
      date: '08/05/2025', 
      montant: '3 200,00 €', 
      methode: 'virement',
      statut: 'complete' 
    },
    { 
      id: 'PAY-2025-003', 
      facture: 'FAC-2025-005',
      client: 'Petit & Fils', 
      date: '01/05/2025', 
      montant: '1 800,00 €', 
      methode: 'cheque',
      statut: 'complete' 
    },
    { 
      id: 'PAY-2025-004', 
      facture: 'FAC-2025-002',
      client: 'Martin & Co', 
      date: '12/05/2025', 
      montant: '850,00 €', 
      methode: 'carte_bancaire',
      statut: 'en_cours' 
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const filteredPaiements = paiements.filter(paiement => {
    const matchesSearch = 
      paiement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paiement.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paiement.facture.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || paiement.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'en_cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'echoue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'complete':
        return 'Complété';
      case 'en_cours':
        return 'En cours';
      case 'echoue':
        return 'Échoué';
      default:
        return status;
    }
  };

  const getMethodeLabel = (methode) => {
    switch (methode) {
      case 'carte_bancaire':
        return 'Carte bancaire';
      case 'virement':
        return 'Virement bancaire';
      case 'cheque':
        return 'Chèque';
      case 'especes':
        return 'Espèces';
      default:
        return methode;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des paiements</h1>
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
              placeholder="Rechercher un paiement..."
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
              <option value="complete">Complété</option>
              <option value="en_cours">En cours</option>
              <option value="echoue">Échoué</option>
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
                  Facture
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
                  Méthode
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
              {filteredPaiements.map((paiement) => (
                <tr key={paiement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {paiement.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {paiement.facture}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {paiement.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {paiement.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {paiement.montant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getMethodeLabel(paiement.methode)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(paiement.statut)}`}>
                      {getStatusLabel(paiement.statut)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPaiements.length === 0 && (
          <div className="text-center py-4">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Aucun paiement trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaiementsPage;