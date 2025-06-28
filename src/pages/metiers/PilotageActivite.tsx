import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Target,
  Activity,
  DollarSign,
  Gauge
} from 'lucide-react';

const PilotageActivite = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Tableaux de Bord",
      description: "Visualisation en temps réel de tous vos indicateurs de performance clés."
    },
    {
      icon: TrendingUp,
      title: "Analyse Tendances",
      description: "Suivi des évolutions et identification des tendances de votre activité."
    },
    {
      icon: Target,
      title: "Objectifs & KPIs",
      description: "Définition et suivi des objectifs avec indicateurs personnalisés."
    },
    {
      icon: Activity,
      title: "Monitoring Temps Réel",
      description: "Surveillance continue de l'activité avec alertes automatiques."
    },
    {
      icon: DollarSign,
      title: "Performance Financière",
      description: "Analyse de la rentabilité et du chiffre d'affaires par période."
    },
    {
      icon: Gauge,
      title: "Reporting Avancé",
      description: "Génération automatique de rapports détaillés et personnalisables."
    }
  ];

  const kpis = [
    "Chiffre d'affaires",
    "Nombre d'interventions",
    "Taux de satisfaction client",
    "Temps moyen d'intervention",
    "Marge bénéficiaire",
    "Taux de conversion devis",
    "Productivité équipes",
    "Délai moyen de paiement",
    "Coût d'acquisition client",
    "Taux de fidélisation"
  ];

  const testimonial = {
    name: "Sophie Dubois",
    role: "Dirigeante Entreprise Service - 15 ans d'expérience",
    content: "BATUTA m'offre une vision 360° de mon activité. Les tableaux de bord me permettent de prendre les bonnes décisions rapidement !",
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
                Pilotage d'Activité
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pilotez votre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">activité</span> en temps réel
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Prenez les bonnes décisions grâce à des tableaux de bord intelligents, 
                des KPIs personnalisés et des analyses approfondies de votre performance.
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
                  <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Tableau de Bord Activité</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-gray-900">CA ce mois</span>
                    </div>
                    <span className="text-green-600 font-bold">+15%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-semibold text-gray-900">Interventions</span>
                    </div>
                    <span className="text-blue-600 font-bold">142</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="font-semibold text-gray-900">Satisfaction</span>
                    </div>
                    <span className="text-purple-600 font-bold">4.8/5</span>
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
              Fonctionnalités de pilotage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants pour analyser, comprendre et optimiser votre activité
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

      {/* KPIs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Tous vos KPIs en un coup d'œil
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BATUTA centralise tous vos indicateurs de performance pour vous donner 
                une vision complète et actionnable de votre activité.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kpis.map((kpi, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{kpi}</span>
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
              <div className="text-3xl font-bold text-gray-900 mb-2">Temps réel</div>
              <p className="text-gray-600">mise à jour des données et indicateurs</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">de visibilité sur votre activité</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <p className="text-gray-600">KPIs et métriques disponibles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prenez le contrôle de votre activité !
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment BATUTA peut transformer votre pilotage d'entreprise
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

export default PilotageActivite;