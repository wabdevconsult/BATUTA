import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  refreshToken, 
  forgotPassword, 
  resetPassword 
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Validation middleware
const registerValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('role').optional().isIn(['admin', 'technicien', 'client', 'fournisseur'])
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

const passwordResetValidation = [
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

// Public routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/forgot-password', [check('email', 'Please include a valid email').isEmail()], forgotPassword);
router.post('/reset-password', [
  check('token', 'Token is required').not().isEmpty(),
  ...passwordResetValidation
], resetPassword);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);
router.post('/refresh', authenticateToken, refreshToken);

export default router;