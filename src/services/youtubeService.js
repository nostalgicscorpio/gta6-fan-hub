import { creatorContent } from '../data/creatorContent';

export const youtubeService = {
  getLatestVideos: async () => {
    // In the future, this will fetch directly from YouTube Data API v3
    return Promise.resolve(creatorContent.youtube);
  },
  
  getFeaturedVideo: async () => {
    return Promise.resolve(creatorContent.youtube.find(v => v.featured) || creatorContent.youtube[0]);
  },
  
  getShorts: async () => {
    return Promise.resolve(creatorContent.shorts);
  }
};
