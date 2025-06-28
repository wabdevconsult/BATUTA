import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  FileText, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  BarChart3,
  MessageCircle,
  Star,
  Search
} from 'lucide-react';

const CrmClients = () => {
  const features = [
    {
      icon: Users,
      title: "Base de Données Clients",
      description: "Centralisez toutes les informations de vos clients dans une base de données unifiée."
    },
    {
      icon: Calendar,
      title: "Historique Complet",
      description: "Accédez à l'historique complet des interactions et interventions par client."
    },
    {
      icon: FileText,
      title: "Documents Clients",
      description: "Stockage et organisation de tous les documents clients (contrats, factures, photos)."
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Localisation automatique des clients et optimisation des tournées."
    },
    {
      icon: Phone,
      title: "Communication Intégrée",
      description: "Appels, SMS et emails directement depuis la fiche client."
    },
    {
      icon: BarChart3,
      title: "Analyse Client",
      description: "Tableaux de bord et analyses pour mieux comprendre votre clientèle."
    }
  ];

  const crmBenefits = [
    "Fiche client complète avec toutes les informations",
    "Historique des interventions et communications",
    "Gestion des contacts multiples par client",
    "Segmentation et catégorisation des clients",
    "Suivi des opportunités commerciales",
    "Relances automatiques et rappels",
    "Synchronisation avec votre téléphone",
    "Sauvegarde automatique dans le cloud",
    "Accès mobile pour vos équipes",
    "Rapports de satisfaction client"
  ];

  const testimonial = {
    name: "Sophie Martin",
    role: "Dirigeante Entreprise de Services",
    content: "Le CRM de BATUTA nous a permis de doubler notre taux de fidélisation client. Nous n'oublions plus aucun suivi !",
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
                CRM Clients
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Gérez vos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">clients</span> comme un pro
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Centralisez toutes vos informations clients, suivez vos interactions et développez 
                des relations durables avec notre CRM intégré.
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
                  <h3 className="text-xl font-semibold text-gray-900">Fiche Client</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">MD</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Marie Dubois</div>
                      <div className="text-sm text-gray-600">Cliente depuis 2 ans - 15 interventions</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>06 12 34 56 78</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>marie@email.com</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>12 rue des Roses, 75001 Paris</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Satisfaction:</span>
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
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
              Fonctionnalités CRM avancées
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tous les outils nécessaires pour gérer efficacement votre relation client
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

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Tout ce dont vous avez besoin pour vos clients
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Notre CRM vous offre une vision complète de vos clients et vous aide 
                à développer des relations durables et profitables.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crmBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
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
            <div className="bg-blue-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50%</div>
              <p className="text-gray-600">de temps gagné sur la gestion client</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <p className="text-gray-600">de satisfaction client améliorée</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
              <p className="text-gray-600">d'augmentation du taux de fidélisation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Transformez votre relation client !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les professionnels qui ont choisi BATUTA pour développer leur portefeuille client
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

export default CrmClients;