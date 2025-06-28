import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Zap,
  Settings,
  Smartphone,
  Globe
} from 'lucide-react';

const MarketplaceSimulateurs = () => {
  const features = [
    {
      icon: Calculator,
      title: "Simulateurs Métier",
      description: "Bibliothèque de simulateurs spécialisés pour chaque corps de métier."
    },
    {
      icon: Calendar,
      title: "Intégration Planning",
      description: "Connexion directe avec votre planning pour transformer les simulations en rendez-vous."
    },
    {
      icon: FileText,
      title: "Génération Devis",
      description: "Transformation automatique des simulations en devis personnalisés."
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Simulateurs adaptés aux spécificités géographiques et réglementaires locales."
    },
    {
      icon: Users,
      title: "Expérience Client",
      description: "Interface intuitive pour vos clients avec résultats instantanés."
    },
    {
      icon: BarChart3,
      title: "Analytics Avancés",
      description: "Suivi des conversions et analyse des performances des simulateurs."
    }
  ];

  const simulateurs = [
    "Simulateur devis électricité",
    "Calculateur installation plomberie",
    "Estimateur travaux chauffage",
    "Simulateur isolation thermique",
    "Calculateur panneaux solaires",
    "Estimateur rénovation énergétique",
    "Simulateur VMC double flux",
    "Calculateur pompe à chaleur",
    "Estimateur travaux peinture",
    "Simulateur aménagement jardin"
  ];

  const testimonial = {
    name: "Sophie Dubois",
    role: "Directrice Marketing Digital - Entreprise Éco-Habitat",
    content: "La marketplace de simulateurs BATUTA a transformé notre acquisition client. 40% de leads qualifiés en plus grâce aux simulateurs intégrés !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Marketplace Simulateurs
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Marketplace de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">simulateurs métier</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Accédez à une bibliothèque complète de simulateurs spécialisés pour votre métier. 
                Générez des leads qualifiés et convertissez vos prospects en clients.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Simulateurs Disponibles</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">150+ simulateurs</div>
                      <div className="text-sm text-gray-600">Tous métiers confondus</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">85% de conversion</div>
                      <div className="text-sm text-gray-600">Simulation vers devis</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">24/7 disponible</div>
                      <div className="text-sm text-gray-600">Génération de leads</div>
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
              Fonctionnalités marketplace simulateurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants pour maximiser votre génération de leads qualifiés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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

      {/* Simulateurs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Simulateurs populaires
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Découvrez notre sélection de simulateurs les plus utilisés par les professionnels 
                pour générer des leads qualifiés et convertir leurs prospects.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {simulateurs.map((simulateur, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{simulateur}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
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
            <div className="bg-blue-50 rounded-xl p-8">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
              <p className="text-gray-600">simulateurs disponibles dans la marketplace</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
              <p className="text-gray-600">de taux de conversion simulation vers devis</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">300%</div>
              <p className="text-gray-600">d'augmentation moyenne des leads qualifiés</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Boostez vos conversions avec nos simulateurs !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les professionnels qui génèrent plus de leads qualifiés grâce à notre marketplace
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers/simulateur-builder"
              className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Créer mon simulateur
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketplaceSimulateurs;