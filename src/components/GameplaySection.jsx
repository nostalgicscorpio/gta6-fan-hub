import { motion } from 'framer-motion';
import { HiPlay, HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { revealVariants, staggerContainer } from '../utils/animations';
import AssetImage from './AssetImage';
import { gameplayClips } from '../data/gameplay';

export default function GameplaySection() {
  const navigate = useNavigate();
  // Take only top 3 featured clips for the home page
  const featuredClips = gameplayClips.slice(0, 3);
  return (
    <section id="gameplay" className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-[#0B0B0D]">
      <div className="section-divider" />
      <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,79,162,0.03)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />

      <div className="page-container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-center justify-center text-center mb-16 sm:mb-24"
        >
          <motion.div variants={revealVariants} className="flex flex-col items-center">
            <p className="text-[11px] sm:text-[12px] tracking-[0.4em] uppercase text-[#FF4FA2] font-bold mb-3">
              In Action
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] tracking-wide uppercase text-center mb-6">
              GAMEPLAY
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF4FA2] to-transparent opacity-80" />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuredClips.map((clip, i) => (
            <motion.div
              key={clip.id}
              onClick={() => navigate('/gameplay')}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -6 }}
              className="group bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:border-[rgba(255,79,162,0.25)] transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden shrink-0">
                {clip.thumbnail ? (
                  <AssetImage
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full bg-[#131316]" />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C22] via-transparent to-transparent opacity-80" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#FF4FA2] group-hover:border-[#FF4FA2] transition-colors duration-300"
                  >
                    <HiPlay className="w-8 h-8 text-[#FFFFFF] group-hover:text-[#131316] transition-colors duration-300 ml-1" />
                  </motion.div>
                </div>
              </div>
              <div className="p-6 sm:p-8 bg-[#1B1C22] flex flex-col grow justify-center">
                <h3 className="text-[#FFFFFF] font-display font-bold text-lg sm:text-xl tracking-wide group-hover:text-[#FF4FA2] transition-colors">
                  {clip.title}
                </h3>
                <p className="text-[#8D8D97] text-sm mt-3 tracking-wide leading-relaxed">
                  {clip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => navigate('/gameplay')}
            className="group relative px-8 py-4 bg-transparent border border-[#FF4FA2] text-[#FF4FA2] hover:bg-[#FF4FA2] hover:text-[#131316] font-display font-bold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <HiPlay className="w-5 h-5" />
            Enter Gameplay Vault
            <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
