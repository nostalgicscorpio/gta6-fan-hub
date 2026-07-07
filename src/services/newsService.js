import { supabaseData } from './supabaseDataService';
import { newsItems as staticFallback } from '../data/news';

// Simple in-memory cache
let cachedNews = null;

export const newsService = {
  /**
   * Fetches all news articles. 
   * Attempts to hit Supabase DB.
   * Falls back to static data on network error or missing configuration.
   */
  async fetchNews() {
    if (cachedNews) return cachedNews;

    try {
      const { data, error } = await supabaseData.posts.select();
      
      if (error || !data || data.length === 0) {
        throw new Error('Supabase fetch failed or returned empty');
      }

      // Normalize incoming data from Supabase to match our UI's expected schema
      const normalizedData = data.map(item => ({
        id: item.id || Math.random(),
        slug: item.slug || String(item.id),
        date: item.date || new Date(item.created_at).toLocaleDateString(),
        category: item.category || 'UPDATE',
        title: item.title || 'Untitled Update',
        excerpt: item.excerpt || item.content?.substring(0, 100) || 'No excerpt available.',
        author: item.author || 'Rockstar Games',
        image: item.cover_image || item.image || null,
        hot: Boolean(item.hot),
        breaking: Boolean(item.breaking),
        readTime: item.readTime || '3 min',
        sourceUrl: item.sourceUrl || null,
        body: item.body || item.content || [],
        relatedArticles: item.relatedArticles || [],
        relatedScreenshots: item.relatedScreenshots || [],
        relatedTrailers: item.relatedTrailers || [],
        relatedCharacters: item.relatedCharacters || [],
      }));

      cachedNews = normalizedData;
      return cachedNews;
    } catch (error) {
      console.warn('NewsService: Failed to fetch from DB. Initializing static fallback.', error);
      cachedNews = staticFallback;
      return cachedNews;
    }
  },

  /**
   * Retrieves a specific article by its slug.
   * Leverages the fetchNews cache heavily.
   */
  async getArticleBySlug(slug) {
    const allNews = await this.fetchNews();
    return allNews.find(item => item.slug === slug);
  }
};
