import apiClient from './apiClient';
import { Personalization } from '../types/personalization';

// Get current user's personalization
export const getMyPersonalization = async (): Promise<Personalization> => {
  try {
    const response = await apiClient.get('/personalization/my');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get personalization');
  }
};

// Create or update personalization
export const savePersonalization = async (data: Partial<Personalization>): Promise<Personalization> => {
  try {
    const response = await apiClient.post('/personalization/my', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to save personalization');
  }
};

// Admin: Get all personalizations
export const getAllPersonalizations = async (): Promise<Personalization[]> => {
  try {
    const response = await apiClient.get('/personalization');
    // Ensure we always return an array
    const data = response.data;
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get all personalizations');
  }
};

// Admin: Get personalization by ID
export const getPersonalizationById = async (id: string): Promise<Personalization> => {
  try {
    const response = await apiClient.get(`/personalization/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get personalization');
  }
};

// Admin: Delete personalization
export const deletePersonalization = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/personalization/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete personalization');
  }
};