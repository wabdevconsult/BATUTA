import Intervention from '../models/Intervention.js';
import Client from '../models/Client.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

// Mock data for demo mode
const mockInterventions = [
  {
    _id: '507f1f77bcf86cd799439021',
    title: 'Installation électrique',
    description: 'Installation complète du système électrique',
    clientId: {
      _id: '507f1f77bcf86cd799439022',
      name: 'Dupont SAS',
      email: 'contact@dupont.com',
      phone: '01 23 45 67 89',
      address: '123 Rue de Paris, 75001 Paris'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439023',
      firstName: 'Jean',
      lastName: 'Technicien',
      email: 'jean.tech@batuta.fr',
      phone: '06 12 34 56 78'
    },
    scheduledDate: new Date('2025-05-20T09:00:00'),
    endDate: null,
    status: 'scheduled',
    location: {
      address: '123 Rue de Paris, 75001 Paris',
      coordinates: {
        lat: 48.856614,
        lng: 2.3522219
      }
    },
    technicianLocation: {
      lat: 48.85,
      lng: 2.35,
      lastUpdated: new Date()
    },
    priority: 'medium',
    notes: 'Prévoir 3 heures d\'intervention',
    attachments: [],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-05-15T10:30:00'),
    updatedAt: new Date('2025-05-15T10:30:00')
  },
  {
    _id: '507f1f77bcf86cd799439025',
    title: 'Dépannage plomberie',
    description: 'Fuite sous l\'évier de la cuisine',
    clientId: {
      _id: '507f1f77bcf86cd799439026',
      name: 'Martin & Co',
      email: 'contact@martin.com',
      phone: '01 23 45 67 90',
      address: '45 Avenue Victor Hugo, 69002 Lyon'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439023',
      firstName: 'Jean',
      lastName: 'Technicien',
      email: 'jean.tech@batuta.fr',
      phone: '06 12 34 56 78'
    },
    scheduledDate: new Date('2025-05-21T14:00:00'),
    endDate: null,
    status: 'scheduled',
    location: {
      address: '45 Avenue Victor Hugo, 69002 Lyon',
      coordinates: {
        lat: 45.7578137,
        lng: 4.8320114
      }
    },
    technicianLocation: null,
    priority: 'high',
    notes: 'Client prioritaire, intervention urgente',
    attachments: [],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-05-16T09:15:00'),
    updatedAt: new Date('2025-05-16T09:15:00')
  },
  {
    _id: '507f1f77bcf86cd799439027',
    title: 'Maintenance climatisation',
    description: 'Entretien annuel système climatisation',
    clientId: {
      _id: '507f1f77bcf86cd799439028',
      name: 'Leroy Entreprise',
      email: 'contact@leroy.com',
      phone: '01 23 45 67 91',
      address: '8 Boulevard Haussmann, 75008 Paris'
    },
    technicianId: {
      _id: '507f1f77bcf86cd799439029',
      firstName: 'Marie',
      lastName: 'Technicienne',
      email: 'marie.tech@batuta.fr',
      phone: '06 98 76 54 32'
    },
    scheduledDate: new Date('2025-05-19T10:00:00'),
    endDate: new Date('2025-05-19T12:30:00'),
    status: 'completed',
    location: {
      address: '8 Boulevard Haussmann, 75008 Paris',
      coordinates: {
        lat: 48.8738548,
        lng: 2.3400195
      }
    },
    technicianLocation: {
      lat: 48.87,
      lng: 2.34,
      lastUpdated: new Date('2025-05-19T12:30:00')
    },
    priority: 'medium',
    notes: 'Intervention terminée, système en bon état',
    attachments: [
      {
        name: 'rapport_maintenance.pdf',
        url: 'https://example.com/rapport_maintenance.pdf',
        type: 'application/pdf',
        uploadedAt: new Date('2025-05-19T12:35:00')
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-05-14T16:45:00'),
    updatedAt: new Date('2025-05-19T12:35:00')
  }
];

// @desc    Get all interventions
// @route   GET /api/interventions
// @access  Private
export const getInterventions = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      let filteredInterventions = [...mockInterventions];
      
      if (req.user.role === 'technicien') {
        // Filter for technicians based on assignment
        filteredInterventions = mockInterventions.filter(intervention => 
          intervention.technicianId._id === req.user.id
        );
      } else if (req.user.role === 'client') {
        // Filter for clients based on clientId
        const clients = await Client.find({ userId: req.user.id });
        const clientIds = clients.map(client => client._id.toString());
        
        filteredInterventions = mockInterventions.filter(intervention => 
          clientIds.includes(intervention.clientId._id)
        );
      }
      
      return res.json(filteredInterventions);
    }

    let interventions;
    
    if (req.user.role === 'admin') {
      // Admins can see all interventions
      interventions = await Intervention.find()
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ scheduledDate: 1 });
    } else if (req.user.role === 'technicien') {
      // Technicians can see interventions assigned to them
      interventions = await Intervention.find({ technicianId: req.user.id })
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ scheduledDate: 1 });
    } else if (req.user.role === 'client') {
      // Clients can see interventions for their company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      interventions = await Intervention.find({ clientId: { $in: clientIds } })
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ scheduledDate: 1 });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(interventions);
  } catch (error) {
    console.error('Get interventions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get intervention by ID
// @route   GET /api/interventions/:id
// @access  Private
export const getInterventionById = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockIntervention = mockInterventions.find(intervention => intervention._id === req.params.id);
      
      if (!mockIntervention) {
        return res.status(404).json({ message: 'Intervention not found' });
      }
      
      // Check permissions
      if (req.user.role === 'technicien' && mockIntervention.technicianId._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      if (req.user.role === 'client') {
        const clients = await Client.find({ userId: req.user.id });
        const clientIds = clients.map(client => client._id.toString());
        
        if (!clientIds.includes(mockIntervention.clientId._id)) {
          return res.status(403).json({ message: 'Access denied' });
        }
      }
      
      return res.json(mockIntervention);
    }

    const intervention = await Intervention.findById(req.params.id)
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email');
    
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && intervention.technicianId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(intervention.clientId._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(intervention);
  } catch (error) {
    console.error('Get intervention error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new intervention
// @route   POST /api/interventions
// @access  Private/Admin/Technicien
export const createIntervention = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockIntervention = {
        _id: '507f1f77bcf86cd799439030',
        ...req.body,
        createdBy: {
          _id: req.user.id,
          firstName: req.user.firstName || 'Admin',
          lastName: req.user.lastName || 'User',
          email: req.user.email
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      return res.status(201).json(mockIntervention);
    }

    const newIntervention = new Intervention({
      ...req.body,
      createdBy: req.user.id
    });
    
    await newIntervention.save();
    
    // Populate the response
    const populatedIntervention = await Intervention.findById(newIntervention._id)
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email');
    
    res.status(201).json(populatedIntervention);
  } catch (error) {
    console.error('Create intervention error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update intervention
// @route   PUT /api/interventions/:id
// @access  Private/Admin/Technicien
export const updateIntervention = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockIntervention = mockInterventions.find(intervention => intervention._id === req.params.id);
      
      if (!mockIntervention) {
        return res.status(404).json({ message: 'Intervention not found' });
      }
      
      // Check permissions for technicians
      if (req.user.role === 'technicien' && mockIntervention.technicianId._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const updatedMockIntervention = {
        ...mockIntervention,
        ...req.body,
        updatedAt: new Date()
      };
      
      return res.json(updatedMockIntervention);
    }

    const intervention = await Intervention.findById(req.params.id);
    
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && intervention.technicianId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update intervention fields
    const updateFields = { ...req.body };
    
    // Special handling for technician location updates
    if (req.body.technicianLocation) {
      updateFields.technicianLocation = {
        ...req.body.technicianLocation,
        lastUpdated: new Date()
      };
    }
    
    // Update the intervention
    const updatedIntervention = await Intervention.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    )
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email');
    
    res.json(updatedIntervention);
  } catch (error) {
    console.error('Update intervention error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update technician location
// @route   PUT /api/interventions/:id/location
// @access  Private/Technicien
export const updateTechnicianLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockIntervention = mockInterventions.find(intervention => intervention._id === req.params.id);
      
      if (!mockIntervention) {
        return res.status(404).json({ message: 'Intervention not found' });
      }
      
      // Check permissions
      if (mockIntervention.technicianId._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const updatedMockIntervention = {
        ...mockIntervention,
        technicianLocation: {
          lat,
          lng,
          lastUpdated: new Date()
        },
        updatedAt: new Date()
      };
      
      return res.json(updatedMockIntervention);
    }

    const intervention = await Intervention.findById(req.params.id);
    
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention not found' });
    }
    
    // Check permissions
    if (intervention.technicianId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update technician location
    intervention.technicianLocation = {
      lat,
      lng,
      lastUpdated: new Date()
    };
    
    await intervention.save();
    
    res.json(intervention);
  } catch (error) {
    console.error('Update technician location error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete intervention
// @route   DELETE /api/interventions/:id
// @access  Private/Admin
export const deleteIntervention = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return success message for development mode
      return res.json({ message: 'Intervention removed' });
    }

    const intervention = await Intervention.findById(req.params.id);
    
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention not found' });
    }
    
    await intervention.deleteOne();
    res.json({ message: 'Intervention removed' });
  } catch (error) {
    console.error('Delete intervention error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get interventions by technician
// @route   GET /api/interventions/technician/:id
// @access  Private/Admin
export const getInterventionsByTechnician = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const filteredInterventions = mockInterventions.filter(
        intervention => intervention.technicianId._id === req.params.id
      );
      
      return res.json(filteredInterventions);
    }

    const interventions = await Intervention.find({ technicianId: req.params.id })
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ scheduledDate: 1 });
    
    res.json(interventions);
  } catch (error) {
    console.error('Get interventions by technician error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get interventions by client
// @route   GET /api/interventions/client/:id
// @access  Private/Admin/Technicien
export const getInterventionsByClient = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const filteredInterventions = mockInterventions.filter(
        intervention => intervention.clientId._id === req.params.id
      );
      
      return res.json(filteredInterventions);
    }

    const interventions = await Intervention.find({ clientId: req.params.id })
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ scheduledDate: 1 });
    
    res.json(interventions);
  } catch (error) {
    console.error('Get interventions by client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get today's interventions
// @route   GET /api/interventions/today
// @access  Private
export const getTodayInterventions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      let filteredInterventions = mockInterventions.filter(intervention => {
        const interventionDate = new Date(intervention.scheduledDate);
        return interventionDate >= today && interventionDate < tomorrow;
      });
      
      if (req.user.role === 'technicien') {
        filteredInterventions = filteredInterventions.filter(
          intervention => intervention.technicianId._id === req.user.id
        );
      } else if (req.user.role === 'client') {
        const clients = await Client.find({ userId: req.user.id });
        const clientIds = clients.map(client => client._id.toString());
        
        filteredInterventions = filteredInterventions.filter(
          intervention => clientIds.includes(intervention.clientId._id)
        );
      }
      
      return res.json(filteredInterventions);
    }

    let query = {
      scheduledDate: {
        $gte: today,
        $lt: tomorrow
      }
    };
    
    if (req.user.role === 'technicien') {
      query.technicianId = req.user.id;
    } else if (req.user.role === 'client') {
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      query.clientId = { $in: clientIds };
    }
    
    const interventions = await Intervention.find(query)
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ scheduledDate: 1 });
    
    res.json(interventions);
  } catch (error) {
    console.error('Get today interventions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get upcoming interventions
// @route   GET /api/interventions/upcoming
// @access  Private
export const getUpcomingInterventions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      let filteredInterventions = mockInterventions.filter(intervention => {
        const interventionDate = new Date(intervention.scheduledDate);
        return interventionDate >= today;
      });
      
      if (req.user.role === 'technicien') {
        filteredInterventions = filteredInterventions.filter(
          intervention => intervention.technicianId._id === req.user.id
        );
      } else if (req.user.role === 'client') {
        const clients = await Client.find({ userId: req.user.id });
        const clientIds = clients.map(client => client._id.toString());
        
        filteredInterventions = filteredInterventions.filter(
          intervention => clientIds.includes(intervention.clientId._id)
        );
      }
      
      return res.json(filteredInterventions);
    }

    let query = {
      scheduledDate: { $gte: today }
    };
    
    if (req.user.role === 'technicien') {
      query.technicianId = req.user.id;
    } else if (req.user.role === 'client') {
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      query.clientId = { $in: clientIds };
    }
    
    const interventions = await Intervention.find(query)
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ scheduledDate: 1 })
      .limit(10);
    
    res.json(interventions);
  } catch (error) {
    console.error('Get upcoming interventions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};