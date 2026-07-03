import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSearch } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'News', href: '/news' },
  { name: 'Trailers', href: '/trailers' },
  { name: 'Gallery', href: '/media' },
  { name: 'Characters', href: '/#characters' },
  { name: 'Map', href: '/#map' },
];

export default function Navbar({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      if (docHeight - scrollBottom < 100) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        if (!sections[i]) continue;
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            const offset = 80;
            const y = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          const offset = 80;
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  }, [navigate, location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-[rgba(10,10,12,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="page-container h-[var(--navbar-height)] grid grid-cols-2 lg:grid-cols-3 items-center">
        
        {/* Logo (Left Column) */}
        <div className="flex justify-start">
          <a
            href="/#home"
            onClick={(e) => handleNavClick(e, '/#home')}
            aria-label="GTA VI Home"
            className="flex items-center gap-1.5 group focus-ring rounded-sm"
          >
            <span className="font-display font-black text-xl lg:text-2xl tracking-wider text-[#FFFFFF] transition-colors duration-300">
              GTA
            </span>
            <span className="font-display font-black text-xl lg:text-2xl tracking-wider text-[#FFFFFF]">
              VI
            </span>
            <span className="hidden sm:inline text-[9px] tracking-[0.3em] uppercase text-[#9A9AA3] ml-2 font-medium">
              Fan Hub
            </span>
          </a>
        </div>

        {/* Desktop links (Center Column) */}
        <div className="hidden lg:flex items-center justify-center gap-2">
          {navLinks.map((link) => {
            const isActive = link.href.startsWith('/#') ? activeSection === link.href.substring(2) : location.pathname === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 group focus-ring ${
                  isActive 
                    ? 'text-[#FF8A2A]' 
                    : 'text-[#9A9AA3] hover:text-[#FF5FAF]'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] rounded-full transition-all duration-300 ease-out ${
                  isActive ? 'w-1/2 bg-[#FF8A2A]' : 'w-0 bg-[#FF5FAF] group-hover:w-1/3'
                }`} />
              </a>
            );
          })}
        </div>

        {/* Desktop CTA & Search (Right Column) */}
        <div className="hidden lg:flex items-center justify-end gap-6">
          <button
            onClick={onOpenSearch}
            className="text-[#9A9AA3] hover:text-[#FF5FAF] transition-colors group flex items-center gap-2 focus-ring rounded-md"
            aria-label="Search"
          >
            <HiSearch size={20} />
            <div className="hidden xl:flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
              <kbd className="font-sans text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-[rgba(255,255,255,0.08)] text-[#FFFFFF]">
                /
              </kbd>
            </div>
          </button>
          <a
            href="/#countdown"
            onClick={(e) => handleNavClick(e, '/#countdown')}
            className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase border border-[rgba(255,255,255,0.08)] bg-transparent text-[#FFFFFF] rounded-sm hover:border-[#FF5FAF] hover:text-[#FF5FAF] transition-all duration-300 focus-ring"
          >
            Pre-Order
          </a>
        </div>

        {/* Mobile toggle & Search */}
        <div className="flex items-center justify-end gap-3 lg:hidden">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#9A9AA3] hover:text-[#FF5FAF] transition-colors focus-ring rounded-md"
            aria-label="Search"
          >
            <HiSearch size={22} />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#FFFFFF] p-2 cursor-pointer focus-ring rounded-md hover:text-[#FF5FAF] transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu (Slide-in panel) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 lg:hidden bg-[rgba(10,10,12,0.95)] backdrop-blur-xl flex flex-col justify-center px-8"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => {
                const isActive = link.href.startsWith('/#') ? activeSection === link.href.substring(2) : location.pathname === link.href;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (i * 0.05), type: 'spring', stiffness: 300, damping: 25 }}
                    className={`text-2xl font-display font-black tracking-widest uppercase transition-all duration-300 focus-ring rounded-md flex items-center ${
                      isActive ? 'text-[#FF8A2A]' : 'text-[#9A9AA3] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <motion.a
                href="/#countdown"
                onClick={(e) => handleNavClick(e, '/#countdown')}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + (navLinks.length * 0.05), type: 'spring', stiffness: 300, damping: 25 }}
                className="mt-8 px-6 py-4 text-center bg-gradient-to-r from-[#FF8A2A] to-[#FF5FAF] text-[#FFFFFF] font-bold tracking-widest uppercase rounded-sm transition-all duration-300 active:scale-95 focus-ring shadow-[0_0_15px_rgba(255,138,42,0.25)]"
              >
                Pre-Order
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
