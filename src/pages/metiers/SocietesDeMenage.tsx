import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, FileText, MapPin, Users, BarChart3, CheckCircle, ArrowRight, Clock, Shield, Home, Building, SprayCan as Spray } from 'lucide-react';

const SocietesDeMenage = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Gestion Contrats",
      description: "Suivi des contrats de nettoyage réguliers et ponctuels."
    },
    {
      icon: Calendar,
      title: "Planning Équipes",
      description: "Planification optimisée des équipes de nettoyage et rotations."
    },
    {
      icon: FileText,
      title: "Devis Ménage",
      description: "Templates de devis pour tous types de prestations de nettoyage."
    },
    {
      icon: MapPin,
      title: "Tournées Optimisées",
      description: "Calcul des meilleurs itinéraires pour vos équipes mobiles."
    },
    {
      icon: Users,
      title: "Gestion Personnel",
      description: "Coordination des équipes et suivi des compétences spécialisées."
    },
    {
      icon: BarChart3,
      title: "Suivi Qualité",
      description: "Contrôle qualité et satisfaction client en temps réel."
    }
  ];

  const menageServices = [
    "Nettoyage bureaux",
    "Nettoyage industriel",
    "Nettoyage résidentiel",
    "Nettoyage vitres",
    "Nettoyage après travaux",
    "Désinfection locaux",
    "Entretien sols",
    "Nettoyage tapis/moquettes",
    "Nettoyage copropriétés",
    "Services de conciergerie"
  ];

  const testimonial = {
    name: "Marie Dubois",
    role: "Dirigeante Société de Ménage - 12 ans d'expérience",
    content: "BATUTA nous a permis d'optimiser nos tournées et d'améliorer notre suivi qualité. Nos clients sont plus satisfaits !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Sociétés de Ménage
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM pour les <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">sociétés de ménage</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimisez vos services de nettoyage avec notre solution complète : 
                gestion des contrats, planning équipes, tournées optimisées et contrôle qualité.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Planning Ménage</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">8h00 - Bureau Techno</div>
                      <div className="text-sm text-gray-600">Équipe A - Nettoyage quotidien</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">10h30 - Résidence Dupont</div>
                      <div className="text-sm text-gray-600">Équipe B - Nettoyage hebdomadaire</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">14h00 - Usine Martin</div>
                      <div className="text-sm text-gray-600">Équipe C - Nettoyage industriel</div>
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
              Fonctionnalités métier ménage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour optimiser votre société de ménage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Tous vos services de nettoyage
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA s'adapte à tous les types de prestations de nettoyage, 
                du résidentiel à l'industriel.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menageServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
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
            <div className="bg-purple-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
              <p className="text-gray-600">de temps gagné sur l'organisation des tournées</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600">de satisfaction client grâce au suivi qualité</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-8">
              <Building className="h-12 w-12 text-pink-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">40%</div>
              <p className="text-gray-600">d'augmentation de la productivité des équipes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Nettoyez plus efficacement !
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les sociétés de ménage qui ont choisi BATUTA pour optimiser leur activité
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir autres métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocietesDeMenage;