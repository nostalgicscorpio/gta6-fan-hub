import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight, HiDownload } from 'react-icons/hi';
import { trackButtonClick } from '../utils/analytics';
import { revealVariants, staggerContainer } from '../utils/animations';

const screenshots = [
  { id: 1, title: 'Vice City Sunset', src: '/images/ss-sunset.png', category: 'Scenery' },
  { id: 2, title: 'Neon Nightlife', src: '/images/ss-nightlife.png', category: 'Night' },
  { id: 3, title: 'Everglades Swamp', src: '/images/ss-swamp.png', category: 'Wilderness' },
  { id: 4, title: 'Highway Chase', src: '/images/ss-chase.png', category: 'Action' },
  { id: 5, title: 'Ocean Beach', src: '/images/ss-beach.png', category: 'Beach' },
  { id: 6, title: 'Downtown Vice City', src: '/images/ss-downtown.png', category: 'City' },
];

function Lightbox({ screenshot, screenshots, onClose, onNavigate }) {
  const currentIdx = screenshots.findIndex((s) => s.id === screenshot.id);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIdx - 1));
    if (e.key === 'ArrowRight') onNavigate(Math.min(screenshots.length - 1, currentIdx + 1));
  }, [currentIdx, onClose, onNavigate, screenshots.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Screenshot viewer"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white/60 hover:text-gta-orange transition-colors cursor-pointer"
        aria-label="Close"
      >
        <HiX size={28} />
      </button>

      {/* Navigation */}
      {currentIdx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIdx - 1); }}
          className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gta-orange hover:border-gta-orange/40 transition-all cursor-pointer"
          aria-label="Previous screenshot"
        >
          <HiChevronLeft size={24} />
        </button>
      )}
      {currentIdx < screenshots.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIdx + 1); }}
          className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gta-orange hover:border-gta-orange/40 transition-all cursor-pointer"
          aria-label="Next screenshot"
        >
          <HiChevronRight size={24} />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={screenshot.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="max-w-[90vw] max-h-[85vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={screenshot.src}
          alt={screenshot.title}
          className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_0_60px_rgba(255,106,0,0.15)]"
        />
        {/* Caption */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-white text-sm sm:text-base">{screenshot.title}</h3>
            <p className="text-xs text-gta-muted mt-0.5">{screenshot.category} · {currentIdx + 1} of {screenshots.length}</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-gta-orange hover:text-gta-orange-light transition-colors cursor-pointer">
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
    <section id="screenshots" className="relative py-20 sm:py-28">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16"
        >
          <motion.div variants={revealVariants}>
            <p className="text-[11px] tracking-[0.5em] uppercase text-gta-orange font-medium mb-2">
              Gallery
            </p>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
              SCREEN<span className="text-gta-orange">SHOTS</span>
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={revealVariants} className="flex gap-2 mt-4 sm:mt-0 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-3 py-1.5 text-[10px] tracking-wider uppercase font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? 'bg-gta-orange text-black shadow-[0_0_15px_rgba(255,106,0,0.3)]'
                    : 'bg-white/5 text-gta-muted hover:text-gta-orange hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,106,0,0.1)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((shot, i) => (
              <motion.div
                key={shot.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  trackButtonClick(`Screenshot: ${shot.title}`);
                  setLightboxIdx(screenshots.findIndex((s) => s.id === shot.id));
                }}
                className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-lg shadow-black/30 card-hover-glow ${
                  i === 0 && filter === 'All' ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${i === 0 && filter === 'All' ? 'aspect-[16/11]' : 'aspect-video'}`}>
                  <img
                    src={shot.src}
                    alt={shot.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-display font-bold text-sm">{shot.title}</p>
                    <p className="text-gta-orange text-[10px] tracking-wider uppercase mt-0.5">{shot.category}</p>
                  </div>
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
