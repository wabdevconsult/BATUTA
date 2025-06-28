import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Wrench
} from 'lucide-react';

const MaintenanceHydraulique = () => {
  const features = [
    {
      icon: Droplets,
      title: "Maintenance Préventive",
      description: "Planification et suivi des maintenances préventives des systèmes hydrauliques."
    },
    {
      icon: Calendar,
      title: "Planning Interventions",
      description: "Organisation optimisée des interventions de maintenance hydraulique."
    },
    {
      icon: FileText,
      title: "Rapports Techniques",
      description: "Génération automatique de rapports de maintenance et diagnostics."
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Suivi GPS des techniciens et localisation des équipements."
    },
    {
      icon: Users,
      title: "Équipes Spécialisées",
      description: "Gestion des équipes de maintenance hydraulique et compétences."
    },
    {
      icon: BarChart3,
      title: "Suivi Performance",
      description: "Analyse des performances des équipements et historique des pannes."
    }
  ];

  const hydraulicServices = [
    "Maintenance pompes hydrauliques",
    "Entretien vérins hydrauliques",
    "Contrôle circuits hydrauliques",
    "Maintenance centrales hydrauliques",
    "Diagnostic systèmes hydrauliques",
    "Réparation fuites hydrauliques",
    "Maintenance préventive",
    "Dépannage d'urgence",
    "Contrôle pression hydraulique",
    "Maintenance filtration"
  ];

  const testimonial = {
    name: "Philippe Moreau",
    role: "Technicien Maintenance Hydraulique - 12 ans d'expérience",
    content: "BATUTA m'aide à anticiper les pannes et à optimiser mes tournées de maintenance. La traçabilité des interventions est parfaite !",
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
                Maintenance Hydraulique
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                CRM spécialisé <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">maintenance hydraulique</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez vos interventions de maintenance hydraulique avec notre solution complète : 
                planning préventif, suivi des équipements, rapports techniques et gestion d'équipes.
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
                  <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Maintenance</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">9h00 - Maintenance pompe</div>
                      <div className="text-sm text-gray-600">Usine Techno - Secteur A</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h00 - Contrôle circuit</div>
                      <div className="text-sm text-gray-600">Centrale hydraulique - Bâtiment B</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">16h30 - Diagnostic panne</div>
                      <div className="text-sm text-gray-600">Vérin hydraulique - Ligne 3</div>
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
              Fonctionnalités maintenance hydraulique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour optimiser vos activités de maintenance hydraulique
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
                Tous vos services hydrauliques
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA couvre tous les aspects de la maintenance hydraulique, 
                de la maintenance préventive au dépannage d'urgence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hydraulicServices.map((service, index) => (
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
            <div className="bg-blue-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">40%</div>
              <p className="text-gray-600">de réduction des pannes grâce à la maintenance préventive</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
              <p className="text-gray-600">de traçabilité des interventions de maintenance</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-8">
              <Wrench className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
              <p className="text-gray-600">d'optimisation des tournées de maintenance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Optimisez votre maintenance hydraulique !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les professionnels qui ont choisi BATUTA pour leur maintenance hydraulique
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

export default MaintenanceHydraulique;