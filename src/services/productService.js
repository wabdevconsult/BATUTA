import apiClient from './apiClient';

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get products');
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get product');
  }
};

// Create product
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};

// Export products to CSV
export const exportProducts = async () => {
  try {
    const response = await apiClient.get('/products/export', {
      responseType: 'blob'
    });
    
    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `products_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export products');
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  exportProducts
};