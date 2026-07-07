import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiSparkles, HiTrash, HiOutlineSparkles } from 'react-icons/hi';
import { useAdminData } from '../../hooks/useAdminData';

export default function AIVideoStudio() {
  // We'll mock this using the 'trailers' data just for the demo grid, or just mock empty
  const [posts, setPosts] = useState([
    { id: '1', title: 'Vice City 1980s Neon AI', prompt: 'Neon synthwave vice city driving', tool: 'Sora', date: '2024-03-01' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white mb-2 flex items-center gap-3">
            <HiSparkles className="text-gta-cyan" /> AI Video Studio
          </h2>
          <p className="text-gta-muted text-sm">Manage GTA6WORLD AI Originals.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-gta-cyan text-black font-bold text-xs tracking-widest uppercase rounded hover:scale-105 transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)]">
          <HiPlus className="w-4 h-4" /> Generate Post
        </button>
      </div>

      <div className="bg-[#0f0f13] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Title</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Tool</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Prompt Snippet</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-white truncate max-w-xs">{item.title}</div>
                    <div className="text-xs text-gta-muted mt-1">{item.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gta-cyan/10 text-gta-cyan rounded text-[10px] font-bold tracking-wider uppercase border border-gta-cyan/20">
                      {item.tool}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-white/60 truncate max-w-[200px] italic">"{item.prompt}"</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-white/50 hover:text-red-500 bg-white/5 hover:bg-white/10 rounded transition-all">
                      <HiTrash className="w-4 h-4" />
                    </button>
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
              className="bg-[#111115] border border-white/10 rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl my-8"
            >
              <h3 className="font-display font-black text-2xl uppercase tracking-widest mb-6 flex items-center gap-3">
                <HiOutlineSparkles className="text-gta-cyan" /> New <span className="text-gta-cyan">AI Original</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Video File (Upload or URL)</label>
                  <input type="text" placeholder="https://..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm" />
                </div>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Title</label>
                  <input type="text" placeholder="Enter title..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm" />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">AI Tool Used</label>
                  <select className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm font-bold tracking-wide">
                    <option value="Sora">OpenAI Sora</option>
                    <option value="RunwayGen2">Runway Gen-2</option>
                    <option value="Pika">Pika Labs</option>
                    <option value="StableVideo">Stable Video Diffusion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Generation Prompt</label>
                  <textarea rows="3" placeholder="Enter the exact prompt used..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm italic"></textarea>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Description / Notes</label>
                  <textarea rows="3" placeholder="Context about the creation..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm"></textarea>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-end gap-4">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-4 text-white/50 hover:text-white uppercase text-xs font-bold tracking-widest transition-colors">Cancel</button>
                <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-gta-cyan text-black rounded-sm uppercase text-xs font-bold tracking-widest hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:scale-105">Publish AI Post</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
