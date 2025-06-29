import express from 'express';
import { 
  createQuoteRequest, 
  getQuoteRequests, 
  getQuoteRequestById, 
  updateQuoteRequest, 
  deleteQuoteRequest 
} from '../controllers/quoteRequestController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Public route for creating quote requests
router.post(
  '/', 
  [
    check('nom', 'Nom is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Message is required').not().isEmpty()
  ],
  createQuoteRequest
);

// Protected routes
router.use(authenticateToken);

// Get all quote requests (admin and technician only)
router.get('/', authorizeRoles(['admin', 'technicien']), getQuoteRequests);

// Get quote request by ID (admin and technician only)
router.get('/:id', authorizeRoles(['admin', 'technicien']), getQuoteRequestById);

// Update quote request (admin and technician only)
router.put('/:id', authorizeRoles(['admin', 'technicien']), updateQuoteRequest);

// Delete quote request (admin only)
router.delete('/:id', authorizeRoles(['admin']), deleteQuoteRequest);

export default router;