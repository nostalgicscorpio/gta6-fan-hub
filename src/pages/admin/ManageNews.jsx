import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminData } from '../../hooks/useAdminData';
import { HiPlus, HiPencil, HiTrash, HiOutlineVideoCamera, HiOutlineNewspaper, HiOutlineSparkles, HiCheckCircle } from 'react-icons/hi';
import AssetImage from '../../components/AssetImage';

const initialForm = {
  title: '',
  slug: '',
  category: 'News',
  content: '',
  excerpt: '',
  cover_image: '',
  status: 'Draft'
};

export default function CreatorStudio() {
  const { data: news, loading, deleteItem, addItem, updateItem } = useAdminData('posts');
  const [isDeleting, setIsDeleting] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setIsDeleting(id);
      const { error } = await deleteItem(id);
      if (error) {
        showMessage('Failed to delete item.', 'error');
      } else {
        showMessage('Item deleted successfully.');
      }
      setIsDeleting(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setForm({
        title: item.title || '',
        slug: item.slug || '',
        category: item.category || 'News',
        content: item.content || '',
        excerpt: item.excerpt || '',
        cover_image: item.cover_image || '',
        status: item.status || 'Draft'
      });
    } else {
      setEditingId(null);
      setForm(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (status) => {
    if (!form.title) {
      alert("Title is required!");
      return;
    }
    setIsSaving(true);
    const finalSlug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const dataToSave = { ...form, slug: finalSlug, status };
    
    if (editingId) {
      const { error } = await updateItem(editingId, dataToSave);
      if (error) {
        showMessage('Failed to update content.', 'error');
      } else {
        showMessage('Content updated successfully.');
      }
    } else {
      const { error } = await addItem(dataToSave);
      if (error) {
        showMessage('Failed to create content.', 'error');
      } else {
        showMessage('Content created successfully.');
      }
    }
    
    setIsSaving(false);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="text-primary animate-pulse p-8">Loading Studio Data...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white mb-2">Creator Studio</h2>
          <p className="text-gta-muted text-sm">Manage articles, videos, and mixed-media posts.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold text-xs tracking-widest uppercase rounded hover:bg-primary-light hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,106,0,0.3)]">
          <HiPlus className="w-4 h-4" /> New Post
        </button>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 p-4 rounded-lg font-bold text-sm flex items-center gap-3 border ${
              message.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'
            }`}
          >
            <HiCheckCircle className="w-5 h-5" />
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#0f0f13] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-black/40 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Content</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-white truncate max-w-xs">{item.title}</div>
                    <div className="text-xs text-gta-muted mt-1">{new Date(item.created_at || Date.now()).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase border ${
                      item.status === 'Published' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-white/5 text-white/50 border-white/10'
                    }`}>
                      {item.status || 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold tracking-wider text-gta-cyan uppercase">
                      {item.category || 'News'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openModal(item)} className="p-2 text-white/50 hover:text-primary bg-white/5 hover:bg-white/10 rounded transition-all">
                        <HiPencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting === item.id}
                        className="p-2 text-white/50 hover:text-red-500 bg-white/5 hover:bg-white/10 rounded transition-all disabled:opacity-50"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#111115] border border-white/10 rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl my-8 md:my-auto max-h-[90vh] overflow-y-auto"
            >
              <h3 className="font-display font-black text-2xl uppercase tracking-widest mb-6 flex items-center gap-3">
                <HiOutlineSparkles className="text-primary" /> {editingId ? 'Edit' : 'Create'} <span className="text-primary">Content</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Title</label>
                  <input 
                    type="text" 
                    value={form.title} 
                    onChange={e => setForm({...form, title: e.target.value})} 
                    placeholder="Enter title..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Cover Image URL</label>
                  <input 
                    type="text" 
                    value={form.cover_image} 
                    onChange={e => setForm({...form, cover_image: e.target.value})} 
                    placeholder="/images/..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm" 
                  />
                  {form.cover_image && (
                    <div className="mt-4 h-32 w-48 relative rounded-lg overflow-hidden border border-white/10">
                      <AssetImage src={form.cover_image} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Category</label>
                  <select 
                    value={form.category} 
                    onChange={e => setForm({...form, category: e.target.value})} 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm"
                  >
                    <option value="News">News</option>
                    <option value="GTA VI">GTA VI</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Gameplay">Gameplay</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Excerpt (Short description)</label>
                  <textarea 
                    rows="2" 
                    value={form.excerpt} 
                    onChange={e => setForm({...form, excerpt: e.target.value})} 
                    placeholder="Short summary..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Article Body (Markdown/HTML supported)</label>
                  <textarea 
                    rows="6" 
                    value={form.content} 
                    onChange={e => setForm({...form, content: e.target.value})} 
                    placeholder="Write your article..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm"
                  ></textarea>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  disabled={isSaving}
                  className="px-6 py-4 text-white/50 hover:text-white uppercase text-xs font-bold tracking-widest transition-colors w-full sm:w-auto text-center"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleSave('Draft')} 
                  disabled={isSaving}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-sm uppercase text-xs font-bold tracking-widest transition-all w-full sm:w-auto text-center"
                >
                  {isSaving ? 'Saving...' : 'Save Draft'}
                </button>
                <button 
                  onClick={() => handleSave('Published')} 
                  disabled={isSaving}
                  className="px-8 py-4 bg-primary text-black rounded-sm uppercase text-xs font-bold tracking-widest hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {isSaving ? 'Publishing...' : <><HiCheckCircle className="w-4 h-4" /> Publish Post</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
