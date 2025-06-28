import express from 'express';
import Quote from '../models/Quote.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all quotes
router.get('/', async (req, res) => {
  try {
    let quotes;
    
    if (req.user.role === 'admin') {
      // Admins can see all quotes
      quotes = await Quote.find()
        .populate('client', 'company contactPerson')
        .populate('createdBy', 'firstName lastName');
    } else if (req.user.role === 'technicien') {
      // Technicians can see quotes they created
      quotes = await Quote.find({ createdBy: req.user.id })
        .populate('client', 'company contactPerson')
        .populate('createdBy', 'firstName lastName');
    } else if (req.user.role === 'client') {
      // Clients can see quotes for their company
      // First get client record for this user
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      quotes = await Quote.find({ client: { $in: clientIds } })
        .populate('client', 'company contactPerson')
        .populate('createdBy', 'firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(quotes);
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quote by ID
router.get('/:id', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('client', 'company contactPerson address')
      .populate('createdBy', 'firstName lastName');
    
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && quote.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      // Check if quote belongs to client's company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(quote.client._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(quote);
  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new quote
router.post('/', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    // Generate quote number
    const lastQuote = await Quote.findOne().sort({ createdAt: -1 });
    let quoteNumber = 'DEV-2025-001';
    
    if (lastQuote && lastQuote.quoteNumber) {
      const lastNumber = parseInt(lastQuote.quoteNumber.split('-').pop());
      quoteNumber = `DEV-2025-${(lastNumber + 1).toString().padStart(3, '0')}`;
    }
    
    const newQuote = new Quote({
      ...req.body,
      quoteNumber,
      createdBy: req.user.id
    });
    
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update quote
router.put('/:id', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && quote.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Don't allow updating certain fields
    const { quoteNumber, createdBy, createdAt, ...updateData } = req.body;
    
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
});

// Delete quote
router.delete('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    
    await quote.remove();
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Delete quote error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;