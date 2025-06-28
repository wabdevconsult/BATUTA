import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, MapPin, Smartphone, BarChart3, CheckCircle, ArrowRight, Shield, Bell, FolderSync as Sync, Share2 } from 'lucide-react';

const PlanningPartage = () => {
  const features = [
    {
      icon: Calendar,
      title: "Planning Collaboratif",
      description: "Planification partagée en temps réel entre toutes vos équipes et techniciens."
    },
    {
      icon: Users,
      title: "Gestion d'Équipes",
      description: "Coordination optimisée des équipes avec répartition intelligente des tâches."
    },
    {
      icon: Clock,
      title: "Synchronisation Temps Réel",
      description: "Mise à jour instantanée des plannings sur tous les appareils connectés."
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Suivi GPS des équipes et optimisation des déplacements."
    },
    {
      icon: Smartphone,
      title: "Application Mobile",
      description: "Accès mobile complet pour consulter et modifier les plannings terrain."
    },
    {
      icon: BarChart3,
      title: "Tableaux de Bord",
      description: "Visualisation des charges de travail et performance des équipes."
    }
  ];

  const planningServices = [
    "Planning partagé multi-équipes",
    "Calendrier synchronisé",
    "Affectation automatique",
    "Gestion des disponibilités",
    "Notifications en temps réel",
    "Optimisation des tournées",
    "Suivi des heures travaillées",
    "Gestion des congés",
    "Planning de maintenance",
    "Coordination sous-traitants"
  ];

  const testimonial = {
    name: "Sophie Martin",
    role: "Responsable Planning - Entreprise Multi-Services",
    content: "Le planning partagé BATUTA a révolutionné notre organisation. Nos équipes sont parfaitement coordonnées et nous avons gagné 30% d'efficacité !",
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
                Planning Partagé
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Planning collaboratif pour <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">vos équipes</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Coordonnez parfaitement vos équipes avec notre solution de planning partagé. 
                Synchronisation temps réel, optimisation des tournées et gestion collaborative des interventions.
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
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Équipes</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Équipe A - 3 techniciens</div>
                      <div className="text-sm text-gray-600">8 interventions planifiées</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Équipe B - 2 techniciens</div>
                      <div className="text-sm text-gray-600">5 interventions planifiées</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Équipe C - 4 techniciens</div>
                      <div className="text-sm text-gray-600">12 interventions planifiées</div>
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
              Fonctionnalités planning partagé
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils collaboratifs pour optimiser la coordination de vos équipes
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

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Toutes les fonctionnalités de planning
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA offre une solution complète de planning partagé, 
                adaptée à tous les types d'organisations et d'équipes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {planningServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
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
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
              <p className="text-gray-600">d'amélioration de l'efficacité des équipes</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de synchronisation en temps réel</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <Share2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <p className="text-gray-600">accès collaboratif au planning</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Synchronisez vos équipes !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment le planning partagé BATUTA peut transformer votre organisation
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

export default PlanningPartage;