import { motion } from 'framer-motion';
import { HiLocationMarker } from 'react-icons/hi';
import { revealVariants, staggerContainer } from '../utils/animations';

const locations = [
  { name: 'Vice City Downtown', x: '52%', y: '38%', desc: 'The beating heart of Leonida — skyscrapers, nightclubs, and high-stakes heists.' },
  { name: 'Ocean Beach', x: '68%', y: '55%', desc: 'Sun-drenched coastline with luxury resorts and shady dealings.' },
  { name: 'Port Gellhorn', x: '30%', y: '60%', desc: 'Industrial docks and smuggling routes along the southern coast.' },
  { name: 'Grassrivers', x: '22%', y: '35%', desc: 'Swamplands and backwater towns on the western frontier.' },
  { name: 'Kelly County', x: '75%', y: '25%', desc: 'Suburban sprawl and gated communities hiding dark secrets.' },
];

export default function MapSection() {
  return (
    <section id="map" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gta-orange/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12 sm:mb-16"
        >
          <motion.p variants={revealVariants} className="text-xs tracking-[0.4em] uppercase text-gta-orange font-medium mb-2">
            Explore Leonida
          </motion.p>
          <motion.h2 variants={revealVariants} className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            THE <span className="text-gta-orange">MAP</span>
          </motion.h2>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-2xl overflow-hidden"
        >
          {/* Map background */}
          {/* Map background */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            {/* Actual map image */}
            <img
              src="/images/leonida-map.png"
              alt="Map of Leonida — Vice City and surrounding regions"
              className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-105"
              loading="lazy"
            />
            {/* Overlay for depth & contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-gta-card/80 via-transparent to-gta-card/40" />
            <div className="absolute inset-0 bg-gta-black/20" />

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
                {/* Ping animation */}
                <div className="absolute inset-0 w-6 h-6 -ml-1 -mt-1 rounded-full bg-gta-orange/30 animate-ping-slow" />
                <div className="relative z-10 w-4 h-4 rounded-full bg-gta-orange border-2 border-gta-black shadow-[0_0_10px_rgba(255,106,0,0.6)] cursor-pointer hover:shadow-[0_0_20px_rgba(255,106,0,0.8)] hover:scale-125 transition-all duration-300" />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 glass-card rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-20">
                  <div className="flex items-center gap-1.5 mb-1">
                    <HiLocationMarker className="w-3 h-3 text-gta-orange shrink-0" />
                    <p className="text-xs font-display font-bold text-gta-orange truncate">{loc.name}</p>
                  </div>
                  <p className="text-[10px] text-gta-muted leading-relaxed">{loc.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 glass-card rounded-lg px-4 py-2.5">
              <div className="flex items-center gap-2 text-[10px] text-gta-muted">
                <div className="w-2 h-2 rounded-full bg-gta-orange" />
                <span className="tracking-wider uppercase">Key Location</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location cards below the map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6"
        >
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card rounded-lg p-3 text-center cursor-pointer hover:border-gta-orange/40 transition-colors"
            >
              <HiLocationMarker className="w-4 h-4 text-gta-orange mx-auto mb-1" />
              <p className="text-xs font-display font-bold text-white truncate">{loc.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
