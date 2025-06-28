import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  FileText, 
  MapPin, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Settings,
  UserCheck,
  Award,
  Briefcase
} from 'lucide-react';

const GestionTechniciens = () => {
  const features = [
    {
      icon: Users,
      title: "Équipes Mobiles",
      description: "Gestion complète de vos équipes de techniciens et coordination des interventions."
    },
    {
      icon: Calendar,
      title: "Planning Équipes",
      description: "Planification optimisée des interventions selon les compétences et disponibilités."
    },
    {
      icon: FileText,
      title: "Compétences & Certifications",
      description: "Suivi des qualifications, certifications et formations de vos techniciens."
    },
    {
      icon: MapPin,
      title: "Géolocalisation Temps Réel",
      description: "Suivi GPS des techniciens et optimisation des tournées quotidiennes."
    },
    {
      icon: BarChart3,
      title: "Performance Équipes",
      description: "Tableaux de bord de performance et indicateurs de productivité."
    },
    {
      icon: Settings,
      title: "Gestion Administrative",
      description: "Gestion des contrats, congés, heures supplémentaires et paie."
    }
  ];

  const gestionServices = [
    "Planification des équipes",
    "Suivi des compétences",
    "Gestion des certifications",
    "Optimisation des tournées",
    "Reporting de performance",
    "Gestion des congés",
    "Suivi des heures",
    "Formation continue",
    "Évaluation des techniciens",
    "Coordination multi-sites"
  ];

  const testimonial = {
    name: "Sophie Moreau",
    role: "Responsable RH - Entreprise Multi-Services",
    content: "BATUTA nous a permis d'optimiser la gestion de nos 25 techniciens. Le suivi des compétences et la planification sont parfaitement intégrés !",
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
                Gestion Techniciens
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Optimisez la gestion de vos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">équipes techniques</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Gérez efficacement vos techniciens avec notre solution complète : 
                planning équipes, suivi des compétences, géolocalisation et performance en temps réel.
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
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Tableau de Bord Équipes</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">8 techniciens actifs</div>
                      <div className="text-sm text-gray-600">En intervention</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">12 interventions planifiées</div>
                      <div className="text-sm text-gray-600">Aujourd'hui</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">3 certifications à renouveler</div>
                      <div className="text-sm text-gray-600">Ce mois-ci</div>
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
              Fonctionnalités gestion techniciens
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils complets pour optimiser la gestion de vos équipes techniques
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
                Gestion complète de vos équipes
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA centralise tous les aspects de la gestion de vos techniciens, 
                de la planification à l'évaluation des performances.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gestionServices.map((service, index) => (
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
              <div className="text-3xl font-bold text-gray-900 mb-2">40%</div>
              <p className="text-gray-600">de temps gagné sur la planification des équipes</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de traçabilité des compétences et certifications</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
              <p className="text-gray-600">d'amélioration de la productivité des équipes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Optimisez la gestion de vos équipes !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises qui ont choisi BATUTA pour gérer efficacement leurs techniciens
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

export default GestionTechniciens;