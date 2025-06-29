import apiClient from './apiClient';
import { Equipment } from '../types/equipment';

// Get all equipment
export const getEquipments = async (): Promise<Equipment[]> => {
  try {
    const response = await apiClient.get('/equipments');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get equipment');
  }
};

// Get equipment by ID
export const getEquipmentById = async (id: string): Promise<Equipment> => {
  try {
    const response = await apiClient.get(`/equipments/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to get equipment');
  }
};

// Create new equipment
export const createEquipment = async (equipmentData: Partial<Equipment>): Promise<Equipment> => {
  try {
    const response = await apiClient.post('/equipments', equipmentData);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to create equipment');
  }
};

// Update equipment
export const updateEquipment = async (id: string, equipmentData: Partial<Equipment>): Promise<Equipment> => {
  try {
    const response = await apiClient.put(`/equipments/${id}`, equipmentData);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to update equipment');
  }
};

// Delete equipment
export const deleteEquipment = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/equipments/${id}`);
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to delete equipment');
  }
};

// Add maintenance record
export const addMaintenanceRecord = async (id: string, maintenanceData: any): Promise<Equipment> => {
  try {
    const response = await apiClient.post(`/equipments/${id}/maintenance`, maintenanceData);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to add maintenance record');
  }
};

export default {
  getEquipments,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  addMaintenanceRecord
};