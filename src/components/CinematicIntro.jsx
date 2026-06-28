import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * CinematicIntro — Rockstar-inspired intro sequence.
 * Plays once per browser session via sessionStorage.
 * Canvas-based particle system for 60fps performance.
 */

const INTRO_SESSION_KEY = 'gta6_intro_seen';
const INTRO_DURATION = 4200; // total intro length in ms

// ─── Canvas Particle System ───────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn particles
    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
      life: Math.random(),
      decay: Math.random() * 0.002 + 0.001,
    }));

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        // Respawn if dead or off-screen
        if (p.life <= 0 || p.y < -10 || p.x < -10 || p.x > w + 10) {
          p.x = Math.random() * w;
          p.y = h + 10;
          p.life = 1;
          p.alpha = Math.random() * 0.6 + 0.1;
        }

        const a = p.alpha * p.life;
        // Golden/amber particle color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 60, ${a})`;
        ctx.fill();

        // Subtle glow halo
        if (p.r > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 180, 40, ${a * 0.15})`;
          ctx.fill();
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ─── R★ Logo SVG (original design, not a copy) ───────────
function RStarLogo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="R-Star Logo"
    >
      <defs>
        {/* Golden radial glow */}
        <radialGradient id="introGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#ffb300" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        {/* Text gold gradient */}
        <linearGradient id="goldText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe88a" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#c9950c" />
        </linearGradient>
        {/* Star gold gradient */}
        <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe066" />
          <stop offset="100%" stopColor="#ffb300" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="introGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow circle */}
      <circle cx="100" cy="100" r="90" fill="url(#introGlow)" />

      {/* R letter — bold geometric style */}
      <g filter="url(#introGlowFilter)">
        <text
          x="72"
          y="138"
          fontFamily="'Orbitron', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="120"
          fill="url(#goldText)"
          letterSpacing="-5"
        >
          R
        </text>
      </g>

      {/* ★ Star — positioned at top-right of R */}
      <g filter="url(#introGlowFilter)" transform="translate(138, 58) scale(0.9)">
        <polygon
          points="15,0 19.6,10.1 30,11.8 22.5,19.5 24.3,30 15,25 5.7,30 7.5,19.5 0,11.8 10.4,10.1"
          fill="url(#starGold)"
        />
      </g>
    </svg>
  );
}

// ─── Main Intro Component ─────────────────────────────────
export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState('enter'); // enter → glow → exit
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    // Phase 1: Logo fades in (0 – 1200ms)
    // Phase 2: Glow pulse (1200 – 3000ms)
    // Phase 3: Fade out (3000 – 4200ms)

    const glowTimer = setTimeout(() => setPhase('glow'), 1200);
    const exitTimer = setTimeout(() => setPhase('exit'), 3000);
    const completeTimer = setTimeout(() => {
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
        onComplete();
      }
    }, INTRO_DURATION);

    return () => {
      clearTimeout(glowTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="cinematic-intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: 'easeInOut' }}
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center overflow-hidden"
      style={{ willChange: 'opacity' }}
    >
      {/* Particle system */}
      <ParticleCanvas />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] z-[2]" />

      {/* Center logo group */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          phase === 'exit'
            ? { opacity: 0, scale: 1.1, filter: 'blur(8px)' }
            : { opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        transition={
          phase === 'exit'
            ? { duration: 1.2, ease: 'easeInOut' }
            : { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
        }
        className="relative z-[3] flex flex-col items-center"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {/* Golden glow backdrop behind logo */}
        <motion.div
          animate={
            phase === 'glow'
              ? {
                  boxShadow: [
                    '0 0 40px rgba(255,215,0,0.0), 0 0 80px rgba(255,215,0,0.0)',
                    '0 0 60px rgba(255,215,0,0.3), 0 0 120px rgba(255,215,0,0.15)',
                    '0 0 40px rgba(255,215,0,0.0), 0 0 80px rgba(255,215,0,0.0)',
                  ],
                  scale: [1, 1.02, 1],
                }
              : {}
          }
          transition={
            phase === 'glow'
              ? { duration: 2.0, repeat: Infinity, ease: 'easeInOut' }
              : {}
          }
          className="rounded-full"
          style={{ willChange: 'box-shadow, transform' }}
        >
          <RStarLogo className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-[0_0_30px_rgba(255,215,0,0.4)]" />
        </motion.div>

        {/* Radial glow ring beneath */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            phase === 'glow' || phase === 'exit'
              ? { opacity: [0, 0.6, 0], scale: [0.8, 1.3, 0.8] }
              : { opacity: 0 }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
            willChange: 'opacity, transform',
          }}
        />
      </motion.div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={phase !== 'exit' ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ duration: 1.0, delay: phase === 'enter' ? 1.5 : 0 }}
        className="absolute bottom-10 text-[9px] sm:text-[10px] tracking-[0.6em] uppercase text-amber-200/40 font-display z-[3] select-none"
      >
        Fan Hub
      </motion.p>
    </motion.div>
  );
}

/**
 * Returns true if the intro has already been shown this session.
 */
export function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}
