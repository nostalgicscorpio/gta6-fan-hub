import { supabase, hasSupabase } from './supabaseClient';

export const supabaseAuth = {
  signIn: async (email, password) => {
    if (hasSupabase()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { user: data.user, error: null };
    } else {
      // Mock Fallback
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'admin@gta6world.com' && password === 'admin') {
            const user = { id: 'admin-1', email, role: 'admin' };
            localStorage.setItem('adminSession', JSON.stringify(user));
            resolve({ user, error: null });
          } else {
            reject(new Error('Invalid email or password (Demo: use admin@gta6world.com / admin)'));
          }
        }, 800);
      });
    }
  },
  
  signOut: async () => {
    if (hasSupabase()) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } else {
      // Mock Fallback
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.removeItem('adminSession');
          resolve({ error: null });
        }, 400);
      });
    }
  },

  getSession: () => {
    if (hasSupabase()) {
      // NOTE: getSession() synchronously checks localStorage if possible, 
      // but in standard supabase-js usage we might need an async check.
      // For immediate router guarding, checking the stored auth token is common, 
      // or we can rely on an async guard. Here we provide a simple synchronous mock check
      // as Supabase persists sessions in localStorage anyway under a specific key.
      // For a robust app, use supabase.auth.onAuthStateChange or async getSession.
      // For this implementation, we will assume if the item exists, we are somewhat logged in.
      const sbSession = localStorage.getItem(`sb-${new URL(import.meta.env.VITE_SUPABASE_URL || 'https://fake.supabase.co').hostname.split('.')[0]}-auth-token`);
      return sbSession ? JSON.parse(sbSession) : null;
    } else {
      // Mock Fallback
      const session = localStorage.getItem('adminSession');
      return session ? JSON.parse(session) : null;
    }
  }
};
