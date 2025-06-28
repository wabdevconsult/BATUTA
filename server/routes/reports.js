import express from 'express';
import Report from '../models/Report.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all reports
router.get('/', async (req, res) => {
  try {
    let reports;
    
    if (req.user.role === 'admin') {
      // Admins can see all reports
      reports = await Report.find()
        .populate('intervention', 'title scheduledDate')
        .populate('technician', 'firstName lastName')
        .populate('client', 'company');
    } else if (req.user.role === 'technicien') {
      // Technicians can see reports they created
      reports = await Report.find({ technician: req.user.id })
        .populate('intervention', 'title scheduledDate')
        .populate('technician', 'firstName lastName')
        .populate('client', 'company');
    } else if (req.user.role === 'client') {
      // Clients can see reports for their company
      // First get client record for this user
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id);
      
      reports = await Report.find({ client: { $in: clientIds } })
        .populate('intervention', 'title scheduledDate')
        .populate('technician', 'firstName lastName')
        .populate('client', 'company');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get report by ID
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('intervention', 'title description scheduledDate type')
      .populate('technician', 'firstName lastName phone email')
      .populate('client', 'company contactPerson address');
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    // Check permissions
    if (req.user.role === 'technicien' && report.technician._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'client') {
      // Check if report belongs to client's company
      const clients = await Client.find({ userId: req.user.id });
      const clientIds = clients.map(client => client._id.toString());
      
      if (!clientIds.includes(report.client._id.toString())) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new report
router.post('/', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    const newReport = new Report({
      ...req.body,
      technician: req.user.id
    });
    
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update report
router.put('/:id', authorizeRoles(['admin', 'technicien']), async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    // Check permissions for technicians
    if (req.user.role === 'technicien' && report.technician.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update report fields
    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== 'createdAt' && key !== 'technician') {
        report[key] = req.body[key];
      }
    });
    
    await report.save();
    res.json(report);
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete report
router.delete('/:id', authorizeRoles(['admin']), async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    await report.remove();
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;