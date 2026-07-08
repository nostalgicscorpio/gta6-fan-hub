import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiBadgeCheck } from 'react-icons/hi';
import { revealVariants, staggerContainer } from '../utils/animations';
import { characters } from '../data/characters';
import AssetImage from './AssetImage';

const StatBar = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80 mb-2">
      <span>{label}</span>
      <span className={color}>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className={`h-full rounded-full bg-gradient-to-r ${color === 'text-[#FF5FAF]' ? 'from-[#FF5FAF]/50 to-[#FF5FAF]' : 'from-[#FF8A2A]/50 to-[#FF8A2A]'}`}
      />
    </div>
  </div>
);

const CinematicCard = ({ character, isLeft }) => {
  const navigate = useNavigate();
  const isLucia = character.slug === 'lucia';
  
  const stats = isLucia ? [
    { label: 'Trust', value: 95 },
    { label: 'Driving', value: 85 },
    { label: 'Combat', value: 75 },
    { label: 'Intelligence', value: 90 },
  ] : [
    { label: 'Trust', value: 95 },
    { label: 'Driving', value: 70 },
    { label: 'Combat', value: 90 },
    { label: 'Intelligence', value: 80 },
  ];

  const themeColor = isLucia ? 'text-[#FF5FAF]' : 'text-[#FF8A2A]';
  const glowColor = isLucia ? 'bg-[#FF5FAF]' : 'bg-[#FF8A2A]';
  const hoverBorder = isLucia ? 'hover:border-[#FF5FAF]/50' : 'hover:border-[#FF8A2A]/50';
  const shadowGlow = isLucia ? 'hover:shadow-[0_0_50px_rgba(255,95,175,0.2)]' : 'hover:shadow-[0_0_50px_rgba(255,138,42,0.2)]';
  const imageSrc = `/images/characters/${character.slug}-hero.png`;

  return (
    <motion.div
      variants={revealVariants}
      whileHover="hover"
      className={`relative w-full max-w-xl mx-auto flex flex-col ${hoverBorder} ${shadowGlow} transition-all duration-500 bg-[#0B0B0D]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden group`}
    >
      {/* Background Ambient Glow */}
      <div className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} w-full h-full ${glowColor}/10 blur-[100px] transition-opacity duration-500 opacity-30 group-hover:opacity-100 pointer-events-none`} />

      {/* Image Container */}
      <div className="relative h-[350px] sm:h-[420px] w-full overflow-hidden flex items-end justify-center bg-gradient-to-b from-white/[0.02] to-transparent">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: isLucia ? 0 : 1 }}
          className="absolute inset-0 flex items-end justify-center"
        >
          <img 
            src={imageSrc}
            alt={character.name}
            loading="lazy"
            className={`h-[115%] w-auto object-contain object-bottom drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-105 ${!isLucia && 'transform -scale-x-100'}`}
            onError={(e) => {
              // Fallback to standard profile image if transparent PNG is missing
              e.target.src = character.image;
              e.target.className = "w-full h-full object-cover object-top opacity-50 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105";
            }}
          />
        </motion.div>
        {/* Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-wider group-hover:${themeColor} transition-colors duration-300 drop-shadow-md`}>
              {character.name}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-[9px] tracking-widest uppercase font-bold text-white/70 mt-2">
              <HiBadgeCheck className={`w-3.5 h-3.5 ${themeColor}`} /> {character.role}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#9A9AA3] font-light leading-relaxed mb-8 line-clamp-3">
          {character.description}
        </p>

        {/* Stats Grid */}
        <div className="mt-auto space-y-2 mb-8">
          {stats.map(stat => (
            <StatBar key={stat.label} label={stat.label} value={stat.value} color={themeColor} />
          ))}
        </div>

        <button 
          onClick={() => navigate(`/characters/${character.slug}`)}
          className={`w-full py-4 rounded-xl border border-white/10 bg-white/5 uppercase tracking-widest text-[10px] sm:text-xs font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] flex justify-center items-center gap-2`}
        >
          View Full Dossier <span className={`${themeColor} transition-transform group-hover:translate-x-1`}>→</span>
        </button>
      </div>
    </motion.div>
  );
};

export default function CharactersSection() {
  const navigate = useNavigate();
  const mainCharacters = characters.filter(c => c.role === 'Protagonist');
  const lucia = mainCharacters.find(c => c.slug === 'lucia');
  const jason = mainCharacters.find(c => c.slug === 'jason');
  
  const otherCharacters = characters.filter(c => c.role !== 'Protagonist');

  return (
    <section id="characters" className="relative py-16 sm:py-20 md:py-28 bg-[#0B0B0D] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#FF5FAF]/5 via-[#0B0B0D] to-[#0B0B0D] pointer-events-none opacity-50" />
      <div className="section-divider" />

      <div className="page-container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.div variants={revealVariants} className="flex flex-col items-center">
            <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#FF5FAF] font-bold mb-3">
              The Protagonists
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white tracking-wide uppercase mb-6 drop-shadow-lg">
              PARTNERS IN CRIME
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF5FAF] to-[#FF8A2A] opacity-80 mb-6" />
            <p className="text-[#9A9AA3] text-base sm:text-lg tracking-wide max-w-2xl font-light leading-relaxed">
              Navigate the neon-soaked underworld of Leonida with Lucia and Jason. A dynamic duo bound by trust and survival.
            </p>
          </motion.div>
        </motion.div>

        {/* Premium Cinematic Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-24 max-w-[1400px] mx-auto"
        >
          {lucia && <CinematicCard character={lucia} isLeft={true} />}
          {jason && <CinematicCard character={jason} isLeft={false} />}
        </motion.div>

        {/* Other Characters Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-center mb-12 text-center"
        >
          <motion.h3 variants={revealVariants} className="font-display font-bold text-xl sm:text-2xl text-white tracking-widest uppercase mb-4 opacity-80">
            Underworld Syndicate
          </motion.h3>
        </motion.div>

        {/* Other Characters Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {otherCharacters.map((char, i) => (
            <motion.div
              key={char.id}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/characters/${char.slug}`)}
              className="group bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden shrink-0">
                <AssetImage
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/40 to-transparent" />
                
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 text-[7px] sm:text-[8px] tracking-widest uppercase font-bold text-white/70 bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-full">
                    {char.role}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-end grow -mt-12 sm:-mt-16 relative z-20">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#FF5FAF] transition-colors duration-300 uppercase">
                  {char.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#9A9AA3] mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed hidden sm:block">
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
