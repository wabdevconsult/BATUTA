import express from 'express';
import { 
  getInterventions, 
  getInterventionById, 
  createIntervention, 
  updateIntervention, 
  deleteIntervention,
  updateTechnicianLocation,
  getInterventionsByTechnician,
  getInterventionsByClient,
  getTodayInterventions,
  getUpcomingInterventions
} from '../controllers/interventionController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const interventionValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('clientId', 'Client ID is required').not().isEmpty(),
  check('technicianId', 'Technician ID is required').not().isEmpty(),
  check('scheduledDate', 'Scheduled date is required').not().isEmpty().isISO8601().toDate(),
  check('location.address', 'Address is required').not().isEmpty()
];

// Get all interventions (with role-based filtering in controller)
router.get('/', getInterventions);

// Get intervention by ID (with permission checks in controller)
router.get('/:id', getInterventionById);

// Create new intervention (admin and technician only)
router.post('/', authorizeRoles(['admin', 'technicien']), interventionValidation, createIntervention);

// Update intervention (admin and technician only, with permission checks in controller)
router.put('/:id', authorizeRoles(['admin', 'technicien']), updateIntervention);

// Update technician location (technician only)
router.put('/:id/location', authorizeRoles(['technicien']), updateTechnicianLocation);

// Delete intervention (admin only)
router.delete('/:id', authorizeRoles(['admin']), deleteIntervention);

// Get interventions by technician (admin only)
router.get('/technician/:id', authorizeRoles(['admin']), getInterventionsByTechnician);

// Get interventions by client (admin and technician only)
router.get('/client/:id', authorizeRoles(['admin', 'technicien']), getInterventionsByClient);

// Get today's interventions
router.get('/schedule/today', getTodayInterventions);

// Get upcoming interventions
router.get('/schedule/upcoming', getUpcomingInterventions);

export default router;