import express from 'express';
import { 
  getDevis, 
  getDevisById, 
  createDevis, 
  updateDevis, 
  deleteDevis, 
  exportDevis 
} from '../controllers/devisController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const devisValidation = [
  check('clientId', 'Client ID is required').not().isEmpty(),
  check('items', 'Items are required').isArray(),
  check('total', 'Total amount is required').isNumeric(),
  check('status').optional(),
  check('validUntil').optional().isISO8601().toDate()
];

// Get all quotes (with role-based filtering in controller)
router.get('/', getDevis);

// Export quotes (admin and technician only)
router.get('/export', authorizeRoles(['admin', 'technicien']), exportDevis);

// Get quote by ID (with permission checks in controller)
router.get('/:id', getDevisById);

// Create new quote (admin and technician only)
router.post('/', authorizeRoles(['admin', 'technicien']), devisValidation, createDevis);

// Update quote (admin and technician only, with permission checks in controller)
router.put('/:id', authorizeRoles(['admin', 'technicien']), devisValidation, updateDevis);

// Delete quote (admin only)
router.delete('/:id', authorizeRoles(['admin']), deleteDevis);

export default router;