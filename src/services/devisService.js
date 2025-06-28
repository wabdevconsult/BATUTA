import apiClient from './apiClient';

// Get all quotes
export const getAllDevis = async () => {
  try {
    const response = await apiClient.get('/devis');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get quotes');
  }
};

// Get quote by ID
export const getDevisById = async (id) => {
  try {
    const response = await apiClient.get(`/devis/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get quote');
  }
};

// Create quote
export const createDevis = async (devisData) => {
  try {
    const response = await apiClient.post('/devis', devisData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create quote');
  }
};

// Update quote
export const updateDevis = async (id, devisData) => {
  try {
    const response = await apiClient.put(`/devis/${id}`, devisData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update quote');
  }
};

// Delete quote
export const deleteDevis = async (id) => {
  try {
    const response = await apiClient.delete(`/devis/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete quote');
  }
};

// Export quotes to CSV
export const exportDevis = async () => {
  try {
    const response = await apiClient.get('/devis/export', {
      responseType: 'blob'
    });
    
    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `quotes_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export quotes');
  }
};

export default {
  getAllDevis,
  getDevisById,
  createDevis,
  updateDevis,
  deleteDevis,
  exportDevis
};