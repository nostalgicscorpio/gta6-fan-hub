import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiCalendar } from 'react-icons/hi';
import SEO from '../components/SEO';
import NavOffset from '../components/NavOffset';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { gameplayService } from '../services/gameplayService';

export default function GameplayHub() {
  const [activeTab, setActiveTab] = useState('GTA VI');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [gameplayClips, setGameplayClips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    gameplayService.getGameplayClips().then(data => {
      setGameplayClips(data);
      setIsLoading(false);
    });
  }, []);

  const gameData = useMemo(() => gameplayClips.filter(c => c.game === activeTab), [activeTab]);
  
  const categories = useMemo(() => {
    return ['ALL', ...Array.from(new Set(gameData.map(item => item.category)))];
  }, [gameData]);

  const filteredClips = useMemo(() => {
    let result = [...gameData];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        item => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'ALL') {
      result = result.filter(item => item.category === activeCategory);
    }
    // Sort by newest first
    result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    return result;
  }, [gameData, searchQuery, activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gta-black min-h-screen relative pb-32 flex flex-col"
    >
      <SEO 
        title={`${activeTab} Gameplay - GTA VI Fan Hub`}
        description={`Watch the latest official and community gameplay videos for ${activeTab}.`}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${activeTab} Gameplay Hub`,
          "description": `Watch the latest official and community gameplay videos for ${activeTab}.`
        }}
      />
      <NavOffset />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-12 sm:mt-16 w-full">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-white/10 pb-10">
          <div>
            <h1 className="font-display font-black text-5xl sm:text-7xl text-white tracking-tighter uppercase drop-shadow-2xl mb-4">
              Gameplay <span className="text-primary">Vault</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl">Experience the evolution of Grand Theft Auto across generations.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search videos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-white/5 border border-white/10 text-white placeholder-white/40 rounded-full pl-11 pr-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Game Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
            {['GTA V', 'GTA VI'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveCategory('ALL');
                }}
                className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-primary text-black shadow-[0_0_20px_rgba(255,106,0,0.3)]' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-12 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-white/20 text-white border border-white/30' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + searchQuery + activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col bg-[#1B1C22] border border-white/5 rounded-2xl overflow-hidden shadow-xl animate-pulse">
                  <div className="w-full aspect-video bg-white/5"></div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <div className="h-3 w-1/3 bg-white/10 rounded mb-4"></div>
                    <div className="h-6 w-3/4 bg-white/10 rounded mb-3"></div>
                    <div className="h-4 w-full bg-white/10 rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                  </div>
                </div>
              ))
            ) : filteredClips.length > 0 ? (
              filteredClips.map((clip) => (
                <div key={clip.id} className="flex flex-col bg-[#1B1C22] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                  <div className="w-full">
                    <YouTubeEmbed videoId={clip.youtubeId} title={clip.title} thumbnailFallback={clip.thumbnail} />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-4 text-[10px] tracking-widest uppercase font-bold text-gta-muted">
                      <span className="text-primary">{clip.category}</span>
                      <span className="opacity-50">·</span>
                      <HiCalendar className="w-3 h-3" />
                      <span>{clip.uploadDate}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white mb-3 tracking-wide line-clamp-2">
                      {clip.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                      {clip.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-white/40 font-display text-xl uppercase tracking-widest">No footage found.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
