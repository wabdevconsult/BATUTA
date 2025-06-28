import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Users,
  Tool,
  ArrowRight,
  Wrench,
  Clipboard,
  MessageSquare
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const TechnicienDashboard = () => {
  const { user } = useAuthStore();

  const todayInterventions = [
    { 
      id: 1, 
      time: '09:00', 
      client: 'Dupont SAS', 
      address: '12 rue des Lilas, 75001 Paris', 
      type: 'Maintenance', 
      status: 'pending' 
    },
    { 
      id: 2, 
      time: '11:30', 
      client: 'Martin & Co', 
      address: '45 avenue Victor Hugo, 75016 Paris', 
      type: 'Dépannage', 
      status: 'in-progress' 
    },
    { 
      id: 3, 
      time: '14:00', 
      client: 'Leroy Entreprise', 
      address: '8 boulevard Haussmann, 75009 Paris', 
      type: 'Installation', 
      status: 'pending' 
    },
    { 
      id: 4, 
      time: '16:30', 
      client: 'Dubois SARL', 
      address: '22 rue de la Paix, 75002 Paris', 
      type: 'Contrôle', 
      status: 'pending' 
    }
  ];

  const recentClients = [
    { id: 1, name: 'Sophie Martin', company: 'Martin & Co', lastVisit: '14/05/2025' },
    { id: 2, name: 'Jean Dupont', company: 'Dupont SAS', lastVisit: '10/05/2025' },
    { id: 3, name: 'Marie Leroy', company: 'Leroy Entreprise', lastVisit: '05/05/2025' }
  ];

  const quickActions = [
    { name: 'Nouvelle intervention', path: '/dashboard/interventions/new', icon: Wrench },
    { name: 'Créer un rapport', path: '/dashboard/reports/new', icon: Clipboard },
    { name: 'Contacter un client', path: '/dashboard/messages', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.firstName || 'Technicien'} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Voici votre planning d'interventions pour aujourd'hui.
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Interventions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Interventions du jour</h2>
            </div>
            <Link to="/dashboard/agenda" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              Voir agenda <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-200">
            {todayInterventions.map((intervention) => (
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
                        {intervention.client}
                      </p>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        intervention.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        intervention.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {intervention.status === 'pending' ? 'À venir' :
                         intervention.status === 'in-progress' ? 'En cours' : 'Terminé'}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="truncate">{intervention.time} - {intervention.type}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <span className="truncate">{intervention.address}</span>
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

          {/* Recent Clients */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Clients récents</h2>
              <Link to="/dashboard/clients" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                Voir tous <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {recentClients.map((client) => (
                <div key={client.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {client.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {client.company}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {client.lastVisit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre statut</h2>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Disponible</span>
            </div>
            <div className="mt-4">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Changer de statut
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Rapports récents</h2>
          </div>
          <Link to="/dashboard/reports" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
            Voir tous <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Aucun rapport récent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicienDashboard;