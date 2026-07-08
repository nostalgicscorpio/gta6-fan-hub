import { supabaseData } from './supabaseDataService';

export const galleryService = {
  async getGallery() {
    try {
      const { data, error } = await supabaseData.gallery.select();

      console.log("🔥 LIVE GALLERY DATA:", data);

      if (error) {
        console.error("Gallery fetch error:", error);
        return [];
      }

      return (data || []).map(item => ({
        id: item.id,
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

    } catch (err) {
      console.error("GalleryService failed:", err);
      return [];
    }
  }
};