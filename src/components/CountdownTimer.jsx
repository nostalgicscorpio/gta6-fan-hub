import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative group">
        <div className="glass-card-static rounded-xl px-3 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5 animate-border-glow">
          <motion.span
            key={value}
            initial={changed ? { rotateX: -30, opacity: 0.5, scale: 0.95 } : false}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-display font-black text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-gta-orange text-glow tabular-nums inline-block"
            style={{ perspective: '300px' }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
        {/* Reflection glow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-3 bg-gta-orange/15 blur-lg rounded-full" />
      </div>
      <span className="mt-3 text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase text-gta-muted">
        {label}
      </span>
    </motion.div>
  );
}

function Separator() {
  return (
    <div className="flex items-center text-gta-orange/30 font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl animate-glow-pulse select-none px-1">
      :
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);
  const prevTimeRef = useRef(time);

  useEffect(() => {
    const tick = () => {
      setTime((prev) => {
        prevTimeRef.current = prev;
        return getTimeLeft();
      });
    };

    // Sync to the next whole second boundary for precision
    const msUntilNextSecond = 1000 - (Date.now() % 1000);
    const syncTimeout = setTimeout(() => {
      tick();
      // After syncing, run at exact 1-second intervals
      intervalRef.current = setInterval(tick, 1000);
    }, msUntilNextSecond);

    const intervalRef = { current: null };

    return () => {
      clearTimeout(syncTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const prev = prevTimeRef.current;

  return (
    <section id="countdown" className="relative py-16 sm:py-24 lg:py-32">
      <div className="section-divider" />

      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gta-orange/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] sm:text-xs tracking-[0.5em] uppercase text-gta-orange font-medium mb-3">
            {time.launched ? '🎮 The wait is over' : 'Countdown to launch'}
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            {time.launched ? (
              <span className="text-gta-orange text-glow animate-glow-pulse">
                GTA VI IS NOW AVAILABLE
              </span>
            ) : (
              <>NOVEMBER 16, <span className="text-gta-orange text-glow">2026</span></>
            )}
          </h2>
          {time.launched && (
            <p className="text-gta-muted mb-8">Grand Theft Auto VI has launched. Welcome to Leonida.</p>
          )}
        </motion.div>

        {!time.launched && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center gap-1 sm:gap-2 md:gap-4 mt-8 sm:mt-12"
          >
            <CountdownUnit value={time.days} label="Days" prevValue={prev.days} />
            <Separator />
            <CountdownUnit value={time.hours} label="Hours" prevValue={prev.hours} />
            <Separator />
            <CountdownUnit value={time.minutes} label="Min" prevValue={prev.minutes} />
            <Separator />
            <CountdownUnit value={time.seconds} label="Sec" prevValue={prev.seconds} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 sm:mt-14 flex flex-col items-center gap-4"
        >
          <div className="flex gap-3">
            <span className="px-4 py-2 rounded-lg glass-card-static text-xs tracking-wider uppercase text-gta-muted font-medium">PlayStation 5</span>
            <span className="px-4 py-2 rounded-lg glass-card-static text-xs tracking-wider uppercase text-gta-muted font-medium">Xbox Series X|S</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
