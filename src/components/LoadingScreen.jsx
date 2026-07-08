import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Total duration around 2.5 seconds (2500ms)
    // 2500ms / 20 steps = 125ms per step
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Randomize the progress slightly to look authentic
        const next = prev + Math.random() * 10 + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400); // Small delay at 100% before firing onComplete
          return 100;
        }
        return next;
      });
    }, 125);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: 'brightness(0)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF5FAF]/10 via-[#0B0B0D]/80 to-[#030303]" />
      
      {/* Ambient Neon Pulses */}
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5FAF]/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1.2, 1, 1.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#FF8A2A]/10 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Large "VI" Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-12"
        >
          <motion.h1 
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255,95,175,0.3), 0 0 40px rgba(255,95,175,0.1)",
                "0 0 30px rgba(255,95,175,0.6), 0 0 60px rgba(255,95,175,0.2)",
                "0 0 20px rgba(255,95,175,0.3), 0 0 40px rgba(255,95,175,0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="font-display font-black text-8xl sm:text-9xl md:text-[150px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/70"
          >
            VI
          </motion.h1>
          
          {/* Glitch Overlay */}
          <motion.h1
            animate={{ 
              opacity: [0, 1, 0, 0, 1, 0],
              x: [-2, 2, -1, 0, 2, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
            className="absolute top-0 left-0 font-display font-black text-8xl sm:text-9xl md:text-[150px] leading-none text-[#FF5FAF] mix-blend-screen opacity-50"
            style={{ textShadow: '2px 0 10px #FF5FAF' }}
          >
            VI
          </motion.h1>
          <motion.h1
            animate={{ 
              opacity: [0, 0, 1, 0, 0, 1],
              x: [2, -2, 1, 0, -2, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: 'mirror' }}
            className="absolute top-0 left-0 font-display font-black text-8xl sm:text-9xl md:text-[150px] leading-none text-[#00F0FF] mix-blend-screen opacity-50"
            style={{ textShadow: '-2px 0 10px #00F0FF' }}
          >
            VI
          </motion.h1>
        </motion.div>

        {/* Loading Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center w-64 sm:w-80"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold text-white mb-4 animate-pulse">
            Entering Vice City
          </p>

          {/* Progress Bar Container */}
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(255,255,255,0.05)]">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF5FAF] via-[#FF8A2A] to-[#FF5FAF] rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              layout
            />
            {/* Glow on the head of the progress bar */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-sm opacity-50"
              style={{ left: `calc(${Math.min(progress, 100)}% - 8px)` }}
              layout
            />
          </div>

          <p className="mt-3 text-[10px] tracking-widest text-white/50 font-mono">
            {Math.round(progress)}%
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
