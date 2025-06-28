import express from 'express';
import { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  exportUsers 
} from '../controllers/userController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const updateUserValidation = [
  check('firstName').optional(),
  check('lastName').optional(),
  check('company').optional(),
  check('phone').optional(),
  check('role').optional().isIn(['admin', 'technicien', 'client', 'fournisseur'])
];

// Admin only routes
router.get('/', authorizeRoles(['admin']), getUsers);
router.get('/export', authorizeRoles(['admin']), exportUsers);
router.delete('/:id', authorizeRoles(['admin']), deleteUser);

// Routes for all users (with permission checks in controller)
router.get('/:id', getUserById);
router.put('/:id', updateUserValidation, updateUser);

export default router;