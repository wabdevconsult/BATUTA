import apiClient from './apiClient';
import { Installation, NewInstallation } from '../types/installations';

// Get all installations
export const getInstallations = async (): Promise<Installation[]> => {
  try {
    const response = await apiClient.get('/installations');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get installations');
  }
};

// Get installation by ID
export const getInstallationById = async (id: string): Promise<Installation> => {
  try {
    const response = await apiClient.get(`/installations/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get installation');
  }
};

// Create new installation
export const createInstallation = async (installationData: NewInstallation): Promise<Installation> => {
  try {
    const response = await apiClient.post('/installations', installationData);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to create installation');
  }
};

// Update installation
export const updateInstallation = async (id: string, installationData: Partial<Installation>): Promise<Installation> => {
  try {
    const response = await apiClient.put(`/installations/${id}`, installationData);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to update installation');
  }
};

// Delete installation
export const deleteInstallation = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/installations/${id}`);
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to delete installation');
  }
};

// Get installations by client
export const getInstallationsByClient = async (clientId: string): Promise<Installation[]> => {
  try {
    const response = await apiClient.get(`/installations/client/${clientId}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get installations by client');
  }
};

// Get installations by technician
export const getInstallationsByTechnician = async (technicianId: string): Promise<Installation[]> => {
  try {
    const response = await apiClient.get(`/installations/technician/${technicianId}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get installations by technician');
  }
};

// Get installations by equipment
export const getInstallationsByEquipment = async (equipmentId: string): Promise<Installation[]> => {
  try {
    const response = await apiClient.get(`/installations/equipment/${equipmentId}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get installations by equipment');
  }
};

export default {
  getInstallations,
  getInstallationById,
  createInstallation,
  updateInstallation,
  deleteInstallation,
  getInstallationsByClient,
  getInstallationsByTechnician,
  getInstallationsByEquipment
};