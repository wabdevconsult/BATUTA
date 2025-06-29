import Installation from '../models/Installation.js';
import Equipment from '../models/Equipment.js';
import Client from '../models/Client.js';
import { validationResult } from 'express-validator';

// Mock data for demo mode
const mockInstallations = [
  {
    _id: '507f1f77bcf86cd799439041',
    name: 'Installation pompe à chaleur',
    description: 'Installation complète d\'une pompe à chaleur air/eau',
    equipmentId: {
      _id: '507f1f77bcf86cd799439031',
      name: 'Pompe à chaleur air/eau',
      type: 'Chauffage',
      brand: 'Daikin',
      model: 'Altherma 3'
    },
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
    installationDate: new Date('2025-06-15'),
    completionDate: new Date('2025-06-16'),
    status: 'completed',
    location: {
      address: '123 Rue de Paris, 75001 Paris',
      coordinates: {
        lat: 48.856614,
        lng: 2.3522219
      }
    },
    notes: 'Installation réalisée avec succès. Client satisfait.',
    attachments: [
      {
        name: 'photo_installation.jpg',
        url: 'https://example.com/photo_installation.jpg',
        type: 'image/jpeg',
        uploadedAt: new Date('2025-06-16')
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-06-10'),
    updatedAt: new Date('2025-06-16')
  },
  {
    _id: '507f1f77bcf86cd799439042',
    name: 'Installation chaudière',
    description: 'Installation d\'une chaudière à condensation',
    equipmentId: {
      _id: '507f1f77bcf86cd799439032',
      name: 'Chaudière à condensation',
      type: 'Chauffage',
      brand: 'Viessmann',
      model: 'Vitodens 200-W'
    },
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
    installationDate: new Date('2025-06-20'),
    status: 'scheduled',
    location: {
      address: '45 Avenue Victor Hugo, 69002 Lyon',
      coordinates: {
        lat: 45.7578137,
        lng: 4.8320114
      }
    },
    notes: 'Prévoir 4 heures d\'intervention',
    attachments: [],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-06-12'),
    updatedAt: new Date('2025-06-12')
  },
  {
    _id: '507f1f77bcf86cd799439043',
    name: 'Installation climatisation',
    description: 'Installation d\'un système de climatisation multi-split',
    equipmentId: {
      _id: '507f1f77bcf86cd799439033',
      name: 'Climatisation multi-split',
      type: 'Climatisation',
      brand: 'Mitsubishi Electric',
      model: 'MSZ-HR25VF'
    },
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
    installationDate: new Date('2025-06-25'),
    status: 'in_progress',
    location: {
      address: '8 Boulevard Haussmann, 75008 Paris',
      coordinates: {
        lat: 48.8738548,
        lng: 2.3400195
      }
    },
    notes: 'Installation en cours, problème d\'accès au faux plafond',
    attachments: [],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2025-06-14'),
    updatedAt: new Date('2025-06-18')
  }
];

// @desc    Get all installations
// @route   GET /api/installations
// @access  Private
export const getInstallations = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      let filteredInstallations = [...mockInstallations];
      
      if (req.user.role === 'technicien') {
        // Filter for technicians based on assignment
        filteredInstallations = mockInstallations.filter(installation => 
          installation.technicianId._id === req.user.id
        );
      } else if (req.user.role === 'client') {
        // Filter for clients based on clientId
        const clients = await Client.find({ userId: req.user.id });
        const clientIds = clients.map(client => client._id.toString());
        
        filteredInstallations = mockInstallations.filter(installation => 
          clientIds.includes(installation.clientId._id)
        );
      }
      
      return res.json(filteredInstallations);
    }

    let installations;
    
    if (req.user.role === 'admin') {
      // Admins can see all installations
      installations = await Installation.find()
        .populate('equipmentId', 'name type brand model')
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'technicien') {
      // Technicians can see installations assigned to them
      installations = await Installation.find({ technicianId: req.user.id })
        .populate('equipmentId', 'name type brand model')
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'client') {
      // Clients can see installations for their company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      installations = await Installation.find({ clientId: { $in: clientIds } })
        .populate('equipmentId', 'name type brand model')
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(installations);
  } catch (error) {
    console.error('Get installations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get installation by ID
// @route   GET /api/installations/:id
// @access  Private
export const getInstallationById = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockInstallation = mockInstallations.find(installation => installation._id === req.params.id);
      
      if (!mockInstallation) {
        return res.status(404).json({ message: 'Installation not found' });
      }
      
      // Check permissions
      if (req.user.role === 'technicien' && mockInstallation.technicianId._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      if (req.user.role === 'client') {
        const clients = await Client.find({ userId: req.user.id });
        const clientIds = clients.map(client => client._id.toString());
        
        if (!clientIds.includes(mockInstallation.clientId._id)) {
          return res.status(403).json({ message: 'Access denied' });
        }
      }
      
      return res.json(mockInstallation);
    }

    const installation = await Installation.findById(req.params.id)
      .populate('equipmentId', 'name type brand model')
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email');
    
    if (!installation) {
      return res.status(404).json({ message: 'Installation not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && installation.technicianId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(installation.clientId._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(installation);
  } catch (error) {
    console.error('Get installation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new installation
// @route   POST /api/installations
// @access  Private/Admin/Technicien
export const createInstallation = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockInstallation = {
        _id: '507f1f77bcf86cd799439044',
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
      
      return res.status(201).json(mockInstallation);
    }

    // Verify equipment exists
    const equipment = await Equipment.findById(req.body.equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    // Verify client exists
    const client = await Client.findById(req.body.clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const newInstallation = new Installation({
      ...req.body,
      createdBy: req.user.id
    });
    
    await newInstallation.save();
    
    // Populate the response
    const populatedInstallation = await Installation.findById(newInstallation._id)
      .populate('equipmentId', 'name type brand model')
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email');
    
    res.status(201).json(populatedInstallation);
  } catch (error) {
    console.error('Create installation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update installation
// @route   PUT /api/installations/:id
// @access  Private/Admin/Technicien
export const updateInstallation = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockInstallation = mockInstallations.find(installation => installation._id === req.params.id);
      
      if (!mockInstallation) {
        return res.status(404).json({ message: 'Installation not found' });
      }
      
      // Check permissions for technicians
      if (req.user.role === 'technicien' && mockInstallation.technicianId._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const updatedMockInstallation = {
        ...mockInstallation,
        ...req.body,
        updatedAt: new Date()
      };
      
      return res.json(updatedMockInstallation);
    }

    const installation = await Installation.findById(req.params.id);
    
    if (!installation) {
      return res.status(404).json({ message: 'Installation not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && installation.technicianId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update installation fields
    const updateFields = { ...req.body };
    
    // Update the installation
    const updatedInstallation = await Installation.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    )
      .populate('equipmentId', 'name type brand model')
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email');
    
    res.json(updatedInstallation);
  } catch (error) {
    console.error('Update installation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete installation
// @route   DELETE /api/installations/:id
// @access  Private/Admin
export const deleteInstallation = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return success message for development mode
      return res.json({ message: 'Installation removed' });
    }

    const installation = await Installation.findById(req.params.id);
    
    if (!installation) {
      return res.status(404).json({ message: 'Installation not found' });
    }
    
    await installation.deleteOne();
    res.json({ message: 'Installation removed' });
  } catch (error) {
    console.error('Delete installation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get installations by client
// @route   GET /api/installations/client/:id
// @access  Private/Admin/Technicien
export const getInstallationsByClient = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const filteredInstallations = mockInstallations.filter(
        installation => installation.clientId._id === req.params.id
      );
      
      return res.json(filteredInstallations);
    }

    const installations = await Installation.find({ clientId: req.params.id })
      .populate('equipmentId', 'name type brand model')
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(installations);
  } catch (error) {
    console.error('Get installations by client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get installations by technician
// @route   GET /api/installations/technician/:id
// @access  Private/Admin
export const getInstallationsByTechnician = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const filteredInstallations = mockInstallations.filter(
        installation => installation.technicianId._id === req.params.id
      );
      
      return res.json(filteredInstallations);
    }

    const installations = await Installation.find({ technicianId: req.params.id })
      .populate('equipmentId', 'name type brand model')
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(installations);
  } catch (error) {
    console.error('Get installations by technician error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get installations by equipment
// @route   GET /api/installations/equipment/:id
// @access  Private/Admin/Technicien
export const getInstallationsByEquipment = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const filteredInstallations = mockInstallations.filter(
        installation => installation.equipmentId._id === req.params.id
      );
      
      return res.json(filteredInstallations);
    }

    const installations = await Installation.find({ equipmentId: req.params.id })
      .populate('equipmentId', 'name type brand model')
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(installations);
  } catch (error) {
    console.error('Get installations by equipment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};