import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Wrench,
  Hammer,
  PaintBucket,
  Zap
} from 'lucide-react';

const TousCorpsEtat = () => {
  const features = [
    {
      icon: Building,
      title: "Coordination Chantiers",
      description: "Coordination de tous les corps d'état sur vos chantiers multi-métiers."
    },
    {
      icon: Calendar,
      title: "Planning Multi-Équipes",
      description: "Planification synchronisée de toutes vos équipes spécialisées."
    },
    {
      icon: FileText,
      title: "Devis Globaux",
      description: "Création de devis complets intégrant tous les corps d'état."
    },
    {
      icon: MapPin,
      title: "Suivi Chantiers",
      description: "Géolocalisation et suivi en temps réel de l'avancement des travaux."
    },
    {
      icon: Users,
      title: "Gestion Sous-Traitants",
      description: "Coordination des sous-traitants et partenaires spécialisés."
    },
    {
      icon: BarChart3,
      title: "Pilotage Global",
      description: "Tableaux de bord consolidés pour le pilotage de l'activité."
    }
  ];

  const corpsEtatServices = [
    "Gros œuvre",
    "Électricité",
    "Plomberie",
    "Chauffage",
    "Menuiserie",
    "Peinture",
    "Carrelage",
    "Isolation",
    "Couverture",
    "Cloisons",
    "Revêtements sols",
    "Aménagements extérieurs"
  ];

  const testimonial = {
    name: "Jean-Pierre Moreau",
    role: "Dirigeant Entreprise Générale - 25 ans d'expérience",
    content: "BATUTA nous permet de coordonner parfaitement nos 15 corps d'état. La visibilité sur tous les chantiers est exceptionnelle !",
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
                Tous Corps d'État
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                CRM pour entreprises <span className="bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent">tous corps d'état</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Coordonnez tous vos métiers du bâtiment avec notre solution complète : 
                gestion multi-équipes, planning synchronisé, suivi de chantiers et pilotage global.
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
                  <Building className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Multi-Corps d'État</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Équipe Électricité</div>
                      <div className="text-sm text-gray-600">Chantier Villa Dupont - Phase 2</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Équipe Plomberie</div>
                      <div className="text-sm text-gray-600">Résidence Martin - Bâtiment A</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Équipe Menuiserie</div>
                      <div className="text-sm text-gray-600">Maison Leroy - Finitions</div>
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
              Fonctionnalités tous corps d'état
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour coordonner tous vos métiers du bâtiment
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
                Tous les corps d'état du bâtiment
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA coordonne l'ensemble des métiers du bâtiment, 
                du gros œuvre aux finitions les plus spécialisées.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {corpsEtatServices.map((service, index) => (
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
                  <span className="text-white font-bold text-lg">JP</span>
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
              <p className="text-gray-600">de réduction des délais de chantier</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de traçabilité sur tous les corps d'état</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <p className="text-gray-600">corps d'état coordonnés simultanément</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Coordonnez tous vos métiers !
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises générales qui ont choisi BATUTA pour coordonner leurs chantiers
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

export default TousCorpsEtat;