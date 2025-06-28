import Client from '../models/Client.js';
import { exportToCsv } from '../utils/csvExporter.js';
import { validationResult } from 'express-validator';

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
export const getClients = async (req, res) => {
  try {
    let clients;
    
    if (req.user.role === 'admin' || req.user.role === 'technicien') {
      // Admins and technicians can see all clients
      clients = await Client.find().populate('userId', 'email firstName lastName');
    } else if (req.user.role === 'client') {
      // Clients can only see their own data
      clients = await Client.find({ userId: req.user.id }).populate('userId', 'email firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(clients);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get client by ID
// @route   GET /api/clients/:id
// @access  Private
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('userId', 'email firstName lastName');
    
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
};

// @desc    Create new client
// @route   POST /api/clients
// @access  Private/Admin/Technicien
export const createClient = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newClient = new Client({
      ...req.body,
      userId: req.user.id
    });
    
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private/Admin/Technicien
export const updateClient = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private/Admin
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    await client.deleteOne();
    res.json({ message: 'Client removed' });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Export clients to CSV
// @route   GET /api/clients/export
// @access  Private/Admin/Technicien
export const exportClients = async (req, res) => {
  try {
    let clients;
    
    if (req.user.role === 'admin' || req.user.role === 'technicien') {
      // Admins and technicians can export all clients
      clients = await Client.find().populate('userId', 'email firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const headers = [
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' },
      { id: 'phone', title: 'Phone' },
      { id: 'address', title: 'Address' },
      { id: 'createdAt', title: 'Created At' }
    ];
    
    const data = clients.map(client => ({
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      createdAt: client.createdAt
    }));
    
    const filePath = await exportToCsv('clients', data, headers);
    
    res.download(filePath, `clients_export_${Date.now()}.csv`, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Export clients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};