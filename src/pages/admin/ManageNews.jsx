import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminData } from '../../hooks/useAdminData';
import { HiPlus, HiPencil, HiTrash, HiOutlineVideoCamera, HiOutlineNewspaper, HiOutlineSparkles } from 'react-icons/hi';

export default function CreatorStudio() {
  const { data: news, loading, deleteItem } = useAdminData('news');
  const [isDeleting, setIsDeleting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postType, setPostType] = useState('article');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setIsDeleting(id);
      await deleteItem(id);
      setIsDeleting(null);
    }
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
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold text-xs tracking-widest uppercase rounded hover:bg-primary-light hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,106,0,0.3)]">
          <HiPlus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="bg-[#0f0f13] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Content</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Type</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {news.map((item, idx) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-white truncate max-w-xs">{item.title}</div>
                    <div className="text-xs text-gta-muted mt-1">{item.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      {idx % 3 === 0 ? <HiOutlineVideoCamera className="text-[#FF0000]" /> : <HiOutlineNewspaper className="text-primary" />}
                      {idx % 3 === 0 ? 'Video' : 'Article'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold tracking-wider text-gta-cyan uppercase">
                      {item.category || 'GTA VI'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-white/50 hover:text-primary bg-white/5 hover:bg-white/10 rounded transition-all">
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

      {/* Create Post Modal */}
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
              className="bg-[#111115] border border-white/10 rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl my-8"
            >
              <h3 className="font-display font-black text-2xl uppercase tracking-widest mb-6 flex items-center gap-3">
                <HiOutlineSparkles className="text-primary" /> Create <span className="text-primary">Content</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Content Type</label>
                  <select 
                    value={postType} 
                    onChange={(e) => setPostType(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm font-bold tracking-wide"
                  >
                    <option value="article">📰 News Article</option>
                    <option value="youtube">🎬 YouTube Video Embed</option>
                    <option value="instagram">📸 Instagram Reel Embed</option>
                    <option value="video">🎮 Direct Video Upload</option>
                  </select>
                </div>

                <div className="h-px w-full bg-white/5" />

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Title</label>
                  <input type="text" placeholder="Enter title..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm" />
                </div>

                {postType === 'article' && (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Cover Image URL</label>
                      <input type="text" placeholder="/images/..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Article Body</label>
                      <textarea rows="6" placeholder="Write your article..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm"></textarea>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Tags (Comma separated)</label>
                      <input type="text" placeholder="GTA VI, Rumors, Map" className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm" />
                    </div>
                  </>
                )}

                {postType !== 'article' && (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">
                        {postType === 'video' ? 'Video File URL' : 'Embed URL (YouTube / Instagram)'}
                      </label>
                      <input type="text" placeholder="https://..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Custom Thumbnail URL</label>
                      <input type="text" placeholder="/images/..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Description</label>
                      <textarea rows="3" placeholder="Video description..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm"></textarea>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Category</label>
                  <select className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-primary outline-none text-sm">
                    <option value="GTA VI">GTA VI</option>
                    <option value="GTA V">GTA V</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Gameplay">Gameplay</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-end gap-4">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-4 text-white/50 hover:text-white uppercase text-xs font-bold tracking-widest transition-colors">Cancel</button>
                <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-primary text-black rounded-sm uppercase text-xs font-bold tracking-widest hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:scale-105">Publish Post</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
