import { creatorContent } from '../data/creatorContent';

export const instagramService = {
  getHighlights: async () => {
    // In the future, this will fetch from Instagram Graph API
    return Promise.resolve(creatorContent.instagram);
  },
  
  getReels: async () => {
    return Promise.resolve(creatorContent.instagram.filter(i => i.type === 'reel'));
  },

  getAICreations: async () => {
    return Promise.resolve(creatorContent.instagram.filter(i => i.type === 'ai-creation'));
  }
};
