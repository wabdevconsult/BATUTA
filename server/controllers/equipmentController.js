import Equipment from '../models/Equipment.js';
import Client from '../models/Client.js';
import { validationResult } from 'express-validator';

// Mock data for demo mode
const mockEquipments = [
  {
    _id: '507f1f77bcf86cd799439031',
    name: 'Pompe à chaleur air/eau',
    type: 'Chauffage',
    brand: 'Daikin',
    model: 'Altherma 3',
    serialNumber: 'DAI2023456789',
    installationDate: new Date('2023-05-15'),
    lastMaintenanceDate: new Date('2023-11-15'),
    nextMaintenanceDate: new Date('2024-05-15'),
    status: 'operational',
    location: {
      address: '123 Rue de Paris, 75001 Paris',
      coordinates: {
        lat: 48.856614,
        lng: 2.3522219
      }
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
    warranty: {
      startDate: new Date('2023-05-15'),
      endDate: new Date('2025-05-15'),
      provider: 'Daikin France',
      details: 'Garantie pièces et main d\'œuvre'
    },
    specifications: {
      power: '8 kW',
      energyClass: 'A+++',
      refrigerant: 'R32'
    },
    notes: 'Installation réalisée sans problème. Client satisfait.',
    attachments: [
      {
        name: 'manuel_utilisation.pdf',
        url: 'https://example.com/manuel_utilisation.pdf',
        type: 'application/pdf',
        uploadedAt: new Date('2023-05-15')
      }
    ],
    maintenanceHistory: [
      {
        date: new Date('2023-05-15'),
        type: 'installation',
        technicianId: '507f1f77bcf86cd799439023',
        description: 'Installation initiale',
        cost: 1200
      },
      {
        date: new Date('2023-11-15'),
        type: 'preventive',
        technicianId: '507f1f77bcf86cd799439023',
        description: 'Maintenance préventive semestrielle',
        cost: 150
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-11-15')
  },
  {
    _id: '507f1f77bcf86cd799439032',
    name: 'Chaudière à condensation',
    type: 'Chauffage',
    brand: 'Viessmann',
    model: 'Vitodens 200-W',
    serialNumber: 'VIE20234567890',
    installationDate: new Date('2022-09-10'),
    lastMaintenanceDate: new Date('2023-09-10'),
    nextMaintenanceDate: new Date('2024-09-10'),
    status: 'maintenance_required',
    location: {
      address: '45 Avenue Victor Hugo, 69002 Lyon',
      coordinates: {
        lat: 45.7578137,
        lng: 4.8320114
      }
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
    warranty: {
      startDate: new Date('2022-09-10'),
      endDate: new Date('2024-09-10'),
      provider: 'Viessmann France',
      details: 'Garantie 2 ans pièces et main d\'œuvre'
    },
    specifications: {
      power: '25 kW',
      energyClass: 'A',
      fuelType: 'Gaz naturel'
    },
    notes: 'Remplacement de l\'ancienne chaudière. Raccordement au circuit existant.',
    attachments: [],
    maintenanceHistory: [
      {
        date: new Date('2022-09-10'),
        type: 'installation',
        technicianId: '507f1f77bcf86cd799439023',
        description: 'Installation initiale',
        cost: 2200
      },
      {
        date: new Date('2023-09-10'),
        type: 'preventive',
        technicianId: '507f1f77bcf86cd799439023',
        description: 'Maintenance annuelle obligatoire',
        cost: 180
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2022-09-10'),
    updatedAt: new Date('2023-09-10')
  },
  {
    _id: '507f1f77bcf86cd799439033',
    name: 'Climatisation multi-split',
    type: 'Climatisation',
    brand: 'Mitsubishi Electric',
    model: 'MSZ-HR25VF',
    serialNumber: 'MIT20234567891',
    installationDate: new Date('2023-06-20'),
    lastMaintenanceDate: null,
    nextMaintenanceDate: new Date('2024-06-20'),
    status: 'operational',
    location: {
      address: '8 Boulevard Haussmann, 75008 Paris',
      coordinates: {
        lat: 48.8738548,
        lng: 2.3400195
      }
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
    warranty: {
      startDate: new Date('2023-06-20'),
      endDate: new Date('2026-06-20'),
      provider: 'Mitsubishi France',
      details: 'Garantie 3 ans'
    },
    specifications: {
      power: '2.5 kW',
      energyClass: 'A++',
      refrigerant: 'R32',
      units: 3
    },
    notes: 'Installation dans les bureaux. 3 unités intérieures.',
    attachments: [],
    maintenanceHistory: [
      {
        date: new Date('2023-06-20'),
        type: 'installation',
        technicianId: '507f1f77bcf86cd799439029',
        description: 'Installation du système multi-split',
        cost: 3500
      }
    ],
    createdBy: {
      _id: '507f1f77bcf86cd799439024',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-06-20')
  }
];

// @desc    Get all equipment
// @route   GET /api/equipments
// @access  Private
export const getEquipments = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      let filteredEquipments = [...mockEquipments];
      
      if (req.user.role === 'technicien') {
        // Filter for technicians based on assignment
        filteredEquipments = mockEquipments.filter(equipment => 
          equipment.technicianId._id === req.user.id
        );
      } else if (req.user.role === 'client') {
        // Filter for clients based on clientId
        const clients = await Client.find({ userId: req.user.id });
        const clientIds = clients.map(client => client._id.toString());
        
        filteredEquipments = mockEquipments.filter(equipment => 
          clientIds.includes(equipment.clientId._id)
        );
      }
      
      return res.json(filteredEquipments);
    }

    let equipments;
    
    if (req.user.role === 'admin') {
      // Admins can see all equipment
      equipments = await Equipment.find()
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'technicien') {
      // Technicians can see equipment assigned to them
      equipments = await Equipment.find({ technicianId: req.user.id })
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'client') {
      // Clients can see equipment for their company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      equipments = await Equipment.find({ clientId: { $in: clientIds } })
        .populate('clientId', 'name email phone address')
        .populate('technicianId', 'firstName lastName email phone')
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(equipments);
  } catch (error) {
    console.error('Get equipments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get equipment by ID
// @route   GET /api/equipments/:id
// @access  Private
export const getEquipmentById = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockEquipment = mockEquipments.find(equipment => equipment._id === req.params.id);
      
      if (!mockEquipment) {
        return res.status(404).json({ message: 'Equipment not found' });
      }
      
      // Check permissions
      if (req.user.role === 'technicien' && mockEquipment.technicianId._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      if (req.user.role === 'client') {
        const clients = await Client.find({ userId: req.user.id });
        const clientIds = clients.map(client => client._id.toString());
        
        if (!clientIds.includes(mockEquipment.clientId._id)) {
          return res.status(403).json({ message: 'Access denied' });
        }
      }
      
      return res.json(mockEquipment);
    }

    const equipment = await Equipment.findById(req.params.id)
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .populate('maintenanceHistory.technicianId', 'firstName lastName email');
    
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && equipment.technicianId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(equipment.clientId._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(equipment);
  } catch (error) {
    console.error('Get equipment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new equipment
// @route   POST /api/equipments
// @access  Private/Admin/Technicien
export const createEquipment = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockEquipment = {
        _id: '507f1f77bcf86cd799439034',
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
      
      return res.status(201).json(mockEquipment);
    }

    const newEquipment = new Equipment({
      ...req.body,
      createdBy: req.user.id
    });
    
    await newEquipment.save();
    
    // Populate the response
    const populatedEquipment = await Equipment.findById(newEquipment._id)
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .populate('maintenanceHistory.technicianId', 'firstName lastName email');
    
    res.status(201).json(populatedEquipment);
  } catch (error) {
    console.error('Create equipment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update equipment
// @route   PUT /api/equipments/:id
// @access  Private/Admin/Technicien
export const updateEquipment = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockEquipment = mockEquipments.find(equipment => equipment._id === req.params.id);
      
      if (!mockEquipment) {
        return res.status(404).json({ message: 'Equipment not found' });
      }
      
      // Check permissions for technicians
      if (req.user.role === 'technicien' && mockEquipment.technicianId._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const updatedMockEquipment = {
        ...mockEquipment,
        ...req.body,
        updatedAt: new Date()
      };
      
      return res.json(updatedMockEquipment);
    }

    const equipment = await Equipment.findById(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && equipment.technicianId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update equipment fields
    const updateFields = { ...req.body };
    
    // Update the equipment
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    )
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .populate('maintenanceHistory.technicianId', 'firstName lastName email');
    
    res.json(updatedEquipment);
  } catch (error) {
    console.error('Update equipment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add maintenance record
// @route   POST /api/equipments/:id/maintenance
// @access  Private/Admin/Technicien
export const addMaintenanceRecord = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, type, description, cost } = req.body;

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const mockEquipment = mockEquipments.find(equipment => equipment._id === req.params.id);
      
      if (!mockEquipment) {
        return res.status(404).json({ message: 'Equipment not found' });
      }
      
      // Check permissions for technicians
      if (req.user.role === 'technicien' && mockEquipment.technicianId._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      const newMaintenanceRecord = {
        date: new Date(date),
        type,
        technicianId: req.user.id,
        description,
        cost
      };
      
      const updatedMockEquipment = {
        ...mockEquipment,
        maintenanceHistory: [...mockEquipment.maintenanceHistory, newMaintenanceRecord],
        lastMaintenanceDate: new Date(date),
        updatedAt: new Date()
      };
      
      return res.json(updatedMockEquipment);
    }

    const equipment = await Equipment.findById(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && equipment.technicianId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Create new maintenance record
    const newMaintenanceRecord = {
      date: new Date(date),
      type,
      technicianId: req.user.id,
      description,
      cost
    };
    
    // Add to maintenance history
    equipment.maintenanceHistory.push(newMaintenanceRecord);
    
    // Update last maintenance date
    equipment.lastMaintenanceDate = new Date(date);
    
    await equipment.save();
    
    // Fetch updated equipment with populated fields
    const updatedEquipment = await Equipment.findById(req.params.id)
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .populate('maintenanceHistory.technicianId', 'firstName lastName email');
    
    res.json(updatedEquipment);
  } catch (error) {
    console.error('Add maintenance record error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete equipment
// @route   DELETE /api/equipments/:id
// @access  Private/Admin
export const deleteEquipment = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return success message for development mode
      return res.json({ message: 'Equipment removed' });
    }

    const equipment = await Equipment.findById(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    await equipment.deleteOne();
    res.json({ message: 'Equipment removed' });
  } catch (error) {
    console.error('Delete equipment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get equipment by client
// @route   GET /api/equipments/client/:id
// @access  Private/Admin/Technicien
export const getEquipmentByClient = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const filteredEquipments = mockEquipments.filter(
        equipment => equipment.clientId._id === req.params.id
      );
      
      return res.json(filteredEquipments);
    }

    const equipments = await Equipment.find({ clientId: req.params.id })
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(equipments);
  } catch (error) {
    console.error('Get equipment by client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get equipment by technician
// @route   GET /api/equipments/technician/:id
// @access  Private/Admin
export const getEquipmentByTechnician = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const filteredEquipments = mockEquipments.filter(
        equipment => equipment.technicianId._id === req.params.id
      );
      
      return res.json(filteredEquipments);
    }

    const equipments = await Equipment.find({ technicianId: req.params.id })
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(equipments);
  } catch (error) {
    console.error('Get equipment by technician error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get equipment requiring maintenance
// @route   GET /api/equipments/maintenance
// @access  Private/Admin/Technicien
export const getEquipmentRequiringMaintenance = async (req, res) => {
  try {
    const today = new Date();
    
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      let filteredEquipments = mockEquipments.filter(equipment => {
        const nextMaintenance = new Date(equipment.nextMaintenanceDate);
        return nextMaintenance <= today || equipment.status === 'maintenance_required';
      });
      
      if (req.user.role === 'technicien') {
        filteredEquipments = filteredEquipments.filter(
          equipment => equipment.technicianId._id === req.user.id
        );
      }
      
      return res.json(filteredEquipments);
    }

    let query = {
      $or: [
        { nextMaintenanceDate: { $lte: today } },
        { status: 'maintenance_required' }
      ]
    };
    
    if (req.user.role === 'technicien') {
      query.technicianId = req.user.id;
    }
    
    const equipments = await Equipment.find(query)
      .populate('clientId', 'name email phone address')
      .populate('technicianId', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .sort({ nextMaintenanceDate: 1 });
    
    res.json(equipments);
  } catch (error) {
    console.error('Get equipment requiring maintenance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};