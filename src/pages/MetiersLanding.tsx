import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Car, 
  Zap, 
  Droplets, 
  Flame, 
  Wind, 
  Snowflake,
  Key,
  Hammer,
  ChefHat,
  TreePine,
  Waves,
  Sparkles,
  Bug,
  PaintBucket,
  Building,
  Settings,
  DollarSign,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Calculator,
  Smartphone
} from 'lucide-react';

const MetiersLanding = () => {
  const metiersCategories = [
    {
      title: "Artisans du Bâtiment",
      description: "Solutions adaptées aux métiers traditionnels du bâtiment",
      color: "from-blue-500 to-blue-600",
      metiers: [
        { name: "Électriciens", path: "/metiers/electriciens", icon: Zap },
        { name: "Plombiers", path: "/metiers/plombiers", icon: Droplets },
        { name: "Chauffagistes", path: "/metiers/chauffagistes", icon: Flame },
        { name: "Climaticiens", path: "/metiers/climaticiens", icon: Snowflake },
        { name: "Ventilation", path: "/metiers/ventilation", icon: Wind },
        { name: "Menuisiers", path: "/metiers/menuisiers", icon: Hammer },
        { name: "Serruriers", path: "/metiers/serruriers", icon: Key },
        { name: "Peintres", path: "/metiers/peintres", icon: PaintBucket }
      ]
    },
    {
      title: "Services Techniques",
      description: "Expertise technique et maintenance spécialisée",
      color: "from-green-500 to-green-600",
      metiers: [
        { name: "Garagistes", path: "/metiers/garagistes", icon: Car },
        { name: "IRVE", path: "/metiers/irve", icon: Zap },
        { name: "Domotique", path: "/metiers/domotique", icon: Smartphone },
        { name: "Frigoristes", path: "/metiers/frigoristes", icon: Snowflake },
        { name: "Maintenance Hydraulique", path: "/metiers/maintenance-hydraulique", icon: Settings },
        { name: "Maintenance Équipements", path: "/metiers/maintenance-equipements", icon: Wrench }
      ]
    },
    {
      title: "Énergies & Environnement",
      description: "Solutions durables et écologiques",
      color: "from-purple-500 to-purple-600",
      metiers: [
        { name: "Énergies Renouvelables", path: "/metiers/energies-renouvelables", icon: TreePine },
        { name: "Photovoltaïques", path: "/metiers/photovoltaiques", icon: Zap },
        { name: "Paysagistes", path: "/metiers/paysagistes", icon: TreePine },
        { name: "Piscinistes", path: "/metiers/piscinistes", icon: Waves },
        { name: "Irrigation", path: "/metiers/irrigation", icon: Droplets },
        { name: "Assainissement", path: "/metiers/assainissement", icon: Droplets }
      ]
    },
    {
      title: "Services Généraux",
      description: "Services polyvalents et multi-compétences",
      color: "from-orange-500 to-orange-600",
      metiers: [
        { name: "Auto-entrepreneurs", path: "/metiers/auto-entrepreneurs", icon: Users },
        { name: "Multi-services", path: "/metiers/multi-services", icon: Wrench },
        { name: "Tous Corps d'État", path: "/metiers/tous-corps-etat", icon: Building },
        { name: "Cuisinistes", path: "/metiers/cuisinistes", icon: ChefHat },
        { name: "Sociétés de Ménage", path: "/metiers/societes-de-menage", icon: Sparkles },
        { name: "Lutte Nuisibles", path: "/metiers/lutte-nuisibles", icon: Bug },
        { name: "Ramoneurs", path: "/metiers/ramoneurs", icon: Flame }
      ]
    }
  ];

  const fonctionnalites = [
    {
      title: "Gestion & Organisation",
      items: [
        { name: "CRM Clients", path: "/metiers/crm-clients", icon: Users },
        { name: "Portail Client", path: "/metiers/portail-client", icon: Smartphone },
        { name: "Planning Partagé", path: "/metiers/planning-partage", icon: Calendar },
        { name: "Gestion Techniciens", path: "/metiers/gestion-techniciens", icon: Users }
      ]
    },
    {
      title: "Commercial & Financier",
      items: [
        { name: "Gestion Dépenses", path: "/metiers/gestion-depenses", icon: DollarSign },
        { name: "Suivi Trésorerie", path: "/metiers/suivi-tresorerie", icon: BarChart3 },
        { name: "Paiement en Ligne", path: "/metiers/paiement-en-ligne", icon: DollarSign },
        { name: "Bibliothèque Prix", path: "/metiers/bibliotheque-prix", icon: Calculator }
      ]
    },
    {
      title: "Opérationnel",
      items: [
        { name: "Signature Électronique", path: "/metiers/signature-electronique", icon: FileText },
        { name: "Rapports Intervention", path: "/metiers/rapports-intervention", icon: FileText },
        { name: "Suivi Stock", path: "/metiers/suivi-stock", icon: BarChart3 },
        { name: "Automatisations", path: "/metiers/automatisations", icon: Settings }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              BATUTA s'adapte à <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">votre métier</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Découvrez comment notre CRM peut transformer votre activité professionnelle. 
              Solutions personnalisées pour chaque secteur d'activité.
            </p>
          </div>
        </div>
      </section>

      {/* Métiers par Catégorie */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {metiersCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="text-center mb-12">
                  <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${category.color} text-white font-semibold mb-4`}>
                    {category.title}
                  </div>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.metiers.map((metier, metierIndex) => (
                    <Link
                      key={metierIndex}
                      to={metier.path}
                      className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
                    >
                      <div className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <metier.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {metier.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Solution CRM adaptée aux spécificités de votre métier
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités Transversales */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités métier
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils spécialisés pour optimiser votre activité professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fonctionnalites.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Votre métier n'est pas listé ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour découvrir comment BATUTA peut s'adapter à vos besoins spécifiques
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Nous contacter
            </Link>
            <Link
              to="/auth/login"
              className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Essayer gratuitement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MetiersLanding;