import { supabaseData } from './supabaseDataService';
import { characters as staticFallback } from '../data/characters';

let cachedCharacters = null;

export const characterService = {
  async getCharacters() {
    if (cachedCharacters) return cachedCharacters;
    try {
      const { data, error } = await supabaseData.characters.select();
      if (error || !data || data.length === 0) {
        throw new Error('Supabase fetch failed or returned empty');
      }
      
      const normalizedData = data.map(item => ({
        id: item.id || Math.random(),
        slug: item.slug || String(item.id),
        name: item.name || 'Unknown',
        role: item.role || 'Character',
        description: item.description || '',
        bio: item.bio || '',
        image: item.image || null,
        quote: item.quote || '',
        accent: item.accent || 'from-gray-500/60 to-gray-700/60',
        stats: item.stats || [],
        knownLocations: item.knownLocations || [],
        gallery: item.gallery || [],
        relatedTrailers: item.relatedTrailers || [],
        relatedNews: item.relatedNews || [],
        affiliations: item.affiliations || [],
        locations: item.locations || [],
        vehicles: item.vehicles || []
      }));
      
      cachedCharacters = normalizedData;
      return cachedCharacters;
    } catch (error) {
      console.warn('CharacterService: Failed to fetch from DB. Initializing static fallback.', error);
      cachedCharacters = staticFallback;
      return cachedCharacters;
    }
  },

  async getCharacterBySlug(slug) {
    const all = await this.getCharacters();
    return all.find(c => c.slug === slug);
  }
};
