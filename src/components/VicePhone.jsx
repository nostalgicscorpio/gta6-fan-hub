import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiNewspaper, HiVideoCamera, HiChip, HiIdentification, 
  HiLocationMarker, HiUsers, HiPhotograph, HiClock,
  HiX, HiDeviceMobile, HiWifi, HiLightningBolt
} from 'react-icons/hi';

const apps = [
  { name: 'NEWS', icon: HiNewspaper, path: '/news', color: 'from-[#FF8A2A] to-[#FF5FAF]' },
  { name: 'VIDEOS', icon: HiVideoCamera, path: '/youtube', color: 'from-[#FF5FAF] to-[#9D4EDD]' },
  { name: 'AI NETWORK', icon: HiChip, path: '/instagram', color: 'from-[#9D4EDD] to-[#00F0FF]' },
  { name: 'CHARACTERS', icon: HiIdentification, path: '/#characters', color: 'from-[#00F0FF] to-[#FF5FAF]' },
  { name: 'MAP', icon: HiLocationMarker, path: '/map', color: 'from-[#FF8A2A] to-[#FFD700]' },
  { name: 'COMMUNITY', icon: HiUsers, path: '/community', color: 'from-[#FFD700] to-[#FF8A2A]' },
  { name: 'MEDIA', icon: HiPhotograph, path: '/media', color: 'from-[#FF5FAF] to-[#FF8A2A]' },
  { name: 'COUNTDOWN', icon: HiClock, path: '/#countdown', color: 'from-[#9D4EDD] to-[#FF5FAF]' },
];

export default function VicePhone() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // First open experience
  useEffect(() => {
    if (isOpen) {
      const hasOpened = localStorage.getItem('vice_phone_opened');
      if (!hasOpened) {
        setTimeout(() => setShowNotification(true), 1000);
        localStorage.setItem('vice_phone_opened', 'true');
      }
    }
  }, [isOpen]);

  // Hide notification after a while
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleAppClick = (path) => {
    setIsConnecting(true);
    
    // Vibrate
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([15, 30, 15]);
    }

    setTimeout(() => {
      setIsConnecting(false);
      setIsOpen(false);
      
      if (path.startsWith('/#')) {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.substring(2));
          if (el) {
            const yPos = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: yPos, behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate(path);
      }
    }, 1500); // 1.5s connecting delay
  };

  const togglePhone = () => {
    setIsOpen(!isOpen);
    if (!isOpen && typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={togglePhone}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#FF5FAF] to-[#9D4EDD] shadow-[0_0_20px_rgba(255,95,175,0.4)] flex items-center justify-center text-white hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-white/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <HiDeviceMobile className="w-7 h-7" />
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20" />
      </motion.button>

      {/* Phone UI Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 sm:right-12 z-[100] w-[320px] sm:w-[360px] h-[640px] max-h-[80vh] bg-black rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,95,175,0.2)] border-[8px] border-[#1a1a1c] overflow-hidden flex flex-col"
          >
            {/* Inner Screen Bezel */}
            <div className="absolute inset-0 border border-white/10 rounded-[32px] pointer-events-none z-50" />
            
            {/* Screen Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#120524] via-[#0B0B0D] to-[#2B0E1B] opacity-90" />
            
            {/* Dynamic Island / Top Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1c] rounded-b-2xl z-40 shadow-inner" />

            {/* Status Bar */}
            <div className="relative z-30 flex items-center justify-between px-6 py-2 text-[10px] font-bold text-white/90">
              <span>{time}</span>
              <div className="flex items-center gap-2">
                <HiWifi className="w-3 h-3 text-white/90" />
                <HiLightningBolt className="w-4 h-4 text-white/90" />
              </div>
            </div>

            {/* Header Content */}
            <div className="relative z-30 px-6 pt-4 pb-2">
              <h3 className="text-[#FF5FAF] font-black text-xl tracking-wider font-display uppercase">Vice OS</h3>
              <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase">Leonida Network</p>
            </div>

            {/* Apps Grid */}
            <div className="relative z-30 flex-1 px-5 pt-4 overflow-y-auto hide-scrollbar pb-10">
              <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                {apps.map((app, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAppClick(app.path)}
                    className="flex flex-col items-center gap-2 group outline-none"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} p-[1px] shadow-lg group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-shadow duration-300`}
                    >
                      <div className="w-full h-full bg-black/80 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-black/60 transition-colors duration-300">
                        <app.icon className="w-7 h-7 text-white/90" />
                      </div>
                    </motion.div>
                    <span className="text-[9px] text-white/70 font-bold tracking-wider font-sans group-hover:text-white transition-colors uppercase">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Bar Area (Close Button) */}
            <div className="relative z-30 p-4 flex justify-center bg-gradient-to-t from-black via-black/80 to-transparent">
              <button 
                onClick={togglePhone}
                className="w-12 h-1.5 bg-white/30 hover:bg-white/60 rounded-full transition-colors"
                aria-label="Close Vice Phone"
              />
            </div>

            {/* Connecting Overlay */}
            <AnimatePresence>
              {isConnecting && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 border-t-2 border-[#FF5FAF] border-r-2 border-r-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(255,95,175,0.5)]" />
                  <p className="text-[#FF5FAF] text-[10px] tracking-[0.2em] uppercase font-bold animate-pulse text-center px-4">
                    Connecting to<br/>Leonida Network...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification Banner */}
            <AnimatePresence>
              {showNotification && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute top-10 left-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-2xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5FAF] to-[#FF8A2A] flex items-center justify-center shrink-0">
                      <HiDeviceMobile className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-0.5">Incoming Message</h4>
                      <p className="text-white/80 text-[10px]">Welcome to Vice City 🌴</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
