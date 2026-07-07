import { supabaseData } from './supabaseDataService';
import { gameplayClips as staticFallback } from '../data/gameplay';

let cachedGameplay = null;

export const gameplayService = {
  async getGameplayClips() {
    if (cachedGameplay) return cachedGameplay;
    try {
      const { data, error } = await supabaseData.gameplay.select();
      if (error || !data || data.length === 0) {
        throw new Error('Supabase fetch failed or returned empty');
      }
      
      const normalizedData = data.map(item => ({
        id: item.id || Math.random().toString(),
        title: item.title || 'Untitled',
        description: item.description || '',
        thumbnail: item.thumbnail || null,
        youtubeId: item.youtubeId || item.video_id || '',
        game: item.game || 'GTA VI',
        category: item.category || 'Free Roam',
        uploadDate: item.uploadDate || item.date || new Date(item.created_at || Date.now()).toLocaleDateString()
      }));
      
      cachedGameplay = normalizedData;
      return cachedGameplay;
    } catch (error) {
      console.warn('GameplayService: Failed to fetch from DB. Initializing static fallback.', error);
      cachedGameplay = staticFallback;
      return cachedGameplay;
    }
  }
};
