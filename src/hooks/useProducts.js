import { useState, useEffect, useCallback } from 'react';
import productService from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get product by ID
  const getProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productService.getProductById(id);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new product
  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productService.createProduct(productData);
      setProducts(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productService.updateProduct(id, productData);
      setProducts(prev => prev.map(product => product._id === id ? data : product));
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete product
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(product => product._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Export products to CSV
  const exportProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await productService.exportProducts();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    exportProducts
  };
};

export default useProducts;