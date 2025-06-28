import { useState, useEffect, useCallback } from 'react';
import devisService from '../services/devisService';

export const useDevis = () => {
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all quotes
  const fetchDevis = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await devisService.getAllDevis();
      setDevis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get quote by ID
  const getDevis = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await devisService.getDevisById(id);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new quote
  const createDevis = useCallback(async (devisData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await devisService.createDevis(devisData);
      setDevis(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update quote
  const updateDevis = useCallback(async (id, devisData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await devisService.updateDevis(id, devisData);
      setDevis(prev => prev.map(d => d._id === id ? data : d));
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete quote
  const deleteDevis = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await devisService.deleteDevis(id);
      setDevis(prev => prev.filter(d => d._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Export quotes to CSV
  const exportDevis = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await devisService.exportDevis();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load quotes on mount
  useEffect(() => {
    fetchDevis();
  }, [fetchDevis]);

  return {
    devis,
    loading,
    error,
    fetchDevis,
    getDevis,
    createDevis,
    updateDevis,
    deleteDevis,
    exportDevis
  };
};

export default useDevis;