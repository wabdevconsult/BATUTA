import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Waves, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Thermometer,
  Droplets
} from 'lucide-react';

const Piscinistes = () => {
  const features = [
    {
      icon: Waves,
      title: "Gestion Piscines",
      description: "Suivi complet des piscines clients avec historique des interventions."
    },
    {
      icon: Calendar,
      title: "Planning Saisonnier",
      description: "Planification des ouvertures, fermetures et maintenances saisonnières."
    },
    {
      icon: FileText,
      title: "Devis Piscine",
      description: "Templates spécialisés pour construction, rénovation et équipements."
    },
    {
      icon: MapPin,
      title: "Tournées Optimisées",
      description: "Optimisation des déplacements pour les maintenances régulières."
    },
    {
      icon: Users,
      title: "Équipes Spécialisées",
      description: "Coordination des équipes construction et maintenance piscine."
    },
    {
      icon: BarChart3,
      title: "Suivi Chimique",
      description: "Monitoring des paramètres chimiques et qualité de l'eau."
    }
  ];

  const poolServices = [
    "Construction piscine",
    "Rénovation piscine",
    "Maintenance préventive",
    "Traitement de l'eau",
    "Installation équipements",
    "Hivernage piscine",
    "Remise en service",
    "Réparation liner",
    "Système de filtration",
    "Éclairage piscine"
  ];

  const testimonial = {
    name: "Marc Dubois",
    role: "Pisciniste - 18 ans d'expérience",
    content: "BATUTA m'aide à gérer mes contrats de maintenance et à optimiser mes tournées saisonnières. Un gain de temps énorme !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Piscinistes
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM spécialisé pour les <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">piscinistes</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Gérez votre activité de pisciniste avec notre solution complète : 
                planning saisonnier, suivi des piscines, maintenance préventive et gestion des équipes.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
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
                  <Waves className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Pisciniste</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">9h00 - Maintenance piscine</div>
                      <div className="text-sm text-gray-600">Villa Dupont - Contrat mensuel</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h00 - Remise en service</div>
                      <div className="text-sm text-gray-600">Piscine Martin - Ouverture saison</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-lg">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">16h30 - Devis rénovation</div>
                      <div className="text-sm text-gray-600">Maison Leroy - Changement liner</div>
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
              Fonctionnalités métier pisciniste
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour optimiser votre activité de pisciniste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Tous vos services piscine
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA s'adapte à tous les types de services piscine, 
                de la construction à la maintenance saisonnière.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poolServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
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
            <div className="bg-blue-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
              <p className="text-gray-600">de temps gagné sur la planification saisonnière</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de suivi des paramètres chimiques</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-8">
              <Thermometer className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <p className="text-gray-600">piscines gérées par utilisateur en moyenne</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Plongez dans l'efficacité !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les piscinistes qui ont choisi BATUTA pour optimiser leur activité
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir autres métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Piscinistes;