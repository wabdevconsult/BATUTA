import QuoteRequest from '../models/QuoteRequest.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

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
const mockQuoteRequests = [
  {
    _id: '507f1f77bcf86cd799439015',
    nom: 'Pierre Durand',
    email: 'pierre.durand@email.com',
    telephone: '01 23 45 67 89',
    entreprise: 'Durand SARL',
    metier: 'Électricien',
    besoins: ['Site vitrine', 'Devis en ligne', 'Planning'],
    message: 'Je souhaite moderniser mon activité avec un site web professionnel et des outils de gestion.',
    region: 'Île-de-France',
    departement: '75',
    status: 'new',
    assignedTo: null,
    notes: '',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    _id: '507f1f77bcf86cd799439016',
    nom: 'Sophie Moreau',
    email: 'sophie.moreau@email.com',
    telephone: '02 98 76 54 32',
    entreprise: 'Plomberie Moreau',
    metier: 'Plombier',
    besoins: ['CRM', 'Facturation', 'Suivi interventions'],
    message: 'Besoin d\'un système complet pour gérer ma clientèle et mes interventions.',
    region: 'Bretagne',
    departement: '29',
    status: 'assigned',
    assignedTo: {
      _id: '507f1f77bcf86cd799439017',
      firstName: 'Marc',
      lastName: 'Technicien',
      email: 'marc.technicien@batuta.fr'
    },
    notes: 'Client très motivé, première réunion prévue la semaine prochaine.',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19')
  },
  {
    _id: '507f1f77bcf86cd799439018',
    nom: 'Jean-Luc Bernard',
    email: 'jl.bernard@email.com',
    telephone: '04 56 78 90 12',
    entreprise: 'Bernard Chauffage',
    metier: 'Chauffagiste',
    besoins: ['Site vitrine', 'Prise de rendez-vous', 'Géolocalisation'],
    message: 'Je veux que mes clients puissent prendre rendez-vous directement en ligne.',
    region: 'Auvergne-Rhône-Alpes',
    departement: '69',
    status: 'in_progress',
    assignedTo: {
      _id: '507f1f77bcf86cd799439019',
      firstName: 'Julie',
      lastName: 'Développeuse',
      email: 'julie.dev@batuta.fr'
    },
    notes: 'Développement en cours, livraison prévue fin de semaine.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-22')
  }
];

// @desc    Create a new quote request
// @route   POST /api/quote-requests
// @access  Public
export const createQuoteRequest = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation error',
        errors: errors.array() 
      });
    }

    const { nom, email, telephone, entreprise, metier, besoins, message, region, departement } = req.body;

    if (process.env.NODE_ENV === 'development') {
      // Return mock success response for development mode
      const mockQuoteRequest = {
        _id: '507f1f77bcf86cd799439020',
        nom,
        email,
        telephone,
        entreprise,
        metier,
        besoins,
        message,
        region,
        departement,
        status: 'new',
        assignedTo: null,
        notes: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return res.status(201).json({
        success: true,
        message: 'Demande de devis envoyée avec succès',
        data: mockQuoteRequest
      });
    }

    // Create new quote request
    const quoteRequest = new QuoteRequest({
      nom,
      email,
      telephone,
      entreprise,
      metier,
      besoins,
      message,
      region,
      departement
    });

    await quoteRequest.save();

    // Find admin users to notify
    const adminUsers = await User.find({ role: 'admin' });
    
    // Find technicians in the same region/department if provided
    let technicianQuery = { role: 'technicien' };
    if (region) {
      technicianQuery.region = region;
    }
    if (departement) {
      technicianQuery.departement = departement;
    }
    
    const technicians = await User.find(technicianQuery);

    // Combine recipients
    const recipients = [...adminUsers, ...technicians];
    
    // Send email notifications
    if (recipients.length > 0 && process.env.SMTP_USER) {
      try {
        const emailPromises = recipients.map(user => {
          return transporter.sendMail({
            from: `"BATUTA CRM" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: `Nouvelle demande de devis de ${nom}`,
            html: `
              <h2>Nouvelle demande de devis</h2>
              <p><strong>Nom:</strong> ${nom}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${telephone || 'Non fourni'}</p>
              <p><strong>Entreprise:</strong> ${entreprise || 'Non fourni'}</p>
              <p><strong>Métier:</strong> ${metier || 'Non spécifié'}</p>
              <p><strong>Besoins:</strong> ${besoins?.join(', ') || 'Non spécifiés'}</p>
              <p><strong>Message:</strong> ${message}</p>
              <p><strong>Région:</strong> ${region || 'Non spécifiée'}</p>
              <p><strong>Département:</strong> ${departement || 'Non spécifié'}</p>
              <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/quote-requests/${quoteRequest._id}">Voir la demande dans le CRM</a></p>
            `
          });
        });
        
        await Promise.all(emailPromises);
        console.log(`Notification emails sent to ${recipients.length} recipients`);
      } catch (emailError) {
        console.error('Failed to send notification emails:', emailError);
        // Continue even if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Demande de devis envoyée avec succès',
      data: quoteRequest
    });
  } catch (error) {
    console.error('Create quote request error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de l\'envoi de la demande de devis',
      error: error.message 
    });
  }
};

// @desc    Get all quote requests
// @route   GET /api/quote-requests
// @access  Private/Admin/Technicien
export const getQuoteRequests = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      let filteredRequests = mockQuoteRequests;
      
      if (req.user.role === 'technicien') {
        // Filter for technicians based on assignment or region/department
        filteredRequests = mockQuoteRequests.filter(request => 
          request.assignedTo?._id === req.user.id ||
          request.status === 'new' ||
          (req.user.region && request.region === req.user.region) ||
          (req.user.departement && request.departement === req.user.departement)
        );
      }
      
      return res.json(filteredRequests);
    }

    let quoteRequests;
    
    if (req.user.role === 'admin') {
      // Admins can see all quote requests
      quoteRequests = await QuoteRequest.find().sort({ createdAt: -1 }).populate('assignedTo', 'firstName lastName email');
    } else if (req.user.role === 'technicien') {
      // Technicians can see quote requests assigned to them or in their region/department
      const technicianQuery = { 
        $or: [
          { assignedTo: req.user.id },
          { status: 'new' }
        ]
      };
      
      // Add region/department filter if the technician has these fields
      if (req.user.region) {
        technicianQuery.$or.push({ region: req.user.region });
      }
      if (req.user.departement) {
        technicianQuery.$or.push({ departement: req.user.departement });
      }
      
      quoteRequests = await QuoteRequest.find(technicianQuery).sort({ createdAt: -1 }).populate('assignedTo', 'firstName lastName email');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(quoteRequests);
  } catch (error) {
    console.error('Get quote requests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get quote request by ID
// @route   GET /api/quote-requests/:id
// @access  Private/Admin/Technicien
export const getQuoteRequestById = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockQuoteRequest = mockQuoteRequests.find(request => request._id === req.params.id) || mockQuoteRequests[0];
      
      // Check permissions for technicians in development mode
      if (req.user.role === 'technicien') {
        const canAccess = 
          mockQuoteRequest.assignedTo?._id === req.user.id ||
          mockQuoteRequest.status === 'new' ||
          (req.user.region && mockQuoteRequest.region === req.user.region) ||
          (req.user.departement && mockQuoteRequest.departement === req.user.departement);
          
        if (!canAccess) {
          return res.status(403).json({ message: 'Access denied' });
        }
      }
      
      return res.json(mockQuoteRequest);
    }

    const quoteRequest = await QuoteRequest.findById(req.params.id).populate('assignedTo', 'firstName lastName email');
    
    if (!quoteRequest) {
      return res.status(404).json({ message: 'Quote request not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien') {
      const canAccess = 
        quoteRequest.assignedTo?._id?.toString() === req.user.id ||
        quoteRequest.status === 'new' ||
        (req.user.region && quoteRequest.region === req.user.region) ||
        (req.user.departement && quoteRequest.departement === req.user.departement);
        
      if (!canAccess) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(quoteRequest);
  } catch (error) {
    console.error('Get quote request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update quote request
// @route   PUT /api/quote-requests/:id
// @access  Private/Admin/Technicien
export const updateQuoteRequest = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock updated data for development mode
      const mockQuoteRequest = mockQuoteRequests.find(request => request._id === req.params.id) || mockQuoteRequests[0];
      
      // Check permissions for technicians in development mode
      if (req.user.role === 'technicien') {
        const canAccess = 
          mockQuoteRequest.assignedTo?._id === req.user.id ||
          mockQuoteRequest.status === 'new' ||
          (req.user.region && mockQuoteRequest.region === req.user.region) ||
          (req.user.departement && mockQuoteRequest.departement === req.user.departement);
          
        if (!canAccess) {
          return res.status(403).json({ message: 'Access denied' });
        }
      }
      
      // Update mock data
      const { status, assignedTo, notes } = req.body;
      const updatedMockRequest = {
        ...mockQuoteRequest,
        status: status || mockQuoteRequest.status,
        assignedTo: assignedTo ? { _id: assignedTo, firstName: 'Mock', lastName: 'User', email: 'mock@example.com' } : mockQuoteRequest.assignedTo,
        notes: notes !== undefined ? notes : mockQuoteRequest.notes,
        updatedAt: new Date()
      };
      
      return res.json(updatedMockRequest);
    }

    const quoteRequest = await QuoteRequest.findById(req.params.id);
    
    if (!quoteRequest) {
      return res.status(404).json({ message: 'Quote request not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien') {
      const canAccess = 
        quoteRequest.assignedTo?.toString() === req.user.id ||
        quoteRequest.status === 'new' ||
        (req.user.region && quoteRequest.region === req.user.region) ||
        (req.user.departement && quoteRequest.departement === req.user.departement);
        
      if (!canAccess) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    // Update fields
    const { status, assignedTo, notes } = req.body;
    
    if (status) quoteRequest.status = status;
    if (assignedTo) quoteRequest.assignedTo = assignedTo;
    if (notes !== undefined) quoteRequest.notes = notes;
    
    // If assigning to self, update status to assigned
    if (assignedTo === req.user.id && quoteRequest.status === 'new') {
      quoteRequest.status = 'assigned';
    }
    
    await quoteRequest.save();
    
    // Fetch the updated quote request with populated assignedTo
    const updatedQuoteRequest = await QuoteRequest.findById(req.params.id).populate('assignedTo', 'firstName lastName email');
    
    res.json(updatedQuoteRequest);
  } catch (error) {
    console.error('Update quote request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete quote request
// @route   DELETE /api/quote-requests/:id
// @access  Private/Admin
export const deleteQuoteRequest = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return success message for development mode
      return res.json({ message: 'Quote request removed' });
    }

    const quoteRequest = await QuoteRequest.findById(req.params.id);
    
    if (!quoteRequest) {
      return res.status(404).json({ message: 'Quote request not found' });
    }
    
    await quoteRequest.deleteOne();
    res.json({ message: 'Quote request removed' });
  } catch (error) {
    console.error('Delete quote request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};