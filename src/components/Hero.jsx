import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { trackButtonClick } from '../utils/analytics';
import { ASSETS } from '../config/assets';
import AssetImage from './AssetImage';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const handleWatchTrailers = () => {
    trackButtonClick('Watch Trailers (Hero)');
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0B0B0D]"
    >
      {/* Background Lighting / Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,138,42,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/50 via-transparent to-[#131316] pointer-events-none z-0" />

      {/* Grid Layout Container */}
      <div className="page-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-32 pb-16 min-h-[95vh]">
        
        {/* Left Column: Content */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left z-20 space-y-6 sm:space-y-8"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Logo / Main Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start"
          >
            <h1 className="font-display font-black leading-none select-none flex flex-col items-center lg:items-start">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FFFFFF] tracking-tighter drop-shadow-md">
                GRAND
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.2em] text-[#FFFFFF] mt-1 drop-shadow-md">
                THEFT AUTO
              </span>
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mt-2">
                <span className="block text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-black bg-gradient-to-r from-[#FF8A2A] to-[#FF5FAF] bg-clip-text text-transparent leading-[0.8] drop-shadow-sm">
                  VI
                </span>
                <span className="text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase text-[#8D8D97] font-bold pb-2">
                  Coming 2026
                </span>
              </div>
            </h1>
          </motion.div>

          {/* Short Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm sm:text-base text-[#C9C9CF] max-w-lg leading-relaxed text-balance">
              The next chapter of the Grand Theft Auto series coming to PlayStation 5 and Xbox Series X|S.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
          >
            <a
              href="#trailers"
              onClick={handleWatchTrailers}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF8A2A] to-[#FF5FAF] text-[#FFFFFF] font-bold tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,138,42,0.25)] hover:-translate-y-0.5 flex justify-center items-center gap-3 group"
            >
              <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Watch Trailer
            </a>
            
            <a
              href="#preorder"
              className="w-full sm:w-auto px-8 py-4 bg-[#1B1C22]/80 backdrop-blur-md border border-[rgba(255,255,255,0.08)] text-[#FFFFFF] font-bold tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-[#1B1C22] hover:border-[rgba(255,138,42,0.5)] flex justify-center items-center gap-2 group"
            >
              Pre-Order Now
              <span className="text-[#FF8A2A] transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Cinematic Artwork */}
        <motion.div
          className="relative z-0 h-[40vh] lg:h-[80vh] w-full mt-12 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:w-[55vw] lg:h-full pointer-events-none overflow-hidden"
          style={{ y: bgY }}
        >
          {/* Gradient mask to blend the image seamlessly into the #0B0B0D background on the left */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t lg:bg-gradient-to-r from-[#0B0B0D] via-transparent to-transparent opacity-100" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0B0B0D]/50 via-transparent to-[#131316] opacity-80" />
          
          <AssetImage
            src={ASSETS.TRAILERS.HERO_BG}
            alt="Leonida Skyline"
            className="w-full h-full object-cover object-[70%_top] opacity-90 scale-105"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
