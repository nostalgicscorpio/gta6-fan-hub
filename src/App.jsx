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
import VicePhone from './components/VicePhone';
import LoadingScreen from './components/LoadingScreen';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import DashboardOverview from './pages/admin/DashboardOverview';
import ManageNews from './pages/admin/ManageNews';
import AIVideoStudio from './pages/admin/AIVideoStudio';
import ManageMedia from './pages/admin/ManageMedia';
import AdminSettings from './pages/admin/AdminSettings';
import { supabaseAuth } from './services/supabaseAuthService';


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
        <Routes location={location} key={location.pathname}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="studio" element={<ManageNews />} />
            <Route path="ai" element={<AIVideoStudio />} />
            <Route path="media" element={<ManageMedia />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<DashboardOverview />} />
          </Route>
        </Routes>
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
 <CustomCursor />
 <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
 
 <div className="fixed bottom-[20px] right-[20px] lg:bottom-[32px] lg:right-[32px] z-[9999] flex flex-col-reverse items-end gap-[14px] lg:gap-[22px] pointer-events-none *:pointer-events-auto">
   <VicePhone />
   <AnalyticsDashboard />
 </div>
 </motion.div>
 )}
 </div>
 );
}

export default App;
