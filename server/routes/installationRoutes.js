import express from 'express';
import { 
  getInstallations, 
  getInstallationById, 
  createInstallation, 
  updateInstallation, 
  deleteInstallation,
  getInstallationsByClient,
  getInstallationsByTechnician,
  getInstallationsByEquipment
} from '../controllers/installationController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const installationValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('equipmentId', 'Equipment ID is required').not().isEmpty(),
  check('clientId', 'Client ID is required').not().isEmpty(),
  check('installationDate', 'Installation date is required').not().isEmpty().isISO8601().toDate()
];

// Get all installations (with role-based filtering in controller)
router.get('/', getInstallations);

// Get installation by ID (with permission checks in controller)
router.get('/:id', getInstallationById);

// Create new installation (admin and technician only)
router.post('/', authorizeRoles(['admin', 'technicien']), installationValidation, createInstallation);

// Update installation (admin and technician only, with permission checks in controller)
router.put('/:id', authorizeRoles(['admin', 'technicien']), updateInstallation);

// Delete installation (admin only)
router.delete('/:id', authorizeRoles(['admin']), deleteInstallation);

// Get installations by client
router.get('/client/:id', authorizeRoles(['admin', 'technicien']), getInstallationsByClient);

// Get installations by technician
router.get('/technician/:id', authorizeRoles(['admin']), getInstallationsByTechnician);

// Get installations by equipment
router.get('/equipment/:id', authorizeRoles(['admin', 'technicien']), getInstallationsByEquipment);

export default router;