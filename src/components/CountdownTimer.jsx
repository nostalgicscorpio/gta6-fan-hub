import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { trackButtonClick } from '../utils/analytics';

// November 16, 2026 at midnight UTC
const RELEASE_DATE = new Date('2026-11-16T00:00:00Z').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = RELEASE_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, launched: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    launched: false,
  };
}

function CountdownUnit({ value, label, prevValue }) {
  const changed = value !== prevValue;

  return (
    <motion.div
      className="flex flex-col items-center flex-1"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative group w-full max-w-[120px] sm:max-w-[160px] lg:max-w-[200px]">
        <div className="bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-xl px-2 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10 shadow-[0_8px_32px_rgba(0,0,0,0.45)] w-full flex justify-center items-center backdrop-blur-sm relative overflow-hidden">
          {/* Subtle top glare */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8A2A]/20 to-transparent" />
          
          <motion.span
            key={value}
            initial={changed ? { rotateX: -30, opacity: 0.5, scale: 0.95 } : false}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFFFF] tabular-nums inline-block drop-shadow-md"
            style={{ perspective: '300px' }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span className="mt-4 sm:mt-6 text-[10px] sm:text-xs lg:text-base font-bold tracking-[0.25em] uppercase text-[#8D8D97] w-full text-center">
        {label}
      </span>
    </motion.div>
  );
}

function Separator() {
  return (
    <div className="flex items-center text-[#C9C9CF]/20 font-display text-4xl sm:text-6xl lg:text-8xl pb-8 sm:pb-12 select-none px-1 sm:px-4">
      :
    </div>
  );
}

const CountdownTimer = ({ integrated = false }) => {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(getTimeLeft);
  const prevTimeRef = useRef(time);

  useEffect(() => {
    const tick = () => {
      setTime((prev) => {
        prevTimeRef.current = prev;
        return getTimeLeft();
      });
    };

    const msUntilNextSecond = 1000 - (Date.now() % 1000);
    const syncTimeout = setTimeout(() => {
      tick();
      intervalRef.current = setInterval(tick, 1000);
    }, msUntilNextSecond);

    const intervalRef = { current: null };

    return () => {
      clearTimeout(syncTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const prev = prevTimeRef.current;

  const handleShare = useCallback(() => {
    trackButtonClick('Share Countdown');
    const shareUrl = import.meta.env.VITE_SITE_URL ? import.meta.env.VITE_SITE_URL.replace(/^https?:\/\//, '') : 'localhost:5173';
    const text = time.launched
      ? `🎮 GTA VI is NOW AVAILABLE! ${shareUrl}`
      : `🎮 Only ${time.days} days until GTA VI launches on November 16, 2026! ${shareUrl}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Clipboard API not available — silently fail
    });
  }, [time.days, time.launched]);

  return (
    <section id={integrated ? undefined : "countdown"} className={`relative w-full overflow-hidden ${integrated ? 'py-4' : 'bg-[#131316] py-16 sm:py-24 lg:py-32 border-t border-[rgba(255,255,255,0.03)] border-b shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20'}`}>
      {/* Background Lighting */}
      {!integrated && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full max-h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,42,0.02)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />}

      <div className={`page-container relative z-10 w-full mx-auto px-4 sm:px-6 ${integrated ? '' : 'max-w-6xl'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-widest text-[#FFFFFF] uppercase drop-shadow-md">
            {time.launched ? (
              <span className="text-[#FF8A2A]">GTA VI IS NOW AVAILABLE</span>
            ) : (
              'GTA VI Release Countdown'
            )}
          </h2>
          {time.launched && (
            <p className="text-[#8D8D97] mt-4 text-sm sm:text-base">Grand Theft Auto VI has launched. Welcome to Leonida.</p>
          )}
        </motion.div>

        {!time.launched && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`flex justify-center items-center gap-1 sm:gap-2 lg:gap-4 w-full mx-auto ${integrated ? 'max-w-4xl' : 'max-w-5xl'}`}
          >
            <CountdownUnit value={time.days} label="Days" prevValue={prev.days} />
            <Separator />
            <CountdownUnit value={time.hours} label="Hours" prevValue={prev.hours} />
            <Separator />
            <CountdownUnit value={time.minutes} label="Minutes" prevValue={prev.minutes} />
            <Separator />
            <CountdownUnit value={time.seconds} label="Seconds" prevValue={prev.seconds} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-6"
        >
          <button
            onClick={handleShare}
            className={`px-6 py-3 rounded-sm border border-[rgba(255,255,255,0.08)] backdrop-blur-md text-sm tracking-widest uppercase text-[#FFFFFF] font-bold transition-all duration-300 cursor-pointer flex items-center gap-3 group ${integrated ? 'bg-white/5 hover:bg-white/10' : 'bg-[#1B1C22]/80 hover:bg-[#1B1C22] hover:border-[#FF8A2A]/50'}`}
          >
            <svg className="w-4 h-4 text-[#8D8D97] group-hover:text-[#FF8A2A] transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {copied ? 'Copied!' : 'Share Countdown'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(CountdownTimer);
