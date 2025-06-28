import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">BATUTA</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              La solution CRM complète pour les professionnels du service et de l'artisanat. 
              Gérez vos clients, devis, interventions et équipes en toute simplicité.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/metiers" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Métiers
                </Link>
              </li>
              <li>
                <Link to="/fonctionnalites" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link to="/metiers/faq" className="text-gray-300 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services populaires</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/metiers/electriciens" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Électriciens
                </Link>
              </li>
              <li>
                <Link to="/metiers/plombiers" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Plombiers
                </Link>
              </li>
              <li>
                <Link to="/metiers/chauffagistes" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Chauffagistes
                </Link>
              </li>
              <li>
                <Link to="/metiers/auto-entrepreneurs" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Auto-entrepreneurs
                </Link>
              </li>
              <li>
                <Link to="/metiers/multi-services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Multi-services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">contact@batuta.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Paris, France</span>
              </div>
            </div>
            <div className="mt-6">
              <Link 
                to="/metiers/demander-devis"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm">
              © {currentYear} BATUTA. Tous droits réservés.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                Mentions légales
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                CGU
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;