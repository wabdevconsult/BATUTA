import mongoose from 'mongoose';

const personalizationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  siteName: {
    type: String,
    default: 'Mon Entreprise'
  },
  logo: {
    type: String
  },
  theme: {
    primaryColor: {
      type: String,
      default: '#3B82F6'
    },
    secondaryColor: {
      type: String,
      default: '#10B981'
    },
    backgroundColor: {
      type: String,
      default: '#F9FAFB'
    },
    textColor: {
      type: String,
      default: '#1F2937'
    },
    fontFamily: {
      type: String,
      default: 'Inter, sans-serif'
    },
    borderRadius: {
      type: String,
      default: '0.5rem'
    },
    boxShadow: {
      type: String,
      default: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }
  },
  navigation: [{
    label: String,
    url: String
  }],
  services: [{
    title: String,
    description: String,
    image: String
  }],
  activities: [{
    title: String,
    description: String,
    image: String
  }],
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  simulateur: {
    enabled: {
      type: Boolean,
      default: false
    },
    selectedSimulateur: {
      type: String
    }
  },
  contact: {
    email: String,
    phone: String,
    address: String,
    mapUrl: String,
    hours: [{
      day: String,
      hours: String
    }],
    support: {
      email: String,
      phone: String
    }
  },
  footer: {
    links: [{
      label: String,
      url: String
    }],
    socialMedia: [{
      platform: String,
      url: String
    }],
    copyright: String
  }
}, {
  timestamps: true
});

const Personalization = mongoose.model('Personalization', personalizationSchema);

export default Personalization;