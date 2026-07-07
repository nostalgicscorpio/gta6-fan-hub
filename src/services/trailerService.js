import { supabaseData } from './supabaseDataService';
import { trailers as staticFallback } from '../data/trailers';

let cachedTrailers = null;

export const trailerService = {
  async getTrailers() {
    if (cachedTrailers) return cachedTrailers;
    try {
      const { data, error } = await supabaseData.trailers.select();
      if (error || !data || data.length === 0) {
        throw new Error('Supabase fetch failed or returned empty');
      }
      
      const normalizedData = data.map(item => ({
        id: item.id || Math.random(),
        slug: item.slug || String(item.id),
        title: item.title || 'Untitled',
        subtitle: item.subtitle || '',
        youtubeId: item.youtubeId || item.video_id || '',
        thumbnail: item.thumbnail || null,
        description: item.description || '',
        releaseDate: item.releaseDate || item.date || new Date(item.created_at || Date.now()).toLocaleDateString(),
        duration: item.duration || '0:00',
        views: item.views || '0',
        likes: item.likes || '0',
        comments: item.comments || '0',
        breakdownInfo: item.breakdownInfo || { highlights: [], keyDetails: [] }
      }));
      
      cachedTrailers = normalizedData;
      return cachedTrailers;
    } catch (error) {
      console.warn('TrailerService: Failed to fetch from DB. Initializing static fallback.', error);
      cachedTrailers = staticFallback;
      return cachedTrailers;
    }
  },

  async getTrailerBySlug(slug) {
    const all = await this.getTrailers();
    return all.find(t => t.slug === slug);
  }
};
