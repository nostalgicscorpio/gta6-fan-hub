import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminData } from '../../hooks/useAdminData';
import { HiPlus, HiPencil, HiTrash, HiPlay, HiCheckCircle } from 'react-icons/hi';
import AssetImage from '../../components/AssetImage';

const initialForm = {
  title: '',
  subtitle: '',
  description: '',
  videoId: '',
  thumbnail: '',
  duration: '',
  publish_status: 'Draft'
};

export default function ManageTrailers() {
  const { data: trailers, loading, deleteItem, addItem, updateItem } = useAdminData('trailers');
  const [isDeleting, setIsDeleting] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trailer?')) {
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
        subtitle: item.subtitle || '',
        description: item.description || '',
        videoId: item.video_url || item.videoId || '', 
        thumbnail: item.thumbnail_url || item.thumbnail || '',
        duration: item.duration || '',
        publish_status: item.publish_status || item.status || 'Draft'
      });
    } else {
      setEditingId(null);
      setForm(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (status) => {
    if (!form.title || !form.videoId) {
      alert("Title and Video ID are required!");
      return;
    }
    setIsSaving(true);
    
    const dataToSave = { 
        title: form.title,
        subtitle: form.subtitle,
        description: form.description,
        video_url: form.videoId,
        thumbnail_url: form.thumbnail,
        duration: form.duration,
        publish_status: status 
    };
    
    if (editingId) {
      await updateItem(editingId, dataToSave);
    } else {
      await addItem(dataToSave);
    }
    
    setIsSaving(false);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="text-gta-red animate-pulse p-8">Loading Trailers...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white mb-2">Manage Trailers</h2>
          <p className="text-gta-muted text-sm">Update official YouTube embeds and thumbnails.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-6 py-3 bg-gta-red text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-red-500 hover:scale-105 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]">
          <HiPlus className="w-4 h-4" /> Add Trailer
        </button>
      </div>

      <div className="space-y-4">
        {trailers.map((trailer) => (
          <div key={trailer.id} className="bg-[#0f0f13] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-center group relative">
            <div className="w-full sm:w-64 h-36 relative rounded-lg overflow-hidden flex-shrink-0 bg-black">
              <AssetImage src={trailer.thumbnail_url || trailer.thumbnail} alt={trailer.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur text-gta-red border border-gta-red/30">
                  <HiPlay className="w-6 h-6 ml-1" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{trailer.title}</h3>
                  <p className="text-xs text-gta-red font-bold uppercase tracking-widest mb-2">{trailer.subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase border ${
                      (trailer.publish_status === 'Published' || trailer.status === 'Published')
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-white/5 text-white/50 border-white/10'
                    }`}>
                      {trailer.publish_status || trailer.status || 'Draft'}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(trailer)} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded transition-colors">
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(trailer.id)}
                      disabled={isDeleting === trailer.id}
                      className="p-2 bg-white/5 hover:bg-white/10 text-white hover:text-red-500 rounded transition-colors disabled:opacity-50"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gta-muted line-clamp-2 mt-2">{trailer.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-white/40">
                <span className="bg-black/50 px-2 py-1 rounded border border-white/5">YT ID: {trailer.video_url || trailer.videoId}</span>
                <span className="bg-black/50 px-2 py-1 rounded border border-white/5">Duration: {trailer.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Trailer Modal */}
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
                <HiPlay className="text-gta-red" /> {editingId ? 'Edit' : 'Add'} <span className="text-gta-red">Trailer</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Title</label>
                  <input 
                    type="text" 
                    value={form.title} 
                    onChange={e => setForm({...form, title: e.target.value})} 
                    placeholder="Trailer 1" 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-red outline-none text-sm" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Subtitle</label>
                  <input 
                    type="text" 
                    value={form.subtitle} 
                    onChange={e => setForm({...form, subtitle: e.target.value})} 
                    placeholder="Official Reveal" 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-red outline-none text-sm" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">YouTube Video ID (or URL)</label>
                  <input 
                    type="text" 
                    value={form.videoId} 
                    onChange={e => setForm({...form, videoId: e.target.value})} 
                    placeholder="e.g. QdBZY2fkU-0" 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-red outline-none text-sm" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Thumbnail URL</label>
                  <input 
                    type="text" 
                    value={form.thumbnail} 
                    onChange={e => setForm({...form, thumbnail: e.target.value})} 
                    placeholder="/images/trailers/..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-red outline-none text-sm" 
                  />
                  {form.thumbnail && (
                    <div className="mt-4 h-32 w-full relative rounded-lg overflow-hidden border border-white/10 bg-black">
                      <AssetImage src={form.thumbnail} className="w-full h-full object-cover opacity-80" />
                    </div>
                  )}
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Duration</label>
                    <input 
                      type="text" 
                      value={form.duration} 
                      onChange={e => setForm({...form, duration: e.target.value})} 
                      placeholder="01:30" 
                      className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-red outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Description</label>
                  <textarea 
                    rows="3" 
                    value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})} 
                    placeholder="Trailer description..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-red outline-none text-sm"
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
                  className="px-8 py-4 bg-gta-red text-white rounded-sm uppercase text-xs font-bold tracking-widest hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {isSaving ? 'Publishing...' : <><HiCheckCircle className="w-4 h-4" /> Publish Trailer</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
