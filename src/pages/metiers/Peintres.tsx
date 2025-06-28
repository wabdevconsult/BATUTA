import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PaintBucket, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Palette,
  Brush,
  Home
} from 'lucide-react';

const Peintres = () => {
  const features = [
    {
      icon: PaintBucket,
      title: "Gestion Chantiers Peinture",
      description: "Suivi complet des chantiers de peinture intérieure et extérieure."
    },
    {
      icon: Calendar,
      title: "Planning Saisonnier",
      description: "Planification optimisée selon les conditions météorologiques."
    },
    {
      icon: FileText,
      title: "Devis Peinture",
      description: "Bibliothèque de prix peinture et templates spécialisés."
    },
    {
      icon: MapPin,
      title: "Suivi Chantiers",
      description: "Géolocalisation et suivi de l'avancement des travaux."
    },
    {
      icon: Users,
      title: "Équipes Peintres",
      description: "Coordination des équipes et répartition des chantiers."
    },
    {
      icon: BarChart3,
      title: "Stock Matériel",
      description: "Gestion des stocks de peinture, pinceaux et matériel."
    }
  ];

  const paintingServices = [
    "Peinture intérieure",
    "Peinture extérieure",
    "Ravalement de façade",
    "Papier peint",
    "Enduits décoratifs",
    "Peinture industrielle",
    "Lasure et vernis",
    "Préparation supports",
    "Isolation thermique",
    "Décoration murale"
  ];

  const testimonial = {
    name: "Antoine Dubois",
    role: "Peintre - 15 ans d'expérience",
    content: "BATUTA m'aide à planifier mes chantiers selon la météo et à gérer mes stocks de peinture. Un outil indispensable !",
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
                Peintres
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM spécialisé pour les <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">peintres</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez vos chantiers de peinture avec notre solution complète : 
                planning météo, gestion des stocks, suivi des travaux et coordination d'équipes.
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
                  <PaintBucket className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Peintre</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">9h00 - Peinture salon</div>
                      <div className="text-sm text-gray-600">Maison Dupont - 12 rue des Roses</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h00 - Ravalement façade</div>
                      <div className="text-sm text-gray-600">Immeuble Martin - Avenue des Tilleuls</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">16h30 - Devis décoration</div>
                      <div className="text-sm text-gray-600">Villa Leroy - Lotissement du Parc</div>
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
              Fonctionnalités métier peintre
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour optimiser votre activité de peinture
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
                Tous vos services de peinture
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA s'adapte à tous les types de travaux de peinture, 
                de la décoration intérieure au ravalement de façade.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paintingServices.map((service, index) => (
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
            <div className="bg-orange-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
              <p className="text-gray-600">de temps gagné grâce au planning météo</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">90%</div>
              <p className="text-gray-600">de satisfaction client avec le suivi en temps réel</p>
            </div>
            <div className="bg-red-50 rounded-xl p-8">
              <Palette className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
              <p className="text-gray-600">d'optimisation des stocks de peinture</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Colorez votre succès !
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les peintres qui ont choisi BATUTA pour optimiser leur activité
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

export default Peintres;