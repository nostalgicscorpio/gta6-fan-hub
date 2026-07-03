import { useState, useEffect, useCallback } from 'react';
import { newsItems as initialNews } from '../data/news';
import { characters as initialCharacters } from '../data/characters';
import { trailers as initialTrailers } from '../data/trailers';
import { screenshots as initialScreenshots } from '../data/screenshots';
import { locations as initialLocations } from '../data/mapLocations';

// Simple mock store in memory (persists during the hot-reload session)
const store = {
  news: [...initialNews],
  characters: [...initialCharacters],
  trailers: [...initialTrailers],
  screenshots: [...initialScreenshots],
  locations: [...initialLocations],
};

export function useAdminData(collectionName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate network fetch
  const fetchData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setData([...store[collectionName]]);
      setLoading(false);
    }, 400);
  }, [collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addItem = async (item) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = { ...item, id: Date.now() };
        store[collectionName] = [newItem, ...store[collectionName]];
        setData([...store[collectionName]]);
        resolve(newItem);
      }, 300);
    });
  };

  const updateItem = async (id, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store[collectionName] = store[collectionName].map(item => 
          item.id === id ? { ...item, ...updates } : item
        );
        setData([...store[collectionName]]);
        resolve();
      }, 300);
    });
  };

  const deleteItem = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store[collectionName] = store[collectionName].filter(item => item.id !== id);
        setData([...store[collectionName]]);
        resolve();
      }, 300);
    });
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
