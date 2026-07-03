import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import NavOffset from '../components/NavOffset';
import { instagramService } from '../services/instagramService';
import AssetImage from '../components/AssetImage';
import { SOCIAL_LINKS } from '../config/socials';

export default function InstagramHub() {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    instagramService.getHighlights().then(setHighlights);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gta-black text-white pb-32"
    >
      <SEO 
        title="GTA 6 AI Videos & Reels - Instagram Hub" 
        description={`Explore mind-blowing AI creations and fan edits by ${SOCIAL_LINKS.CREATOR_NAME}.`}
      />
      <NavOffset />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-12">
        <div className="text-center mb-20">
          <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584] drop-shadow-2xl">
            Instagram <span className="text-white">Gallery</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            Viral reels, AI-generated GTA VI concepts, and community-driven fan edits.
          </p>
        </div>

        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map(item => (
              <a key={item.id} href={item.embedUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="aspect-[9/16] relative rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <AssetImage src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest mb-2 px-3 py-1 bg-primary/20 rounded-sm w-fit">{item.type}</span>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                    <span className="text-sm text-white/70 font-medium">❤️ {item.likes}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
