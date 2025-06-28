import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Zap,
  Battery,
  Home,
  TrendingUp
} from 'lucide-react';

const Photovoltaiques = () => {
  const features = [
    {
      icon: Sun,
      title: "Installation Solaire",
      description: "Gestion complète des projets d'installation photovoltaïque résidentiel et commercial."
    },
    {
      icon: Calendar,
      title: "Planning Installations",
      description: "Planification optimisée des installations selon les conditions météorologiques."
    },
    {
      icon: FileText,
      title: "Devis Photovoltaïque",
      description: "Configurateur automatique de devis avec calcul de rentabilité."
    },
    {
      icon: MapPin,
      title: "Étude d'Ensoleillement",
      description: "Cartographie et analyse des sites d'installation photovoltaïque."
    },
    {
      icon: Users,
      title: "Équipes RGE",
      description: "Gestion des techniciens certifiés RGE et qualifications QualiPV."
    },
    {
      icon: BarChart3,
      title: "Monitoring Production",
      description: "Suivi des performances et maintenance préventive des installations."
    }
  ];

  const photovoltaiqueServices = [
    "Installation panneaux solaires",
    "Onduleurs et optimiseurs",
    "Système de stockage batterie",
    "Autoconsommation",
    "Vente surplus EDF",
    "Maintenance préventive",
    "Monitoring à distance",
    "Certification RGE",
    "Étude de faisabilité",
    "Démarches administratives"
  ];

  const testimonial = {
    name: "Antoine Dubois",
    role: "Installateur Photovoltaïque RGE",
    content: "BATUTA m'a permis de doubler mon activité photovoltaïque. Le configurateur de devis et le suivi des installations sont parfaits !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Photovoltaïque
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM pour les installateurs <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">photovoltaïques</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Développez votre activité photovoltaïque avec notre solution complète : 
                configurateur de devis, gestion RGE, monitoring des installations et suivi de production.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Essayer gratuitement</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <Sun className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Tableau de Bord Solaire</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">15 installations ce mois</div>
                      <div className="text-sm text-gray-600">450 kWc installés</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Production totale</div>
                      <div className="text-sm text-gray-600">2,850 MWh générés</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Maintenance planifiée</div>
                      <div className="text-sm text-gray-600">8 sites à contrôler</div>
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
              Fonctionnalités spécialisées photovoltaïque
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils conçus spécifiquement pour les professionnels du solaire photovoltaïque
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Tous vos services photovoltaïques
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                De l'étude de faisabilité à la maintenance, BATUTA couvre tous les aspects 
                de votre activité photovoltaïque.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photovoltaiqueServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
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
            <div className="bg-yellow-50 rounded-xl p-8">
              <Battery className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <p className="text-gray-600">installations photovoltaïques réalisées</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">conformité certifications RGE</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-8">
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
              <p className="text-gray-600">d'augmentation du chiffre d'affaires moyen</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Illuminez votre business solaire !
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les installateurs photovoltaïques qui développent leur activité avec BATUTA
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Démarrer mon essai gratuit
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir autres métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Photovoltaiques;