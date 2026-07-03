import { useState } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';

export default function ManageNews() {
 const { data: news, loading, deleteItem } = useAdminData('news');
 const [isDeleting, setIsDeleting] = useState(null);

 const handleDelete = async (id) => {
 if (window.confirm('Are you sure you want to delete this article?')) {
 setIsDeleting(id);
 await deleteItem(id);
 setIsDeleting(null);
 }
 };

 if (loading) {
 return <div className="text-primary animate-pulse p-8">Loading Articles...</div>;
 }

 return (
 <div>
 <div className="flex items-center justify-between mb-8">
 <div>
 <h2 className="font-display font-bold text-3xl text-white mb-2">Manage News</h2>
 <p className="text-gta-muted text-sm">Create, edit, or remove news articles.</p>
 </div>
 <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold text-xs tracking-widest uppercase rounded hover:bg-primary-light transition-colors">
 <HiPlus className="w-4 h-4" /> Add Article
 </button>
 </div>

 <div className="bg-[#0f0f13] border border-white/5 rounded-xl overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-black/40 border-b border-white/5">
 <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">ID</th>
 <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Title</th>
 <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Category</th>
 <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50">Date</th>
 <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/50 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {news.map((item) => (
 <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
 <td className="px-6 py-4 text-xs font-mono text-white/30">#{item.id}</td>
 <td className="px-6 py-4">
 <div className="text-sm font-bold text-white truncate max-w-xs">{item.title}</div>
 <div className="text-xs text-gta-muted truncate max-w-xs">{item.slug}</div>
 </td>
 <td className="px-6 py-4">
 <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold tracking-wider text-gta-cyan uppercase">
 {item.category}
 </span>
 </td>
 <td className="px-6 py-4 text-xs text-white/70">{item.date}</td>
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
 </div>
 );
}
