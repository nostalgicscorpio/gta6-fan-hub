import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import CinematicIntro, { hasSeenIntro } from './components/CinematicIntro';
import Navbar from './components/Navbar';
const Home = React.lazy(() => import('./pages/Home'));
const ArticlePage = React.lazy(() => import('./pages/ArticlePage'));
const TrailerPage = React.lazy(() => import('./pages/TrailerPage'));
const CharacterPage = React.lazy(() => import('./pages/CharacterPage'));
const InteractiveMap = React.lazy(() => import('./pages/InteractiveMap'));
const MediaGalleryPage = React.lazy(() => import('./pages/MediaGalleryPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const TrailersHub = React.lazy(() => import('./pages/TrailersHub'));
const NewsHub = React.lazy(() => import('./pages/NewsHub'));
const GameplayHub = React.lazy(() => import('./pages/GameplayHub'));
const CommunityHub = React.lazy(() => import('./pages/CommunityHub'));
const YouTubeHub = React.lazy(() => import('./pages/YouTubeHub'));
const InstagramHub = React.lazy(() => import('./pages/InstagramHub'));
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import CustomCursor from './components/CustomCursor';
import SearchModal from './components/SearchModal';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import { supabaseAuth } from './services/supabaseAuthService';

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
 <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/[0.04] rounded-full blur-[150px]" />

 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4 }}
 className="relative z-10 text-center"
 >
 <h1 className="font-display font-black text-3xl sm:text-4xl tracking-wider mb-1">
 <span className="text-primary ">GTA</span>
 <span className="text-white ml-2">VI</span>
 </h1>
 <p className="text-[9px] tracking-[0.6em] uppercase text-gta-muted/50 mb-8 font-display">
 Fan Hub
 </p>
 </motion.div>

 <div className="relative z-10 w-44">
 <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
 <motion.div
 className="h-full bg-gradient-to-r from-primary to-gta-gold rounded-full"
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
 className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-primary/90 text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,106,0,0.4)] hover:bg-primary hover:shadow-[0_0_35px_rgba(255,106,0,0.6)] transition-all duration-300 cursor-pointer backdrop-blur-sm focus-ring btn-glow"
 aria-label="Scroll to top of page"
 >
 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
 </svg>
 </motion.button>
 )}
 </AnimatePresence>
 );
}

function App() {
 const [introComplete, setIntroComplete] = useState(hasSeenIntro());
 const [loaded, setLoaded] = useState(false);
 const [isSearchOpen, setIsSearchOpen] = useState(false);
 const location = useLocation();

 useEffect(() => {
 const handleKeyDown = (e) => {
 if (e.key === '/' && !isSearchOpen && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
 e.preventDefault();
 setIsSearchOpen(true);
 }
 };
 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }, [isSearchOpen]);

  const isAdmin = location.pathname.startsWith('/admin');
  const isLogin = location.pathname === '/admin/login';
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    if (isAdmin && !isLogin) {
      const session = supabaseAuth.getSession();
      if (!session) {
        window.location.href = '/admin/login';
      } else {
        setIsAdminAuthenticated(true);
      }
    }
  }, [isAdmin, isLogin, location.pathname]);

  if (isLogin) {
    return (
      <Suspense fallback={<div className="bg-black h-screen" />}>
        <Login />
      </Suspense>
    );
  }

  if (isAdmin) {
    if (!isAdminAuthenticated) return <div className="bg-[#09090b] h-screen" />; // waiting for redirect
    return (
      <div className="relative bg-[#09090b] min-h-screen overflow-x-hidden text-white font-sans selection:bg-primary/30">
        <CustomCursor />
        <AdminLayout />
      </div>
    );
  }

 return (
 <div className="relative bg-gta-black min-h-screen overflow-x-hidden">
 {/* Cinematic R★ intro — plays once per session */}
 <AnimatePresence mode="wait">
 {!introComplete && (
 <CinematicIntro key="intro" onComplete={() => setIntroComplete(true)} />
 )}
 </AnimatePresence>

 {/* Loading screen — plays after intro completes */}
 <AnimatePresence mode="wait">
 {introComplete && !loaded && (
 <LoadingScreen key="loader" onComplete={() => setLoaded(true)} />
 )}
 </AnimatePresence>

 {introComplete && loaded && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.5 }}
 >
 <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
 <ErrorBoundary>
 <Suspense fallback={
 <div className="h-screen bg-gta-black flex flex-col items-center justify-center relative">
 <div className="absolute inset-0 grid-pattern opacity-10" />
 <div className="w-12 h-12 rounded-full border-t-2 border-primary border-r-2 border-r-transparent animate-spin mb-4 relative z-10 box-glow" />
 <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold animate-pulse relative z-10 ">Loading</span>
 </div>
 }>
 <AnimatePresence mode="wait">
 <Routes location={location} key={location.pathname}>
 <Route path="/" element={<Home />} />
 <Route path="/news" element={<NewsHub />} />
 <Route path="/news/:slug" element={<ArticlePage />} />
 <Route path="/gameplay" element={<GameplayHub />} />
 <Route path="/trailers" element={<TrailersHub />} />
 <Route path="/trailers/:id" element={<TrailerPage />} />
 <Route path="/characters/:slug" element={<CharacterPage />} />
 <Route path="/map" element={<InteractiveMap />} />
 <Route path="/media" element={<MediaGalleryPage />} />
 <Route path="/community" element={<CommunityHub />} />
 <Route path="/youtube" element={<YouTubeHub />} />
 <Route path="/instagram" element={<InstagramHub />} />
 <Route path="*" element={<NotFound />} />
 </Routes>
 </AnimatePresence>
 </Suspense>
 </ErrorBoundary>
 <Footer />
 <ScrollToTopButton />
 <AnalyticsDashboard />
 <CustomCursor />
 <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
 </motion.div>
 )}
 </div>
 );
}

export default App;
