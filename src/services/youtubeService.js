import { creatorContent } from '../data/creatorContent';
import { supabaseData } from './supabaseDataService';
import { normalizeYouTubeId } from '../utils/youtubeUtils';

export const youtubeService = {
  getLatestVideos: async () => {
    try {
      const { data, error } = await supabaseData.videos.select();
      if (!error && data && data.length > 0) {
        // Map database videos to UI schema
        const mapped = data.map(v => ({
          id: v.id,
          title: v.title,
          thumbnail: v.thumbnail || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
          views: '1M', // mock stats for now
          timeAgo: 'Just now',
          youtubeId: normalizeYouTubeId(v.video_url) || '',
          featured: false
        }));
        return mapped;
      }
    } catch (e) {
      console.warn('Failed to fetch videos from DB, using fallback');
    }
    return Promise.resolve(creatorContent.youtube);
  },
  
  getFeaturedVideo: async () => {
    const vids = await youtubeService.getLatestVideos();
    return Promise.resolve(vids.find(v => v.featured) || vids[0]);
  },
  
  getShorts: async () => {
    // Currently Shorts are purely static mock
    return Promise.resolve(creatorContent.shorts);
  }
};
