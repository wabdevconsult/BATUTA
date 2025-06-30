import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePersonalizationStore } from '../store/personalizationStore';
import SimulateurUniversel from '../components/SimulateurUniversel';
import formules from '../data/formules.json';
import { 
  Zap, 
  Shield, 
  Star, 
  Heart, 
  Bell, 
  Link as LinkIcon, 
  ArrowRight, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

const PageAccueilPersonnalisee = () => {
  const { personalization, fetchPersonalization, loading, error } = usePersonalizationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedSimulateur, setSelectedSimulateur] = useState(null);

  useEffect(() => {
    fetchPersonalization();
  }, [fetchPersonalization]);

  useEffect(() => {
    if (personalization) {
      setEditData(personalization);
      
      // Find the selected simulator
      if (personalization.simulateur?.selectedSimulateur) {
        const simulator = formules.find(
          f => f.id === personalization.simulateur.selectedSimulateur
        );
        setSelectedSimulateur(simulator);
      }
    }
  }, [personalization]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md">
          <h2 className="text-lg font-semibold mb-2">Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!personalization || !editData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg max-w-md">
          <h2 className="text-lg font-semibold mb-2">Aucune personnalisation</h2>
          <p>Vous n'avez pas encore personnalisé votre site. Commencez maintenant !</p>
          <button 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Personnaliser mon site
          </button>
        </div>
      </div>
    );
  }

  // Helper function to render the correct icon
  const renderIcon = (iconName) => {
    const icons = {
      'Zap': <Zap className="h-6 w-6 text-white" />,
      'Shield': <Shield className="h-6 w-6 text-white" />,
      'Star': <Star className="h-6 w-6 text-white" />,
      'Heart': <Heart className="h-6 w-6 text-white" />,
      'Bell': <Bell className="h-6 w-6 text-white" />,
      'Link': <LinkIcon className="h-6 w-6 text-white" />
    };
    
    return icons[iconName] || <Zap className="h-6 w-6 text-white" />;
  };

  // Helper function to render social media icons
  const renderSocialIcon = (platform) => {
    const icons = {
      'Facebook': <Facebook className="h-5 w-5" />,
      'Twitter': <Twitter className="h-5 w-5" />,
      'LinkedIn': <Linkedin className="h-5 w-5" />,
      'Instagram': <Instagram className="h-5 w-5" />
    };
    
    return icons[platform] || <LinkIcon className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: editData.theme.backgroundColor }}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: editData.theme.textColor }}>
              Bienvenue chez <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{editData.siteName}</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: editData.theme.textColor }}>
              Votre site personnalisé avec BATUTA. Modifiez ce contenu selon vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {editData.services && editData.services.length > 0 && (
        <section className="py-16 bg-white" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: editData.theme.textColor }}>
                Nos Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez notre gamme complète de services professionnels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {editData.services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
                  style={{ 
                    borderRadius: editData.theme.borderRadius,
                    boxShadow: editData.theme.boxShadow
                  }}
                >
                  {service.image && (
                    <div className="mb-6 rounded-lg overflow-hidden" style={{ borderRadius: editData.theme.borderRadius }}>
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-4" style={{ color: editData.theme.textColor }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Activities Section */}
      {editData.activities && editData.activities.length > 0 && (
        <section className="py-16 bg-gray-50" id="activites">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: editData.theme.textColor }}>
                Nos Activités
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explorez nos différentes activités et domaines d'expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {editData.activities.map((activity, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
                  style={{ 
                    borderRadius: editData.theme.borderRadius,
                    boxShadow: editData.theme.boxShadow
                  }}
                >
                  {activity.image && (
                    <div className="md:w-1/2">
                      <img 
                        src={activity.image} 
                        alt={activity.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:w-1/2">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: editData.theme.textColor }}>
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {editData.features && editData.features.length > 0 && (
        <section className="py-16 bg-white" id="fonctionnalites">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: editData.theme.textColor }}>
                Nos Fonctionnalités
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez ce qui fait notre différence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {editData.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100"
                  style={{ borderRadius: editData.theme.borderRadius }}
                >
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                      borderRadius: editData.theme.borderRadius 
                    }}
                  >
                    {renderIcon(feature.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: editData.theme.textColor }}>
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
      )}

      {/* Simulator Section */}
      {editData.simulateur?.enabled && selectedSimulateur && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: editData.theme.textColor }}>
                Notre Simulateur
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Utilisez notre simulateur pour estimer vos besoins
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <SimulateurUniversel config={selectedSimulateur} />
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: editData.theme.textColor }}>
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {editData.contact?.email && (
                <div className="flex items-start space-x-4">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg"
                    style={{ 
                      background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                      borderRadius: editData.theme.borderRadius 
                    }}
                  >
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: editData.theme.textColor }}>Email</h3>
                    <p className="text-gray-600">{editData.contact.email}</p>
                  </div>
                </div>
              )}

              {editData.contact?.phone && (
                <div className="flex items-start space-x-4">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg"
                    style={{ 
                      background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                      borderRadius: editData.theme.borderRadius 
                    }}
                  >
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: editData.theme.textColor }}>Téléphone</h3>
                    <p className="text-gray-600">{editData.contact.phone}</p>
                  </div>
                </div>
              )}

              {editData.contact?.address && (
                <div className="flex items-start space-x-4">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg"
                    style={{ 
                      background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                      borderRadius: editData.theme.borderRadius 
                    }}
                  >
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: editData.theme.textColor }}>Adresse</h3>
                    <p className="text-gray-600">{editData.contact.address}</p>
                  </div>
                </div>
              )}

              {editData.contact?.hours && editData.contact.hours.length > 0 && (
                <div className="flex items-start space-x-4">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg"
                    style={{ 
                      background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                      borderRadius: editData.theme.borderRadius 
                    }}
                  >
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: editData.theme.textColor }}>Horaires</h3>
                    {editData.contact.hours.map((hour, index) => (
                      <p key={index} className="text-gray-600">
                        <span className="font-medium">{hour.day}:</span> {hour.hours}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map */}
            {editData.contact?.mapUrl && (
              <div 
                className="rounded-xl overflow-hidden h-80"
                style={{ borderRadius: editData.theme.borderRadius }}
              >
                <iframe 
                  src={editData.contact.mapUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg"
                  style={{ 
                    background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                    borderRadius: editData.theme.borderRadius 
                  }}
                >
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">{editData.siteName}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Site personnalisé créé avec BATUTA CRM SaaS.
              </p>
              <div className="flex space-x-4">
                {editData.footer?.socialMedia && editData.footer.socialMedia.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            {editData.footer?.links && editData.footer.links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
                <ul className="space-y-2">
                  {editData.footer.links.slice(0, 6).map((link, index) => (
                    <li key={index}>
                      <Link to={link.url} className="text-gray-300 hover:text-white transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              {editData.contact?.email && (
                <p className="text-gray-300 mb-2">{editData.contact.email}</p>
              )}
              {editData.contact?.phone && (
                <p className="text-gray-300 mb-2">{editData.contact.phone}</p>
              )}
              {editData.contact?.address && (
                <p className="text-gray-300">{editData.contact.address}</p>
              )}
            </div>

           {/* Edit Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personnalisation</h3>
             <div className="space-y-2">
                <Link
                  to="/dashboard/personalization?tab=content"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 block text-center"
                  style={{
                    background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                    borderRadius: editData.theme.borderRadius
                  }}
                >
                  Modifier services & fonctionnalités
                </Link>
                <Link
                  to="/dashboard/personalization?tab=theme"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 block text-center"
                  style={{
                    background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                    borderRadius: editData.theme.borderRadius
                  }}
                >
                  Modifier charte graphique & logo
                </Link>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 w-full"
                  style={{
                    background: `linear-gradient(to right, ${editData.theme.primaryColor}, ${editData.theme.secondaryColor})`,
                    borderRadius: editData.theme.borderRadius
                  }}
                >
                  Modifier mon site
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-300 text-sm">
                {editData.footer?.copyright || `© ${new Date().getFullYear()} ${editData.siteName}. Tous droits réservés.`}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageAccueilPersonnalisee;