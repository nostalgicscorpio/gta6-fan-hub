import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiTrash, HiPhotograph, HiVideoCamera, HiCloudUpload, HiCheckCircle } from 'react-icons/hi';
import AssetImage from '../../components/AssetImage';
import { useAdminData } from '../../hooks/useAdminData';
import MediaUploader from '../../components/admin/MediaUploader';
import { adminService } from '../../services/adminService';

const initialForm = {
  title: '',
  src: '',
  category: 'Screenshots',
  description: ''
};

export default function ManageMedia() {
  const { data: gallery, loading, deleteItem, addItem } = useAdminData('gallery');
  const [activeTab, setActiveTab] = useState('images');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  const images = useMemo(() => gallery.filter(item => !item.src?.match(/\.(mp4|webm|ogg)$/i)), [gallery]);
  const videos = useMemo(() => gallery.filter(item => item.src?.match(/\.(mp4|webm|ogg)$/i)), [gallery]);
  const activeMedia = activeTab === 'images' ? images : videos;

  const handleSave = async () => {
    if (!form.title || !form.src) {
      alert("Title and File URL are required!");
      return;
    }

    setIsSaving(true);

    const mediaItem = {
      title: form.title,
      src: form.src,
      category: form.category,
      description: form.description,
      status: 'Published',
      created_at: new Date().toISOString()
    };
    const result = await adminService.createItem('gallery', mediaItem);

    console.log("🔥 SUPABASE SAVE RESULT:", result);

    if (!result.error && result.data) {
      await addItem(result.data);
    }

    setIsSaving(false);
    setIsModalOpen(false);
    setForm(initialForm);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this media asset?')) {
      await deleteItem(id);
    }
  };

  if (loading) {
    return <div className="text-gta-purple animate-pulse p-8">Loading Media Library...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white mb-2 flex items-center gap-3">
            <HiPhotograph className="text-gta-purple" /> Media Library
          </h2>
          <p className="text-gta-muted text-sm">Centralized storage for GTA6WORLD assets.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gta-purple text-white font-bold text-xs tracking-widest uppercase rounded hover:scale-105 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          <HiCloudUpload className="w-5 h-5" /> Register Asset
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 pb-2 px-2 border-b-2 transition-colors ${activeTab === 'images' ? 'border-gta-purple text-white' : 'border-transparent text-white/50 hover:text-white'}`}
        >
          <HiPhotograph className="w-5 h-5" /> Images & Thumbnails
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 pb-2 px-2 border-b-2 transition-colors ${activeTab === 'videos' ? 'border-red-500 text-white' : 'border-transparent text-white/50 hover:text-white'}`}
        >
          <HiVideoCamera className="w-5 h-5" /> Direct Video Files
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activeMedia.map((item) => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden border border-white/5 bg-[#0f0f13]">
            {activeTab === 'images' ? (
              <AssetImage src={item.src} alt={item.title} className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity bg-black" />
            ) : (
              <video src={item.src} className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity bg-black" />
            )}

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 bg-red-500/80 backdrop-blur text-white rounded hover:bg-red-500"
              >
                <HiTrash className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-2 left-2">
              <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur text-[9px] uppercase tracking-wider text-gta-purple rounded">
                {item.category}
              </span>
            </div>
            <div className="p-3 bg-[#0f0f13]">
              <p className="text-xs font-bold text-white truncate">{item.title}</p>
              <p className="text-[9px] text-gta-muted uppercase tracking-wider mt-1 truncate" title={item.src}>{item.src}</p>
            </div>
          </div>
        ))}
        {activeMedia.length === 0 && (
          <div className="col-span-full py-12 text-center text-white/50 text-sm">
            No media found in this category.
          </div>
        )}
      </div>

      {/* Add Media Modal */}
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
              className="bg-[#111115] border border-white/10 rounded-2xl w-full max-w-xl p-6 md:p-8 relative shadow-2xl my-8 md:my-auto max-h-[90vh] overflow-y-auto"
            >
              <h3 className="font-display font-black text-2xl uppercase tracking-widest mb-6 flex items-center gap-3">
                <HiCloudUpload className="text-gta-purple" /> Register <span className="text-gta-purple">Media</span>
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter asset title..."
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-purple outline-none text-sm"
                  />
                </div>

                <div>
                  <MediaUploader
                    label="File URL / Path (or Drag & Drop)"
                    value={form.src}
                    onChange={(url) => setForm({ ...form, src: url })}
                    type={activeTab === 'videos' ? 'video' : 'image'}
                    allowedTypes={
                      activeTab === 'videos'
                        ? ['video/mp4', 'video/webm']
                        : ['image/jpeg', 'image/png', 'image/webp']
                    }
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-purple outline-none text-sm"
                  >
                    <option value="Screenshots">Screenshots</option>
                    <option value="Artwork">Artwork</option>
                    <option value="Wallpapers">Wallpapers</option>
                    <option value="Cover Art">Cover Art</option>
                    <option value="Characters">Characters</option>
                    <option value="Locations">Locations</option>
                    <option value="Promotional">Promotional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Description</label>
                  <textarea
                    rows="2"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description..."
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-purple outline-none text-sm"
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
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-4 bg-gta-purple text-white rounded-sm uppercase text-xs font-bold tracking-widest hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {isSaving ? 'Saving...' : <><HiCheckCircle className="w-4 h-4" /> Save Asset</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
