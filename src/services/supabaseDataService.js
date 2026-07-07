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
          published: true
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
        const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        // Add fallback properties to match mock data structure for older components
        const mappedData = data ? data.map(d => ({
          ...d,
          date: new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })) : [];
        return { data: mappedData, error };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: getStorage('mock_posts', initialNews), error: null });
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
          ai_prompt: video.ai_prompt || null
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
        const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
        const mappedData = data ? data.map(d => ({
          ...d,
          date: new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })) : [];
        return { data: mappedData, error };
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: getStorage('mock_videos', creatorContent.youtube || []), error: null });
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
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        return { data: data || [], error };
      }
      return new Promise((resolve) => setTimeout(() => resolve({ data: getStorage('mock_gallery', initialGallery), error: null }), 300));
    }
  },
  gameplay: {
    select: async () => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('gameplay').select('*').order('created_at', { ascending: false });
        return { data: data || [], error };
      }
      return new Promise((resolve) => setTimeout(() => resolve({ data: getStorage('mock_gameplay', initialGameplay), error: null }), 300));
    }
  },
  characters: {
    select: async () => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('characters').select('*');
        return { data: data || [], error };
      }
      return new Promise((resolve) => setTimeout(() => resolve({ data: getStorage('mock_characters', initialCharacters), error: null }), 300));
    }
  },
  trailers: {
    select: async () => {
      if (hasSupabase()) {
        const { data, error } = await supabase.from('trailers').select('*');
        return { data: data || [], error };
      }
      return new Promise((resolve) => setTimeout(() => resolve({ data: getStorage('mock_trailers', initialTrailers), error: null }), 300));
    }
  }
};
