import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiPlay } from 'react-icons/hi';
import { trackTrailerClick, trackButtonClick } from '../utils/analytics';
import { revealVariants, staggerContainer } from '../utils/animations';
import AssetImage from './AssetImage';

import { trailers } from '../data/trailers';

export default function TrailersSection() {
  const navigate = useNavigate();

  const handleTrailerClick = (trailer) => {
    trackTrailerClick(trailer.title);
    trackButtonClick('Play Trailer');
    navigate(`/trailers/${trailer.slug}`);
  };

  return (
    <section id="trailers" className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-[#0B0B0D] overflow-hidden">
      <div className="section-divider" />

      {/* Subtle ambient lighting instead of massive glow */}
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,42,0.03)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />

      <div className="page-container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-center justify-center text-center mb-16 sm:mb-24"
        >
          <motion.div variants={revealVariants} className="flex flex-col items-center">
            <p className="text-[11px] sm:text-[12px] tracking-[0.4em] uppercase text-[#FF8A2A] font-bold mb-3">
              Watch Now
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] tracking-wide uppercase text-center mb-6">
              OFFICIAL TRAILERS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF8A2A] to-transparent opacity-80" />
          </motion.div>
        </motion.div>

        {/* Featured trailer — large */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          onClick={() => handleTrailerClick(trailers[0])}
          className="group relative bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden cursor-pointer mb-6 lg:mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:border-[rgba(255,138,42,0.25)] transition-all duration-300"
        >
          <div className="relative aspect-video">
            <AssetImage
              src={trailers[0].thumbnail}
              alt={trailers[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-90" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:bg-[#FF8A2A] group-hover:border-[#FF8A2A] transition-colors duration-300"
              >
                <HiPlay className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFFFFF] group-hover:text-[#131316] transition-colors duration-300 ml-1" />
              </motion.div>
            </div>

            {/* Badges */}
            <div className="absolute top-6 left-6 flex gap-3">
              <span className="px-4 py-2 bg-[#FF8A2A] text-[#131316] text-[10px] font-bold tracking-widest uppercase rounded-sm shadow-[0_4px_12px_rgba(255,138,42,0.3)]">
                FEATURED
              </span>
              <span className="px-4 py-2 bg-[rgba(10,10,12,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase rounded-sm">
                {trailers[0].duration}
              </span>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <p className="text-[12px] tracking-[0.4em] uppercase text-[#FF8A2A] font-bold mb-3">
                {trailers[0].subtitle}
              </p>
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#FFFFFF] drop-shadow-md">
                {trailers[0].title}
              </h3>
              <p className="mt-4 text-sm font-medium text-[#8D8D97] tracking-wide">
                {trailers[0].views} <span className="opacity-50 px-2">·</span> {trailers[0].date}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Remaining trailers — 2-col */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {trailers.slice(1).map((trailer, i) => (
            <motion.div
              key={trailer.id}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -6 }}
              onClick={() => handleTrailerClick(trailer)}
              className="group relative bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:border-[rgba(255,138,42,0.25)] transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden shrink-0">
                <AssetImage
                  src={trailer.thumbnail}
                  alt={trailer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C22] via-transparent to-transparent opacity-80" />

                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#FF8A2A] group-hover:border-[#FF8A2A] transition-colors duration-300"
                  >
                    <HiPlay className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFFFFF] group-hover:text-[#131316] transition-colors duration-300 ml-0.5" />
                  </motion.div>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[rgba(10,10,12,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] text-[#FFFFFF] text-[10px] tracking-widest font-bold rounded-sm">
                  {trailer.duration}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col grow justify-center bg-[#1B1C22]">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#FF8A2A] font-bold mb-3">
                  {trailer.subtitle}
                </p>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#FFFFFF] group-hover:text-[#FF8A2A] transition-colors duration-300">
                  {trailer.title}
                </h3>
                <p className="mt-3 text-xs font-medium text-[#8D8D97] tracking-wide">
                  {trailer.views} <span className="opacity-50 px-2">·</span> {trailer.date}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
