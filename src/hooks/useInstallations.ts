import { useState, useEffect, useCallback } from 'react';
import { 
  getInstallations, 
  getInstallationById, 
  createInstallation, 
  updateInstallation, 
  deleteInstallation 
} from '../api/installations';
import { Installation, NewInstallation } from '../types/installations';

export const useInstallations = () => {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all installations
  const fetchInstallations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getInstallations();
      setInstallations(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get installation by ID
  const getInstallation = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getInstallationById(id);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new installation
  const addInstallation = useCallback(async (installationData: NewInstallation) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await createInstallation(installationData);
      setInstallations(prev => [...prev, data]);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update installation
  const editInstallation = useCallback(async (id: string, installationData: Partial<Installation>) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await updateInstallation(id, installationData);
      setInstallations(prev => prev.map(installation => installation._id === id ? data : installation));
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete installation
  const removeInstallation = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteInstallation(id);
      setInstallations(prev => prev.filter(installation => installation._id !== id));
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load installations on mount
  useEffect(() => {
    fetchInstallations();
  }, [fetchInstallations]);

  return {
    installations,
    loading,
    error,
    fetchInstallations,
    getInstallation,
    addInstallation,
    editInstallation,
    removeInstallation
  };
};

export default useInstallations;