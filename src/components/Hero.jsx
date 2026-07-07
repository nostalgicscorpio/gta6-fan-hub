import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { trackButtonClick } from '../utils/analytics';
import { ASSETS } from '../config/assets';
import AssetImage from './AssetImage';
import CountdownTimer from './CountdownTimer';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0D]"
    >
      {/* Full Screen Cinematic Background */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: bgY }}
      >
        <AssetImage
          src={ASSETS.TRAILERS.HERO_BG}
          alt="Vice City Skyline"
          className="w-full h-full object-cover opacity-80 animate-ken-burns scale-105"
          loading="eager"
        />
        {/* Dark Rockstar Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/60 via-[#0B0B0D]/30 to-[#0B0B0D]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent h-48 bottom-0" />
      </motion.div>

      {/* Main Content Centered */}
      <div className="page-container relative z-10 flex flex-col items-center justify-center text-center pt-32 pb-16 min-h-screen w-full">
        
        <motion.div
          className="flex flex-col items-center z-20 space-y-8 w-full"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Logo / Main Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display font-black leading-none select-none flex flex-col items-center">
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFFFFF] tracking-tighter drop-shadow-2xl">
                GRAND
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.2em] text-[#FFFFFF] mt-1 drop-shadow-2xl">
                THEFT AUTO
              </span>
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-4 mt-2">
                <span className="block text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-black bg-gradient-to-r from-[#FF8A2A] to-[#FF5FAF] bg-clip-text text-transparent leading-[0.8] drop-shadow-lg animate-glow-pulse">
                  VI
                </span>
                <span className="text-base sm:text-lg md:text-xl tracking-[0.4em] uppercase text-white/80 font-bold pb-2 drop-shadow-md">
                  Coming 2026
                </span>
              </div>
            </h1>
          </motion.div>

          {/* Integrated Countdown (Scaling down a bit so it fits perfectly) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mx-auto scale-90 sm:scale-100"
          >
            <CountdownTimer integrated={true} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-8"
          >
            <a
              href="#trailers"
              onClick={handleWatchTrailers}
              className="w-full sm:w-auto px-10 py-5 btn-primary flex justify-center items-center gap-3 group text-lg rounded-full"
            >
              <svg className="w-6 h-6 fill-current transition-transform group-hover:scale-110" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Watch Trailer
            </a>
            
            <a
              href="#news"
              className="w-full sm:w-auto px-10 py-5 glass-card text-[#FFFFFF] font-bold tracking-widest uppercase rounded-full transition-all duration-300 hover:text-white flex justify-center items-center gap-2 group text-lg"
            >
              Explore Hub
              <span className="text-[#FF8A2A] transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
