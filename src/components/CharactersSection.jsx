import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiBadgeCheck } from 'react-icons/hi';
import { revealVariants, staggerContainer } from '../utils/animations';
import AssetImage from './AssetImage';

import { characters } from '../data/characters';

export default function CharactersSection() {
  const navigate = useNavigate();

  const handleCharacterClick = (character) => {
    navigate(`/characters/${character.slug}`);
  };

  return (
    <section id="characters" className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-[#0B0B0D]">
      <div className="section-divider" />

      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-start justify-start mb-12 sm:mb-16"
        >
          <motion.div variants={revealVariants} className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="text-[11px] sm:text-[12px] tracking-[0.4em] uppercase text-[#FF4FA2] font-bold mb-3">
              Meet the Cast
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] tracking-wide uppercase mb-6">
              FEATURED CHARACTERS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF4FA2] to-transparent opacity-80 mb-6" />
            <p className="text-[#8D8D97] text-sm sm:text-base tracking-wide max-w-2xl mx-auto sm:mx-0">
              Confirmed GTA 6 characters spanning crime, music, and business roles in the expanded state of Leonida.
            </p>
          </motion.div>
        </motion.div>

        {/* Vertical Portrait Cinematic Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {characters.map((char, i) => (
            <motion.div
              key={char.id}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -6 }}
              onClick={() => handleCharacterClick(char)}
              className="group bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:border-[rgba(255,138,42,0.25)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
            >
              {/* Image Side (Top - Portrait) */}
              <div className="relative aspect-[3/4] overflow-hidden shrink-0 bg-[#131316]">
                <AssetImage
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C22] via-[#1B1C22]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Badge inside image */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 text-[9px] tracking-widest uppercase font-bold text-[#00E5FF] bg-[rgba(0,229,255,0.1)] backdrop-blur-md border border-[rgba(0,229,255,0.2)] px-2.5 py-1 rounded-sm">
                    <HiBadgeCheck className="w-3.5 h-3.5" /> Confirmed
                  </span>
                </div>
              </div>

              {/* Info Side (Bottom) */}
              <div className="p-6 flex flex-col justify-end grow -mt-16 relative z-20">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FFFFFF] group-hover:text-[#FF8A2A] transition-colors duration-300 leading-tight drop-shadow-md">
                  {char.name}
                </h3>
                <p className="text-xs tracking-widest uppercase font-bold text-[#8D8D97] mt-2 mb-4">
                  {char.role}
                </p>
                <p className="text-sm text-[#9A9AA3] line-clamp-3 leading-relaxed">
                  {char.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
