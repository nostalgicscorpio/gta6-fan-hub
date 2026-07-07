import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminData } from '../../hooks/useAdminData';
import { HiPlus, HiPencil, HiTrash, HiCheckCircle } from 'react-icons/hi';
import AssetImage from '../../components/AssetImage';

const initialForm = {
  name: '',
  role: '',
  description: '',
  image: '',
  status: 'Draft'
};

export default function ManageCharacters() {
  const { data: characters, loading, deleteItem, addItem, updateItem } = useAdminData('characters');
  const [isDeleting, setIsDeleting] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this character?')) {
      setIsDeleting(id);
      await deleteItem(id);
      setIsDeleting(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setForm({
        name: item.name || '',
        role: item.role || '',
        description: item.description || '',
        image: item.image_url || item.image || '',
        status: item.status || 'Draft'
      });
    } else {
      setEditingId(null);
      setForm(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (status) => {
    if (!form.name) {
      alert("Name is required!");
      return;
    }
    setIsSaving(true);
    const dataToSave = { 
        name: form.name,
        role: form.role,
        description: form.description,
        image_url: form.image, // mapping to standard
        status
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
    return <div className="text-gta-cyan animate-pulse p-8">Loading Characters...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white mb-2">Manage Characters</h2>
          <p className="text-gta-muted text-sm">Add or edit character database entries.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-6 py-3 bg-gta-cyan text-black font-bold text-xs tracking-widest uppercase rounded hover:bg-gta-cyan/80 hover:scale-105 transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)]">
          <HiPlus className="w-4 h-4" /> Add Character
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char) => (
          <div key={char.id} className="glass-card rounded-xl overflow-hidden border border-white/5 relative group flex flex-col">
            <div className="aspect-[3/4] relative bg-black/50">
              <AssetImage src={char.image_url || char.image} alt={char.name} className="w-full h-full object-cover object-top opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] to-transparent" />
              
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase border backdrop-blur ${
                    char.status === 'Published' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-black/50 text-white/50 border-white/20'
                  }`}>
                    {char.status || 'Draft'}
                </span>
              </div>

              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => openModal(char)} className="p-2 bg-black/60 backdrop-blur text-white hover:text-gta-cyan rounded-lg transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(char.id)}
                  disabled={isDeleting === char.id}
                  className="p-2 bg-black/60 backdrop-blur text-white hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-1">{char.name}</h3>
              <p className="text-xs text-gta-cyan font-bold uppercase tracking-widest mb-3">{char.role}</p>
              
              <div className="flex-1">
                <p className="text-sm text-gta-muted line-clamp-2">{char.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Character Modal */}
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
                <HiCheckCircle className="text-gta-cyan" /> {editingId ? 'Edit' : 'Add'} <span className="text-gta-cyan">Character</span>
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Name</label>
                    <input 
                      type="text" 
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})} 
                      placeholder="Lucia" 
                      className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Role</label>
                    <input 
                      type="text" 
                      value={form.role} 
                      onChange={e => setForm({...form, role: e.target.value})} 
                      placeholder="Protagonist" 
                      className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Image URL</label>
                  <input 
                    type="text" 
                    value={form.image} 
                    onChange={e => setForm({...form, image: e.target.value})} 
                    placeholder="/images/characters/..." 
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white focus:border-gta-cyan outline-none text-sm" 
                  />
                  {form.image && (
                    <div className="mt-4 h-32 w-24 relative rounded-lg overflow-hidden border border-white/10 bg-black">
                      <AssetImage src={form.image} className="w-full h-full object-cover object-top opacity-80" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Biography / Description</label>
                  <textarea 
                    rows="4" 
                    value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})} 
                    placeholder="Character biography..." 
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
                  {isSaving ? 'Publishing...' : <><HiCheckCircle className="w-4 h-4" /> Publish Character</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
