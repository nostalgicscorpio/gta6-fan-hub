import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="loading-screen"
        >
          {/* Background effects */}
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gta-orange/5 rounded-full blur-[150px]" />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <h1 className="font-display font-black text-4xl sm:text-5xl tracking-wider mb-2">
              <span className="text-gta-orange text-glow">GTA</span>
              <span className="text-white ml-2">VI</span>
            </h1>
            <p className="text-[10px] tracking-[0.5em] uppercase text-gta-muted/60 mb-8">
              Fan Hub
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 w-48">
            <div className="loading-bar-track">
              <motion.div
                className="h-full bg-gradient-to-r from-gta-orange to-gta-gold rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-center mt-3 text-[10px] tracking-[0.3em] uppercase text-gta-muted/40 font-display">
              Loading
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
