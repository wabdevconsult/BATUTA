import { create } from 'zustand';
import { getMyPersonalization, savePersonalization } from '../api/personalization';
import { Personalization } from '../types/personalization';

interface PersonalizationState {
  personalization: Personalization | null;
  loading: boolean;
  error: string | null;
  fetchPersonalization: () => Promise<void>;
  updatePersonalization: (data: Partial<Personalization>) => Promise<void>;
  resetPersonalization: () => void;
}

// Default personalization template
const defaultPersonalization: Personalization = {
  userId: '',
  siteName: "Mon Entreprise",
  logo: "https://via.placeholder.com/150x50",
  theme: {
    primaryColor: "#4F46E5",
    secondaryColor: "#7C3AED",
    backgroundColor: "#F9FAFB",
    textColor: "#1F2937",
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  navigation: [
    { label: "Accueil", url: "/" },
    { label: "Services", url: "#services" },
    { label: "Activités", url: "#activites" },
    { label: "Fonctionnalités", url: "#fonctionnalites" },
    { label: "Contact", url: "#contact" }
  ],
  services: [
    {
      title: "Service 1",
      description: "Description détaillée du service 1. Expliquez ici ce que vous proposez à vos clients.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Service 2",
      description: "Description détaillée du service 2. Expliquez ici ce que vous proposez à vos clients.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Service 3",
      description: "Description détaillée du service 3. Expliquez ici ce que vous proposez à vos clients.",
      image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ],
  activities: [
    {
      title: "Activité 1",
      description: "Description détaillée de l'activité 1. Expliquez ici ce que vous faites.",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Activité 2",
      description: "Description détaillée de l'activité 2. Expliquez ici ce que vous faites.",
      image: "https://images.pexels.com/photos/3182777/pexels-photo-3182777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ],
  features: [
    {
      title: "Fonctionnalité 1",
      description: "Description de la fonctionnalité 1",
      icon: "Zap"
    },
    {
      title: "Fonctionnalité 2",
      description: "Description de la fonctionnalité 2",
      icon: "Shield"
    },
    {
      title: "Fonctionnalité 3",
      description: "Description de la fonctionnalité 3",
      icon: "Star"
    },
    {
      title: "Fonctionnalité 4",
      description: "Description de la fonctionnalité 4",
      icon: "Heart"
    },
    {
      title: "Fonctionnalité 5",
      description: "Description de la fonctionnalité 5",
      icon: "Bell"
    },
    {
      title: "Fonctionnalité 6",
      description: "Description de la fonctionnalité 6",
      icon: "Link"
    }
  ],
  simulateur: {
    enabled: true,
    selectedSimulateur: "consommation-irve"
  },
  contact: {
    email: "contact@monentreprise.com",
    phone: "01 23 45 67 89",
    address: "123 Rue de l'Exemple, 75000 Paris",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85836507928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1621536859125!5m2!1sfr!2sfr",
    hours: [
      { day: "Lundi - Vendredi", hours: "9h00 - 18h00" },
      { day: "Samedi", hours: "10h00 - 16h00" },
      { day: "Dimanche", hours: "Fermé" }
    ],
    support: {
      email: "support@monentreprise.com",
      phone: "01 23 45 67 90"
    }
  },
  footer: {
    links: [
      { label: "Accueil", url: "/" },
      { label: "À propos", url: "/about" },
      { label: "Services", url: "/services" },
      { label: "Contact", url: "/contact" },
      { label: "Mentions légales", url: "/legal" },
      { label: "CGU", url: "/terms" }
    ],
    socialMedia: [
      { platform: "Facebook", url: "https://facebook.com" },
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Instagram", url: "https://instagram.com" }
    ],
    copyright: `© ${new Date().getFullYear()} Mon Entreprise. Tous droits réservés.`
  }
};

export const usePersonalizationStore = create<PersonalizationState>((set) => ({
  personalization: null,
  loading: false,
  error: null,
  
  fetchPersonalization: async () => {
    try {
      set({ loading: true, error: null });
      const data = await getMyPersonalization();
      set({ personalization: data, loading: false });
    } catch (error: any) {
      console.error('Failed to fetch personalization:', error);
      // If no personalization exists yet, use the default template
      set({ 
        personalization: defaultPersonalization, 
        loading: false, 
        error: null 
      });
    }
  },
  
  updatePersonalization: async (data) => {
    try {
      set({ loading: true, error: null });
      const updatedData = await savePersonalization(data);
      set({ personalization: updatedData, loading: false });
    } catch (error: any) {
      console.error('Failed to update personalization:', error);
      set({ 
        error: error.message || 'Failed to update personalization', 
        loading: false 
      });
    }
  },
  
  resetPersonalization: () => {
    set({ personalization: defaultPersonalization });
  }
}));