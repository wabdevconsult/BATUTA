import express from 'express';
import Intervention from '../models/Intervention.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all interventions
router.get('/', async (req, res) => {
  try {
    let interventions;
    
    if (req.user.role === 'admin') {
      // Admins can see all interventions
      interventions = await Intervention.find()
        .populate('client', 'company contactPerson')
        .populate('technicians', 'firstName lastName')
        .populate('createdBy', 'firstName lastName');
    } else if (req.user.role === 'technicien') {
      // Technicians can see interventions they're assigned to
      interventions = await Intervention.find({ technicians: req.user.id })
        .populate('client', 'company contactPerson')
        .populate('technicians', 'firstName lastName')
        .populate('createdBy', 'firstName lastName');
    } else if (req.user.role === 'client') {
      // Clients can see interventions for their company
      // First get client record for this user
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      interventions = await Intervention.find({ client: { $in: clientIds } })
        .populate('client', 'company contactPerson')
        .populate('technicians', 'firstName lastName')
        .populate('createdBy', 'firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(interventions);
  } catch (error) {
    console.error('Get interventions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get intervention by ID
router.get('/:id', async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id)
      .populate('client', 'company contactPerson address')
      .populate('technicians', 'firstName lastName phone email')
      .populate('createdBy', 'firstName lastName');
    
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && !intervention.technicians.some(tech => tech._id.toString() === req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      // Check if intervention belongs to client's company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(intervention.client._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(intervention);
  } catch (error) {
    console.error('Get intervention error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new intervention
router.post('/', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    const newIntervention = new Intervention({
      ...req.body,
      createdBy: req.user.id
    });
    
    await newIntervention.save();
    res.status(201).json(newIntervention);
  } catch (error) {
    console.error('Create intervention error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update intervention
router.put('/:id', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && !intervention.technicians.includes(req.user.id) && intervention.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update intervention fields
    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== 'createdAt' && key !== 'createdBy') {
        intervention[key] = req.body[key];
      }
    });
    
    await intervention.save();
    res.json(intervention);
  } catch (error) {
    console.error('Update intervention error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete intervention
router.delete('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention not found' });
    }
    
    await intervention.remove();
    res.json({ message: 'Intervention deleted successfully' });
  } catch (error) {
    console.error('Delete intervention error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;