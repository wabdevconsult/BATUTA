import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  FileText, 
  Clock, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Shield,
  Smartphone,
  Navigation,
  Timer
} from 'lucide-react';

const HorodatageGeolocalisation = () => {
  const features = [
    {
      icon: MapPin,
      title: "Géolocalisation Précise",
      description: "Localisation GPS automatique des interventions avec précision métrique."
    },
    {
      icon: Clock,
      title: "Horodatage Automatique",
      description: "Enregistrement automatique des heures d'arrivée et de départ sur site."
    },
    {
      icon: FileText,
      title: "Preuves de Passage",
      description: "Génération automatique de justificatifs d'intervention géolocalisés."
    },
    {
      icon: Navigation,
      title: "Optimisation Trajets",
      description: "Calcul des itinéraires optimaux entre les interventions."
    },
    {
      icon: Users,
      title: "Suivi Équipes",
      description: "Monitoring en temps réel de la position de vos techniciens."
    },
    {
      icon: BarChart3,
      title: "Reporting Détaillé",
      description: "Rapports complets avec cartes, temps de trajet et statistiques."
    }
  ];

  const geoServices = [
    "Pointage automatique",
    "Géofencing intelligent",
    "Calcul temps de trajet",
    "Optimisation tournées",
    "Preuves photographiques",
    "Historique déplacements",
    "Alertes de zone",
    "Rapports kilométriques",
    "Suivi temps réel",
    "Validation interventions"
  ];

  const testimonial = {
    name: "Marc Dubois",
    role: "Responsable Équipes Techniques - 15 ans d'expérience",
    content: "L'horodatage géolocalisé nous a permis d'optimiser nos tournées de 25% et de fournir des preuves irréfutables à nos clients !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Horodatage & Géolocalisation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Horodatage et <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">géolocalisation</span> automatiques
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez vos interventions avec notre système d'horodatage géolocalisé : 
                preuves de passage automatiques, optimisation des trajets et suivi temps réel de vos équipes.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
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
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Suivi Géolocalisé</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Technicien A - Sur site</div>
                      <div className="text-sm text-gray-600">Arrivé à 09h15 - 12 rue des Roses</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Technicien B - En route</div>
                      <div className="text-sm text-gray-600">ETA: 14h30 - 45 avenue Victor Hugo</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Technicien C - Terminé</div>
                      <div className="text-sm text-gray-600">Parti à 11h45 - Durée: 2h30</div>
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
              Fonctionnalités horodatage géolocalisé
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils avancés pour tracer et optimiser toutes vos interventions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Toutes les fonctionnalités géolocalisées
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA intègre un système complet d'horodatage et de géolocalisation 
                pour optimiser vos opérations terrain.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {geoServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
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
              <Timer className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
              <p className="text-gray-600">d'optimisation des tournées grâce à la géolocalisation</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de traçabilité des interventions</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-8">
              <Smartphone className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
              <p className="text-gray-600">paperasse grâce à l'automatisation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Optimisez vos interventions !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment l'horodatage géolocalisé peut transformer votre gestion terrain
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
              Découvrir autres fonctionnalités
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HorodatageGeolocalisation;