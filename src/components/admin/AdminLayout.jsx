import { NavLink, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineHome, 
  HiOutlinePhotograph, 
  HiOutlineCog,
  HiOutlineVideoCamera,
  HiOutlineSparkles,
  HiMenu,
  HiX
} from 'react-icons/hi';

import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function AdminSidebar({ isOpen, setIsOpen }) {
  const links = [
    { to: '/admin', label: 'Dashboard', icon: HiOutlineHome, exact: true },
    { to: '/admin/studio', label: 'Creator Studio', icon: HiOutlineVideoCamera },
    { to: '/admin/ai', label: 'AI Originals', icon: HiOutlineSparkles },
    { to: '/admin/media', label: 'Media Library', icon: HiOutlinePhotograph },
    { to: '/admin/settings', label: 'Settings', icon: HiOutlineCog },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#050505] border-r border-white/5 flex flex-col transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/5 flex flex-col items-center justify-center relative">
          <h1 className="font-display font-black text-3xl tracking-wider mb-1">
            <span className="text-primary">GTA</span>
            <span className="text-white ml-2">VI</span>
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gta-muted font-display">
            Creator Studio
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/50 lg:hidden"
          >
            <HiX size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-4 lg:py-3 rounded-lg text-sm lg:text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(255,106,0,0.1)]'
                    : 'text-gta-muted hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <link.icon className="w-6 h-6 lg:w-5 lg:h-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <NavLink
            to="/"
            className="flex items-center justify-center w-full px-4 py-4 rounded-lg text-xs font-bold tracking-widest uppercase text-white/50 hover:bg-white/5 hover:text-white transition-colors"
          >
            Exit Studio
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#09090b] text-white overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 border-b border-white/5 flex items-center px-4 shrink-0 bg-[#050505]">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-white">
            <HiMenu size={28} />
          </button>
          <span className="ml-4 font-display font-black text-xl tracking-wider">CREATOR <span className="text-primary">STUDIO</span></span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
