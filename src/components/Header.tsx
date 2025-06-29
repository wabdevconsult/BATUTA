import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Zap, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { getUnreadCount } from '../api/messages';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMetiersDropdownOpen, setIsMetiersDropdownOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Only fetch unread messages if user is logged in
    if (user) {
      const fetchUnreadCount = async () => {
        try {
          const count = await getUnreadCount();
          setUnreadMessages(count);
        } catch (error) {
          console.error('Failed to fetch unread messages count:', error);
        }
      };

      fetchUnreadCount();
      
      // Set up polling for unread messages (every 60 seconds)
      const interval = setInterval(fetchUnreadCount, 60000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const metiersCategories = [
    {
      title: "Artisans du Bâtiment",
      items: [
        { name: "Électriciens", path: "/metiers/electriciens" },
        { name: "Plombiers", path: "/metiers/plombiers" },
        { name: "Chauffagistes", path: "/metiers/chauffagistes" },
        { name: "Climaticiens", path: "/metiers/climaticiens" },
        { name: "Menuisiers", path: "/metiers/menuisiers" },
        { name: "Serruriers", path: "/metiers/serruriers" },
        { name: "Peintres", path: "/metiers/peintres" }
      ]
    },
    {
      title: "Services Techniques",
      items: [
        { name: "Garagistes", path: "/metiers/garagistes" },
        { name: "IRVE", path: "/metiers/irve" },
        { name: "Domotique", path: "/metiers/domotique" },
        { name: "Frigoristes", path: "/metiers/frigoristes" },
        { name: "Maintenance Hydraulique", path: "/metiers/maintenance-hydraulique" }
      ]
    },
    {
      title: "Énergies & Environnement",
      items: [
        { name: "Énergies Renouvelables", path: "/metiers/energies-renouvelables" },
        { name: "Photovoltaïques", path: "/metiers/photovoltaiques" },
        { name: "Paysagistes", path: "/metiers/paysagistes" },
        { name: "Piscinistes", path: "/metiers/piscinistes" }
      ]
    }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BATUTA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Accueil
            </Link>
            
            {/* Métiers Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsMetiersDropdownOpen(true)}
                onMouseLeave={() => setIsMetiersDropdownOpen(false)}
                className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                  location.pathname.startsWith('/metiers') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span>Métiers</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isMetiersDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-xl p-6 z-50"
                  onMouseEnter={() => setIsMetiersDropdownOpen(true)}
                  onMouseLeave={() => setIsMetiersDropdownOpen(false)}
                >
                  <div className="grid grid-cols-1 gap-6">
                    {metiersCategories.map((category, idx) => (
                      <div key={idx}>
                        <h3 className="font-semibold text-gray-900 mb-3">{category.title}</h3>
                        <div className="space-y-2">
                          {category.items.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              to={item.path}
                              className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      to="/metiers"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Voir tous les métiers →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/fonctionnalites" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/fonctionnalites') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Fonctionnalités
            </Link>
            
            <Link 
              to="/contact" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>

            <Link 
              to="/personnaliser" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/personnaliser') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Personnaliser
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Messages icon with notification badge */}
                <Link 
                  to="/dashboard/messages" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative"
                >
                  <MessageCircle className="h-6 w-6" />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadMessages > 9 ? '9+' : unreadMessages}
                    </span>
                  )}
                </Link>
                
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Tableau de bord
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/metiers/demander-devis" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Essayer gratuitement
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-4">
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/metiers" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Métiers
              </Link>
              <Link 
                to="/fonctionnalites" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Fonctionnalités
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/personnaliser" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Personnaliser
              </Link>
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                    {/* Messages link with notification badge */}
                    <Link 
                      to="/dashboard/messages" 
                      className="block text-gray-700 hover:text-blue-600 font-medium relative"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        <span>Messages</span>
                        {unreadMessages > 0 && (
                          <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {unreadMessages > 9 ? '9+' : unreadMessages}
                          </span>
                        )}
                      </div>
                    </Link>
                    
                    <Link 
                      to="/dashboard" 
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Tableau de bord
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-700 hover:text-red-600 font-medium"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/metiers/demander-devis" 
                      className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Essayer gratuitement
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;