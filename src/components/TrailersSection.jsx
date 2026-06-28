import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiX } from 'react-icons/hi';
import { trackTrailerClick, trackButtonClick } from '../utils/analytics';
import { revealVariants, staggerContainer } from '../utils/animations';

const trailers = [
  {
    id: 1,
    title: 'Grand Theft Auto VI — Trailer 1',
    subtitle: 'Official Reveal',
    duration: '1:31',
    views: '220M+ views',
    date: 'Dec 2023',
    youtubeId: 'QdBZY2fkU-0',
    featured: true,
    thumbnail: '/images/hero-bg.png',
  },
  {
    id: 2,
    title: 'Grand Theft Auto VI — Trailer 2',
    subtitle: 'Leonida Awaits',
    duration: '2:03',
    views: '180M+ views',
    date: 'Jan 2025',
    youtubeId: 'K_5DjgRnnnk',
    featured: false,
    thumbnail: '/images/ss-sunset.png',
  },
  {
    id: 3,
    title: 'Grand Theft Auto VI — Trailer 3',
    subtitle: 'Nothing Will Stop Them',
    duration: '2:25',
    views: '90M+ views',
    date: 'Feb 2026',
    youtubeId: 'VH3bnhgsn_Y',
    featured: false,
    thumbnail: '/images/news-thumb.png',
  },
];

function TrailerModal({ trailer, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-gta-orange transition-colors cursor-pointer"
          aria-label="Close trailer"
        >
          <HiX size={28} />
        </button>

        {/* Video */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[0_0_60px_rgba(255,106,0,0.2)]">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={trailer.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info bar */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-white text-lg">{trailer.title}</h3>
            <p className="text-xs text-gta-muted mt-1">{trailer.views} · {trailer.date}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TrailersSection() {
  const [activeTrailer, setActiveTrailer] = useState(null);

  const handleTrailerClick = (trailer) => {
    trackTrailerClick(trailer.title);
    trackButtonClick('Play Trailer');
    setActiveTrailer(trailer);
  };

  return (
    <section id="trailers" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="section-divider" />

      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-gta-orange/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-12 sm:mb-16"
        >
          <motion.p variants={revealVariants} className="text-[11px] tracking-[0.5em] uppercase text-gta-orange font-medium mb-2">
            Watch Now
          </motion.p>
          <motion.h2 variants={revealVariants} className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            OFFICIAL <span className="text-gta-orange">TRAILERS</span>
          </motion.h2>
        </motion.div>

        {/* Featured trailer — large */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          onClick={() => handleTrailerClick(trailers[0])}
          className="group relative rounded-2xl overflow-hidden cursor-pointer mb-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] card-hover-glow"
        >
          <div className="relative aspect-video">
            <img
              src={trailers[0].thumbnail}
              alt={trailers[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gta-orange/90 flex items-center justify-center shadow-[0_0_40px_rgba(255,106,0,0.5)] group-hover:shadow-[0_0_60px_rgba(255,106,0,0.7)] transition-shadow duration-300"
              >
                <HiPlay className="w-10 h-10 sm:w-12 sm:h-12 text-black ml-1" />
              </motion.div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 bg-gta-orange text-black text-[10px] font-bold tracking-wider uppercase rounded-lg">
                FEATURED
              </span>
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase rounded-lg">
                {trailers[0].duration}
              </span>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gta-orange font-bold mb-2">
                {trailers[0].subtitle}
              </p>
              <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white">
                {trailers[0].title}
              </h3>
              <p className="mt-2 text-sm text-white/60">{trailers[0].views} · {trailers[0].date}</p>
            </div>
          </div>
        </motion.div>

        {/* Remaining trailers — 2-col */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6"
        >
          {trailers.slice(1).map((trailer, i) => (
            <motion.div
              key={trailer.id}
              variants={revealVariants}
              custom={i}
              onClick={() => handleTrailerClick(trailer)}
              className="group relative glass-card rounded-xl overflow-hidden cursor-pointer card-hover-glow"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={trailer.thumbnail}
                  alt={trailer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-gta-card via-transparent to-transparent" />

                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gta-orange/90 flex items-center justify-center shadow-[0_0_30px_rgba(255,106,0,0.4)]"
                  >
                    <HiPlay className="w-7 h-7 sm:w-8 sm:h-8 text-black ml-0.5" />
                  </motion.div>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur text-white text-xs font-medium rounded">
                  {trailer.duration}
                </div>
              </div>

              <div className="p-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gta-orange font-bold mb-1.5">
                  {trailer.subtitle}
                </p>
                <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-gta-orange transition-colors">
                  {trailer.title}
                </h3>
                <p className="mt-1.5 text-xs text-gta-muted">{trailer.views} · {trailer.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeTrailer && (
          <TrailerModal trailer={activeTrailer} onClose={() => setActiveTrailer(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
