import express from 'express';
import { 
  getClients, 
  getClientById, 
  createClient, 
  updateClient, 
  deleteClient, 
  exportClients 
} from '../controllers/clientController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const clientValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email').optional().isEmail(),
  check('phone').optional(),
  check('address').optional()
];

// Get all clients (with role-based filtering in controller)
router.get('/', getClients);

// Export clients (admin and technician only)
router.get('/export', authorizeRoles(['admin', 'technicien']), exportClients);

// Get client by ID (with permission checks in controller)
router.get('/:id', getClientById);

// Create new client (admin and technician only)
router.post('/', authorizeRoles(['admin', 'technicien']), clientValidation, createClient);

// Update client (admin and technician only)
router.put('/:id', authorizeRoles(['admin', 'technicien']), clientValidation, updateClient);

// Delete client (admin only)
router.delete('/:id', authorizeRoles(['admin']), deleteClient);

export default router;