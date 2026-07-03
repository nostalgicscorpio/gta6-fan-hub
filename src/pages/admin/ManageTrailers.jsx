import { useState } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import { HiPlus, HiPencil, HiTrash, HiPlay } from 'react-icons/hi';
import AssetImage from '../../components/AssetImage';

export default function ManageTrailers() {
 const { data: trailers, loading, deleteItem } = useAdminData('trailers');
 const [isDeleting, setIsDeleting] = useState(null);

 const handleDelete = async (id) => {
 if (window.confirm('Are you sure you want to delete this trailer?')) {
 setIsDeleting(id);
 await deleteItem(id);
 setIsDeleting(null);
 }
 };

 if (loading) {
 return <div className="text-gta-red animate-pulse p-8">Loading Trailers...</div>;
 }

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h2 className="font-display font-bold text-3xl text-white mb-2">Manage Trailers</h2>
 <p className="text-gta-muted text-sm">Update official YouTube embeds and thumbnails.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2 bg-gta-red text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-red-500 transition-colors">
 <HiPlus className="w-4 h-4" /> Add Trailer
 </button>
 </div>

 <div className="space-y-4">
 {trailers.map((trailer) => (
 <div key={trailer.id} className="bg-[#0f0f13] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-center group">
 <div className="w-full sm:w-64 h-36 relative rounded-lg overflow-hidden flex-shrink-0">
 <AssetImage src={trailer.thumbnail} alt={trailer.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur text-gta-red">
 <HiPlay className="w-6 h-6 ml-1" />
 </div>
 </div>
 </div>
 
 <div className="flex-1">
 <div className="flex items-start justify-between">
 <div>
 <h3 className="text-xl font-bold text-white mb-1">{trailer.title}</h3>
 <p className="text-xs text-gta-red font-bold uppercase tracking-widest mb-2">{trailer.subtitle}</p>
 </div>
 <div className="flex gap-2">
 <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded transition-colors">
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
 
 <p className="text-sm text-gta-muted line-clamp-2 mt-2">{trailer.description}</p>
 
 <div className="mt-4 flex gap-4 text-xs font-mono text-white/40">
 <span className="bg-black/50 px-2 py-1 rounded">YT ID: {trailer.videoId}</span>
 <span className="bg-black/50 px-2 py-1 rounded">Duration: {trailer.duration}</span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
