import express from 'express';
import Invoice from '../models/Invoice.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all invoices
router.get('/', async (req, res) => {
  try {
    let invoices;
    
    if (req.user.role === 'admin') {
      // Admins can see all invoices
      invoices = await Invoice.find()
        .populate('client', 'company contactPerson')
        .populate('createdBy', 'firstName lastName');
    } else if (req.user.role === 'technicien') {
      // Technicians can see invoices they created
      invoices = await Invoice.find({ createdBy: req.user.id })
        .populate('client', 'company contactPerson')
        .populate('createdBy', 'firstName lastName');
    } else if (req.user.role === 'client') {
      // Clients can see invoices for their company
      // First get client record for this user
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      invoices = await Invoice.find({ client: { $in: clientIds } })
        .populate('client', 'company contactPerson')
        .populate('createdBy', 'firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(invoices);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('client', 'company contactPerson address')
      .populate('interventions', 'title scheduledDate')
      .populate('createdBy', 'firstName lastName');
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && invoice.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      // Check if invoice belongs to client's company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(invoice.client._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(invoice);
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new invoice
router.post('/', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    // Generate invoice number
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    let invoiceNumber = 'INV-2025-001';
    
    if (lastInvoice && lastInvoice.invoiceNumber) {
      const lastNumber = parseInt(lastInvoice.invoiceNumber.split('-').pop());
      invoiceNumber = `INV-2025-${(lastNumber + 1).toString().padStart(3, '0')}`;
    }
    
    const newInvoice = new Invoice({
      ...req.body,
      invoiceNumber,
      createdBy: req.user.id
    });
    
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update invoice
router.put('/:id', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && invoice.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Don't allow updating certain fields
    const { invoiceNumber, createdBy, createdAt, ...updateData } = req.body;
    
    // Update invoice fields
    Object.keys(updateData).forEach(key => {
      invoice[key] = updateData[key];
    });
    
    await invoice.save();
    res.json(invoice);
  } catch (error) {
    console.error('Update invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete invoice
router.delete('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    await invoice.remove();
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;