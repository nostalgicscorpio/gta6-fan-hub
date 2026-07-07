import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import { characters as initialCharacters } from '../data/characters';
import { trailers as initialTrailers } from '../data/trailers';
import { screenshots as initialScreenshots } from '../data/screenshots';
import { locations as initialLocations } from '../data/mapLocations';

const store = {
  characters: [...initialCharacters],
  trailers: [...initialTrailers],
  screenshots: [...initialScreenshots],
  locations: [...initialLocations],
};

export function useAdminData(collectionName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: result, error } = await adminService.getAdminContent(collectionName);
      if (error) {
        console.error(`Admin fetch error for ${collectionName}:`, error);
        setData([...(store[collectionName] || [])]);
      } else if (result) {
        // Fallback to store only if it's empty AND we have mock data available for this specific collection
        // Otherwise, if it's empty, we respect the empty array from Supabase.
        if (result.length === 0 && store[collectionName] && store[collectionName].length > 0) {
          setData([...store[collectionName]]);
        } else {
          setData(result);
        }
      } else {
        setData([...(store[collectionName] || [])]);
      }
    } catch (err) {
      console.error(`Admin fetch exception for ${collectionName}:`, err);
      setData([...(store[collectionName] || [])]);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addItem = async (item) => {
    const { data: newDoc, error } = await adminService.createItem(collectionName, item);
    if (!error && newDoc) {
      setData(prev => [newDoc, ...prev]);
      return { data: newDoc, error: null };
    } else {
      // Mock fallback
      const newItem = { ...item, id: Date.now() };
      if (store[collectionName]) {
        store[collectionName] = [newItem, ...store[collectionName]];
      }
      setData(prev => [newItem, ...prev]);
      return { data: newItem, error: null }; // Mock always succeeds
    }
  };

  const updateItem = async (id, updates) => {
    const { data: updatedDoc, error } = await adminService.updateItem(collectionName, id, updates);
    if (!error && updatedDoc) {
      setData(prev => prev.map(item => item.id === id ? updatedDoc : item));
      return { data: updatedDoc, error: null };
    } else {
      // Mock fallback
      if (store[collectionName]) {
        store[collectionName] = store[collectionName].map(item => 
          item.id === id ? { ...item, ...updates } : item
        );
      }
      setData(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
      return { data: { id, ...updates }, error: null };
    }
  };

  const deleteItem = async (id) => {
    const { error } = await adminService.deleteItem(collectionName, id);
    if (!error) {
      setData(prev => prev.filter(item => item.id !== id));
      return { error: null };
    } else {
      // Mock fallback
      if (store[collectionName]) {
        store[collectionName] = store[collectionName].filter(item => item.id !== id);
      }
      setData(prev => prev.filter(item => item.id !== id));
      return { error: null };
    }
  };

  return {
    data,
    loading,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
  };
}

