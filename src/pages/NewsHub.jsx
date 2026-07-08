import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiArrowRight, HiClock, HiCalendar, HiSortDescending, HiExternalLink } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { newsService } from '../services/newsService';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';
import NavOffset from '../components/NavOffset';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function NewsHub() {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortNewest, setSortNewest] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    let mounted = true;
    newsService.fetchNews().then(data => {
      if (mounted) {
        setNewsItems(data || []);
        setIsLoading(false);
      }
    }).catch(() => {
      if (mounted) {
        setNewsItems([]);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Standardize categories for the tabs, plus any dynamic ones
  const predefinedCategories = ['ALL', 'OFFICIAL', 'TRAILERS', 'GAMEPLAY', 'CHARACTERS', 'LEAKS/RUMORS', 'COMMUNITY'];
  const dynamicCategories = Array.from(new Set(newsItems.map(item => item.category.toUpperCase())));
  const categories = Array.from(new Set([...predefinedCategories, ...dynamicCategories]));

  const filteredNews = useMemo(() => {
    let result = [...newsItems];
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        item => item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q)
      );
    }
    
    if (activeCategory !== 'ALL') {
      result = result.filter(item => item.category.toUpperCase() === activeCategory);
    }
    
    if (sortNewest) {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    return result;
  }, [newsItems, searchQuery, activeCategory, sortNewest]);

  const featuredArticle = newsItems.find(item => item.hot) || newsItems[0];
  
  const latestNews = filteredNews.slice(0, 4);
  const rockstarNews = filteredNews.filter(n => n.category.toUpperCase() === 'ANNOUNCEMENTS' || n.category.toUpperCase() === 'OFFICIAL');
  const updateNews = filteredNews.filter(n => n.category.toUpperCase() === 'UPDATES');
  const screenshotArticles = filteredNews.filter(n => n.relatedScreenshots && n.relatedScreenshots.length > 0);
  const trailerArticles = filteredNews.filter(n => n.category.toUpperCase() === 'TRAILERS');

  const NewsCard = ({ article, large = false }) => (
    <motion.div 
      variants={cardVariant}
      onClick={() => navigate(`/news/${article.slug}`)}
      className={`group cursor-pointer bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-[#FF5FAF]/30 hover:shadow-[0_0_30px_rgba(255,95,175,0.15)] rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-500 ${large ? 'lg:flex-row lg:col-span-2 xl:col-span-3 lg:h-[500px]' : ''}`}
    >
      <div className={`relative overflow-hidden ${large ? 'lg:w-2/3 h-64 lg:h-full' : 'aspect-video'}`}>
        {article.image ? (
          <AssetImage 
            src={article.image} 
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#0B0B0D] flex items-center justify-center">
            <span className="text-white/20 font-display uppercase tracking-widest">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/20 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-[#FF5FAF]/0 group-hover:bg-[#FF5FAF]/10 transition-colors duration-500 mix-blend-overlay" />
        
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {article.breaking && (
            <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(220,38,38,0.7)] animate-pulse border border-red-400/50">
              Breaking
            </div>
          )}
          {!article.breaking && article.hot && (
            <div className="px-3 py-1 bg-gradient-to-r from-[#FF8A2A] to-[#FF5FAF] text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-[0_4px_12px_rgba(255,138,42,0.5)]">
              Hot
            </div>
          )}
          <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
            {article.category}
          </span>
        </div>
      </div>
      <div className={`p-6 sm:p-8 flex flex-col justify-between flex-grow bg-gradient-to-b from-transparent to-black/20 ${large ? 'lg:w-1/3' : ''}`}>
        <div>
          <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-widest uppercase font-bold text-[#8D8D97] mb-4">
            <span className="flex items-center gap-1.5"><HiCalendar className="text-[#FF8A2A]" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><HiClock className="text-[#FF8A2A]" /> {article.readTime}</span>
          </div>
          <h3 className={`font-display font-bold text-white transition-colors group-hover:text-[#FF5FAF] line-clamp-3 mb-4 leading-tight ${large ? 'text-3xl lg:text-4xl xl:text-5xl' : 'text-xl sm:text-2xl'}`}>
            {article.title}
          </h3>
          <p className={`text-white/60 font-light leading-relaxed line-clamp-3 ${large ? 'text-lg' : 'text-sm'}`}>
            {article.excerpt}
          </p>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#FF8A2A] group-hover:text-white transition-colors">
            Read Intel <HiArrowRight className="transition-transform group-hover:translate-x-2" />
          </span>
          {article.sourceUrl && (
            <a 
              href={article.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-white/30 hover:text-[#FF5FAF] transition-colors flex items-center gap-1 text-[10px] uppercase tracking-widest"
            >
              Source <HiExternalLink />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0B0B0D] min-h-screen relative pb-32 flex flex-col"
    >
      <SEO 
        title="Official News Hub - GTA VI" 
        description="The latest official announcements and updates from Rockstar Games."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Official News Hub - GTA VI",
          "description": "The latest official announcements and updates from Rockstar Games."
        }}
      />
      <NavOffset />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-white/10 border-t-[#FF8A2A] rounded-full animate-spin mb-4" />
          <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-bold">Decrypting Intel...</p>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 w-full">
          
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 border-b border-white/10 pb-8">
            <div>
              <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tighter uppercase drop-shadow-2xl mb-2 sm:mb-4">
                Newswire <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A2A] to-[#FF5FAF]">Hub</span>
              </h1>
              <p className="text-base sm:text-lg text-[#9A9AA3] max-w-xl font-light">Official announcements, trailers, and intelligence straight from the streets of Leonida.</p>
            </div>
            
            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-auto">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search intel..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 bg-white/5 border border-white/10 text-white placeholder-white/40 rounded-full pl-11 pr-4 py-3 focus:outline-none focus:border-[#FF5FAF]/50 transition-colors text-sm"
                />
              </div>
              <button 
                onClick={() => setSortNewest(!sortNewest)}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap w-full sm:w-auto"
              >
                <HiSortDescending className={`transition-transform duration-300 ${!sortNewest ? 'rotate-180' : ''}`} />
                {sortNewest ? 'Newest' : 'Oldest'}
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-6 mb-10 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-[#FF8A2A] text-black shadow-[0_0_15px_rgba(255,138,42,0.4)]' 
                  : 'bg-white/5 text-[#9A9AA3] hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery + sortNewest}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-24"
            >
              {/* Featured Article */}
              {searchQuery === '' && activeCategory === 'ALL' && featuredArticle && (
                <section>
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <NewsCard article={featuredArticle} large={true} />
                  </motion.div>
                </section>
              )}

              {/* General Filtered Grid */}
              {(searchQuery !== '' || activeCategory !== 'ALL') ? (
                <section>
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {filteredNews.map(article => <NewsCard key={article.id} article={article} />)}
                  </motion.div>
                </section>
              ) : (
                <>
                  {/* Latest News */}
                  {latestNews.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">Latest <span className="text-[#FF5FAF]">Intel</span></h2>
                        <div className="flex-1 h-[1px] bg-white/10" />
                      </div>
                      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                        {latestNews.map(article => <NewsCard key={article.id} article={article} />)}
                      </motion.div>
                    </section>
                  )}

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16">
                    {/* Rockstar News */}
                    {rockstarNews.length > 0 && (
                      <section>
                        <div className="flex items-center gap-4 mb-8">
                          <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wider">Announcements</h2>
                          <div className="flex-1 h-[1px] bg-white/10" />
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col gap-6 sm:gap-8">
                          {rockstarNews.map(article => <NewsCard key={article.id} article={article} />)}
                        </motion.div>
                      </section>
                    )}

                    {/* GTA VI Updates */}
                    {updateNews.length > 0 && (
                      <section>
                        <div className="flex items-center gap-4 mb-8">
                          <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wider">Updates</h2>
                          <div className="flex-1 h-[1px] bg-white/10" />
                        </div>
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col gap-6 sm:gap-8">
                          {updateNews.map(article => <NewsCard key={article.id} article={article} />)}
                        </motion.div>
                      </section>
                    )}
                  </div>

                  {/* Media Driven Articles */}
                  {(trailerArticles.length > 0 || screenshotArticles.length > 0) && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">Media <span className="text-[#FF8A2A]">Dispatches</span></h2>
                        <div className="flex-1 h-[1px] bg-white/10" />
                      </div>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16">
                        {trailerArticles.length > 0 && (
                          <div className="space-y-6 sm:space-y-8">
                            <h3 className="text-[10px] tracking-widest text-[#FF5FAF] font-bold uppercase mb-4 pl-4 border-l-2 border-[#FF5FAF]">Trailer Analysis</h3>
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-6 sm:gap-8">
                              {trailerArticles.map(article => <NewsCard key={article.id} article={article} />)}
                            </motion.div>
                          </div>
                        )}
                        {screenshotArticles.length > 0 && (
                          <div className="space-y-6 sm:space-y-8">
                            <h3 className="text-[10px] tracking-widest text-[#FF5FAF] font-bold uppercase mb-4 pl-4 border-l-2 border-[#FF5FAF]">Screenshot Galleries</h3>
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-6 sm:gap-8">
                              {screenshotArticles.map(article => <NewsCard key={article.id} article={article} />)}
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </section>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      )}
    </motion.div>
  );
}

