import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NAV_ZONES = [
  { angle: 0, name: 'VIDEOS', href: '/youtube' },
  { angle: 45, name: 'AI', href: '/instagram' },
  { angle: 90, name: 'CHARACTERS', href: '/#characters' },
  { angle: 135, name: 'MAP', href: '/map' },
  { angle: 180, name: 'COMMUNITY', href: '/community' },
  { angle: 225, name: 'HOME', href: '/#home' },
  { angle: 270, name: 'HOME', href: '/#home' },
  { angle: 315, name: 'NEWS', href: '/news' },
];

function getTargetZone(angle) {
  let closest = NAV_ZONES[0];
  let minDiff = 360;
  for (let z of NAV_ZONES) {
    let diff = Math.abs(angle - z.angle);
    if (diff > 180) diff = 360 - diff;
    if (diff < minDiff) {
      minDiff = diff;
      closest = z;
    }
  }
  return closest;
}

export default function NeonJoystick() {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const [joystickState, setJoystickState] = useState({ distance: 0, angle: 0 });
  const [activeTarget, setActiveTarget] = useState(null);

  useEffect(() => {
    const updateState = () => {
      const lx = x.get();
      const ly = y.get();
      const dist = Math.min(Math.sqrt(lx * lx + ly * ly) / 50, 1);
      
      let ang = Math.atan2(ly, lx) * (180 / Math.PI);
      if (ang < 0) ang += 360; // 0 to 360
      
      setJoystickState({ distance: dist, angle: ang });

      if (dist > 0.4) {
        const target = getTargetZone(ang);
        setActiveTarget((prev) => {
          if (prev?.name !== target.name) {
            // Trigger haptic feedback if available on mobile
            if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
              window.navigator.vibrate(15);
            }
            // Dispatch event to Navbar
            window.dispatchEvent(new CustomEvent('joystick-target', { detail: target.href }));
          }
          return target;
        });
      } else {
        setActiveTarget((prev) => {
          if (prev) {
            window.dispatchEvent(new CustomEvent('joystick-target', { detail: null }));
          }
          return null;
        });
      }
    };

    const unsubscribeX = x.onChange(updateState);
    const unsubscribeY = y.onChange(updateState);
    
    return () => {
      unsubscribeX();
      unsubscribeY();
      window.dispatchEvent(new CustomEvent('joystick-target', { detail: null }));
    };
  }, [x, y]);

  // Global fallback reset listener
  useEffect(() => {
    const handleGlobalUp = () => {
      setTimeout(() => {
        if (!isDragging.current && (Math.abs(x.get()) > 1 || Math.abs(y.get()) > 1)) {
          animate(x, 0, { type: 'spring', stiffness: 600, damping: 25 });
          animate(y, 0, { type: 'spring', stiffness: 600, damping: 25 });
          window.dispatchEvent(new CustomEvent('joystick-target', { detail: null }));
          setActiveTarget(null);
          setJoystickState({ distance: 0, angle: 0 });
        }
      }, 100);
    };

    window.addEventListener('pointerup', handleGlobalUp);
    window.addEventListener('touchend', handleGlobalUp);
    window.addEventListener('mouseup', handleGlobalUp);

    return () => {
      window.removeEventListener('pointerup', handleGlobalUp);
      window.removeEventListener('touchend', handleGlobalUp);
      window.removeEventListener('mouseup', handleGlobalUp);
    };
  }, [x, y]);

  const handleDragEnd = () => {
    isDragging.current = false;
    const currentTarget = activeTarget;

    // Force explicit position reset regardless of drag physics
    animate(x, 0, { type: 'spring', stiffness: 600, damping: 25 });
    animate(y, 0, { type: 'spring', stiffness: 600, damping: 25 });
    
    window.dispatchEvent(new CustomEvent('joystick-target', { detail: null }));
    setActiveTarget(null);
    setJoystickState({ distance: 0, angle: 0 });

    if (currentTarget) {
      setTimeout(() => {
        if (currentTarget.href.startsWith('/#')) {
          navigate('/');
          setTimeout(() => {
            const el = document.getElementById(currentTarget.href.substring(2));
            if (el) {
              const yPos = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: yPos, behavior: 'smooth' });
            }
          }, 100);
        } else {
          navigate(currentTarget.href);
        }
      }, 50);
    }
  };

  const numLeds = 12;
  const leds = Array.from({ length: numLeds }).map((_, i) => {
    const ledAngle = (i / numLeds) * 360;
    let diff = Math.abs(ledAngle - joystickState.angle);
    if (diff > 180) diff = 360 - diff;
    
    let intensity = Math.max(0, 1 - diff / 60) * joystickState.distance;
    
    // Make active direction glow stronger
    if (activeTarget && joystickState.distance > 0.4) {
      let targetDiff = Math.abs(ledAngle - activeTarget.angle);
      if (targetDiff > 180) targetDiff = 360 - targetDiff;
      if (targetDiff < 30) intensity = 1.2; 
    }
    
    let color = '#FF5FAF'; // Pink
    if (ledAngle >= 30 && ledAngle <= 150) color = '#FF8A2A'; // Orange
    if (ledAngle > 150 && ledAngle <= 270) color = '#9D4EDD'; // Purple

    return { ledAngle, intensity, color };
  });
  
  return (
    <div className="relative flex flex-col items-center justify-center p-8 w-full max-w-[400px] aspect-square scale-90 origin-center">
      
      <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30 tracking-widest pointer-events-none z-20">
        .vice_control_active
      </div>

      {/* Floating Target Label */}
      <AnimatePresence>
        {activeTarget && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
          >
            <div className="bg-black/90 backdrop-blur-md border border-[#FF5FAF]/50 px-5 py-2 rounded shadow-[0_0_20px_rgba(255,95,175,0.4)] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FF5FAF] shadow-[0_0_10px_#FF5FAF] animate-pulse" />
              <span className="text-xs tracking-[0.2em] uppercase font-black text-white">
                TARGET: <span className="text-[#FF5FAF]">{activeTarget.name}</span>
              </span>
            </div>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#FF5FAF]/80 to-transparent shadow-[0_0_8px_#FF5FAF]" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ 
          boxShadow: [
            "20px 20px 60px #08080a, -20px -20px 60px #1e1e24",
            "18px 18px 55px #08080a, -18px -18px 55px #1e1e24",
            "20px 20px 60px #08080a, -20px -20px 60px #1e1e24"
          ] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center bg-[#131317] border border-white/5"
      >
        <div className="absolute inset-3 rounded-full pointer-events-none">
          {leds.map((led, idx) => (
            <div 
              key={idx}
              className="absolute top-1/2 left-1/2 w-full h-1 -ml-[50%] -mt-0.5 origin-center"
              style={{ transform: `rotate(${led.ledAngle}deg)` }}
            >
              <div 
                className="absolute right-0 w-2 h-2 rounded-full bg-white/10 transition-all duration-150"
                style={{ 
                  backgroundColor: led.intensity > 0.1 ? led.color : 'rgba(255,255,255,0.1)',
                  boxShadow: led.intensity > 0.1 ? `0 0 ${10 + led.intensity * 20}px ${led.color}, 0 0 ${5 + led.intensity * 10}px ${led.color} inset` : 'none',
                  opacity: 0.3 + led.intensity * 0.7
                }}
              />
            </div>
          ))}
        </div>

        <div 
          ref={containerRef}
          className="absolute inset-8 sm:inset-10 rounded-full bg-[#0e0e11] shadow-[inset_15px_15px_30px_#060607,_inset_-15px_-15px_30px_#16161b] border border-black/80 flex items-center justify-center"
        >
          <div className="absolute inset-10 rounded-full bg-black/40 blur-md pointer-events-none" />

          <motion.div
            drag
            dragMomentum={false}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={handleDragEnd}
            dragConstraints={containerRef}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileDrag={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            style={{ x, y }}
            className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full cursor-grab active:cursor-grabbing bg-gradient-to-br from-[#2a2a35] to-[#121217] shadow-[15px_20px_35px_rgba(0,0,0,0.8),_-10px_-10px_20px_rgba(255,255,255,0.03),_inset_0_2px_2px_rgba(255,255,255,0.1)] border border-black flex items-center justify-center touch-none"
          >
            <div className="absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-tr from-[#0a0a0f] to-[#1a1a24] shadow-[inset_6px_6px_15px_rgba(0,0,0,0.9),_inset_-2px_-2px_5px_rgba(255,255,255,0.02)] border border-black/80 overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/10 to-transparent rounded-t-full opacity-60" />
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/5 opacity-40 shadow-[inset_0_0_10px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-black/80 bg-[#131317] shadow-[inset_1px_1px_3px_rgba(0,0,0,1)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 w-full text-center pointer-events-none">
        <span className="text-[10px] sm:text-xs tracking-[0.4em] text-white/50 font-bold uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
          Control Vice City
        </span>
      </div>
    </div>
  );
}
