import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'News', href: '#news' },
  { name: 'Trailers', href: '#trailers' },
  { name: 'Screenshots', href: '#screenshots' },
  { name: 'Characters', href: '#characters' },
  { name: 'Map', href: '#map' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position for navbar background + active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section by checking which section is in view
      const sections = navLinks.map((l) => l.href.slice(1));

      // If user is near the bottom of the page, activate the last section
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 100) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
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
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gta-black/90 backdrop-blur-xl border-b border-gta-orange/15 shadow-[0_4px_30px_rgba(255,106,0,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-1.5 group"
          >
            <span className="font-display font-black text-xl lg:text-2xl tracking-wider text-gta-orange text-glow-sm group-hover:text-gta-orange-light transition-colors duration-300">
              GTA
            </span>
            <span className="font-display font-black text-xl lg:text-2xl tracking-wider text-white">
              VI
            </span>
            <span className="hidden sm:inline text-[9px] tracking-[0.3em] uppercase text-gta-muted/50 ml-2 font-medium">
              Fan Hub
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 group ${
                    isActive ? 'text-gta-orange' : 'text-gta-muted hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gta-orange rounded-full transition-all duration-300 ${
                    isActive ? 'w-3/4' : 'w-0 group-hover:w-1/2'
                  }`} />
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="#countdown"
              onClick={(e) => handleNavClick(e, '#countdown')}
              className="px-5 py-2 text-[11px] font-bold tracking-[0.15em] uppercase bg-gta-orange/10 border border-gta-orange/30 text-gta-orange rounded-lg hover:bg-gta-orange hover:text-black transition-all duration-300"
            >
              Pre-Order
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gta-orange p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gta-black/95 backdrop-blur-xl border-t border-gta-orange/15"
          >
            <div className="px-6 py-5 space-y-0.5">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center justify-between py-3.5 text-base font-medium tracking-widest uppercase border-b border-gta-border/20 transition-colors ${
                      isActive ? 'text-gta-orange' : 'text-gta-muted hover:text-gta-orange'
                    }`}
                  >
                    {link.name}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-gta-orange" />}
                  </motion.a>
                );
              })}
              <a
                href="#countdown"
                onClick={(e) => handleNavClick(e, '#countdown')}
                className="block mt-4 text-center py-3 bg-gta-orange text-black font-bold tracking-wider uppercase rounded-lg"
              >
                Pre-Order
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
