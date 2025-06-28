import express from 'express';
import { 
  getFactures, 
  getFactureById, 
  createFacture, 
  updateFacture, 
  deleteFacture, 
  exportFactures 
} from '../controllers/factureController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const factureValidation = [
  check('clientId', 'Client ID is required').not().isEmpty(),
  check('items', 'Items are required').isArray(),
  check('total', 'Total amount is required').isNumeric(),
  check('status').optional(),
  check('dueDate').optional().isISO8601().toDate()
];

// Get all invoices (with role-based filtering in controller)
router.get('/', getFactures);

// Export invoices (admin and technician only)
router.get('/export', authorizeRoles(['admin', 'technicien']), exportFactures);

// Get invoice by ID (with permission checks in controller)
router.get('/:id', getFactureById);

// Create new invoice (admin and technician only)
router.post('/', authorizeRoles(['admin', 'technicien']), factureValidation, createFacture);

// Update invoice (admin and technician only, with permission checks in controller)
router.put('/:id', authorizeRoles(['admin', 'technicien']), factureValidation, updateFacture);

// Delete invoice (admin only)
router.delete('/:id', authorizeRoles(['admin']), deleteFacture);

export default router;