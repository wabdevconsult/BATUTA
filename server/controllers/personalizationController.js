import Personalization from '../models/Personalization.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASS || 'password'
  }
});

// Mock data for demo mode
const mockPersonalizations = [
  {
    _id: '507f1f77bcf86cd799439011',
    userId: {
      _id: '507f1f77bcf86cd799439012',
      email: 'client1@example.com',
      firstName: 'Jean',
      lastName: 'Dupont'
    },
    siteName: 'Électricité Dupont',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    logo: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=200',
    heroImage: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Services électriques professionnels depuis 15 ans',
    services: ['Installation électrique', 'Dépannage', 'Mise aux normes'],
    contactInfo: {
      phone: '01 23 45 67 89',
      email: 'contact@electricite-dupont.fr',
      address: '123 Rue de la République, 75001 Paris'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    _id: '507f1f77bcf86cd799439013',
    userId: {
      _id: '507f1f77bcf86cd799439014',
      email: 'client2@example.com',
      firstName: 'Marie',
      lastName: 'Martin'
    },
    siteName: 'Plomberie Martin',
    primaryColor: '#059669',
    secondaryColor: '#047857',
    logo: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=200',
    heroImage: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Plomberie et chauffage, intervention rapide 24h/24',
    services: ['Plomberie générale', 'Chauffage', 'Dépannage urgence'],
    contactInfo: {
      phone: '01 98 76 54 32',
      email: 'contact@plomberie-martin.fr',
      address: '456 Avenue des Champs, 69000 Lyon'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  }
];

// @desc    Get personalization for current user
// @route   GET /api/personalization/my
// @access  Private
export const getMyPersonalization = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockPersonalization = mockPersonalizations.find(p => p.userId._id === req.user.id) || mockPersonalizations[0];
      return res.json(mockPersonalization);
    }

    const personalization = await Personalization.findOne({ userId: req.user.id });
    
    if (!personalization) {
      return res.status(404).json({ message: 'Personalization not found' });
    }
    
    res.json(personalization);
  } catch (error) {
    console.error('Get personalization error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create or update personalization
// @route   POST /api/personalization/my
// @access  Private
export const updateMyPersonalization = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock updated data for development mode
      const mockPersonalization = {
        _id: '507f1f77bcf86cd799439011',
        userId: req.user.id,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return res.json(mockPersonalization);
    }

    let personalization = await Personalization.findOne({ userId: req.user.id });
    
    if (personalization) {
      // Update existing personalization
      Object.keys(req.body).forEach(key => {
        personalization[key] = req.body[key];
      });
    } else {
      // Create new personalization
      personalization = new Personalization({
        userId: req.user.id,
        ...req.body
      });
    }
    
    await personalization.save();
    
    // Send notification to admin
    const user = await User.findById(req.user.id);
    const adminNotification = {
      to: process.env.ADMIN_EMAIL || 'admin@batuta.fr',
      subject: 'Nouvelle personnalisation de site',
      html: `
        <h2>Nouvelle personnalisation de site</h2>
        <p><strong>Client:</strong> ${user.email}</p>
        <p><strong>Nom du site:</strong> ${personalization.siteName}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p>Connectez-vous au tableau de bord administrateur pour voir les détails.</p>
      `
    };
    
    try {
      await transporter.sendMail(adminNotification);
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
      // Continue even if email fails
    }
    
    res.json(personalization);
  } catch (error) {
    console.error('Update personalization error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all personalizations (admin only)
// @route   GET /api/personalization
// @access  Private/Admin
export const getAllPersonalizations = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      return res.json(mockPersonalizations);
    }

    const personalizations = await Personalization.find().populate('userId', 'email firstName lastName');
    res.json(personalizations);
  } catch (error) {
    console.error('Get all personalizations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get personalization by ID (admin only)
// @route   GET /api/personalization/:id
// @access  Private/Admin
export const getPersonalizationById = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockPersonalization = mockPersonalizations.find(p => p._id === req.params.id) || mockPersonalizations[0];
      return res.json(mockPersonalization);
    }

    const personalization = await Personalization.findById(req.params.id).populate('userId', 'email firstName lastName');
    
    if (!personalization) {
      return res.status(404).json({ message: 'Personalization not found' });
    }
    
    res.json(personalization);
  } catch (error) {
    console.error('Get personalization by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete personalization (admin only)
// @route   DELETE /api/personalization/:id
// @access  Private/Admin
export const deletePersonalization = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return success message for development mode
      return res.json({ message: 'Personalization deleted successfully' });
    }

    const personalization = await Personalization.findById(req.params.id);
    
    if (!personalization) {
      return res.status(404).json({ message: 'Personalization not found' });
    }
    
    await personalization.deleteOne();
    res.json({ message: 'Personalization deleted successfully' });
  } catch (error) {
    console.error('Delete personalization error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};