import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiArrowRight, HiClock, HiCalendar, HiSortDescending, HiExternalLink } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { newsService } from '../services/newsService';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';
import NavOffset from '../components/NavOffset';

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

  const categories = ['ALL', ...Array.from(new Set(newsItems.map(item => item.category)))];

 const filteredNews = useMemo(() => {
 let result = [...newsItems];
 
 if (searchQuery) {
 const q = searchQuery.toLowerCase();
 result = result.filter(
 item => item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q)
 );
 }
 
 if (activeCategory !== 'ALL') {
 result = result.filter(item => item.category === activeCategory);
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
 const rockstarNews = filteredNews.filter(n => n.category === 'ANNOUNCEMENTS');
 const updateNews = filteredNews.filter(n => n.category === 'UPDATES');
 const screenshotArticles = filteredNews.filter(n => n.relatedScreenshots && n.relatedScreenshots.length > 0);
 const trailerArticles = filteredNews.filter(n => n.category === 'TRAILERS');

 const NewsCard = ({ article, large = false }) => (
 <div 
 onClick={() => navigate(`/news/${article.slug}`)}
 className={`group cursor-pointer glass-card card-hover-glow flex flex-col h-full border border-white/5 ${large ? 'lg:flex-row' : ''}`}
 >
 <div className={`relative overflow-hidden ${large ? 'lg:w-3/5 lg:h-[500px]' : 'aspect-video'}`}>
 {article.image ? (
 <AssetImage 
 src={article.image} 
 alt={article.title}
 loading="lazy"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
 />
 ) : (
 <div className="w-full h-full bg-black flex items-center justify-center">
 <span className="text-white/20 font-display">No Image</span>
 </div>
 )}
 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
 <div className="badge-tl flex gap-2">
 {article.breaking && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-red-600/90 text-white text-[10px] font-bold tracking-wider uppercase rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.7)] animate-pulse">
                  🚨 BREAKING
                </div>
              )}
              {!article.breaking && article.hot && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-primary text-black text-[10px] font-bold tracking-wider uppercase rounded-sm shadow-[0_4px_12px_rgba(255,106,0,0.5)]">
                  🔥 HOT
                </div>
              )}
 <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-sm border border-white/10">
 {article.category}
 </span>
 </div>
 </div>
 <div className={`card-content justify-between ${large ? 'lg:w-2/5' : ''}`}>
 <div>
 <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-widest uppercase font-bold text-gta-muted mb-4">
 <span className="flex items-center gap-1.5"><HiCalendar className="text-primary" /> {article.date}</span>
 <span className="flex items-center gap-1.5"><HiClock className="text-primary" /> {article.readTime}</span>
 </div>
 <h3 className={`font-display font-bold text-white transition-colors group-hover:text-primary line-clamp-3 mb-4 ${large ? 'text-3xl lg:text-4xl' : 'text-xl'}`}>
 {article.title}
 </h3>
 <p className="text-white/60 text-sm leading-relaxed line-clamp-4">
 {article.excerpt}
 </p>
 </div>
 <div className="mt-8 flex items-center justify-between">
 <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">
 Read Intel <HiArrowRight className="transition-transform group-hover:translate-x-1" />
 </span>
 {article.sourceUrl && (
 <a 
 href={article.sourceUrl} 
 target="_blank" 
 rel="noopener noreferrer"
 onClick={(e) => e.stopPropagation()}
 className="text-white/40 hover:text-primary transition-colors flex items-center gap-1 text-[10px] uppercase tracking-widest"
 >
 Source <HiExternalLink />
 </a>
 )}
 </div>
 </div>
 </div>
 );

 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.5 }}
 className="bg-gta-black min-h-screen relative pb-32 flex flex-col"
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
      <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-4" />
      <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-bold">Decrypting Intel...</p>
    </div>
  ) : (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-12 sm:mt-16">
 
 {/* Header & Controls */}
 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-white/10 pb-10">
 <div>
 <h1 className="font-display font-black text-5xl sm:text-7xl text-white tracking-tighter uppercase drop-shadow-2xl mb-4">
 Newswire <span className="text-primary ">Hub</span>
 </h1>
 <p className="text-lg text-white/50 max-w-xl">Official announcements and intelligence straight from Rockstar Games.</p>
 </div>
 
 <div className="flex flex-wrap gap-4 w-full lg:w-auto">
 <div className="relative w-full sm:w-auto">
 <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
 <input 
 type="text" 
 placeholder="Search intel..." 
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full sm:w-64 bg-white/5 border border-white/10 text-white placeholder-white/40 rounded-full pl-11 pr-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
 />
 </div>
 <button 
 onClick={() => setSortNewest(!sortNewest)}
 className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap"
 >
 <HiSortDescending className={`transition-transform duration-300 ${!sortNewest ? 'rotate-180' : ''}`} />
 {sortNewest ? 'Newest' : 'Oldest'}
 </button>
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
 ? 'bg-primary text-black shadow-[0_0_10px_rgba(255,45,120,0.2)]' 
 : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
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
 transition={{ duration: 0.3 }}
 className="space-y-24"
 >
 {/* Featured Article */}
 {searchQuery === '' && activeCategory === 'ALL' && featuredArticle && (
 <section>
 <NewsCard article={featuredArticle} large={true} />
 </section>
 )}

 {/* General Filtered Grid */}
 {(searchQuery !== '' || activeCategory !== 'ALL') ? (
 <section>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredNews.map(article => <NewsCard key={article.id} article={article} />)}
 </div>
 </section>
 ) : (
 <>
 {/* Latest News */}
 {latestNews.length > 0 && (
 <section>
 <div className="flex items-center gap-4 mb-8">
 <h2 className="font-display font-bold text-3xl text-white uppercase tracking-wider">Latest <span className="text-primary">Intel</span></h2>
 <div className="flex-1 h-[1px] bg-white/10" />
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {latestNews.map(article => <NewsCard key={article.id} article={article} />)}
 </div>
 </section>
 )}

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
 {/* Rockstar News */}
 {rockstarNews.length > 0 && (
 <section>
 <div className="flex items-center gap-4 mb-8">
 <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wider">Announcements</h2>
 <div className="flex-1 h-[1px] bg-white/10" />
 </div>
 <div className="flex flex-col gap-6">
 {rockstarNews.map(article => <NewsCard key={article.id} article={article} />)}
 </div>
 </section>
 )}

 {/* GTA VI Updates */}
 {updateNews.length > 0 && (
 <section>
 <div className="flex items-center gap-4 mb-8">
 <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wider">Updates</h2>
 <div className="flex-1 h-[1px] bg-white/10" />
 </div>
 <div className="flex flex-col gap-6">
 {updateNews.map(article => <NewsCard key={article.id} article={article} />)}
 </div>
 </section>
 )}
 </div>

 {/* Media Driven Articles */}
 {(trailerArticles.length > 0 || screenshotArticles.length > 0) && (
 <section>
 <div className="flex items-center gap-4 mb-8">
 <h2 className="font-display font-bold text-3xl text-white uppercase tracking-wider">Media <span className="text-primary">Dispatches</span></h2>
 <div className="flex-1 h-[1px] bg-white/10" />
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {trailerArticles.length > 0 && (
 <div className="space-y-6">
 <h3 className="text-[10px] tracking-widest text-primary font-bold uppercase mb-4 pl-4 border-l-2 border-primary">Trailer Analysis</h3>
 {trailerArticles.map(article => <NewsCard key={article.id} article={article} />)}
 </div>
 )}
 {screenshotArticles.length > 0 && (
 <div className="space-y-6">
 <h3 className="text-[10px] tracking-widest text-primary font-bold uppercase mb-4 pl-4 border-l-2 border-primary">Screenshot Galleries</h3>
 {screenshotArticles.map(article => <NewsCard key={article.id} article={article} />)}
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
