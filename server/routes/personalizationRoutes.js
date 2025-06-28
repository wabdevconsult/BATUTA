import express from 'express';
import { 
  getMyPersonalization, 
  updateMyPersonalization, 
  getAllPersonalizations, 
  getPersonalizationById, 
  deletePersonalization 
} from '../controllers/personalizationController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// User routes
router.get('/my', getMyPersonalization);
router.post('/my', updateMyPersonalization);

// Admin routes
router.get('/', authorizeRoles(['admin']), getAllPersonalizations);
router.get('/:id', authorizeRoles(['admin']), getPersonalizationById);
router.delete('/:id', authorizeRoles(['admin']), deletePersonalization);

export default router;