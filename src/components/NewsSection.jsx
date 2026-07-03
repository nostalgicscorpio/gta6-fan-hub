import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCalendar, HiArrowRight } from 'react-icons/hi';
import { trackArticleClick, trackButtonClick } from '../utils/analytics';
import { revealVariants, staggerContainer } from '../utils/animations';
import { newsService } from '../services/newsService';
import AssetImage from './AssetImage';

export default function NewsSection() {
  const [_hoveredId, setHoveredId] = useState(null);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    newsService.fetchNews().then(data => {
      if (mounted) {
        setNews((data || []).slice(0, 3));
        setIsLoading(false);
      }
    }).catch(() => {
      if (mounted) {
        setNews([]);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleArticleClick = (item) => {
    trackArticleClick(item.title);
    navigate(`/news/${item.slug}`);
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    trackButtonClick('View All Articles');
    navigate('/news');
    window.scrollTo(0, 0);
  };

  return (
    <section id="news" className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-[#0B0B0D]">
      <div className="section-divider" />

      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col items-center justify-center text-center mb-16 sm:mb-24"
        >
          <motion.div variants={revealVariants} className="flex flex-col items-center">
            <p className="text-[11px] sm:text-[12px] tracking-[0.4em] uppercase text-[#FF8A2A] font-bold mb-3">
              Stay Updated
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] tracking-wide uppercase text-center mb-6">
              LATEST NEWS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF8A2A] to-transparent opacity-80" />
          </motion.div>
          <motion.a
            variants={revealVariants}
            href="/news"
            onClick={handleViewAll}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-[rgba(255,255,255,0.08)] text-[#FFFFFF] font-bold tracking-widest uppercase rounded-lg transition-all focus-ring cursor-pointer mt-8"
          >
            View all articles <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#FF8A2A]" />
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] h-[500px] flex flex-col">
                <div className="w-full aspect-video bg-[#131316]"></div>
                <div className="p-6 sm:p-8 flex flex-col grow">
                  <div className="w-1/3 h-3 bg-[rgba(255,255,255,0.05)] rounded mb-4"></div>
                  <div className="w-3/4 h-6 bg-[rgba(255,255,255,0.1)] rounded mb-3"></div>
                  <div className="w-full h-16 bg-[rgba(255,255,255,0.05)] rounded mb-6"></div>
                  <div className="w-1/4 h-4 bg-[rgba(255,255,255,0.1)] rounded mt-auto"></div>
                </div>
              </div>
            ))
          ) : (
            (news || []).map((item, i) => (
              <motion.article
                key={item.id}
                variants={revealVariants}
                custom={i}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleArticleClick(item)}
              className="group bg-[#1B1C22] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:border-[rgba(255,138,42,0.25)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden shrink-0 bg-[#131316]">
                <AssetImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                
                {item.breaking && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-red-600/90 text-white text-[10px] font-bold tracking-wider uppercase rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.7)] animate-pulse">
                    🚨 BREAKING
                  </div>
                )}
                {!item.breaking && item.hot && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#FF8A2A] text-[#131316] text-[10px] font-bold tracking-wider uppercase rounded-sm shadow-[0_4px_12px_rgba(255,138,42,0.5)]">
                    🔥 HOT
                  </div>
                )}

                <div className="absolute top-4 left-4 z-20">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#FFFFFF] bg-[rgba(10,10,12,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] px-3 py-1.5 rounded-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col grow">
                <div className="flex items-center gap-2 mb-4 text-xs text-[#8D8D97] font-medium tracking-wide">
                  <HiCalendar className="w-4 h-4 text-[#FF8A2A]" />
                  {item.date}
                  <span className="opacity-50 px-1">·</span>
                  <span>{item.readTime} read</span>
                </div>

                <h3 className="font-display font-bold text-[#FFFFFF] text-xl sm:text-2xl transition-colors group-hover:text-[#FF8A2A] line-clamp-3 mb-4 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#8D8D97] leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {item.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[#FF8A2A] text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all duration-300 mt-auto">
                  Read More
                  <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          )))}
        </motion.div>
      </div>
    </section>
  );
}
