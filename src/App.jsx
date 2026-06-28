import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CountdownTimer from './components/CountdownTimer';
import NewsSection from './components/NewsSection';
import TrailersSection from './components/TrailersSection';
import ScreenshotsSection from './components/ScreenshotsSection';
import CharactersSection from './components/CharactersSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18 + 6;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] bg-[#030303] flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gta-orange/[0.04] rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 text-center"
      >
        <h1 className="font-display font-black text-3xl sm:text-4xl tracking-wider mb-1">
          <span className="text-gta-orange text-glow">GTA</span>
          <span className="text-white ml-2">VI</span>
        </h1>
        <p className="text-[9px] tracking-[0.6em] uppercase text-gta-muted/50 mb-8 font-display">
          Fan Hub
        </p>
      </motion.div>

      <div className="relative z-10 w-44">
        <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gta-orange to-gta-gold rounded-full"
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.15, ease: 'linear' }}
          />
        </div>
        <p className="text-center mt-3 text-[9px] tracking-[0.4em] uppercase text-gta-muted/30 font-display">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>
    </motion.div>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gta-orange/90 text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,106,0,0.4)] hover:bg-gta-orange hover:shadow-[0_0_35px_rgba(255,106,0,0.6)] transition-all duration-300 cursor-pointer backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative bg-gta-black min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!loaded && <LoadingScreen key="loader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <CountdownTimer />
            <NewsSection />
            <TrailersSection />
            <ScreenshotsSection />
            <CharactersSection />
            <MapSection />
          </main>
          <Footer />
          <ScrollToTopButton />
          <AnalyticsDashboard />
        </motion.div>
      )}
    </div>
  );
}

export default App;
