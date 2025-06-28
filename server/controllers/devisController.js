import Quote from '../models/Quote.js';
import Client from '../models/Client.js';
import { exportToCsv } from '../utils/csvExporter.js';
import { validationResult } from 'express-validator';

// Helper function to generate quote number
const generateQuoteNumber = async () => {
  const lastQuote = await Quote.findOne().sort({ createdAt: -1 });
  let quoteNumber = 'DEV-2025-001';
  
  if (lastQuote && lastQuote.quoteNumber) {
    const lastNumber = parseInt(lastQuote.quoteNumber.split('-').pop());
    quoteNumber = `DEV-2025-${(lastNumber + 1).toString().padStart(3, '0')}`;
  }
  
  return quoteNumber;
};

// @desc    Get all quotes
// @route   GET /api/devis
// @access  Private
export const getDevis = async (req, res) => {
  try {
    let quotes;
    
    if (req.user.role === 'admin') {
      // Admins can see all quotes
      quotes = await Quote.find()
        .populate('clientId', 'name email phone')
        .populate('userId', 'firstName lastName');
    } else if (req.user.role === 'technicien') {
      // Technicians can see quotes they created
      quotes = await Quote.find({ userId: req.user.id })
        .populate('clientId', 'name email phone')
        .populate('userId', 'firstName lastName');
    } else if (req.user.role === 'client') {
      // Clients can see quotes for their company
      // First get client record for this user
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      quotes = await Quote.find({ clientId: { $in: clientIds } })
        .populate('clientId', 'name email phone')
        .populate('userId', 'firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(quotes);
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get quote by ID
// @route   GET /api/devis/:id
// @access  Private
export const getDevisById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('clientId', 'name email phone address')
      .populate('userId', 'firstName lastName');
    
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && quote.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      // Check if quote belongs to client's company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(quote.clientId._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(quote);
  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new quote
// @route   POST /api/devis
// @access  Private/Admin/Technicien
export const createDevis = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Generate quote number
    const quoteNumber = await generateQuoteNumber();
    
    const newQuote = new Quote({
      ...req.body,
      quoteNumber,
      userId: req.user.id
    });
    
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update quote
// @route   PUT /api/devis/:id
// @access  Private/Admin/Technicien
export const updateDevis = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && quote.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Don't allow updating certain fields
    const { quoteNumber, userId, createdAt, ...updateData } = req.body;
    
    // Update quote fields
    Object.keys(updateData).forEach(key => {
      quote[key] = updateData[key];
    });
    
    await quote.save();
    res.json(quote);
  } catch (error) {
    console.error('Update quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete quote
// @route   DELETE /api/devis/:id
// @access  Private/Admin
export const deleteDevis = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    await quote.deleteOne();
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Delete quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Export quotes to CSV
// @route   GET /api/devis/export
// @access  Private/Admin/Technicien
export const exportDevis = async (req, res) => {
  try {
    let quotes;
    
    if (req.user.role === 'admin') {
      // Admins can export all quotes
      quotes = await Quote.find()
        .populate('clientId', 'name')
        .populate('userId', 'firstName lastName');
    } else if (req.user.role === 'technicien') {
      // Technicians can export quotes they created
      quotes = await Quote.find({ userId: req.user.id })
        .populate('clientId', 'name')
        .populate('userId', 'firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const headers = [
      { id: 'id', title: 'ID' },
      { id: 'quoteNumber', title: 'Quote Number' },
      { id: 'client', title: 'Client' },
      { id: 'subtotal', title: 'Subtotal' },
      { id: 'taxAmount', title: 'Tax Amount' },
      { id: 'total', title: 'Total Amount' },
      { id: 'status', title: 'Status' },
      { id: 'createdBy', title: 'Created By' },
      { id: 'createdAt', title: 'Created At' }
    ];
    
    const data = quotes.map(quote => ({
      id: quote._id,
      quoteNumber: quote.quoteNumber,
      client: quote.clientId?.name || '',
      subtotal: quote.subtotal,
      taxAmount: quote.taxAmount,
      total: quote.total,
      status: quote.status,
      createdBy: `${quote.userId?.firstName || ''} ${quote.userId?.lastName || ''}`,
      createdAt: quote.createdAt
    }));
    
    const filePath = await exportToCsv('quotes', data, headers);
    
    res.download(filePath, `quotes_export_${Date.now()}.csv`, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Export quotes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};