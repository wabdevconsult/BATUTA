import Product from '../models/Product.js';
import { exportToCsv } from '../utils/csvExporter.js';
import { validationResult } from 'express-validator';

// @desc    Get all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res) => {
  try {
    let products;
    
    if (req.user.role === 'admin' || req.user.role === 'technicien' || req.user.role === 'client') {
      // These roles can see all active products
      products = await Product.find({ active: true }).populate('userId', 'email firstName lastName');
    } else if (req.user.role === 'fournisseur') {
      // Suppliers can only see their own products
      products = await Product.find({ userId: req.user.id }).populate('userId', 'email firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('userId', 'email firstName lastName');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check permissions for suppliers
    if (req.user.role === 'fournisseur' && product.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin/Fournisseur
export const createProduct = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If supplier is creating product, set supplier to their user ID
    let supplierField = req.body.userId;
    if (req.user.role === 'fournisseur') {
      supplierField = req.user.id;
    }
    
    const newProduct = new Product({
      ...req.body,
      userId: supplierField
    });
    
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin/Fournisseur
export const updateProduct = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check permissions
    if (req.user.role === 'fournisseur' && product.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role !== 'admin' && req.user.role !== 'fournisseur') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update product fields
    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== 'createdAt' && key !== 'userId') {
        product[key] = req.body[key];
      }
    });
    
    // If supplier is updating, don't allow changing userId
    if (req.user.role !== 'fournisseur' && req.body.userId) {
      product.userId = req.body.userId;
    }
    
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin/Fournisseur
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check permissions for suppliers
    if (req.user.role === 'fournisseur' && product.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Soft delete by setting active to false
    product.active = false;
    await product.save();
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Export products to CSV
// @route   GET /api/products/export
// @access  Private/Admin/Fournisseur
export const exportProducts = async (req, res) => {
  try {
    let products;
    
    if (req.user.role === 'admin') {
      // Admins can export all products
      products = await Product.find().populate('userId', 'email firstName lastName');
    } else if (req.user.role === 'fournisseur') {
      // Suppliers can only export their own products
      products = await Product.find({ userId: req.user.id }).populate('userId', 'email firstName lastName');
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const headers = [
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'description', title: 'Description' },
      { id: 'price', title: 'Price' },
      { id: 'category', title: 'Category' },
      { id: 'active', title: 'Active' },
      { id: 'createdAt', title: 'Created At' }
    ];
    
    const data = products.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      active: product.active ? 'Yes' : 'No',
      createdAt: product.createdAt
    }));
    
    const filePath = await exportToCsv('products', data, headers);
    
    res.download(filePath, `products_export_${Date.now()}.csv`, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Export products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};