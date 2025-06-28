import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calculator, 
  FileText, 
  Calendar, 
  BarChart3, 
  CreditCard,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Smartphone
} from 'lucide-react';

const AutoEntrepreneurs = () => {
  const features = [
    {
      icon: Calculator,
      title: "Facturation Simplifiée",
      description: "Créez vos factures en quelques clics avec calcul automatique des charges et TVA."
    },
    {
      icon: Calendar,
      title: "Planning Personnel",
      description: "Organisez vos rendez-vous clients et optimisez votre emploi du temps."
    },
    {
      icon: BarChart3,
      title: "Suivi CA & Charges",
      description: "Tableau de bord en temps réel de votre chiffre d'affaires et seuils auto-entrepreneur."
    },
    {
      icon: FileText,
      title: "Devis Professionnels",
      description: "Templates de devis personnalisables pour valoriser votre expertise."
    },
    {
      icon: CreditCard,
      title: "Encaissement Rapide",
      description: "Liens de paiement sécurisés pour être payé immédiatement."
    },
    {
      icon: Users,
      title: "CRM Client",
      description: "Gérez facilement votre portefeuille client et l'historique des prestations."
    }
  ];

  const benefits = [
    "Respectez automatiquement les seuils de CA auto-entrepreneur",
    "Édition conforme des factures avec mentions obligatoires",
    "Calcul automatique des cotisations URSSAF",
    "Export comptable pour votre expert-comptable",
    "Relances automatiques des impayés",
    "Tableau de bord fiscal en temps réel"
  ];

  const testimonial = {
    name: "Sarah Dubois",
    role: "Consultante Marketing Digital",
    content: "BATUTA m'a fait gagner 5h par semaine sur ma gestion administrative. Les seuils auto-entrepreneur sont surveillés automatiquement !",
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
                Auto-Entrepreneurs
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Le CRM pensé pour les <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">auto-entrepreneurs</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Gérez votre activité d'auto-entrepreneur en toute simplicité. Facturation, suivi des seuils, 
                planning client... tout ce dont vous avez besoin dans un seul outil.
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
                  <h3 className="text-xl font-semibold text-gray-900">Tableau de Bord Auto-Entrepreneur</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">CA réalisé 2024</span>
                    <span className="font-semibold text-gray-900">42 850 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Seuil restant</span>
                    <span className="font-semibold text-green-600">29 650 €</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-600">Cotisations dues</span>
                    <span className="font-semibold text-blue-600">3 428 €</span>
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
              Fonctionnalités spécialisées auto-entrepreneur
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils conçus spécifiquement pour répondre aux besoins des auto-entrepreneurs
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
                Conformité auto-entrepreneur garantie
              </h2>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
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

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-blue-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">5h</div>
              <p className="text-gray-600">gagnées par semaine sur la gestion administrative</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">conformité avec la réglementation auto-entrepreneur</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <p className="text-gray-600">accès mobile pour gérer votre activité partout</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Développez votre activité d'auto-entrepreneur
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'auto-entrepreneurs qui utilisent BATUTA pour simplifier leur gestion
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Commencer gratuitement
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir tous les métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AutoEntrepreneurs;