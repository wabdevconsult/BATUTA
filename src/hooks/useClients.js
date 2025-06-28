import { useState, useEffect, useCallback } from 'react';
import clientService from '../services/clientService';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all clients
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get client by ID
  const getClient = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await clientService.getClientById(id);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new client
  const createClient = useCallback(async (clientData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await clientService.createClient(clientData);
      setClients(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update client
  const updateClient = useCallback(async (id, clientData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await clientService.updateClient(id, clientData);
      setClients(prev => prev.map(client => client._id === id ? data : client));
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete client
  const deleteClient = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await clientService.deleteClient(id);
      setClients(prev => prev.filter(client => client._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Export clients to CSV
  const exportClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await clientService.exportClients();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load clients on mount
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    loading,
    error,
    fetchClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
    exportClients
  };
};

export default useClients;