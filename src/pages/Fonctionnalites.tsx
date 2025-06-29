import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users,
  Calendar,
  FileText,
  CreditCard,
  BarChart3,
  MapPin,
  Bell,
  Shield,
  Smartphone,
  Cloud,
  Zap,
  Settings,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Fonctionnalites = () => {
  const features = [
    {
      category: "Gestion Client",
      color: "from-blue-500 to-blue-600",
      items: [
        {
          icon: Users,
          title: "CRM Complet",
          description: "Centralisez toutes vos informations clients, historiques et communications",
          benefits: ["Fiche client complète", "Historique des interventions", "Notes et documents"]
        },
        {
          icon: Smartphone,
          title: "Portail Client",
          description: "Offrez une expérience digitale moderne à vos clients",
          benefits: ["Suivi en temps réel", "Validation des devis", "Historique des factures"]
        }
      ]
    },
    {
      category: "Planning & Organisation",
      color: "from-green-500 to-green-600",
      items: [
        {
          icon: Calendar,
          title: "Planning Intelligent",
          description: "Optimisez vos tournées et gérez les rendez-vous efficacement",
          benefits: ["Optimisation des trajets", "Synchronisation équipes", "Alertes automatiques"]
        },
        {
          icon: MapPin,
          title: "Géolocalisation",
          description: "Horodatage et géolocalisation des interventions",
          benefits: ["Preuves de passage", "Calcul automatique des trajets", "Reporting géographique"]
        }
      ]
    },
    {
      category: "Commercial & Facturation",
      color: "from-purple-500 to-purple-600",
      items: [
        {
          icon: FileText,
          title: "Devis & Factures",
          description: "Créez et gérez tous vos documents commerciaux",
          benefits: ["Templates personnalisables", "Envoi automatique", "Suivi des paiements"]
        },
        {
          icon: CreditCard,
          title: "Paiement en Ligne",
          description: "Encaissement direct via Stripe et liens de paiement sécurisés",
          benefits: ["Paiement immédiat", "Réduction des impayés", "Réconciliation automatique"]
        }
      ]
    },
    {
      category: "Pilotage & Analytics",
      color: "from-orange-500 to-orange-600",
      items: [
        {
          icon: BarChart3,
          title: "Tableaux de Bord",
          description: "Pilotez votre activité avec des indicateurs en temps réel",
          benefits: ["KPIs personnalisés", "Reporting automatique", "Vision 360° de l'activité"]
        },
        {
          icon: Bell,
          title: "Notifications",
          description: "Restez informé de tous les événements importants",
          benefits: ["Alertes temps réel", "Notifications push", "Emails automatiques"]
        }
      ]
    },
    {
      category: "Sécurité & Performance",
      color: "from-red-500 to-red-600",
      items: [
        {
          icon: Shield,
          title: "Sécurité Avancée",
          description: "Protection maximale de vos données sensibles",
          benefits: ["Chiffrement SSL/TLS", "Sauvegardes automatiques", "Conformité RGPD"]
        },
        {
          icon: Cloud,
          title: "Cloud Natif",
          description: "Accès depuis n'importe où, synchronisation temps réel",
          benefits: ["99.9% de disponibilité", "Mise à jour automatique", "Support multi-appareils"]
        }
      ]
    },
    {
      category: "Automatisation",
      color: "from-teal-500 to-teal-600",
      items: [
        {
          icon: Zap,
          title: "Workflows Automatisés",
          description: "Automatisez vos tâches répétitives et gagnez du temps",
          benefits: ["Relances automatiques", "Assignation intelligente", "Mise à jour des statuts"]
        },
        {
          icon: Settings,
          title: "Intégrations",
          description: "Connectez BATUTA avec vos outils existants",
          benefits: ["API ouverte", "Connecteurs métier", "Synchronisation bidirectionnelle"]
        }
      ]
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Configuration",
      description: "Paramétrez BATUTA selon vos besoins métier en quelques minutes"
    },
    {
      number: "02",
      title: "Import des données",
      description: "Migrez facilement vos données existantes depuis vos anciens outils"
    },
    {
      number: "03",
      title: "Formation",
      description: "Accompagnement personnalisé pour maîtriser toutes les fonctionnalités"
    },
    {
      number: "04",
      title: "Déploiement",
      description: "Mise en production progressive avec support technique dédié"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fonctionnalités <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">complètes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Découvrez toutes les fonctionnalités qui font de BATUTA l'outil indispensable 
              pour développer votre activité professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="text-center mb-12">
                  <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${category.color} text-white font-semibold mb-4`}>
                    {category.category}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                      <div className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {item.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Démarrage en 4 étapes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus d'onboarding simplifié pour être opérationnel rapidement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à découvrir BATUTA ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Testez toutes nos fonctionnalités gratuitement pendant 30 jours
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/auth/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Essayer gratuitement</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fonctionnalites;