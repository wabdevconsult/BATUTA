import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  FileText, 
  Truck, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Download,
  BarChart3,
  ShoppingCart
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const FournisseurDashboard = () => {
  const { user } = useAuthStore();

  const recentOrders = [
    { 
      id: 1, 
      orderNumber: 'CMD-2024-156', 
      client: 'BATUTA Admin', 
      date: '15/05/2025', 
      amount: '2 450,00 €', 
      status: 'pending' 
    },
    { 
      id: 2, 
      orderNumber: 'CMD-2024-155', 
      client: 'BATUTA Admin', 
      date: '12/05/2025', 
      amount: '1 850,00 €', 
      status: 'processing' 
    },
    { 
      id: 3, 
      orderNumber: 'CMD-2024-152', 
      client: 'BATUTA Admin', 
      date: '08/05/2025', 
      amount: '3 200,00 €', 
      status: 'shipped' 
    }
  ];

  const productStats = [
    { name: 'Produits actifs', value: '124', icon: Package, color: 'bg-blue-500' },
    { name: 'Commandes en cours', value: '8', icon: ShoppingCart, color: 'bg-orange-500' },
    { name: 'Livraisons du mois', value: '32', icon: Truck, color: 'bg-green-500' }
  ];

  const quickActions = [
    { name: 'Ajouter un produit', path: '/dashboard/produits/new', icon: Package },
    { name: 'Gérer le catalogue', path: '/dashboard/produits', icon: FileText },
    { name: 'Voir les commandes', path: '/dashboard/commandes', icon: ShoppingCart },
    { name: 'Planifier livraison', path: '/dashboard/livraisons/new', icon: Truck }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.firstName || 'Fournisseur'} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Bienvenue sur votre espace fournisseur. Retrouvez ici toutes vos commandes et produits.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Commandes récentes</h2>
            </div>
            <Link to="/dashboard/commandes" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              Voir toutes <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commande
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
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'pending' ? 'En attente' :
                         order.status === 'processing' ? 'En préparation' :
                         order.status === 'shipped' ? 'Expédiée' : 'Terminée'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/dashboard/commandes/${order.id}`} className="text-blue-600 hover:text-blue-900">
                        Détails
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

          {/* Upload Documents */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-2">Glissez-déposez des fichiers ici ou</p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Parcourir les fichiers
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Catalogue_Produits_2025.pdf</span>
                </div>
                <Download className="h-4 w-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Ventes mensuelles</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">2025</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">2024</button>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Graphique des ventes (à implémenter)</p>
        </div>
      </div>
    </div>
  );
};

export default FournisseurDashboard;