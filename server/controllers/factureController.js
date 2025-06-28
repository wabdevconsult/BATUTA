import Invoice from '../models/Invoice.js';
import Client from '../models/Client.js';
import { exportToCsv } from '../utils/csvExporter.js';
import { validationResult } from 'express-validator';

// Helper function to generate invoice number
const generateInvoiceNumber = async () => {
  const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
  let invoiceNumber = 'INV-2025-001';
  
  if (lastInvoice && lastInvoice.invoiceNumber) {
    const lastNumber = parseInt(lastInvoice.invoiceNumber.split('-').pop());
    invoiceNumber = `INV-2025-${(lastNumber + 1).toString().padStart(3, '0')}`;
  }
  
  return invoiceNumber;
};

// @desc    Get all invoices
// @route   GET /api/factures
// @access  Private
export const getFactures = async (req, res) => {
  try {
    let invoices;
    
    if (req.user.role === 'admin') {
      // Admins can see all invoices
      invoices = await Invoice.find()
        .populate('clientId', 'name email phone')
        .populate('userId', 'firstName lastName');
    } else if (req.user.role === 'technicien') {
      // Technicians can see invoices they created
      invoices = await Invoice.find({ userId: req.user.id })
        .populate('clientId', 'name email phone')
        .populate('userId', 'firstName lastName');
    } else if (req.user.role === 'client') {
      // Clients can see invoices for their company
      // First get client record for this user
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      invoices = await Invoice.find({ clientId: { $in: clientIds } })
        .populate('clientId', 'name email phone')
        .populate('userId', 'firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(invoices);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get invoice by ID
// @route   GET /api/factures/:id
// @access  Private
export const getFactureById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('clientId', 'name email phone address')
      .populate('userId', 'firstName lastName');
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && invoice.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      // Check if invoice belongs to client's company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(invoice.clientId._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(invoice);
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new invoice
// @route   POST /api/factures
// @access  Private/Admin/Technicien
export const createFacture = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber();
    
    const newInvoice = new Invoice({
      ...req.body,
      invoiceNumber,
      userId: req.user.id
    });
    
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update invoice
// @route   PUT /api/factures/:id
// @access  Private/Admin/Technicien
export const updateFacture = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && invoice.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Don't allow updating certain fields
    const { invoiceNumber, userId, createdAt, ...updateData } = req.body;
    
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
};

// @desc    Delete invoice
// @route   DELETE /api/factures/:id
// @access  Private/Admin
export const deleteFacture = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    await invoice.deleteOne();
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Export invoices to CSV
// @route   GET /api/factures/export
// @access  Private/Admin/Technicien
export const exportFactures = async (req, res) => {
  try {
    let invoices;
    
    if (req.user.role === 'admin') {
      // Admins can export all invoices
      invoices = await Invoice.find()
        .populate('clientId', 'name')
        .populate('userId', 'firstName lastName');
    } else if (req.user.role === 'technicien') {
      // Technicians can export invoices they created
      invoices = await Invoice.find({ userId: req.user.id })
        .populate('clientId', 'name')
        .populate('userId', 'firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const headers = [
      { id: 'id', title: 'ID' },
      { id: 'invoiceNumber', title: 'Invoice Number' },
      { id: 'client', title: 'Client' },
      { id: 'subtotal', title: 'Subtotal' },
      { id: 'taxAmount', title: 'Tax Amount' },
      { id: 'total', title: 'Total Amount' },
      { id: 'status', title: 'Status' },
      { id: 'paymentMethod', title: 'Payment Method' },
      { id: 'createdBy', title: 'Created By' },
      { id: 'createdAt', title: 'Created At' }
    ];
    
    const data = invoices.map(invoice => ({
      id: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      client: invoice.clientId?.name || '',
      subtotal: invoice.subtotal,
      taxAmount: invoice.taxAmount,
      total: invoice.total,
      status: invoice.status,
      paymentMethod: invoice.paymentMethod,
      createdBy: `${invoice.userId?.firstName || ''} ${invoice.userId?.lastName || ''}`,
      createdAt: invoice.createdAt
    }));
    
    const filePath = await exportToCsv('invoices', data, headers);
    
    res.download(filePath, `invoices_export_${Date.now()}.csv`, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Export invoices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};