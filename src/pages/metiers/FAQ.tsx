import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  MessageCircle, 
  Search, 
  ArrowRight, 
  Phone, 
  Mail, 
  CheckCircle,
  ThumbsUp,
  Clock,
  CreditCard,
  Users,
  Shield
} from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    {
      title: "Fonctionnalités",
      questions: [
        {
          question: "Quelles sont les principales fonctionnalités de BATUTA ?",
          answer: "BATUTA offre une suite complète de fonctionnalités pour les professionnels du service : gestion client, planning d'interventions, devis et factures, suivi de chantiers, gestion d'équipes, rapports d'intervention, signature électronique, et bien plus encore. Chaque métier bénéficie de fonctionnalités spécifiques adaptées à ses besoins."
        },
        {
          question: "BATUTA est-il adapté à mon métier spécifique ?",
          answer: "Oui, BATUTA est conçu pour s'adapter à plus de 25 métiers différents dans le secteur du service et de l'artisanat. Que vous soyez électricien, plombier, chauffagiste, paysagiste ou dans tout autre domaine, notre solution propose des fonctionnalités spécifiques à votre activité. Consultez notre page Métiers pour plus de détails."
        },
        {
          question: "Puis-je utiliser BATUTA sur mobile ?",
          answer: "Absolument ! BATUTA est entièrement responsive et disponible sur tous les appareils. Nous proposons également une application mobile dédiée pour iOS et Android, permettant à vos équipes d'accéder à toutes les fonctionnalités sur le terrain."
        }
      ]
    },
    {
      title: "Tarification",
      questions: [
        {
          question: "Combien coûte BATUTA ?",
          answer: "Nos tarifs démarrent à partir de 29€/mois pour la formule Essentiel. Nous proposons différentes formules adaptées à la taille de votre entreprise et à vos besoins spécifiques. Contactez-nous pour obtenir un devis personnalisé ou consultez notre page de tarification pour plus de détails."
        },
        {
          question: "Y a-t-il des frais d'installation ou de formation ?",
          answer: "Non, il n'y a aucun frais d'installation. La mise en place de BATUTA est simple et intuitive. Nous offrons une formation initiale gratuite incluse dans tous nos forfaits, ainsi qu'une assistance au paramétrage. Des formations avancées sont disponibles en option."
        },
        {
          question: "Proposez-vous une période d'essai gratuite ?",
          answer: "Oui, nous offrons une période d'essai gratuite de 30 jours avec accès à toutes les fonctionnalités. Aucune carte bancaire n'est requise pour démarrer votre essai. Vous pourrez ainsi tester BATUTA dans des conditions réelles avant de vous engager."
        }
      ]
    },
    {
      title: "Technique & Sécurité",
      questions: [
        {
          question: "Mes données sont-elles sécurisées avec BATUTA ?",
          answer: "La sécurité de vos données est notre priorité absolue. BATUTA utilise un chiffrement SSL/TLS pour toutes les communications, des sauvegardes automatiques quotidiennes, et nos serveurs sont hébergés dans des centres de données sécurisés en France. Nous sommes entièrement conformes au RGPD et ne partageons jamais vos données avec des tiers."
        },
        {
          question: "Comment migrer mes données existantes vers BATUTA ?",
          answer: "Nous proposons un service de migration de données pour faciliter votre transition. Notre équipe peut importer vos données clients, historiques d'interventions et autres informations depuis votre système actuel. Nous prenons en charge les formats Excel, CSV et pouvons nous connecter à de nombreux logiciels du marché."
        },
        {
          question: "BATUTA fonctionne-t-il sans connexion internet ?",
          answer: "BATUTA dispose d'un mode hors-ligne sur notre application mobile qui permet de continuer à travailler sans connexion internet. Les données sont automatiquement synchronisées dès que la connexion est rétablie, assurant ainsi une continuité de service même dans les zones à faible couverture réseau."
        }
      ]
    },
    {
      title: "Support & Formation",
      questions: [
        {
          question: "Quel type de support proposez-vous ?",
          answer: "Nous offrons un support client par email, téléphone et chat en direct pendant les heures ouvrables. Nos forfaits Premium incluent un support prioritaire et un accès 24/7 pour les urgences. Notre base de connaissances et nos tutoriels vidéo sont également disponibles à tout moment."
        },
        {
          question: "Comment se déroule la formation à l'utilisation de BATUTA ?",
          answer: "Chaque nouvel abonnement inclut une session de formation initiale en visioconférence. Nous proposons également des webinaires hebdomadaires, des tutoriels vidéo et une documentation complète. Des formations personnalisées supplémentaires peuvent être organisées selon vos besoins spécifiques."
        },
        {
          question: "Puis-je obtenir de l'aide pour paramétrer BATUTA selon mes besoins ?",
          answer: "Absolument ! Notre équipe d'onboarding vous accompagne dans la configuration initiale de BATUTA selon vos processus métier. Nous vous aidons à personnaliser les modèles de documents, configurer vos workflows et optimiser l'utilisation de l'outil pour votre activité spécifique."
        }
      ]
    }
  ];

  const popularQuestions = [
    "Comment créer mon premier devis ?",
    "Comment planifier une intervention ?",
    "Comment inviter mes collaborateurs ?",
    "Comment configurer mes tarifs ?",
    "Comment générer une facture ?",
    "Comment suivre mes paiements ?"
  ];

  // Filter questions based on search query
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Questions <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">fréquentes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trouvez rapidement des réponses à vos questions sur BATUTA, 
              notre CRM spécialisé pour les professionnels du service.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white shadow-sm"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Popular Questions */}
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {popularQuestions.map((question, index) => (
                <div 
                  key={index}
                  className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => setSearchQuery(question)}
                >
                  {question}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 space-x-8">
              <button
                className={`whitespace-nowrap px-3 py-2 font-medium text-sm rounded-md ${
                  activeCategory === 'all' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveCategory('all')}
              >
                Toutes les catégories
              </button>
              {faqCategories.map((category, index) => (
                <button
                  key={index}
                  className={`whitespace-nowrap px-3 py-2 font-medium text-sm rounded-md ${
                    activeCategory === category.title 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category.title)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {(searchQuery ? filteredCategories : 
              activeCategory === 'all' ? faqCategories : 
              faqCategories.filter(c => c.title === activeCategory)
            ).map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    {category.title}
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <HelpCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* No results message */}
            {searchQuery && filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Nous n'avons pas trouvé de réponse correspondant à "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Effacer la recherche
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-50 rounded-xl p-8">
              <ThumbsUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600">de satisfaction client</p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">2h</div>
              <p className="text-gray-600">temps moyen de réponse support</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-8">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <p className="text-gray-600">utilisateurs actifs</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-8">
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <p className="text-gray-600">de disponibilité du service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Notre équipe de support est là pour vous aider. Contactez-nous par téléphone, 
              email ou via notre formulaire de contact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Par téléphone
              </h3>
              <p className="text-gray-600 mb-4">
                Notre équipe est disponible du lundi au vendredi de 9h à 18h
              </p>
              <a href="tel:0123456789" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                01 23 45 67 89
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Par email
              </h3>
              <p className="text-gray-600 mb-4">
                Nous répondons à tous les emails sous 24h ouvrées
              </p>
              <a href="mailto:support@batuta.fr" className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-200">
                support@batuta.fr
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Formulaire de contact
              </h3>
              <p className="text-gray-600 mb-4">
                Remplissez notre formulaire pour une réponse personnalisée
              </p>
              <Link
                to="/contact"
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200 flex items-center justify-center space-x-1"
              >
                <span>Nous contacter</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à essayer BATUTA ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Démarrez votre essai gratuit de 30 jours sans engagement et découvrez comment BATUTA peut transformer votre activité
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
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

export default FAQ;