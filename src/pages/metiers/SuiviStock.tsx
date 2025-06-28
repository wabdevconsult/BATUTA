import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  TrendingUp,
  AlertTriangle,
  Truck,
  Scan
} from 'lucide-react';

const SuiviStock = () => {
  const features = [
    {
      icon: Package,
      title: "Gestion Stocks",
      description: "Suivi en temps réel des stocks de matériaux, pièces détachées et consommables."
    },
    {
      icon: Calendar,
      title: "Réapprovisionnement",
      description: "Planification automatique des commandes selon les seuils définis."
    },
    {
      icon: FileText,
      title: "Bons de Sortie",
      description: "Génération automatique des bons de sortie et traçabilité des mouvements."
    },
    {
      icon: MapPin,
      title: "Multi-Entrepôts",
      description: "Gestion centralisée de plusieurs entrepôts et points de stockage."
    },
    {
      icon: Users,
      title: "Équipes Terrain",
      description: "Attribution des stocks aux techniciens et suivi des consommations."
    },
    {
      icon: BarChart3,
      title: "Analytics Stock",
      description: "Tableaux de bord et analyses des rotations et valorisation des stocks."
    }
  ];

  const stockServices = [
    "Inventaire en temps réel",
    "Gestion des références",
    "Seuils d'alerte automatiques",
    "Traçabilité complète",
    "Valorisation des stocks",
    "Optimisation des commandes",
    "Gestion des fournisseurs",
    "Codes-barres / QR codes",
    "Rapports de rotation",
    "Intégration comptable"
  ];

  const testimonial = {
    name: "Philippe Moreau",
    role: "Responsable Stock - Entreprise Multi-Services",
    content: "BATUTA nous a permis de réduire nos stocks de 30% tout en évitant les ruptures. La visibilité en temps réel est exceptionnelle !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Suivi Stock
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Maîtrisez votre <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">gestion de stock</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez vos stocks avec notre solution complète : 
                suivi en temps réel, réapprovisionnement automatique, traçabilité et analytics avancés.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Tableau de Bord Stock</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">1,247 références en stock</div>
                      <div className="text-sm text-gray-600">Valorisation: 45 680€</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">12 alertes seuil bas</div>
                      <div className="text-sm text-gray-600">Commandes à prévoir</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">8 mouvements aujourd'hui</div>
                      <div className="text-sm text-gray-600">Sorties et entrées</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités de gestion de stock
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils complets pour optimiser votre gestion des stocks et réduire les coûts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Toutes les fonctionnalités stock
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA couvre tous les aspects de la gestion de stock, 
                de l'inventaire à l'optimisation des commandes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stockServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
              <div className="flex space-x-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-green-50 rounded-xl p-8">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
              <p className="text-gray-600">de réduction des stocks moyens</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
              <p className="text-gray-600">de fiabilité des inventaires</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">2h</div>
              <p className="text-gray-600">économisées par semaine sur la gestion</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Optimisez vos stocks dès maintenant !
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises qui ont choisi BATUTA pour maîtriser leur gestion de stock
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir autres fonctionnalités
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuiviStock;