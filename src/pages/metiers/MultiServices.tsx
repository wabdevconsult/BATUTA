import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
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
  Star
} from 'lucide-react';

const MultiServices = () => {
  const features = [
    {
      icon: Wrench,
      title: "Gestion Multi-Métiers",
      description: "Organisez tous vos services dans une seule interface : plomberie, électricité, jardinage..."
    },
    {
      icon: Calendar,
      title: "Planning Unifié",
      description: "Planification centralisée de toutes vos interventions multi-services."
    },
    {
      icon: FileText,
      title: "Devis Polyvalents",
      description: "Créez des devis combinant plusieurs prestations en un seul document."
    },
    {
      icon: MapPin,
      title: "Tournées Optimisées",
      description: "Optimisation des déplacements pour vos interventions diversifiées."
    },
    {
      icon: Users,
      title: "Équipes Polyvalentes",
      description: "Gestion des compétences multiples de vos techniciens."
    },
    {
      icon: BarChart3,
      title: "Suivi Global",
      description: "Tableau de bord unifié pour tous vos services et activités."
    }
  ];

  const multiServices = [
    "Plomberie générale",
    "Électricité domestique",
    "Jardinage et espaces verts",
    "Petits travaux de maçonnerie",
    "Peinture et décoration",
    "Montage de meubles",
    "Dépannage urgent",
    "Nettoyage et entretien",
    "Bricolage général",
    "Maintenance préventive"
  ];

  const testimonial = {
    name: "Marc Dubois",
    role: "Gérant Multi-Services - 10 ans d'expérience",
    content: "BATUTA m'a permis de structurer mon activité multi-services. Je peux maintenant gérer tous mes métiers dans un seul outil !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Multi-Services
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM pour les <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">multi-services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Gérez tous vos métiers dans une seule solution : plomberie, électricité, jardinage, bricolage... 
                Planning unifié, devis polyvalents et suivi global de votre activité.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Wrench className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Multi-Services</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">9h00 - Plomberie</div>
                      <div className="text-sm text-gray-600">Réparation fuite - Maison Dupont</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">11h30 - Jardinage</div>
                      <div className="text-sm text-gray-600">Taille haies - Villa Martin</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h00 - Électricité</div>
                      <div className="text-sm text-gray-600">Installation prises - Appartement Leroy</div>
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
              Fonctionnalités multi-services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils conçus pour gérer la diversité de vos prestations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Tous vos services en un seul endroit
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA s'adapte à la polyvalence de votre activité multi-services. 
                Gérez tous vos métiers avec une solution unique et intégrée.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {multiServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
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
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
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
            <div className="bg-green-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50%</div>
              <p className="text-gray-600">de temps gagné sur l'organisation multi-métiers</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de visibilité sur toutes vos activités</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-8">
              <Settings className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">35%</div>
              <p className="text-gray-600">d'augmentation du chiffre d'affaires</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Unifiez tous vos services !
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les professionnels multi-services qui ont choisi BATUTA pour structurer leur activité
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir autres métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultiServices;