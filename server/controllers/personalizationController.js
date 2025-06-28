import Personalization from '../models/Personalization.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASS || 'password'
  }
});

// @desc    Get personalization for current user
// @route   GET /api/personalization/my
// @access  Private
export const getMyPersonalization = async (req, res) => {
  try {
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