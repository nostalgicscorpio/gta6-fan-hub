import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { trackButtonClick } from '../utils/analytics';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 0.9]);

  const handleWatchTrailers = () => {
    trackButtonClick('Watch Trailers (Hero)');
  };

  const handleCountdown = () => {
    trackButtonClick('Countdown (Hero)');
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax + Ken Burns */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src="/images/hero-bg.png"
            alt="Vice City skyline at sunset"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        {/* Overlays on top of image */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-gta-black/70 via-gta-black/40 to-gta-black" style={{ opacity: overlayOpacity }} />
        <div className="absolute inset-0 bg-gradient-to-r from-gta-black/60 via-transparent to-gta-black/60" />
      </motion.div>

      {/* Animated orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gta-orange/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gta-pink/8 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-[2px] bg-gta-orange/[0.04]"
          style={{ animation: 'scanline 8s linear infinite' }}
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gta-orange/10 border border-gta-orange/20">
            <span className="w-2 h-2 rounded-full bg-gta-orange animate-glow-pulse" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-gta-orange font-medium">
              Unofficial Fan Hub
            </span>
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.6, type: 'spring', stiffness: 80 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="font-display font-black leading-none select-none">
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] text-white tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              GRAND
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.15em] text-white/90 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              THEFT AUTO
            </span>
            <span
              className="block text-7xl sm:text-[9rem] md:text-[11rem] lg:text-[14rem] font-black bg-gradient-to-b from-gta-orange via-gta-orange-light to-gta-gold bg-clip-text text-transparent animate-gradient leading-[0.85] mt-1"
              style={{
                filter: 'drop-shadow(0 0 60px rgba(255, 106, 0, 0.5)) drop-shadow(0 0 120px rgba(255, 106, 0, 0.2))',
              }}
            >
              VI
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          Explore the sun-soaked streets of <span className="text-gta-orange font-semibold">Leonida</span>.
          Your ultimate fan destination for news, trailers, and everything about the most anticipated game ever made.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#trailers"
            onClick={handleWatchTrailers}
            className="group relative px-8 py-4 bg-gta-orange text-black font-bold tracking-wider uppercase rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] hover:scale-105 btn-glow"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Watch Trailers
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gta-orange-light to-gta-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a
            href="#countdown"
            onClick={handleCountdown}
            className="px-8 py-4 border border-white/20 text-white font-bold tracking-wider uppercase rounded-lg hover:bg-white/10 hover:border-gta-orange/50 hover:text-gta-orange hover:shadow-[0_0_25px_rgba(255,106,0,0.2)] transition-all duration-300 backdrop-blur-sm"
          >
            Countdown
          </a>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">Available on</span>
          <div className="flex gap-3">
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] tracking-wider uppercase text-white/50 font-medium">PS5</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] tracking-wider uppercase text-white/50 font-medium">Xbox Series X|S</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/30">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 bg-gta-orange rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
