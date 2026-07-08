import { useRef, useMemo } from 'react';
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
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const particlesY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const handleWatchTrailers = () => {
    trackButtonClick('Watch Trailers (Hero)');
  };

  // Generate some subtle particles
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0D]"
    >
      {/* Full Screen Cinematic Background */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: bgY, scale: bgScale }}
      >
        <AssetImage
          src={ASSETS.TRAILERS.HERO_BG}
          alt="Vice City Skyline"
          className="w-full h-full object-cover animate-ken-burns scale-110"
          loading="eager"
        />
        
        {/* Vice City sunset gradient glow & neon pink/orange atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0B0D] via-[#FF5FAF]/10 to-[#FF8A2A]/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,138,42,0.15)_0%,rgba(11,11,13,0.8)_80%)]" />
        
        {/* Dark Rockstar Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/80 via-[#0B0B0D]/40 to-[#0B0B0D]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent h-64 bottom-0" />
      </motion.div>

      {/* Moving Particles/Light effects */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: particlesY }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#FF8A2A] mix-blend-screen blur-[1px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Cinematic Character Layers */}
      {/* Left Character: Lucia */}
      <motion.div
        className="absolute bottom-0 lg:-bottom-[5%] left-[-20%] sm:left-[-10%] lg:left-[2%] 2xl:left-[8%] z-[5] pointer-events-none h-[65vh] lg:h-[95vh] w-full max-w-[400px] lg:max-w-[700px] flex items-end justify-center opacity-40 lg:opacity-100 mix-blend-screen lg:mix-blend-normal"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '25%']) }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full">
          {/* Neon rim lighting glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#FF5FAF]/40 to-transparent blur-[80px] rounded-full scale-75 lg:scale-90 -translate-y-[10%]" />
          <img 
            src="/images/characters/lucia-hero.png" 
            alt=""
            loading="lazy"
            className="relative w-full h-full object-contain object-bottom drop-shadow-[0_0_40px_rgba(255,95,175,0.3)] transition-opacity duration-1000"
            onError={(e) => {
              e.target.style.opacity = '0';
            }}
          />
        </div>
      </motion.div>

      {/* Right Character: Jason */}
      <motion.div
        className="absolute bottom-0 lg:-bottom-[5%] right-[-20%] sm:right-[-10%] lg:right-[2%] 2xl:right-[8%] z-[5] pointer-events-none h-[65vh] lg:h-[95vh] w-full max-w-[400px] lg:max-w-[700px] flex items-end justify-center opacity-40 lg:opacity-100 mix-blend-screen lg:mix-blend-normal"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '18%']) }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="relative w-full h-full">
          {/* Neon rim lighting glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#FF8A2A]/40 to-transparent blur-[80px] rounded-full scale-75 lg:scale-90 -translate-y-[10%]" />
          <img 
            src="/images/characters/jason-hero.png" 
            alt=""
            loading="lazy"
            className="relative w-full h-full object-contain object-bottom drop-shadow-[0_0_40px_rgba(255,138,42,0.3)] transition-opacity duration-1000"
            onError={(e) => {
              e.target.style.opacity = '0';
            }}
          />
        </div>
      </motion.div>

      {/* Main Content Centered with Glassmorphism overlay for the content block */}
      <div className="page-container relative z-10 flex flex-col items-center justify-center text-center pt-32 pb-16 min-h-screen w-full">
        
        <motion.div
          className="flex flex-col items-center z-20 space-y-6 w-full max-w-5xl mx-auto p-4 sm:p-8"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Welcome Text Reveal */}
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#FF5FAF] font-bold tracking-[0.5em] uppercase text-xs sm:text-sm md:text-base mb-2 sm:mb-4 block drop-shadow-[0_0_10px_rgba(255,95,175,0.5)]">
              Welcome to Vice City
            </span>
          </motion.div>

          {/* Logo / Main Title Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display font-black leading-none select-none flex flex-col items-center">
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-[#FFFFFF] tracking-tighter drop-shadow-2xl">
                GRAND
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-[0.2em] text-[#FFFFFF] mt-1 drop-shadow-2xl">
                THEFT AUTO
              </span>
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-6 mt-2 sm:mt-4">
                <span className="block text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[15rem] font-black bg-gradient-to-r from-[#FF8A2A] via-[#FF5FAF] to-[#9D4EDD] bg-clip-text text-transparent leading-[0.8] drop-shadow-[0_0_30px_rgba(255,138,42,0.3)] animate-glow-pulse">
                  VI
                </span>
              </div>
            </h1>
          </motion.div>

          {/* Cinematic Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#9A9AA3] max-w-2xl text-base sm:text-lg md:text-xl xl:text-2xl mt-4 sm:mt-6 mb-6 sm:mb-8 font-light"
          >
            Experience the next evolution of open-world entertainment. Return to the neon-soaked streets of Leonida in the biggest, most immersive Grand Theft Auto yet.
          </motion.p>

          {/* Integrated Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mx-auto backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A2A]/5 to-[#FF5FAF]/5 opacity-50 pointer-events-none" />
            <CountdownTimer integrated={true} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto mt-8 sm:mt-12 relative z-10"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#trailers"
              onClick={handleWatchTrailers}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#FF8A2A] to-[#FF5FAF] text-white flex justify-center items-center gap-3 group text-base sm:text-lg rounded-full shadow-[0_0_20px_rgba(255,138,42,0.4)] hover:shadow-[0_0_30px_rgba(255,95,175,0.6)] transition-shadow duration-300 font-bold uppercase tracking-widest"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Watch Trailer
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#news"
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white/5 backdrop-blur-lg border border-white/10 text-[#FFFFFF] font-bold tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 flex justify-center items-center gap-2 group text-base sm:text-lg shadow-xl"
            >
              Explore World
              <span className="text-[#FF8A2A] transition-transform group-hover:translate-x-2">→</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
