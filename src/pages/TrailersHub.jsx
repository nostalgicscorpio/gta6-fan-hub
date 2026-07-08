import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPlay, HiClock, HiEye, HiBadgeCheck, HiCalendar } from 'react-icons/hi';
import { trailerService } from '../services/trailerService';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';

export default function TrailersHub() {
  const [trailers, setTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    trailerService.getTrailers().then(data => {
      setTrailers(data);
      setIsLoading(false);
    });
  }, []);

  const openVideo = (trailer) => {
    setActiveVideo(trailer);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = '';
  };

  const categorizeTrailers = (items) => {
    const sections = {
      'Official Trailers': [],
      'Gameplay': [],
      'Analysis': [],
      'Community Videos': [],
      'AI Originals': []
    };

    items.forEach(t => {
      const tag = (t.tag || '').toLowerCase();
      const title = (t.title || '').toLowerCase();
      
      if (tag.includes('gameplay') || title.includes('gameplay')) {
        sections['Gameplay'].push(t);
      } else if (tag.includes('analysis') || tag.includes('breakdown') || title.includes('analysis')) {
        sections['Analysis'].push(t);
      } else if (tag.includes('community') || tag.includes('fan')) {
        sections['Community Videos'].push(t);
      } else if (tag.includes('ai') || tag.includes('generated')) {
        sections['AI Originals'].push(t);
      } else {
        sections['Official Trailers'].push(t);
      }
    });

    return sections;
  };

  const sections = categorizeTrailers(trailers);
  const heroTrailer = trailers.length > 0 ? (trailers.find(t => t.featured) || trailers[0]) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 flex flex-col items-center justify-center bg-[#0B0B0D]">
        <div className="w-16 h-16 border-4 border-white/10 border-t-[#FF5FAF] rounded-full animate-spin shadow-[0_0_20px_rgba(255,95,175,0.4)]"></div>
      </div>
    );
  }

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0B0B0D] min-h-screen relative pb-32"
    >
      <SEO 
        title="Videos & Trailers - GTA VI Fan Hub" 
        description="Watch the latest GTA VI official trailers, gameplay, community creations, and AI originals in a cinematic experience." 
        image={heroTrailer?.thumbnail} 
      />

      {/* Cinematic Hero Section */}
      {heroTrailer && (
        <section className="relative w-full h-[75vh] lg:h-[85vh] overflow-hidden group">
          <motion.div 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <AssetImage
              src={heroTrailer.thumbnail}
              alt="Hero Trailer"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          
          {/* Gradients to blend into background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/90 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#FF5FAF]/5 mix-blend-overlay z-10 pointer-events-none" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-20 lg:pb-32 px-6 lg:px-16 w-full z-20 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              {heroTrailer.subtitle && (
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-[#FF5FAF] bg-black/40 border border-[#FF5FAF]/30 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
                  <HiBadgeCheck className="w-4 h-4" /> Featured Intel
                </span>
              )}
              
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter uppercase drop-shadow-2xl mb-6 leading-[0.9]">
                {heroTrailer.title}
              </h1>
              
              <p className="text-sm sm:text-lg text-[#9A9AA3] font-light max-w-2xl mb-10 line-clamp-3">
                {heroTrailer.description || "Experience the next generation of Grand Theft Auto. Watch the latest official trailers and explore exclusive key scenes from Leonida."}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => openVideo(heroTrailer)}
                  className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#FF8A2A] hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,138,42,0.5)] group/btn"
                >
                  <HiPlay className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                  Play Trailer
                </button>
                <div className="flex items-center gap-6 px-6 py-4 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-full text-white/70 text-[10px] uppercase tracking-widest font-bold">
                  {heroTrailer.duration && <span className="flex items-center gap-2"><HiClock className="text-[#FF5FAF]" /> {heroTrailer.duration}</span>}
                  {heroTrailer.views && <span className="flex items-center gap-2"><HiEye className="text-[#FF8A2A]" /> {heroTrailer.views}</span>}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Video Library */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-20 mt-12 sm:mt-16 flex flex-col gap-20">
        
        {Object.entries(sections).map(([title, items]) => {
          if (items.length === 0) return null;
          
          return (
            <motion.section 
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wider">
                  {title.split(' ')[0]} <span className="text-[#FF5FAF]">{title.split(' ').slice(1).join(' ')}</span>
                </h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {items.map((video) => (
                  <motion.div 
                    key={video.id}
                    variants={fadeUp}
                    onClick={() => openVideo(video)}
                    className="group cursor-pointer bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF5FAF]/40 hover:shadow-[0_15px_40px_rgba(255,95,175,0.15)] transition-all duration-500 flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-black/50">
                      <AssetImage 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-80" />
                      
                      {/* Play Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF5FAF] transition-colors border border-white/20">
                          <HiPlay className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {(video.tag || title !== 'Official Trailers') && (
                          <span className="text-[9px] tracking-widest uppercase font-bold text-white bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-1 rounded">
                            {video.tag || title.split(' ')[0]}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="text-[10px] font-bold text-white bg-black/80 px-2 py-1 rounded tracking-wider">
                          {video.duration || '0:00'}
                        </span>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FF5FAF] transition-colors line-clamp-2 leading-tight mb-2">
                        {video.title}
                      </h3>
                      <div className="mt-auto pt-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#8D8D97] font-bold">
                        <span className="flex items-center gap-1.5"><HiCalendar className="text-[#FF8A2A]" /> {video.date}</span>
                        <span className="flex items-center gap-1.5"><HiEye className="text-[#FF8A2A]" /> {video.views || '0'} views</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}

      </div>

      {/* Cinematic Modal Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={closeVideo}
          >
            <button 
              onClick={closeVideo}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/50 hover:text-white bg-white/5 hover:bg-[#FF5FAF] border border-white/10 p-3 rounded-full transition-all cursor-pointer z-[210] group"
            >
              <HiX size={24} className="group-hover:scale-110 transition-transform" />
            </button>
            
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl flex flex-col bg-[#0B0B0D] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,95,175,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Player Container */}
              <div className="w-full aspect-video bg-black relative">
                {activeVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                    title={activeVideo.title}
                    className="w-full h-full absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : activeVideo.videoUrl ? (
                  <video 
                    src={activeVideo.videoUrl} 
                    className="w-full h-full object-cover"
                    controls 
                    autoPlay
                    poster={activeVideo.thumbnail}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <span className="text-[#FF5FAF]/50 text-6xl mb-4 font-display">?</span>
                    <p className="text-white/40 uppercase tracking-widest font-bold">Transmission Error: Video Not Found</p>
                  </div>
                )}
              </div>

              {/* Video Details Pane */}
              <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-8 justify-between bg-gradient-to-t from-[#0B0B0D] to-[#131316]">
                <div className="md:w-2/3">
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-4 drop-shadow-md">
                    {activeVideo.title}
                  </h2>
                  <p className="text-[#9A9AA3] font-light leading-relaxed text-sm sm:text-base">
                    {activeVideo.description || "No description provided."}
                  </p>
                </div>
                
                <div className="md:w-1/3 flex flex-col gap-4">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-md">
                    <h4 className="text-[9px] uppercase tracking-[0.2em] text-[#FF8A2A] font-bold mb-3">Video Stats</h4>
                    <ul className="space-y-3 text-xs tracking-widest text-white/70 uppercase font-bold">
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><HiCalendar className="text-white/30" /> Date</span>
                        <span className="text-white">{activeVideo.date}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><HiClock className="text-white/30" /> Length</span>
                        <span className="text-white">{activeVideo.duration}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><HiEye className="text-white/30" /> Views</span>
                        <span className="text-white">{activeVideo.views}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
