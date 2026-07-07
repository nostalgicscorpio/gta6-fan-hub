import { useState, useEffect, useCallback } from 'react';
import { supabaseData } from '../services/supabaseDataService';
import { characters as initialCharacters } from '../data/characters';
import { trailers as initialTrailers } from '../data/trailers';
import { screenshots as initialScreenshots } from '../data/screenshots';
import { locations as initialLocations } from '../data/mapLocations';

// Keep some fallback memory stores for data types not yet in Supabase
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
    if (supabaseData[collectionName] && typeof supabaseData[collectionName].select === 'function') {
      const { data: result } = await supabaseData[collectionName].select();
      setData(result || []);
    } else {
      // Fallback to local store for unsupported collections
      setTimeout(() => {
        setData([...(store[collectionName] || [])]);
      }, 400);
    }
    setLoading(false);
  }, [collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addItem = async (item) => {
    if (supabaseData[collectionName] && typeof supabaseData[collectionName].insert === 'function') {
      const { data: newDoc } = await supabaseData[collectionName].insert(item);
      if (newDoc) setData(prev => [newDoc, ...prev]);
      return newDoc;
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newItem = { ...item, id: Date.now() };
          if (store[collectionName]) {
            store[collectionName] = [newItem, ...store[collectionName]];
            setData([...store[collectionName]]);
          }
          resolve(newItem);
        }, 300);
      });
    }
  };

  const updateItem = async (id, updates) => {
    // Left as mock since we didn't build update routes yet, but structured for future
    return new Promise((resolve) => {
      setTimeout(() => {
        if (store[collectionName]) {
          store[collectionName] = store[collectionName].map(item => 
            item.id === id ? { ...item, ...updates } : item
          );
          setData([...store[collectionName]]);
        }
        resolve();
      }, 300);
    });
  };

  const deleteItem = async (id) => {
    if (supabaseData[collectionName] && typeof supabaseData[collectionName].delete === 'function') {
      await supabaseData[collectionName].delete(id);
      setData(prev => prev.filter(item => item.id !== id));
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (store[collectionName]) {
            store[collectionName] = store[collectionName].filter(item => item.id !== id);
            setData([...store[collectionName]]);
          }
          resolve();
        }, 300);
      });
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
