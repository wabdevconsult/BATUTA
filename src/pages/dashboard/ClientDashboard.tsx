import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  CreditCard, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Download,
  ExternalLink,
  Calculator
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const ClientDashboard = () => {
  const { user } = useAuthStore();

  const upcomingInterventions = [
    { 
      id: 1, 
      date: '18/05/2025', 
      time: '09:00 - 12:00', 
      type: 'Maintenance', 
      technician: 'Jean Dupont',
      status: 'confirmed' 
    },
    { 
      id: 2, 
      date: '25/05/2025', 
      time: '14:00 - 16:00', 
      type: 'Installation', 
      technician: 'Pierre Martin',
      status: 'pending' 
    }
  ];

  const recentDocuments = [
    { id: 1, name: 'Facture #F2024-156', type: 'facture', date: '10/05/2025', amount: '450,00 €', status: 'paid' },
    { id: 2, name: 'Devis #D2024-089', type: 'devis', date: '05/05/2025', amount: '1 250,00 €', status: 'accepted' },
    { id: 3, name: 'Rapport d\'intervention #R2024-045', type: 'rapport', date: '28/04/2025', amount: null, status: 'completed' }
  ];

  const quickActions = [
    { name: 'Demander un devis', path: '/dashboard/devis/new', icon: FileText },
    { name: 'Consulter mes factures', path: '/dashboard/factures', icon: CreditCard },
    { name: 'Utiliser un simulateur', path: '/dashboard/simulateurs', icon: Calculator },
    { name: 'Contacter le support', path: '/dashboard/messages', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.firstName || 'Client'} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Bienvenue sur votre espace client. Retrouvez ici toutes vos informations.
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Interventions */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Interventions à venir</h2>
              </div>
              <Link to="/dashboard/interventions" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                Voir toutes <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {upcomingInterventions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {upcomingInterventions.map((intervention) => (
                  <div key={intervention.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {intervention.type}
                          </p>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            intervention.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {intervention.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate">{intervention.date} • {intervention.time}</span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate">Technicien: {intervention.technician}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Link
                          to={`/dashboard/interventions/${intervention.id}`}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Détails
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">Aucune intervention planifiée</p>
              </div>
            )}
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Documents récents</h2>
              </div>
              <div className="flex space-x-2">
                <Link to="/dashboard/devis" className="text-sm text-blue-600 hover:text-blue-700">
                  Devis
                </Link>
                <span className="text-gray-300">|</span>
                <Link to="/dashboard/factures" className="text-sm text-blue-600 hover:text-blue-700">
                  Factures
                </Link>
                <span className="text-gray-300">|</span>
                <Link to="/dashboard/rapports" className="text-sm text-blue-600 hover:text-blue-700">
                  Rapports
                </Link>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
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
                  {recentDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{doc.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.amount || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          doc.status === 'paid' ? 'bg-green-100 text-green-800' :
                          doc.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                          doc.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status === 'paid' ? 'Payé' :
                           doc.status === 'accepted' ? 'Accepté' :
                           doc.status === 'completed' ? 'Complété' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Download className="h-4 w-4" />
                          </button>
                          <Link to={`/dashboard/${doc.type}s/${doc.id}`} className="text-blue-600 hover:text-blue-900">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Actions rapides</h2>
            </div>
            <div className="p-6 space-y-2">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="bg-blue-100 rounded-lg p-2 mr-3">
                    <action.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statut du compte</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Type de compte</span>
                <span className="text-sm font-medium text-gray-900">Premium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Prochaine facture</span>
                <span className="text-sm font-medium text-gray-900">01/06/2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Montant mensuel</span>
                <span className="text-sm font-medium text-gray-900">49,00 €</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/dashboard/billing"
                className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Gérer mon abonnement
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Besoin d'aide ?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Notre équipe de support est disponible pour répondre à toutes vos questions.
            </p>
            <Link
              to="/dashboard/support"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Contacter le support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;