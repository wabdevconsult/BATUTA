import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  Users, 
  MapPin, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Download,
  Upload,
  Printer,
  AlertCircle
} from 'lucide-react';

const Cerfa15497 = () => {
  const features = [
    {
      icon: FileText,
      title: "Génération Automatique",
      description: "Création automatique du formulaire CERFA 15497 avec vos données client."
    },
    {
      icon: Calendar,
      title: "Suivi des Échéances",
      description: "Rappels automatiques pour les déclarations et renouvellements."
    },
    {
      icon: Users,
      title: "Gestion Multi-Clients",
      description: "Suivi centralisé de tous vos dossiers CERFA par client."
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Localisation précise des installations pour les déclarations."
    },
    {
      icon: BarChart3,
      title: "Tableaux de Bord",
      description: "Suivi des déclarations en cours et des échéances à venir."
    },
    {
      icon: Shield,
      title: "Conformité Garantie",
      description: "Respect automatique des exigences réglementaires en vigueur."
    }
  ];

  const cerfaServices = [
    "Déclaration préalable travaux",
    "Installation équipements",
    "Modification installations",
    "Mise en conformité",
    "Renouvellement déclarations",
    "Archivage numérique",
    "Suivi administratif",
    "Rappels automatiques",
    "Export PDF sécurisé",
    "Transmission dématérialisée"
  ];

  const testimonial = {
    name: "Philippe Moreau",
    role: "Installateur Équipements - 15 ans d'expérience",
    content: "BATUTA simplifie énormément la gestion des CERFA 15497. Plus d'oubli de déclaration grâce aux rappels automatiques !",
    rating: 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                CERFA 15497
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Gestion simplifiée des <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">CERFA 15497</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Automatisez la création et le suivi de vos déclarations CERFA 15497. 
                Génération automatique, rappels d'échéances et conformité réglementaire garantie.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/metiers/demander-devis"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center space-x-2"
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
                  <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Tableau de Bord CERFA</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">12 déclarations validées</div>
                      <div className="text-sm text-gray-600">Ce mois-ci</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">3 échéances à venir</div>
                      <div className="text-sm text-gray-600">Dans les 30 jours</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">5 dossiers en cours</div>
                      <div className="text-sm text-gray-600">En attente de validation</div>
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
              Fonctionnalités CERFA 15497
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialement conçus pour simplifier vos déclarations administratives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
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
                Gestion complète des CERFA
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA automatise toute la gestion de vos déclarations CERFA 15497, 
                de la création à l'archivage en passant par le suivi des échéances.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cerfaServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
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

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Processus simplifié
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la saisie à la transmission, tout est automatisé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Saisie</h3>
              <p className="text-gray-600">Remplissage automatique avec vos données client</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Validation</h3>
              <p className="text-gray-600">Vérification automatique de la conformité</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Génération</h3>
              <p className="text-gray-600">Export PDF prêt pour transmission</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Suivi</h3>
              <p className="text-gray-600">Rappels automatiques des échéances</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl p-8">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">90%</div>
              <p className="text-gray-600">de temps gagné sur la création des CERFA</p>
            </div>
            <div className="bg-white rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de conformité réglementaire garantie</p>
            </div>
            <div className="bg-white rounded-xl p-8">
              <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
              <p className="text-gray-600">échéance oubliée grâce aux rappels</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Simplifiez vos déclarations CERFA !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Automatisez la gestion de vos CERFA 15497 et ne ratez plus jamais une échéance
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

export default Cerfa15497;