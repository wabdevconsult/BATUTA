import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Mail, 
  Phone, 
  Users, 
  Building, 
  MessageSquare, 
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Send
} from 'lucide-react';

const DemanderDevis = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    metier: '',
    besoins: [],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        besoins: [...formData.besoins, value]
      });
    } else {
      setFormData({
        ...formData,
        besoins: formData.besoins.filter(besoin => besoin !== value)
      });
    }
  };

  const metiers = [
    "Électricien",
    "Plombier",
    "Chauffagiste",
    "Climaticien",
    "Garagiste",
    "Menuisier",
    "Serrurier",
    "Peintre",
    "Paysagiste",
    "Auto-entrepreneur",
    "Multi-services",
    "Autre"
  ];

  const besoins = [
    "Gestion clients",
    "Devis et factures",
    "Planning équipes",
    "Suivi chantiers",
    "Gestion stock",
    "Suivi trésorerie",
    "Rapports d'intervention",
    "Signature électronique",
    "Portail client"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Demandez un <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">devis gratuit</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Obtenez une proposition personnalisée pour votre activité professionnelle.
              Notre équipe vous contactera sous 24h pour discuter de vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Demande envoyée avec succès !
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Merci pour votre demande de devis. Notre équipe vous contactera dans les 24 heures pour discuter de vos besoins spécifiques.
                  </p>
                  <Link
                    to="/"
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Retour à l'accueil
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Vos informations
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          required
                          value={formData.nom}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          required
                          value={formData.telephone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder="01 23 45 67 89"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-2">
                          Entreprise
                        </label>
                        <input
                          type="text"
                          id="entreprise"
                          name="entreprise"
                          value={formData.entreprise}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="metier" className="block text-sm font-medium text-gray-700 mb-2">
                        Votre métier *
                      </label>
                      <select
                        id="metier"
                        name="metier"
                        required
                        value={formData.metier}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Sélectionnez votre métier</option>
                        {metiers.map((metier, index) => (
                          <option key={index} value={metier}>{metier}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vos besoins
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {besoins.map((besoin, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`besoin-${index}`}
                              name="besoins"
                              value={besoin}
                              onChange={handleCheckboxChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`besoin-${index}`} className="ml-2 text-sm text-gray-700">
                              {besoin}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message (précisez vos besoins) *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                        placeholder="Décrivez votre activité et vos besoins spécifiques..."
                      />
                    </div>

                    <div className="text-sm text-gray-500">
                      * Champs obligatoires
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Send className="h-5 w-5" />
                      <span>Demander mon devis gratuit</span>
                    </button>
                  </form>
                </>
              )}
            </div>
            
            {/* Info */}
            <div className="space-y-8">
              
              {/* Why Choose Us */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Pourquoi choisir BATUTA ?
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Solution métier spécialisée</h3>
                      <p className="text-gray-600 text-sm">Adaptée aux spécificités de votre activité professionnelle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Prise en main rapide</h3>
                      <p className="text-gray-600 text-sm">Formation et accompagnement inclus dans toutes nos offres</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Support réactif</h3>
                      <p className="text-gray-600 text-sm">Une équipe dédiée à votre service pour répondre à vos questions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Sans engagement</h3>
                      <p className="text-gray-600 text-sm">Essai gratuit de 30 jours sans carte bancaire</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Besoin d'aide ?
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                      <p className="text-gray-600">01 23 45 67 89</p>
                      <p className="text-sm text-gray-500">Lun-Ven: 9h-18h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">devis@batuta.fr</p>
                      <p className="text-sm text-gray-500">Réponse sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Chat en direct</h3>
                      <p className="text-gray-600">Disponible sur notre site</p>
                      <p className="text-sm text-gray-500">Assistance immédiate</p>
                    </div>
                  </div>
                </div>
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
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple pour obtenir votre devis personnalisé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Demande de devis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Remplissez le formulaire avec vos informations et besoins spécifiques
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Étude personnalisée
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Notre équipe analyse vos besoins et prépare une proposition sur mesure
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Présentation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous vous présentons notre solution adaptée à votre métier
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Démarrage
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mise en place rapide et formation de vos équipes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Des questions ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Consultez notre FAQ ou contactez-nous directement pour plus d'informations
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/metiers/faq"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Consulter la FAQ
            </Link>
            <Link
              to="/contact"
              className="text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemanderDevis;