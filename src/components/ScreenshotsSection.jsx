import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight, HiDownload } from 'react-icons/hi';
import { trackButtonClick } from '../utils/analytics';
import { revealVariants, staggerContainer } from '../utils/animations';
import AssetImage from './AssetImage';

import { screenshots } from '../data/screenshots';

function Lightbox({ screenshot, screenshots, onClose, onNavigate }) {
  const currentIdx = screenshots.findIndex((s) => s.id === screenshot.id);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    containerRef.current?.focus();
  }, [screenshot.id]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && currentIdx > 0) onNavigate(currentIdx - 1);
    if (e.key === 'ArrowRight' && currentIdx < screenshots.length - 1) onNavigate(currentIdx + 1);
  }, [currentIdx, onClose, onNavigate, screenshots.length]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50;
    if (diff > threshold && currentIdx < screenshots.length - 1) {
      onNavigate(currentIdx + 1);
    } else if (diff < -threshold && currentIdx > 0) {
      onNavigate(currentIdx - 1);
    }
  }, [currentIdx, onNavigate, screenshots.length]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-[rgba(10,10,12,0.98)] backdrop-blur-2xl flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="dialog"
      aria-label="Screenshot viewer"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-[#8D8D97] hover:text-[#FF8A2A] transition-colors cursor-pointer focus-ring rounded-md p-1"
        aria-label="Close"
      >
        <HiX size={32} />
      </button>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-sm border border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,12,0.8)] backdrop-blur-md text-xs tracking-widest text-[#8D8D97] font-bold uppercase">
        {currentIdx + 1} <span className="opacity-50 px-1">/</span> {screenshots.length}
      </div>

      {currentIdx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIdx - 1); }}
          className="absolute left-4 sm:left-8 z-10 w-14 h-14 rounded-full bg-white/5 border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8D8D97] hover:text-[#FF8A2A] hover:border-[#FF8A2A]/50 transition-all cursor-pointer focus-ring"
          aria-label="Previous screenshot"
        >
          <HiChevronLeft size={28} />
        </button>
      )}
      {currentIdx < screenshots.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIdx + 1); }}
          className="absolute right-4 sm:right-8 z-10 w-14 h-14 rounded-full bg-white/5 border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8D8D97] hover:text-[#FF8A2A] hover:border-[#FF8A2A]/50 transition-all cursor-pointer focus-ring"
          aria-label="Next screenshot"
        >
          <HiChevronRight size={28} />
        </button>
      )}

      <motion.div
        key={screenshot.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="max-w-[90vw] max-h-[85vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <AssetImage
          src={screenshot.src}
          alt={screenshot.title}
          className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)]"
        />
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-[#FFFFFF] text-lg sm:text-xl tracking-wide">{screenshot.title}</h3>
            <p className="text-xs text-[#FF8A2A] uppercase tracking-widest font-bold mt-1.5">{screenshot.category}</p>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8D8D97] hover:text-[#FF5FAF] transition-colors cursor-pointer focus-ring rounded p-2 border border-[rgba(255,255,255,0.08)] bg-[#1B1C22]">
            <HiDownload className="w-4 h-4" />
            Download
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ScreenshotsSection() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(screenshots.map((s) => s.category))];
  const filtered = filter === 'All' ? screenshots : screenshots.filter((s) => s.category === filter);

  const handleFilterClick = (cat) => {
    trackButtonClick(`Screenshot Filter: ${cat}`);
    setFilter(cat);
  };

  return (
    <section id="screenshots" className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-[#0B0B0D]">
      <div className="section-divider" />

      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-center justify-center text-center mb-16 sm:mb-24"
        >
          <motion.div variants={revealVariants} className="flex flex-col items-center">
            <p className="text-[11px] sm:text-[12px] tracking-[0.4em] uppercase text-[#FF8A2A] font-bold mb-3">
              Gallery
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] tracking-wide uppercase text-center mb-6">
              SCREENSHOTS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF8A2A] to-transparent opacity-80" />
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={revealVariants} className="flex gap-4 mt-10 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold rounded-sm border transition-all duration-300 cursor-pointer focus-ring ${
                  filter === cat
                    ? 'bg-[rgba(255,138,42,0.1)] border-[#FF8A2A] text-[#FF8A2A] shadow-[0_0_15px_rgba(255,138,42,0.15)]'
                    : 'bg-transparent border-[rgba(255,255,255,0.08)] text-[#8D8D97] hover:border-[#FF5FAF] hover:text-[#FF5FAF]'
                }`}
                aria-pressed={filter === cat}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((shot, i) => (
              <motion.div
                key={shot.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  trackButtonClick(`Screenshot: ${shot.title}`);
                  setLightboxIdx(screenshots.findIndex((s) => s.id === shot.id));
                }}
                className={`group bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:border-[rgba(255,138,42,0.25)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col ${
                  i === 0 && filter === 'All' ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div className={`relative overflow-hidden shrink-0 ${i === 0 && filter === 'All' ? 'aspect-video sm:aspect-auto sm:h-[400px] lg:h-[500px]' : 'aspect-video'}`}>
                  <AssetImage
                    src={shot.src}
                    alt={shot.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Hover overlay for icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Clean caption area below image */}
                <div className="p-5 sm:p-6 bg-[#131316] flex flex-col grow justify-center border-t border-[rgba(255,255,255,0.03)]">
                  <h3 className="text-[#FFFFFF] font-display font-bold text-base sm:text-lg tracking-wide group-hover:text-[#FF8A2A] transition-colors">
                    {shot.title}
                  </h3>
                  <p className="text-[#8D8D97] text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold mt-2">
                    {shot.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            screenshot={screenshots[lightboxIdx]}
            screenshots={screenshots}
            onClose={() => setLightboxIdx(null)}
            onNavigate={(idx) => setLightboxIdx(idx)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
