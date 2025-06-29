import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FileText, Settings, CreditCard, Calendar, BarChart3, Package, Truck, LogOut, User, Sliders, Brush, MessageCircle, MapPin, PenTool as Tool, Wrench } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  onClose?: () => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: 'Tableau de bord', path: '/dashboard', icon: Home },
      { name: 'Profil', path: '/dashboard/profile', icon: User },
      { name: 'Paramètres', path: '/dashboard/settings', icon: Settings },
      { name: 'Personnalisation', path: '/dashboard/personalization', icon: Brush },
      { name: 'Messagerie', path: '/dashboard/messages', icon: MessageCircle },
    ];

    const adminItems = [
      ...commonItems,
      { name: 'Utilisateurs', path: '/dashboard/users', icon: Users },
      { name: 'Demandes de devis', path: '/dashboard/quote-requests', icon: MessageCircle },
      { name: 'Interventions', path: '/dashboard/interventions', icon: MapPin },
      { name: 'Équipements', path: '/dashboard/equipments', icon: Tool },
      { name: 'Installations', path: '/dashboard/installations', icon: Wrench },
      { name: 'Devis', path: '/dashboard/devis', icon: FileText },
      { name: 'Factures', path: '/dashboard/factures', icon: FileText },
      { name: 'Paiements', path: '/dashboard/paiements', icon: CreditCard },
    ];

    const technicienItems = [
      ...commonItems,
      { name: 'Disponibilités', path: '/dashboard/disponibilites', icon: Calendar },
      { name: 'Demandes de devis', path: '/dashboard/quote-requests', icon: MessageCircle },
      { name: 'Interventions', path: '/dashboard/interventions', icon: MapPin },
      { name: 'Équipements', path: '/dashboard/equipments', icon: Tool },
      { name: 'Installations', path: '/dashboard/installations', icon: Wrench },
      { name: 'Devis', path: '/dashboard/devis', icon: FileText },
      { name: 'Factures', path: '/dashboard/factures', icon: FileText },
      { name: 'Paiements', path: '/dashboard/paiements', icon: CreditCard },
    ];

    const clientItems = [
      ...commonItems,
      { name: 'Interventions', path: '/dashboard/interventions', icon: MapPin },
      { name: 'Équipements', path: '/dashboard/equipments', icon: Tool },
      { name: 'Devis', path: '/dashboard/devis', icon: FileText },
      { name: 'Factures', path: '/dashboard/factures', icon: FileText },
      { name: 'Paiements', path: '/dashboard/paiements', icon: CreditCard },
    ];

    const fournisseurItems = [
      ...commonItems,
      { name: 'Produits', path: '/dashboard/produits', icon: Package },
      { name: 'Commandes', path: '/dashboard/commandes', icon: FileText },
      { name: 'Livraisons', path: '/dashboard/livraisons', icon: Truck },
      { name: 'Paiements', path: '/dashboard/paiements', icon: CreditCard },
    ];

    switch (user?.role) {
      case 'admin':
        return adminItems;
      case 'technicien':
        return technicienItems;
      case 'client':
        return clientItems;
      case 'fournisseur':
        return fournisseurItems;
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex-1 flex flex-col bg-white shadow-lg h-full">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Home className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BATUTA
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-4">
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={onClose}
            >
              <item.icon className={`h-5 w-5 mr-3 ${
                location.pathname === item.path ? 'text-blue-500' : 'text-gray-500'
              }`} />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;