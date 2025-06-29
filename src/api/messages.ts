import apiClient from './apiClient';
import { Message, NewMessage } from '../types/messages';

// Get all messages for current user
export const getMessages = async (): Promise<Message[]> => {
  try {
    const response = await apiClient.get('/messages');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get messages');
  }
};

// Get unread messages count
export const getUnreadCount = async (): Promise<number> => {
  try {
    const response = await apiClient.get('/messages/unread');
    return response.data.count;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get unread count');
  }
};

// Get message by ID
export const getMessageById = async (id: string): Promise<Message> => {
  try {
    const response = await apiClient.get(`/messages/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get message');
  }
};

// Send a new message
export const sendMessage = async (messageData: NewMessage): Promise<Message> => {
  try {
    const response = await apiClient.post('/messages', messageData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send message');
  }
};

// Mark message as read
export const markAsRead = async (id: string): Promise<Message> => {
  try {
    const response = await apiClient.put(`/messages/${id}/read`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to mark message as read');
  }
};

// Delete message
export const deleteMessage = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/messages/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete message');
  }
};

// Get conversation with another user
export const getConversation = async (userId: string): Promise<Message[]> => {
  try {
    const response = await apiClient.get(`/messages/conversation/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get conversation');
  }
};

export default {
  getMessages,
  getUnreadCount,
  getMessageById,
  sendMessage,
  markAsRead,
  deleteMessage,
  getConversation
};