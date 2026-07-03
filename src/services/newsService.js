import { newsItems as staticFallback } from '../data/news';

// Simple in-memory cache
let cachedNews = null;

export const newsService = {
  /**
   * Fetches all news articles. 
   * Attempts to hit an external API if VITE_NEWS_API_URL is configured.
   * Falls back to static data on network error or missing configuration.
   */
  async fetchNews() {
    if (cachedNews) return cachedNews;

    const apiUrl = import.meta.env.VITE_NEWS_API_URL;
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    if (!apiUrl) {
      // Intentionally quiet fallback for dev environments
      cachedNews = staticFallback;
      return cachedNews;
    }

    try {
      const response = await fetch(apiUrl, {
        headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {},
      });
      
      if (!response.ok) {
        throw new Error(`News API responded with status: ${response.status}`);
      }

      const rawData = await response.json();
      
      // Normalize incoming data to match our UI's expected schema
      const normalizedData = rawData.map(item => ({
        id: item.id || Math.random(),
        slug: item.slug || String(item.id),
        date: item.date || new Date().toLocaleDateString(),
        category: item.category || 'UPDATE',
        title: item.title || 'Untitled Update',
        excerpt: item.excerpt || 'No excerpt available.',
        author: item.author || 'Rockstar Games',
        image: item.image || null,
        hot: Boolean(item.hot),
        breaking: Boolean(item.breaking),
        readTime: item.readTime || '3 min',
        sourceUrl: item.sourceUrl || null,
        body: item.body || [],
        relatedArticles: item.relatedArticles || [],
        relatedScreenshots: item.relatedScreenshots || [],
        relatedTrailers: item.relatedTrailers || [],
        relatedCharacters: item.relatedCharacters || [],
      }));

      cachedNews = normalizedData;
      return cachedNews;
    } catch (error) {
      console.warn('NewsService: Failed to fetch from API. Initializing static fallback.', error);
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
