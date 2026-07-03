import { useState } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import AssetImage from '../../components/AssetImage';

export default function ManageCharacters() {
 const { data: characters, loading, deleteItem } = useAdminData('characters');
 const [isDeleting, setIsDeleting] = useState(null);

 const handleDelete = async (id) => {
 if (window.confirm('Are you sure you want to remove this character?')) {
 setIsDeleting(id);
 await deleteItem(id);
 setIsDeleting(null);
 }
 };

 if (loading) {
 return <div className="text-gta-cyan animate-pulse p-8">Loading Characters...</div>;
 }

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h2 className="font-display font-bold text-3xl text-white mb-2">Manage Characters</h2>
 <p className="text-gta-muted text-sm">Add or edit character database entries.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2 bg-gta-cyan text-black font-bold text-xs tracking-widest uppercase rounded hover:bg-gta-cyan/80 transition-colors">
 <HiPlus className="w-4 h-4" /> Add Character
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {characters.map((char) => (
 <div key={char.id} className="glass-card rounded-xl overflow-hidden border border-white/5 relative group">
 <div className="aspect-[3/4] relative bg-black/50">
 <AssetImage src={char.image} alt={char.name} className="w-full h-full object-cover object-top opacity-50 group-hover:opacity-80 transition-opacity" />
 <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] to-transparent" />
 
 <div className="absolute top-2 right-2 flex gap-1">
 <button className="p-2 bg-black/60 backdrop-blur text-white hover:text-gta-cyan rounded-lg transition-colors">
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
 
 <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/50">
 <span>{char.affiliations?.length || 0} Affiliations</span>
 <span>{char.gallery?.length || 0} Assets</span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
