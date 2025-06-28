import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Snowflake, 
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
  Wind
} from 'lucide-react';

const Frigoristes = () => {
  const features = [
    {
      icon: Snowflake,
      title: "Maintenance Frigorifique",
      description: "Planification et suivi des maintenances préventives des installations frigorifiques."
    },
    {
      icon: Calendar,
      title: "Planning Spécialisé",
      description: "Gestion optimisée des interventions frigorifiques et contrôles réglementaires."
    },
    {
      icon: FileText,
      title: "Certificats Conformité",
      description: "Suivi automatique des certificats et attestations frigorifiques obligatoires."
    },
    {
      icon: MapPin,
      title: "Tournées Optimisées",
      description: "Calcul des meilleurs itinéraires pour vos interventions frigorifiques."
    },
    {
      icon: Users,
      title: "Équipes Certifiées",
      description: "Gestion des techniciens frigoristes et de leurs certifications."
    },
    {
      icon: BarChart3,
      title: "Suivi Fluides",
      description: "Gestion des fluides frigorigènes et conformité environnementale."
    }
  ];

  const frigoristeServices = [
    "Installation chambre froide",
    "Maintenance préventive",
    "Dépannage d'urgence",
    "Contrôle étanchéité",
    "Recharge fluide frigorigène",
    "Installation vitrine réfrigérée",
    "Maintenance centrale frigorifique",
    "Diagnostic énergétique",
    "Mise aux normes",
    "Formation utilisateurs"
  ];

  const testimonial = {
    name: "Antoine Moreau",
    role: "Frigoriste - 18 ans d'expérience",
    content: "BATUTA m'aide à gérer mes contrats de maintenance et à respecter la réglementation sur les fluides frigorigènes. Un outil indispensable !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Frigoristes
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM spécialisé pour les <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">frigoristes</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez vos interventions frigorifiques avec notre solution complète : 
                gestion des fluides frigorigènes, planning de maintenance et conformité réglementaire.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Snowflake className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Frigoriste</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-lg">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">8h30 - Maintenance chambre froide</div>
                      <div className="text-sm text-gray-600">Restaurant Dupont - Contrôle mensuel</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">11h00 - Panne vitrine</div>
                      <div className="text-sm text-gray-600">Boulangerie Martin - Intervention urgente</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">15h00 - Contrôle étanchéité</div>
                      <div className="text-sm text-gray-600">Supermarché Leroy - Contrôle annuel</div>
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
              Fonctionnalités métier frigoriste
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour optimiser votre activité de frigoriste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Tous vos services frigorifiques
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA s'adapte à tous les types d'interventions frigorifiques, 
                de l'installation neuve à la maintenance préventive.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frigoristeServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
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
            <div className="bg-cyan-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
              <p className="text-gray-600">de temps gagné sur la gestion des contrats de maintenance</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de conformité avec la réglementation fluides frigorigènes</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <Thermometer className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <p className="text-gray-600">surveillance des installations critiques</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Gardez le froid avec BATUTA !
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les frigoristes qui ont choisi BATUTA pour optimiser leur activité
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir autres métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frigoristes;