import { supabase, hasSupabase } from './supabaseClient';
import { newsItems as initialNews } from '../data/news';
import { creatorContent } from '../data/creatorContent';
import { mediaItems as initialGallery } from '../data/mediaGallery';
import { gameplayClips as initialGameplay } from '../data/gameplay';
import { characters as initialCharacters } from '../data/characters';
import { trailers as initialTrailers } from '../data/trailers';

const getStorage = (key, initial) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
};

export const supabaseData = {
  posts: {
    insert: async (post) => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('posts').insert([{
          title: post.title,
          slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          content: post.content || '',
          category: post.category || 'News',
          cover_image: post.cover_image || null,
          tags: post.tags || '',
          status: post.status || 'Draft',
          published: post.status === 'Published'
        }]).select().single();
        return { data, error };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            const posts = getStorage('mock_posts', initialNews);
            const newPost = { 
              ...post, 
              id: Date.now().toString(), 
              slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              created_at: new Date().toISOString() 
            };
            posts.unshift(newPost);
            localStorage.setItem('mock_posts', JSON.stringify(posts));
            resolve({ data: newPost, error: null });
          }, 500);
        });
      }
    },
    select: async () => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('posts').select('*').ilike('status', 'published').order('created_at', { ascending: false });
        // Add fallback properties to match mock data structure for older components
        const mappedData = data ? data.map(d => ({
          ...d,
          date: new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })) : [];
        return { data: mappedData, error };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            const allPosts = getStorage('mock_posts', initialNews);
            resolve({ data: allPosts.filter(p => p.status === 'Published' || p.published === true || p.status === undefined), error: null });
          }, 300);
        });
      }
    },
    delete: async (id) => {
      if (hasSupabase()) {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        return { error };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            const posts = getStorage('mock_posts', initialNews);
            const newPosts = posts.filter(p => p.id !== id);
            localStorage.setItem('mock_posts', JSON.stringify(newPosts));
            resolve({ error: null });
          }, 300);
        });
      }
    }
  },
  videos: {
    insert: async (video) => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('videos').insert([{
          title: video.title,
          video_url: video.video_url,
          thumbnail: video.thumbnail || null,
          type: video.type || 'Gameplay',
          description: video.description || '',
          ai_tool: video.ai_tool || null,
          ai_prompt: video.ai_prompt || null,
          status: video.status || 'Draft'
        }]).select().single();
        return { data, error };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            const videos = getStorage('mock_videos', creatorContent.youtube || []);
            const newVideo = { 
              ...video, 
              id: Date.now().toString(), 
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              created_at: new Date().toISOString() 
            };
            videos.unshift(newVideo);
            localStorage.setItem('mock_videos', JSON.stringify(videos));
            resolve({ data: newVideo, error: null });
          }, 500);
        });
      }
    },
    select: async () => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('videos').select('*').ilike('status', 'published').order('created_at', { ascending: false });
        const mappedData = data ? data.map(d => ({
          ...d,
          date: new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })) : [];
        return { data: mappedData, error };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            const allVideos = getStorage('mock_videos', creatorContent.youtube || []);
            resolve({ data: allVideos.filter(v => v.status === 'Published' || v.status === undefined), error: null });
          }, 300);
        });
      }
    },
    delete: async (id) => {
      if (hasSupabase()) {
        const { error } = await supabase.from('videos').delete().eq('id', id);
        return { error };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            const videos = getStorage('mock_videos', creatorContent.youtube || []);
            const newVideos = videos.filter(v => v.id !== id);
            localStorage.setItem('mock_videos', JSON.stringify(newVideos));
            resolve({ error: null });
          }, 300);
        });
      }
    }
  },
  gallery: {
    select: async () => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('gallery').select('*').ilike('status', 'published').order('created_at', { ascending: false });
        return { data: data || [], error };
      }
      return new Promise((resolve) => setTimeout(() => {
        const allGallery = getStorage('mock_gallery', initialGallery);
        resolve({ data: allGallery.filter(g => g.status === 'Published' || g.status === undefined), error: null });
      }, 300));
    }
  },
  gameplay: {
    select: async () => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('gameplay').select('*').ilike('status', 'published').order('created_at', { ascending: false });
        return { data: data || [], error };
      }
      return new Promise((resolve) => setTimeout(() => {
        const allGameplay = getStorage('mock_gameplay', initialGameplay);
        resolve({ data: allGameplay.filter(g => g.status === 'Published' || g.status === undefined), error: null });
      }, 300));
    }
  },
  characters: {
    select: async () => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('characters').select('*').ilike('status', 'published');
        return { data: data || [], error };
      }
      return new Promise((resolve) => setTimeout(() => {
        const allChars = getStorage('mock_characters', initialCharacters);
        resolve({ data: allChars.filter(c => c.status === 'Published' || c.status === undefined), error: null });
      }, 300));
    }
  },
  trailers: {
    select: async () => {
      if (hasSupabase()) {
        // Handle both publish_status and status, depending on how it was saved
        const { data, error } = await supabase.from('trailers').select('*');
        if (data) {
          const filtered = data.filter(t => 
            (t.publish_status && t.publish_status.toLowerCase() === 'published') || 
            (t.status && t.status.toLowerCase() === 'published')
          );
          return { data: filtered, error };
        }
        return { data: [], error };
      }
      return new Promise((resolve) => setTimeout(() => {
        const allTrailers = getStorage('mock_trailers', initialTrailers);
        resolve({ data: allTrailers.filter(t => t.publish_status === 'Published' || t.status === 'Published' || (t.publish_status === undefined && t.status === undefined)), error: null });
      }, 300));
    }
  }
};
