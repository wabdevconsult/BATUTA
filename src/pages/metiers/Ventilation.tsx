import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wind, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Settings,
  Fan
} from 'lucide-react';

const Ventilation = () => {
  const features = [
    {
      icon: Wind,
      title: "Systèmes VMC",
      description: "Installation et maintenance des systèmes de ventilation mécanique contrôlée."
    },
    {
      icon: Calendar,
      title: "Planning Maintenance",
      description: "Planification des maintenances préventives et nettoyages périodiques."
    },
    {
      icon: FileText,
      title: "Contrôles Réglementaires",
      description: "Suivi des contrôles obligatoires et certifications de ventilation."
    },
    {
      icon: MapPin,
      title: "Interventions Ciblées",
      description: "Géolocalisation et optimisation des tournées de maintenance."
    },
    {
      icon: Users,
      title: "Équipes Spécialisées",
      description: "Gestion des techniciens ventilation et leurs qualifications."
    },
    {
      icon: BarChart3,
      title: "Qualité de l'Air",
      description: "Monitoring et analyse de la qualité de l'air intérieur."
    }
  ];

  const ventilationServices = [
    "Installation VMC simple flux",
    "Installation VMC double flux",
    "Ventilation naturelle",
    "Extraction d'air vicié",
    "Nettoyage conduits",
    "Maintenance préventive",
    "Contrôle débit d'air",
    "Remplacement filtres",
    "Diagnostic qualité air",
    "Mise aux normes"
  ];

  const testimonial = {
    name: "Antoine Dubois",
    role: "Spécialiste Ventilation - 10 ans d'expérience",
    content: "BATUTA m'aide à gérer mes contrats de maintenance VMC et à planifier les contrôles réglementaires. Un outil indispensable !",
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
                Ventilation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM pour les professionnels de la <span className="bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent">ventilation</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez vos installations de ventilation avec notre solution complète : 
                gestion VMC, maintenance préventive, contrôles réglementaires et qualité de l'air.
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
                  <Wind className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Ventilation</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">9h00 - Maintenance VMC</div>
                      <div className="text-sm text-gray-600">Immeuble Résidence - Bâtiment A</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h00 - Installation VMC DF</div>
                      <div className="text-sm text-gray-600">Maison Durand - Construction neuve</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">16h30 - Contrôle débit</div>
                      <div className="text-sm text-gray-600">Bureau Martin - Contrôle annuel</div>
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
              Fonctionnalités spécialisées ventilation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils conçus pour optimiser vos activités de ventilation et qualité de l'air
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
                Tous vos services de ventilation
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA couvre tous les aspects de la ventilation, 
                de l'installation à la maintenance préventive.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ventilationServices.map((service, index) => (
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
            <div className="bg-gray-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
              <p className="text-gray-600">de temps gagné sur la planification des maintenances</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de conformité avec les contrôles réglementaires</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <Fan className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <p className="text-gray-600">monitoring de la qualité de l'air</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Respirez mieux avec BATUTA !
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les professionnels de la ventilation qui ont choisi notre solution
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

export default Ventilation;