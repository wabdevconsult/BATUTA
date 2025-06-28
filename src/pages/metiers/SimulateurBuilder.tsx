import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Code,
  Palette,
  Layers,
  Zap
} from 'lucide-react';

const SimulateurBuilder = () => {
  const features = [
    {
      icon: Code,
      title: "Builder No-Code",
      description: "Créez vos simulateurs sans programmation avec notre interface intuitive."
    },
    {
      icon: Palette,
      title: "Personnalisation",
      description: "Adaptez le design et les couleurs à votre charte graphique."
    },
    {
      icon: Layers,
      title: "Templates Métier",
      description: "Bibliothèque de templates prêts à l'emploi pour votre secteur."
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
      icon: BarChart3,
      title: "Analytics Avancées",
      description: "Suivi des conversions et analyse des performances de vos simulateurs."
    }
  ];

  const builderFeatures = [
    "Interface drag & drop",
    "Templates personnalisables",
    "Calculs automatiques",
    "Intégration CRM",
    "Responsive design",
    "SEO optimisé",
    "A/B testing",
    "Analytics intégrées",
    "Export leads",
    "Multi-langues"
  ];

  const testimonial = {
    name: "Sophie Dubois",
    role: "Directrice Marketing Digital - Entreprise Éco-Habitat",
    content: "Le builder de simulateurs BATUTA a transformé notre acquisition client. 40% de leads qualifiés en plus grâce aux simulateurs intégrés !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Simulateur Builder
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Créez vos <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">simulateurs métier</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Développez vos propres simulateurs personnalisés sans programmation. 
                Générez plus de leads qualifiés et convertissez vos prospects en clients.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Voir une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Settings className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Builder Interface</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Simulateur Photovoltaïque</div>
                      <div className="text-sm text-gray-600">85% de taux de conversion</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Calculateur Chauffage</div>
                      <div className="text-sm text-gray-600">120 leads ce mois</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Devis Piscine</div>
                      <div className="text-sm text-gray-600">En cours de création</div>
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
              Fonctionnalités du builder
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tous les outils nécessaires pour créer des simulateurs performants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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

      {/* Builder Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Créez sans limites
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Notre builder no-code vous permet de créer des simulateurs 
                professionnels adaptés à votre métier en quelques minutes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {builderFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
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

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Créez en 4 étapes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple pour créer vos simulateurs métier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Choisir un template
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sélectionnez un template adapté à votre métier
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Personnaliser
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Adaptez le design et les calculs à vos besoins
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tester
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Prévisualisez et testez votre simulateur
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Publier
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Intégrez le simulateur sur votre site web
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">15min</div>
              <p className="text-gray-600">pour créer votre premier simulateur</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">+40%</div>
              <p className="text-gray-600">d'augmentation des conversions en moyenne</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <p className="text-gray-600">templates métier disponibles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Créez votre premier simulateur !
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Commencez dès maintenant et générez plus de leads qualifiés pour votre business
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Commencer gratuitement
            </Link>
            <Link
              to="/metiers/marketplace-simulateurs"
              className="text-white border-2 border-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Voir la marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulateurBuilder;