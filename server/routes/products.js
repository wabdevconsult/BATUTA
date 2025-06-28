import express from 'express';
import Product from '../models/Product.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all products
router.get('/', async (req, res) => {
  try {
    let products;
    
    if (req.user.role === 'admin' || req.user.role === 'technicien' || req.user.role === 'client') {
      // These roles can see all active products
      products = await Product.find({ active: true })
        .populate('supplier', 'company firstName lastName')
        .populate('createdBy', 'firstName lastName');
    } else if (req.user.role === 'fournisseur') {
      // Suppliers can only see their own products
      products = await Product.find({ supplier: req.user.id })
        .populate('supplier', 'company firstName lastName')
        .populate('createdBy', 'firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('supplier', 'company firstName lastName email phone')
      .populate('createdBy', 'firstName lastName');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check permissions for suppliers
    if (req.user.role === 'fournisseur' && product.supplier.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product
router.post('/', authorizeRoles(['admin', 'fournisseur']), async (req, res) => {
  try {
    // If supplier is creating product, set supplier to their user ID
    let supplierField = req.body.supplier;
    if (req.user.role === 'fournisseur') {
      supplierField = req.user.id;
    }
    
    const newProduct = new Product({
      ...req.body,
      supplier: supplierField,
      createdBy: req.user.id
    });
    
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check permissions
    if (req.user.role === 'fournisseur' && product.supplier.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role !== 'admin' && req.user.role !== 'fournisseur') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Don't allow updating certain fields
    const { createdBy, createdAt, ...updateData } = req.body;
    
    // If supplier is updating, don't allow changing supplier
    if (req.user.role === 'fournisseur') {
      delete updateData.supplier;
    }
    
    // Update product fields
    Object.keys(updateData).forEach(key => {
      product[key] = updateData[key];
    });
    
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (soft delete by setting active to false)
router.delete('/:id', authorizeRoles(['admin', 'fournisseur']), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check permissions for suppliers
    if (req.user.role === 'fournisseur' && product.supplier.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Soft delete
    product.active = false;
    await product.save();
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;