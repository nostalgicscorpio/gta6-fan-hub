import { supabase, hasSupabase } from './supabaseClient';

export const adminService = {
  async getAdminContent(collection) {
    if (!hasSupabase()) return { data: [], error: null };
    const { data, error } = await supabase
      .from(collection)
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createItem(collection, item) {
    if (!hasSupabase()) return { data: { ...item, id: Date.now().toString() }, error: null };
    const { data, error } = await supabase
      .from(collection)
      .insert([item])
      .select()
      .single();
    return { data, error };
  },

  async updateItem(collection, id, updates) {
    if (!hasSupabase()) return { data: { ...updates, id }, error: null };
    
    // Auto-update 'updated_at' if the object is being updated
    const finalUpdates = { ...updates };
    if (!finalUpdates.updated_at) {
        finalUpdates.updated_at = new Date().toISOString();
    }
    
    const { data, error } = await supabase
      .from(collection)
      .update(finalUpdates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteItem(collection, id) {
    if (!hasSupabase()) return { error: null };
    const { error } = await supabase
      .from(collection)
      .delete()
      .eq('id', id);
    return { error };
  },

  async publishItem(collection, id, statusField, statusValue) {
    return this.updateItem(collection, id, { [statusField]: statusValue });
  }
};
