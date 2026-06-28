import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiArrowRight } from 'react-icons/hi';
import { trackArticleClick, trackButtonClick } from '../utils/analytics';
import { revealVariants, staggerContainer } from '../utils/animations';

const newsItems = [
  {
    id: 1,
    date: 'June 2026',
    category: 'OFFICIAL',
    title: 'GTA VI Launch Day Approaches',
    excerpt: 'Rockstar Games confirms final preparations for the worldwide launch of Grand Theft Auto VI on PlayStation 5 and Xbox Series X|S.',
    image: '/images/hero-bg.png',
    hot: true,
  },
  {
    id: 2,
    date: 'May 2026',
    category: 'GAMEPLAY',
    title: 'New Gameplay Features Revealed',
    excerpt: 'Dual protagonists Jason and Lucia navigate the criminal underworld of Leonida in the most immersive GTA experience ever created.',
    image: '/images/news-thumb.png',
    hot: false,
  },
  {
    id: 3,
    date: 'April 2026',
    category: 'WORLD',
    title: 'Vice City Reimagined for a New Era',
    excerpt: 'The fictional state of Leonida brings a vibrant, evolving open world that reacts to player choices and in-game events in real time.',
    image: '/images/ss-downtown.png',
    hot: false,
  },
  {
    id: 4,
    date: 'March 2026',
    category: 'ONLINE',
    title: 'GTA Online: Next Generation Plans',
    excerpt: 'Details emerge about the next evolution of GTA Online, launching alongside GTA VI with an entirely new economy and social features.',
    image: '/images/ss-nightlife.png',
    hot: false,
  },
];

export default function NewsSection() {
  const [hoveredId, setHoveredId] = useState(null);

  const handleArticleClick = (title) => {
    trackArticleClick(title);
  };

  const handleViewAll = () => {
    trackButtonClick('View All Articles');
  };

  return (
    <section id="news" className="relative py-20 sm:py-28">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16"
        >
          <motion.div variants={revealVariants}>
            <p className="text-[11px] tracking-[0.5em] uppercase text-gta-orange font-medium mb-2">
              Stay Updated
            </p>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
              LATEST <span className="text-gta-orange">NEWS</span>
            </h2>
          </motion.div>
          <motion.a
            variants={revealVariants}
            href="#"
            onClick={handleViewAll}
            className="hidden sm:flex items-center gap-2 text-sm text-gta-muted hover:text-gta-orange transition-colors mt-4 sm:mt-0 group"
          >
            View all articles <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {newsItems.map((item, i) => (
            <motion.article
              key={item.id}
              variants={revealVariants}
              custom={i}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleArticleClick(item.title)}
              className="group glass-card rounded-xl overflow-hidden cursor-pointer card-hover-glow"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gta-card via-transparent to-transparent" />

                {item.hot && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-gta-neon text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-[0_0_15px_rgba(255,69,0,0.5)]">
                    🔥 HOT
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-gta-orange bg-black/60 backdrop-blur-sm px-3 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3 text-xs text-gta-muted">
                  <HiCalendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3 group-hover:text-gta-orange transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gta-muted leading-relaxed mb-4 line-clamp-2">
                  {item.excerpt}
                </p>

                <div className="flex items-center gap-2 text-gta-orange text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  Read More
                  <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
