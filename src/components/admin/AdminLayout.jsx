import { NavLink, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
 HiOutlineHome, 
 HiOutlineNewspaper, 
 HiOutlineUsers, 
 HiOutlineFilm, 
 HiOutlinePhotograph, 
 HiOutlineCog 
} from 'react-icons/hi';

import DashboardOverview from '../../pages/admin/DashboardOverview';
import ManageNews from '../../pages/admin/ManageNews';
import ManageCharacters from '../../pages/admin/ManageCharacters';
import ManageTrailers from '../../pages/admin/ManageTrailers';
import ManageMedia from '../../pages/admin/ManageMedia';
import AdminSettings from '../../pages/admin/AdminSettings';

function AdminSidebar() {
 const links = [
 { to: '/admin', label: 'Overview', icon: HiOutlineHome, exact: true },
 { to: '/admin/news', label: 'News Articles', icon: HiOutlineNewspaper },
 { to: '/admin/characters', label: 'Characters', icon: HiOutlineUsers },
 { to: '/admin/trailers', label: 'Trailers', icon: HiOutlineFilm },
 { to: '/admin/media', label: 'Media & Map', icon: HiOutlinePhotograph },
 { to: '/admin/settings', label: 'Settings', icon: HiOutlineCog },
 ];

 return (
 <div className="w-64 bg-[#050505] border-r border-white/5 h-screen flex flex-col flex-shrink-0">
 <div className="p-6 border-b border-white/5 flex flex-col items-center justify-center">
 <h1 className="font-display font-black text-2xl tracking-wider mb-1">
 <span className="text-primary">GTA</span>
 <span className="text-white ml-2">VI</span>
 </h1>
 <p className="text-[9px] tracking-[0.4em] uppercase text-gta-muted font-display">
 Control Center
 </p>
 </div>

 <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
 {links.map((link) => (
 <NavLink
 key={link.to}
 to={link.to}
 end={link.exact}
 className={({ isActive }) =>
 `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
 isActive
 ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(255,106,0,0.1)]'
 : 'text-gta-muted hover:bg-white/5 hover:text-white'
 }`
 }
 >
 <link.icon className="w-5 h-5" />
 {link.label}
 </NavLink>
 ))}
 </nav>

 <div className="p-4 border-t border-white/5">
 <NavLink
 to="/"
 className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-xs font-bold tracking-widest uppercase text-white/50 hover:bg-white/5 hover:text-white transition-colors"
 >
 Exit Admin
 </NavLink>
 </div>
 </div>
 );
}

export default function AdminLayout() {
 return (
 <div className="flex h-screen bg-[#09090b] text-white">
 <AdminSidebar />
 <div className="flex-1 overflow-y-auto p-8 relative">
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3 }}
 className="max-w-6xl mx-auto"
 >
 <Routes>
 <Route path="/" element={<DashboardOverview />} />
 <Route path="/news" element={<ManageNews />} />
 <Route path="/characters" element={<ManageCharacters />} />
 <Route path="/trailers" element={<ManageTrailers />} />
 <Route path="/media" element={<ManageMedia />} />
 <Route path="/settings" element={<AdminSettings />} />
 </Routes>
 </motion.div>
 </div>
 </div>
 );
}
