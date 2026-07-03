import { useState } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import { HiPlus, HiTrash, HiPhotograph, HiLocationMarker } from 'react-icons/hi';
import AssetImage from '../../components/AssetImage';

export default function ManageMedia() {
 const { data: screenshots, loading: ssLoading, deleteItem: deleteSS } = useAdminData('screenshots');
 const { data: locations, loading: locLoading, deleteItem: deleteLoc } = useAdminData('locations');
 
 const [activeTab, setActiveTab] = useState('screenshots');
 const [isDeleting, setIsDeleting] = useState(null);

 const handleDeleteSS = async (id) => {
 if (window.confirm('Delete screenshot?')) {
 setIsDeleting(`ss-${id}`);
 await deleteSS(id);
 setIsDeleting(null);
 }
 };

 const handleDeleteLoc = async (name) => {
 if (window.confirm('Delete location marker?')) {
 setIsDeleting(`loc-${name}`);
 await deleteLoc(name);
 setIsDeleting(null);
 }
 };

 if (ssLoading || locLoading) {
 return <div className="text-gta-purple animate-pulse p-8">Loading Media...</div>;
 }

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h2 className="font-display font-bold text-3xl text-white mb-2">Media & Map</h2>
 <p className="text-gta-muted text-sm">Manage screenshots and interactive map markers.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2 bg-gta-purple text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-purple-600 transition-colors">
 <HiPlus className="w-4 h-4" /> {activeTab === 'screenshots' ? 'Upload Image' : 'Add Marker'}
 </button>
 </div>

 {/* Tabs */}
 <div className="flex gap-4 mb-6 border-b border-white/5 pb-2">
 <button 
 onClick={() => setActiveTab('screenshots')}
 className={`flex items-center gap-2 pb-2 px-2 border-b-2 transition-colors ${activeTab === 'screenshots' ? 'border-gta-purple text-white' : 'border-transparent text-white/50 hover:text-white'}`}
 >
 <HiPhotograph className="w-5 h-5" /> Screenshots
 </button>
 <button 
 onClick={() => setActiveTab('locations')}
 className={`flex items-center gap-2 pb-2 px-2 border-b-2 transition-colors ${activeTab === 'locations' ? 'border-gta-green text-white' : 'border-transparent text-white/50 hover:text-white'}`}
 >
 <HiLocationMarker className="w-5 h-5" /> Map Locations
 </button>
 </div>

 {/* Screenshots Tab */}
 {activeTab === 'screenshots' && (
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
 {screenshots.map((ss) => (
 <div key={ss.id} className="relative group rounded-lg overflow-hidden border border-white/5 bg-[#0f0f13]">
 <AssetImage src={ss.src} alt={ss.title} className="w-full h-32 object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
 <button 
 onClick={() => handleDeleteSS(ss.id)}
 disabled={isDeleting === `ss-${ss.id}`}
 className="p-1.5 bg-red-500/80 backdrop-blur text-white rounded hover:bg-red-500 disabled:opacity-50"
 >
 <HiTrash className="w-4 h-4" />
 </button>
 </div>
 <div className="p-2 bg-[#0f0f13]">
 <p className="text-xs font-bold text-white truncate">{ss.title}</p>
 <p className="text-[10px] text-gta-muted uppercase tracking-wider">{ss.category}</p>
 </div>
 </div>
 ))}
 </div>
 )}

 {/* Locations Tab */}
 {activeTab === 'locations' && (
 <div className="space-y-2">
 {locations.map((loc, idx) => (
 <div key={idx} className="flex items-center justify-between p-4 bg-[#0f0f13] border border-white/5 rounded-lg hover:bg-white/[0.02] transition-colors">
 <div>
 <h4 className="text-white font-bold">{loc.name}</h4>
 <p className="text-xs text-gta-muted max-w-xl truncate">{loc.desc}</p>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-[10px] font-mono text-gta-green bg-gta-green/10 px-2 py-1 rounded border border-gta-green/20">
 X: {loc.x} | Y: {loc.y}
 </div>
 <button 
 onClick={() => handleDeleteLoc(loc.name)}
 disabled={isDeleting === `loc-${loc.name}`}
 className="p-2 text-white/50 hover:text-red-500 bg-white/5 hover:bg-white/10 rounded disabled:opacity-50"
 >
 <HiTrash className="w-4 h-4" />
 </button>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
}
