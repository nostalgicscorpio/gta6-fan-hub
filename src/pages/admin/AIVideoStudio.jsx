import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiSparkles, HiTrash, HiOutlineSparkles, HiPencil, HiCheckCircle } from 'react-icons/hi';
import { useAdminData } from '../../hooks/useAdminData';
import AssetImage from '../../components/AssetImage';
import MediaUploader from '../../components/admin/MediaUploader';

const initialForm = {
  title: '',
  video_url: '',
  thumbnail: '',
  ai_tool: 'Sora',
  ai_prompt: '',
  description: '',
  type: 'AI Original',
  status: 'Draft'
};

export default function AIVideoStudio() {
  const { data: videos, loading, deleteItem, addItem, updateItem } = useAdminData('videos');
  const [isDeleting, setIsDeleting] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  // Filter to only show AI Originals in this specific admin studio page
  const aiVideos = useMemo(() => videos.filter(v => v.type === 'AI Original'), [videos]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this AI video?')) {
      setIsDeleting(id);
      await deleteItem(id);
      setIsDeleting(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setForm({
        title: item.title || '',
        video_url: item.video_url || '',
        thumbnail: item.thumbnail || '',
        ai_tool: item.ai_tool || 'Sora',
        ai_prompt: item.ai_prompt || '',
        description: item.description || '',
        type: 'AI Original',
        status: item.status || 'Draft'
      });
    } else {
      setEditingId(null);
      setForm(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (status) => {
    if (!form.title || !form.video_url) {
      alert("Title and Video URL are required!");
      return;
    }
    setIsSaving(true);
    const dataToSave = { ...form, status };
    
    if (editingId) {
      await updateItem(editingId, dataToSave);
    } else {
      await addItem(dataToSave);
    }
    
    setIsSaving(false);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="text-gta-cyan animate-pulse p-8">Loading AI Studio...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white mb-2 flex items-center gap-3">
            <HiSparkles className="text-gta-cyan" /> AI Video Studio
          </h2>
          <p className="text-gta-muted text-sm">Manage GTA6WORLD AI Originals.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-6 py-3 bg-gta-cyan text-black font-bold text-xs tracking-widest uppercase rounded hover:scale-105 transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)]">
          <HiPlus className="w-4 h-4" /> Generate Post
        </button>
      </div>

      <div className="bg-[#0f0f13] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-black/40 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Title</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Tool</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Prompt Snippet</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {aiVideos.map((item) => (
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
                    <span className="px-2 py-1 bg-gta-cyan/10 text-gta-cyan rounded text-[10px] font-bold tracking-wider uppercase border border-gta-cyan/20">
                      {item.ai_tool || 'Sora'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-white/60 truncate max-w-[200px] italic">"{item.ai_prompt || item.description}"</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openModal(item)} className="p-2 text-white/50 hover:text-gta-cyan bg-white/5 hover:bg-white/10 rounded transition-all">
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

      {/* AI Post Modal */}
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
                <HiOutlineSparkles className="text-gta-cyan" /> {editingId ? 'Edit' : 'New'} <span className="text-gta-cyan">AI Original</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <MediaUploader
                    label="Video File (Upload or URL)"
                    value={form.video_url}
                    onChange={(url) => setForm({...form, video_url: url})}
                    type="video"
                    allowedTypes={['video/mp4', 'video/webm']}
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Title</label>
                  <input 
                    type="text" 
                    value={form.title} 
                    onChange={e => setForm({...form, title: e.target.value})} 
                    placeholder="Enter title..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm" 
                  />
                </div>

                <div>
                  <MediaUploader
                    label="Thumbnail URL (Upload or URL)"
                    value={form.thumbnail}
                    onChange={(url) => setForm({...form, thumbnail: url})}
                    type="image"
                    allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">AI Tool Used</label>
                  <select 
                    value={form.ai_tool} 
                    onChange={e => setForm({...form, ai_tool: e.target.value})} 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm font-bold tracking-wide"
                  >
                    <option value="Sora">OpenAI Sora</option>
                    <option value="RunwayGen2">Runway Gen-2</option>
                    <option value="Pika">Pika Labs</option>
                    <option value="StableVideo">Stable Video Diffusion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Generation Prompt</label>
                  <textarea 
                    rows="3" 
                    value={form.ai_prompt} 
                    onChange={e => setForm({...form, ai_prompt: e.target.value})} 
                    placeholder="Enter the exact prompt used..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm italic"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Description / Notes</label>
                  <textarea 
                    rows="3" 
                    value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})} 
                    placeholder="Context about the creation..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm"
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
                  className="px-8 py-4 bg-gta-cyan text-black rounded-sm uppercase text-xs font-bold tracking-widest hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
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
