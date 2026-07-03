import { motion } from 'framer-motion';
import { HiLocationMarker, HiMap } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { revealVariants, staggerContainer } from '../utils/animations';

import { locations } from '../data/mapLocations';
import { ASSETS } from '../config/assets';
import AssetImage from './AssetImage';

export default function MapSection() {
  const navigate = useNavigate();
  return (
    <section id="map" className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden bg-[#0B0B0D]">
      <div className="section-divider" />
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,42,0.03)_0%,transparent_70%)] rounded-full blur-[120px] pointer-events-none" />

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
              Explore Leonida
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] tracking-wide uppercase text-center mb-6">
              INTERACTIVE MAP
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF8A2A] to-transparent opacity-80" />
          </motion.div>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] p-4 sm:p-6 lg:p-8"
        >
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-[#131316] border border-[rgba(255,255,255,0.03)]">
            <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
              <AssetImage
                src={ASSETS.LOCATIONS.LEONIDA_MAP}
                alt="Map of Leonida"
                className="w-full h-full object-contain opacity-70 transition-opacity duration-1000"
              />
            </div>
            {/* Overlay for depth & contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C22]/80 via-transparent to-[#1B1C22]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Location pins */}
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                className="absolute group"
                style={{ left: loc.x, top: loc.y, transform: 'translate(-50%, -50%)' }}
              >
                {/* Refined ping animation (softer) */}
                <div className="absolute inset-0 w-6 h-6 -ml-1 -mt-1 rounded-full bg-[#FF8A2A]/20 animate-ping-slow" />
                <div className="relative z-10 w-4 h-4 rounded-full bg-[#FF8A2A] border-2 border-[#131316] shadow-[0_4px_12px_rgba(255,138,42,0.4)] cursor-pointer group-hover:scale-125 transition-transform duration-300" />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 p-4 bg-[rgba(27,28,34,0.95)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 mb-2">
                    <HiLocationMarker className="w-4 h-4 text-[#FF8A2A] shrink-0" />
                    <p className="text-sm font-display font-bold text-[#FFFFFF] truncate tracking-wide">{loc.name}</p>
                  </div>
                  <p className="text-xs text-[#8D8D97] leading-relaxed line-clamp-3">{loc.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-6 right-6 bg-[rgba(27,28,34,0.9)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2.5 text-[10px] text-[#8D8D97] tracking-widest font-bold">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF8A2A] shadow-[0_0_8px_rgba(255,138,42,0.5)]" />
                <span className="uppercase text-[#FFFFFF]">Key Location</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location cards below the map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8"
        >
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/map?location=${loc.id}`)}
              className="bg-[#1B1C22] border border-[rgba(255,255,255,0.05)] rounded-xl p-4 text-center cursor-pointer hover:border-[rgba(255,138,42,0.3)] transition-all duration-300 flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#1f2027]"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/map?location=${loc.id}`)}
            >
              <HiLocationMarker className="w-5 h-5 text-[#8D8D97] group-hover:text-[#FF8A2A] transition-colors mb-2" />
              <p className="text-xs sm:text-sm font-display font-bold text-[#FFFFFF] truncate w-full tracking-wide">{loc.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enter Interactive Map Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => navigate('/map')}
            className="group relative px-8 py-4 bg-transparent border border-[#FF8A2A] text-[#FF8A2A] hover:bg-[#FF8A2A] hover:text-[#131316] font-display font-bold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <HiMap className="w-5 h-5" />
            Enter Full Interactive Map
          </button>
        </motion.div>
      </div>
    </section>
  );
}
