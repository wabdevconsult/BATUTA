import apiClient from './apiClient';

// Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get users');
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get user');
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

// Delete user (admin only)
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};

// Export users to CSV (admin only)
export const exportUsers = async () => {
  try {
    const response = await apiClient.get('/users/export', {
      responseType: 'blob'
    });
    
    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `users_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export users');
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  exportUsers
};