import apiClient from './apiClient';

// Get all invoices
export const getAllFactures = async () => {
  try {
    const response = await apiClient.get('/factures');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get invoices');
  }
};

// Get invoice by ID
export const getFactureById = async (id) => {
  try {
    const response = await apiClient.get(`/factures/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get invoice');
  }
};

// Create invoice
export const createFacture = async (factureData) => {
  try {
    const response = await apiClient.post('/factures', factureData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create invoice');
  }
};

// Update invoice
export const updateFacture = async (id, factureData) => {
  try {
    const response = await apiClient.put(`/factures/${id}`, factureData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update invoice');
  }
};

// Delete invoice
export const deleteFacture = async (id) => {
  try {
    const response = await apiClient.delete(`/factures/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete invoice');
  }
};

// Export invoices to CSV
export const exportFactures = async () => {
  try {
    const response = await apiClient.get('/factures/export', {
      responseType: 'blob'
    });
    
    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoices_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export invoices');
  }
};

export default {
  getAllFactures,
  getFactureById,
  createFacture,
  updateFacture,
  deleteFacture,
  exportFactures
};