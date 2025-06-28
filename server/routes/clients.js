import express from 'express';
import Client from '../models/Client.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all clients
// Admin can see all clients, technicians can see assigned clients, clients can see only themselves
router.get('/', async (req, res) => {
  try {
    let clients;
    
    if (req.user.role === 'admin') {
      // Admins can see all clients
      clients = await Client.find();
    } else if (req.user.role === 'technicien') {
      // Technicians can see clients they're assigned to (implementation depends on your data model)
      // This is a simplified version - you might need to join with interventions
      clients = await Client.find();
    } else if (req.user.role === 'client') {
      // Clients can only see their own data
      clients = await Client.find({ userId: req.user.id });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(clients);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get client by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Check permissions
    if (req.user.role === 'client' && client.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(client);
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new client
router.post('/', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    const newClient = new Client({
      ...req.body,
      createdBy: req.user.id
    });
    
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update client
router.put('/:id', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Update client fields
    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== 'createdAt') {
        client[key] = req.body[key];
      }
    });
    
    await client.save();
    res.json(client);
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete client
router.delete('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    await client.remove();
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;