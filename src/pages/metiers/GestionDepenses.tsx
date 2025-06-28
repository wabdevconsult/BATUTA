import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  CreditCard,
  Receipt,
  TrendingUp,
  Calculator
} from 'lucide-react';

const GestionDepenses = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Suivi des Dépenses",
      description: "Enregistrement et catégorisation automatique de toutes vos dépenses professionnelles."
    },
    {
      icon: Calendar,
      title: "Planning Budgétaire",
      description: "Planification et suivi des budgets par projet et période."
    },
    {
      icon: FileText,
      title: "Factures Fournisseurs",
      description: "Gestion complète des factures fournisseurs et notes de frais."
    },
    {
      icon: Receipt,
      title: "Notes de Frais",
      description: "Saisie mobile des notes de frais avec scan automatique des reçus."
    },
    {
      icon: Users,
      title: "Validation Hiérarchique",
      description: "Workflow de validation des dépenses avec approbation multi-niveaux."
    },
    {
      icon: BarChart3,
      title: "Reporting Financier",
      description: "Tableaux de bord et analyses détaillées des dépenses par catégorie."
    }
  ];

  const depenseServices = [
    "Saisie notes de frais",
    "Scan automatique reçus",
    "Catégorisation dépenses",
    "Validation workflow",
    "Rapprochement bancaire",
    "Export comptable",
    "Budgets prévisionnels",
    "Alertes dépassement",
    "Analyse rentabilité",
    "Reporting fiscal"
  ];

  const testimonial = {
    name: "Sophie Martin",
    role: "Directrice Administrative - Entreprise BTP",
    content: "BATUTA a révolutionné notre gestion des dépenses. Fini la paperasse, tout est digitalisé et automatisé. Un gain de temps énorme !",
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
                Gestion des Dépenses
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Maîtrisez vos <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">dépenses professionnelles</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Simplifiez la gestion de vos dépenses avec notre solution complète : 
                saisie mobile, validation automatique, reporting en temps réel et export comptable.
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
                  <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Tableau de Bord Dépenses</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Dépenses ce mois</div>
                      <div className="text-sm text-gray-600">8 450€ sur 10 000€ budgétés</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Notes en attente</div>
                      <div className="text-sm text-gray-600">12 notes à valider</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Économies réalisées</div>
                      <div className="text-sm text-gray-600">1 200€ vs mois dernier</div>
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
              Fonctionnalités gestion des dépenses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants pour optimiser et contrôler vos dépenses professionnelles
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
                Toutes vos dépenses sous contrôle
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA centralise et automatise la gestion de toutes vos dépenses professionnelles, 
                de la saisie à l'export comptable.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {depenseServices.map((service, index) => (
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
            <div className="bg-green-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">75%</div>
              <p className="text-gray-600">de temps gagné sur la gestion des notes de frais</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de conformité avec la réglementation fiscale</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-8">
              <TrendingUp className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">20%</div>
              <p className="text-gray-600">d'économies réalisées grâce au contrôle budgétaire</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Optimisez vos dépenses dès aujourd'hui !
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises qui ont choisi BATUTA pour maîtriser leurs dépenses
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
              Découvrir autres fonctionnalités
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GestionDepenses;