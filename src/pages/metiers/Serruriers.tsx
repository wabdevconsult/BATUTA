import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Key, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Lock,
  DoorOpen
} from 'lucide-react';

const Serruriers = () => {
  const features = [
    {
      icon: Key,
      title: "Gestion Serrurerie",
      description: "Suivi des interventions de serrurerie et gestion des clés de sécurité."
    },
    {
      icon: Calendar,
      title: "Planning Urgences",
      description: "Gestion des interventions d'urgence et dépannages 24h/24."
    },
    {
      icon: FileText,
      title: "Devis Serrurerie",
      description: "Bibliothèque de prix serrurerie et templates spécialisés."
    },
    {
      icon: MapPin,
      title: "Interventions Rapides",
      description: "Géolocalisation pour les interventions d'urgence serrurerie."
    },
    {
      icon: Users,
      title: "Équipes Mobiles",
      description: "Coordination des serruriers et répartition des interventions."
    },
    {
      icon: BarChart3,
      title: "Stock Matériel",
      description: "Gestion des stocks de serrures, cylindres et accessoires."
    }
  ];

  const locksmithServices = [
    "Ouverture de porte",
    "Changement de serrure",
    "Installation serrure",
    "Réparation serrure",
    "Blindage de porte",
    "Installation coffre-fort",
    "Serrure connectée",
    "Contrôle d'accès",
    "Dépannage d'urgence",
    "Reproduction de clés"
  ];

  const testimonial = {
    name: "Marc Dubois",
    role: "Serrurier - 18 ans d'expérience",
    content: "BATUTA m'aide à gérer mes urgences et à optimiser mes tournées. La gestion des stocks de serrures est parfaite !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Serruriers
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM adapté aux <span className="bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent">serruriers</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Gérez efficacement vos interventions de serrurerie : urgences, installations, 
                réparations et sécurisation. Planning optimisé et gestion des stocks inclus.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-gray-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Key className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Serrurier</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">8h00 - URGENCE Ouverture</div>
                      <div className="text-sm text-gray-600">Appartement Durand - 12 rue de la Paix</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">10h30 - Changement serrure</div>
                      <div className="text-sm text-gray-600">Maison Petit - 45 avenue des Fleurs</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h00 - Installation blindage</div>
                      <div className="text-sm text-gray-600">Bureau Martin - 8 impasse du Moulin</div>
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
              Fonctionnalités métier serrurier
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour optimiser votre activité de serrurerie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-gray-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Tous vos services de serrurerie
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA s'adapte à tous les types d'interventions de serrurerie, 
                des urgences aux installations de sécurité complètes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locksmithServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
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
            <div className="bg-gray-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30min</div>
              <p className="text-gray-600">temps de réponse moyen pour les urgences</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <p className="text-gray-600">service d'urgence serrurerie disponible</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <p className="text-gray-600">de satisfaction client sur les interventions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sécurisez votre business !
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les serruriers qui ont choisi BATUTA pour optimiser leur activité
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-gray-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-gray-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir autres métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Serruriers;