import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Settings,
  Package,
  FileText,
  ArrowRight,
  Globe,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { getAllPersonalizations } from '../../api/personalization';
import { Personalization } from '../../types/personalization';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [personalizations, setPersonalizations] = useState<Personalization[]>([]);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch personalizations
        const personalizationsData = await getAllPersonalizations();
        setPersonalizations(personalizationsData);
        
        // Fetch quote requests
        const quoteRequestsResponse = await axios.get('/quote-requests');
        setQuoteRequests(quoteRequestsResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { title: 'Utilisateurs actifs', value: '1,248', icon: Users, color: 'bg-blue-500' },
    { title: 'Chiffre d\'affaires', value: '124,500 €', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Interventions', value: '3,157', icon: Calendar, color: 'bg-purple-500' },
    { title: 'Taux de conversion', value: '24.8%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const recentUsers = [
    { id: 1, name: 'Sophie Martin', email: 'sophie@example.com', role: 'client', date: '15/05/2025' },
    { id: 2, name: 'Jean Dupont', email: 'jean@example.com', role: 'technicien', date: '14/05/2025' },
    { id: 3, name: 'Marie Durand', email: 'marie@example.com', role: 'client', date: '13/05/2025' },
    { id: 4, name: 'Pierre Leroy', email: 'pierre@example.com', role: 'fournisseur', date: '12/05/2025' }
  ];

  const alerts = [
    { id: 1, type: 'warning', message: '3 licences expirent dans 7 jours', icon: AlertCircle },
    { id: 2, type: 'success', message: '15 nouveaux utilisateurs cette semaine', icon: CheckCircle },
    { id: 3, type: 'warning', message: 'Mise à jour système prévue le 20/05', icon: AlertCircle }
  ];

  const quickActions = [
    { name: 'Ajouter un utilisateur', path: '/dashboard/users/new', icon: Users },
    { name: 'Configurer un module', path: '/dashboard/modules', icon: Settings },
    { name: 'Gérer les fournisseurs', path: '/dashboard/fournisseurs', icon: Package },
    { name: 'Voir les rapports', path: '/dashboard/reports', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.firstName || 'Admin'} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Bienvenue sur votre tableau de bord administrateur. Voici un aperçu de votre activité.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quote Requests */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Demandes de devis récentes</h2>
            </div>
            <Link to="/dashboard/quote-requests" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              Voir toutes <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Chargement des demandes...</p>
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                <p className="text-gray-600">{error}</p>
              </div>
            ) : quoteRequests.length > 0 ? (
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
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quoteRequests.slice(0, 5).map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.nom}
                        </div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.metier || 'Non spécifié'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'assigned' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'contacted' ? 'bg-purple-100 text-purple-800' :
                          request.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.status === 'new' ? 'Nouvelle' :
                           request.status === 'assigned' ? 'Assignée' :
                           request.status === 'contacted' ? 'Contactée' :
                           request.status === 'completed' ? 'Complétée' : 'Rejetée'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/dashboard/quote-requests/${request._id}`} className="text-blue-600 hover:text-blue-900">
                          Détails
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Aucune demande de devis trouvée</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Alertes</h2>
            </div>
            <div className="p-6 space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`flex items-start p-3 rounded-lg ${
                    alert.type === 'warning' ? 'bg-yellow-50' : 
                    alert.type === 'success' ? 'bg-green-50' : 'bg-blue-50'
                  }`}
                >
                  <alert.icon className={`h-5 w-5 mr-3 ${
                    alert.type === 'warning' ? 'text-yellow-500' : 
                    alert.type === 'success' ? 'text-green-500' : 'text-blue-500'
                  }`} />
                  <span className="text-sm text-gray-700">{alert.message}</span>
                </div>
              ))}
            </div>
          </div>

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
        </div>
      </div>

      {/* Recent Personalizations */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Personnalisations récentes</h2>
          <Link to="/dashboard/personalizations" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
            Voir toutes <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Chargement des personnalisations...</p>
            </div>
          ) : personalizations.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom du site
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {personalizations.slice(0, 5).map((personalization) => (
                  <tr key={personalization._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {personalization.userId?.firstName} {personalization.userId?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{personalization.userId?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{personalization.siteName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(personalization.updatedAt || '').toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a 
                        href={`/preview/${personalization._id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Eye className="h-5 w-5 inline" />
                      </a>
                      <Link to={`/dashboard/personalizations/${personalization._id}`} className="text-indigo-600 hover:text-indigo-900">
                        Détails
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Aucune personnalisation trouvée</p>
            </div>
          )}
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Activité récente</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">Journalier</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Hebdomadaire</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Mensuel</button>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Graphique d'activité (à implémenter)</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;