import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TreePine, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Flower,
  Scissors,
  Sprout
} from 'lucide-react';

const Paysagistes = () => {
  const features = [
    {
      icon: TreePine,
      title: "Gestion Espaces Verts",
      description: "Planification et suivi de l'entretien des espaces verts et jardins."
    },
    {
      icon: Calendar,
      title: "Planning Saisonnier",
      description: "Organisation des interventions selon les saisons et cycles végétaux."
    },
    {
      icon: FileText,
      title: "Devis Paysagers",
      description: "Bibliothèque de prix végétaux et templates de devis spécialisés."
    },
    {
      icon: MapPin,
      title: "Cartographie Terrains",
      description: "Géolocalisation et suivi de tous vos chantiers paysagers."
    },
    {
      icon: Users,
      title: "Équipes Jardiniers",
      description: "Coordination des équipes et répartition des zones d'intervention."
    },
    {
      icon: BarChart3,
      title: "Suivi Végétaux",
      description: "Monitoring de la croissance et santé des plantations."
    }
  ];

  const paysagistesServices = [
    "Création de jardins",
    "Entretien espaces verts",
    "Élagage et taille",
    "Plantation arbres/arbustes",
    "Aménagement paysager",
    "Système d'arrosage",
    "Engazonnement",
    "Taille de haies",
    "Débroussaillage",
    "Conception paysagère"
  ];

  const testimonial = {
    name: "Antoine Dubois",
    role: "Paysagiste - 18 ans d'expérience",
    content: "BATUTA m'aide à planifier mes interventions selon les saisons et à suivre l'évolution de mes plantations. Un outil indispensable !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Paysagistes
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM spécialisé pour les <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">paysagistes</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Gérez vos projets paysagers avec notre solution complète : 
                planning saisonnier, suivi des plantations, gestion d'équipes et facturation spécialisée.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
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
                  <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Paysagiste</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">8h00 - Taille de haies</div>
                      <div className="text-sm text-gray-600">Résidence Les Jardins - 12 rue des Roses</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">10h30 - Plantation arbustes</div>
                      <div className="text-sm text-gray-600">Villa Moreau - Lotissement du Parc</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h00 - Devis aménagement</div>
                      <div className="text-sm text-gray-600">Maison Durand - 45 avenue des Tilleuls</div>
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
              Fonctionnalités métier paysagiste
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour optimiser votre activité de paysagiste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Tous vos services paysagers
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA s'adapte à tous les types de prestations paysagères, 
                de la création à l'entretien d'espaces verts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paysagistesServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
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
            <div className="bg-green-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
              <p className="text-gray-600">de temps gagné sur la planification saisonnière</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <p className="text-gray-600">de réussite des plantations grâce au suivi</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <Sprout className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">40%</div>
              <p className="text-gray-600">d'augmentation de la productivité des équipes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Cultivez votre succès !
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les paysagistes qui ont choisi BATUTA pour faire fleurir leur activité
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

export default Paysagistes;