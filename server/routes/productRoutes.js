import express from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  exportProducts 
} from '../controllers/productController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const productValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('price', 'Price is required and must be a number').isNumeric(),
  check('description').optional(),
  check('category').optional()
];

// Get all products (with role-based filtering in controller)
router.get('/', getProducts);

// Export products (admin and fournisseur only)
router.get('/export', authorizeRoles(['admin', 'fournisseur']), exportProducts);

// Get product by ID (with permission checks in controller)
router.get('/:id', getProductById);

// Create new product (admin and fournisseur only)
router.post('/', authorizeRoles(['admin', 'fournisseur']), productValidation, createProduct);

// Update product (admin and fournisseur only, with permission checks in controller)
router.put('/:id', authorizeRoles(['admin', 'fournisseur']), productValidation, updateProduct);

// Delete product (admin and fournisseur only, with permission checks in controller)
router.delete('/:id', authorizeRoles(['admin', 'fournisseur']), deleteProduct);

export default router;