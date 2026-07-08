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

  const mainCharacters = characters.filter(c => c.role === 'Protagonist');
  const otherCharacters = characters.filter(c => c.role !== 'Protagonist');

  return (
    <section id="characters" className="relative py-16 sm:py-20 md:py-28 bg-[#0B0B0D]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] via-[#FF5FAF]/5 to-[#0B0B0D] pointer-events-none" />
      <div className="section-divider" />

      <div className="page-container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-center sm:items-start mb-16"
        >
          <motion.div variants={revealVariants} className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#FF5FAF] font-bold mb-3">
              Meet the Cast
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white tracking-wide uppercase mb-6 drop-shadow-lg">
              FEATURED CHARACTERS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF5FAF] to-[#FF8A2A] opacity-80 mb-6" />
            <p className="text-[#9A9AA3] text-base sm:text-lg tracking-wide max-w-2xl mx-auto sm:mx-0 font-light leading-relaxed">
              Explore the confirmed GTA VI cast, spanning organized crime, underground networks, and the authorities across the expanded state of Leonida.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Characters (Protagonists) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16"
        >
          {mainCharacters.map((char, i) => (
            <motion.div
              key={char.id}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -8 }}
              onClick={() => handleCharacterClick(char)}
              className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#FF5FAF]/40 hover:shadow-[0_0_40px_rgba(255,95,175,0.15)] transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-[600px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/40 to-transparent z-10" />
              <AssetImage
                src={char.image}
                alt={char.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-6 right-6 z-20">
                <span className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold text-white bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                  <HiBadgeCheck className="w-4 h-4 text-[#FF5FAF]" /> {char.role}
                </span>
              </div>

              <div className="relative z-20 p-8 sm:p-10 flex flex-col justify-end h-full">
                <h3 className="font-display font-black text-5xl sm:text-6xl text-white group-hover:text-[#FF5FAF] transition-colors duration-300 leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] uppercase">
                  {char.name}
                </h3>
                <p className="text-sm sm:text-base text-[#9A9AA3] mt-4 line-clamp-2 leading-relaxed max-w-md font-light">
                  {char.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#FF5FAF] text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  View Dossier <span className="text-xl leading-none">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Characters Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {otherCharacters.map((char, i) => (
            <motion.div
              key={char.id}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -6 }}
              onClick={() => handleCharacterClick(char)}
              className="group bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-[#FF8A2A]/30 hover:shadow-[0_0_30px_rgba(255,138,42,0.1)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden shrink-0">
                <AssetImage
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 text-[9px] tracking-widest uppercase font-bold text-white bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full">
                    {char.role}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-end grow -mt-12 relative z-20 bg-gradient-to-t from-[#0B0B0D] to-transparent">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-[#FF8A2A] transition-colors duration-300 leading-tight drop-shadow-md uppercase">
                  {char.name}
                </h3>
                <p className="text-xs text-[#9A9AA3] mt-3 line-clamp-2 leading-relaxed font-light">
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
