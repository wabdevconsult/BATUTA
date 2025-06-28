import apiClient from './apiClient';

// Get all clients
export const getAllClients = async () => {
  try {
    const response = await apiClient.get('/clients');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get clients');
  }
};

// Get client by ID
export const getClientById = async (id) => {
  try {
    const response = await apiClient.get(`/clients/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get client');
  }
};

// Create client
export const createClient = async (clientData) => {
  try {
    const response = await apiClient.post('/clients', clientData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create client');
  }
};

// Update client
export const updateClient = async (id, clientData) => {
  try {
    const response = await apiClient.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update client');
  }
};

// Delete client
export const deleteClient = async (id) => {
  try {
    const response = await apiClient.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete client');
  }
};

// Export clients to CSV
export const exportClients = async () => {
  try {
    const response = await apiClient.get('/clients/export', {
      responseType: 'blob'
    });
    
    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `clients_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export clients');
  }
};

export default {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  exportClients
};