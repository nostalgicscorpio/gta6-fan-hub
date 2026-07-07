import { supabaseData } from './supabaseDataService';
import { mediaItems as staticFallback } from '../data/mediaGallery';

let cachedGallery = null;

export const galleryService = {
  async getGallery() {
    if (cachedGallery) return cachedGallery;
    try {
      const { data, error } = await supabaseData.gallery.select();
      if (error || !data || data.length === 0) {
        throw new Error('Supabase fetch failed or returned empty');
      }
      
      const normalizedData = data.map(item => ({
        id: item.id || Math.random().toString(),
        src: item.src || item.image_url || '',
        title: item.title || 'Untitled',
        category: item.category || 'Screenshots',
        description: item.description || '',
        tags: item.tags || [],
        location: item.location || '',
        releaseDate: item.releaseDate || '',
        trailerSource: item.trailerSource || '',
        charactersShown: item.charactersShown || []
      }));
      
      cachedGallery = normalizedData;
      return cachedGallery;
    } catch (error) {
      console.warn('GalleryService: Failed to fetch from DB. Initializing static fallback.', error);
      cachedGallery = staticFallback;
      return cachedGallery;
    }
  }
};
