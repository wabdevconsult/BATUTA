import { useState, useEffect, useCallback } from 'react';
import factureService from '../services/factureService';

export const useFactures = () => {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all invoices
  const fetchFactures = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await factureService.getAllFactures();
      setFactures(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get invoice by ID
  const getFacture = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await factureService.getFactureById(id);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new invoice
  const createFacture = useCallback(async (factureData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await factureService.createFacture(factureData);
      setFactures(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update invoice
  const updateFacture = useCallback(async (id, factureData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await factureService.updateFacture(id, factureData);
      setFactures(prev => prev.map(f => f._id === id ? data : f));
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete invoice
  const deleteFacture = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await factureService.deleteFacture(id);
      setFactures(prev => prev.filter(f => f._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Export invoices to CSV
  const exportFactures = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await factureService.exportFactures();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load invoices on mount
  useEffect(() => {
    fetchFactures();
  }, [fetchFactures]);

  return {
    factures,
    loading,
    error,
    fetchFactures,
    getFacture,
    createFacture,
    updateFacture,
    deleteFacture,
    exportFactures
  };
};

export default useFactures;