import { useState, useEffect, useCallback } from 'react';
import { getMessages, getUnreadCount, sendMessage, markAsRead, deleteMessage, getConversation } from '../api/messages';
import { Message, NewMessage } from '../types/messages';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all messages
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (err: any) {
      console.error('Error fetching unread count:', err);
    }
  }, []);

  // Send a new message
  const sendNewMessage = useCallback(async (messageData: NewMessage) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await sendMessage(messageData);
      setMessages(prev => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark message as read
  const markMessageAsRead = useCallback(async (id: string) => {
    try {
      const updatedMessage = await markAsRead(id);
      setMessages(prev => 
        prev.map(message => 
          message._id === id ? { ...message, read: true } : message
        )
      );
      fetchUnreadCount();
      return updatedMessage;
    } catch (err: any) {
      console.error('Error marking message as read:', err);
      return null;
    }
  }, [fetchUnreadCount]);

  // Delete message
  const deleteMessageById = useCallback(async (id: string) => {
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(message => message._id !== id));
      return true;
    } catch (err: any) {
      console.error('Error deleting message:', err);
      return false;
    }
  }, []);

  // Get conversation with another user
  const fetchConversation = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getConversation(userId);
      setConversation(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load messages and unread count on mount
  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();
  }, [fetchMessages, fetchUnreadCount]);

  return {
    messages,
    unreadCount,
    conversation,
    loading,
    error,
    fetchMessages,
    fetchUnreadCount,
    sendMessage: sendNewMessage,
    markAsRead: markMessageAsRead,
    deleteMessage: deleteMessageById,
    fetchConversation
  };
};

export default useMessages;