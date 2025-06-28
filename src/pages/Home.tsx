import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Shield,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Gestion Clients",
      description: "Centralisez toutes vos informations clients et historiques d'interventions"
    },
    {
      icon: Calendar,
      title: "Planning Intelligent",
      description: "Optimisez vos tournées et gérez les rendez-vous de vos équipes"
    },
    {
      icon: FileText,
      title: "Devis & Factures",
      description: "Créez et envoyez vos documents commerciaux en quelques clics"
    },
    {
      icon: CreditCard,
      title: "Paiement en Ligne",
      description: "Encaissez directement depuis vos factures avec Stripe"
    },
    {
      icon: BarChart3,
      title: "Tableaux de Bord",
      description: "Pilotez votre activité avec des indicateurs en temps réel"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Vos données sont protégées et sauvegardées automatiquement"
    }
  ];

  const testimonials = [
    {
      name: "Jean Dupont",
      role: "Électricien",
      content: "BATUTA a révolutionné ma façon de travailler. Je gagne 3h par jour sur la paperasse !",
      rating: 5
    },
    {
      name: "Marie Martin",
      role: "Plombière",
      content: "Interface intuitive et support client exceptionnel. Je recommande vivement !",
      rating: 5
    },
    {
      name: "Pierre Durand",
      role: "Chauffagiste",
      content: "Le planning partagé avec mes techniciens est un vrai plus. Excellent outil !",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Professionnels actifs" },
    { number: "500,000+", label: "Interventions gérées" },
    { number: "99.9%", label: "Disponibilité" },
    { number: "4.9/5", label: "Satisfaction client" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Le CRM qui fait <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">grandir</span> votre entreprise
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              BATUTA accompagne les professionnels du service dans leur transformation digitale. 
              Gérez vos clients, planifiez vos interventions et développez votre chiffre d'affaires.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link
                to="/metiers/demander-devis"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Essayer gratuitement</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <Play className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium">Voir la démo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour réussir
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une solution complète pensée pour les professionnels du service et de l'artisanat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez ce que disent nos utilisateurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels qui ont choisi BATUTA pour développer leur activité
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/demander-devis"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Commencer maintenant</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/metiers"
              className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Découvrir les métiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;