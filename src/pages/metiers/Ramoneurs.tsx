import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  AlertTriangle,
  Home
} from 'lucide-react';

const Ramoneurs = () => {
  const features = [
    {
      icon: Flame,
      title: "Ramonage Conduits",
      description: "Planification et suivi des ramonages obligatoires et préventifs."
    },
    {
      icon: Calendar,
      title: "Planning Saisonnier",
      description: "Organisation des interventions selon les périodes de chauffe."
    },
    {
      icon: FileText,
      title: "Certificats Ramonage",
      description: "Édition automatique des certificats de ramonage obligatoires."
    },
    {
      icon: MapPin,
      title: "Tournées Optimisées",
      description: "Calcul des meilleurs itinéraires pour vos interventions."
    },
    {
      icon: Users,
      title: "Équipes Certifiées",
      description: "Gestion des ramoneurs qualifiés et de leurs certifications."
    },
    {
      icon: BarChart3,
      title: "Suivi Réglementaire",
      description: "Respect des obligations légales et fréquences de ramonage."
    }
  ];

  const ramonageServices = [
    "Ramonage cheminée",
    "Ramonage poêle à bois",
    "Ramonage chaudière",
    "Ramonage insert",
    "Débistrage conduit",
    "Inspection caméra",
    "Tubage conduit",
    "Contrôle étanchéité",
    "Nettoyage VMC",
    "Certificat ramonage"
  ];

  const testimonial = {
    name: "Pierre Dubois",
    role: "Ramoneur - 15 ans d'expérience",
    content: "BATUTA m'aide à gérer mes tournées saisonnières et à ne jamais oublier un ramonage obligatoire. Les certificats sont générés automatiquement !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Ramoneurs
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM spécialisé pour les <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">ramoneurs</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez vos interventions de ramonage avec notre solution complète : 
                planning saisonnier, certificats automatiques, suivi réglementaire et gestion des tournées.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Flame className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Ramoneur</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">9h00 - Ramonage cheminée</div>
                      <div className="text-sm text-gray-600">Maison Dupont - 12 rue des Roses</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">11h00 - Ramonage poêle</div>
                      <div className="text-sm text-gray-600">Villa Martin - Contrôle obligatoire</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h30 - Inspection caméra</div>
                      <div className="text-sm text-gray-600">Appartement Leroy - Diagnostic</div>
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
              Fonctionnalités métier ramoneur
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour optimiser votre activité de ramonage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Tous vos services de ramonage
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA s'adapte à tous les types d'interventions de ramonage, 
                du ramonage obligatoire aux inspections spécialisées.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ramonageServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
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
            <div className="bg-orange-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
              <p className="text-gray-600">ramonage oublié grâce aux rappels automatiques</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">conformité avec les obligations légales</p>
            </div>
            <div className="bg-red-50 rounded-xl p-8">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">2x/an</div>
              <p className="text-gray-600">fréquence de ramonage automatiquement gérée</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Allumez votre business !
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les ramoneurs qui ont choisi BATUTA pour optimiser leur activité
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir autres métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ramoneurs;