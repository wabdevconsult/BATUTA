import express from 'express';
import { 
  getEquipments, 
  getEquipmentById, 
  createEquipment, 
  updateEquipment, 
  deleteEquipment,
  addMaintenanceRecord,
  getEquipmentByClient,
  getEquipmentByTechnician,
  getEquipmentRequiringMaintenance
} from '../controllers/equipmentController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const equipmentValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('type', 'Type is required').not().isEmpty(),
  check('clientId', 'Client ID is required').not().isEmpty()
];

const maintenanceValidation = [
  check('date', 'Date is required').not().isEmpty().isISO8601().toDate(),
  check('type', 'Type is required').not().isEmpty().isIn(['installation', 'preventive', 'corrective', 'inspection']),
  check('description', 'Description is required').not().isEmpty()
];

// Get all equipment (with role-based filtering in controller)
router.get('/', getEquipments);

// Get equipment requiring maintenance
router.get('/maintenance', authorizeRoles(['admin', 'technicien']), getEquipmentRequiringMaintenance);

// Get equipment by client
router.get('/client/:id', authorizeRoles(['admin', 'technicien']), getEquipmentByClient);

// Get equipment by technician
router.get('/technician/:id', authorizeRoles(['admin']), getEquipmentByTechnician);

// Get equipment by ID (with permission checks in controller)
router.get('/:id', getEquipmentById);

// Create new equipment (admin and technician only)
router.post('/', authorizeRoles(['admin', 'technicien']), equipmentValidation, createEquipment);

// Update equipment (admin and technician only, with permission checks in controller)
router.put('/:id', authorizeRoles(['admin', 'technicien']), updateEquipment);

// Add maintenance record (admin and technician only)
router.post('/:id/maintenance', authorizeRoles(['admin', 'technicien']), maintenanceValidation, addMaintenanceRecord);

// Delete equipment (admin only)
router.delete('/:id', authorizeRoles(['admin']), deleteEquipment);

export default router;