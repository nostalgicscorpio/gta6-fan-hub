import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../config/socials';
import SEO from '../components/SEO';
import NavOffset from '../components/NavOffset';
import { youtubeService } from '../services/youtubeService';
import { instagramService } from '../services/instagramService';
import YouTubeEmbed from '../components/YouTubeEmbed';
import AssetImage from '../components/AssetImage';

export default function CommunityHub() {
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    youtubeService.getFeaturedVideo().then(setFeaturedVideo);
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
        title="Creator Community - GTA VI" 
        description={SOCIAL_LINKS.CREATOR_BIO}
      />
      <NavOffset />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-12">
        {/* Creator Profile Section */}
        <section className="mb-24 flex flex-col md:flex-row items-center gap-12 bg-white/[0.02] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
          <div className="relative z-10 text-center md:text-left flex-1">
            <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tight mb-4 drop-shadow-lg">
              {SOCIAL_LINKS.CREATOR_NAME}
            </h1>
            <p className="text-xl text-primary font-bold tracking-widest uppercase mb-6">
              {SOCIAL_LINKS.CREATOR_TAG}
            </p>
            <p className="text-lg text-white/70 font-light max-w-2xl leading-relaxed mb-8">
              {SOCIAL_LINKS.CREATOR_BIO}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#FF0000] text-white font-bold uppercase tracking-widest rounded-sm hover:scale-105 transition-transform">
                YouTube
              </a>
              <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584] text-white font-bold uppercase tracking-widest rounded-sm hover:scale-105 transition-transform">
                Instagram
              </a>
              <a href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#5865F2] text-white font-bold uppercase tracking-widest rounded-sm hover:scale-105 transition-transform">
                Discord
              </a>
            </div>
          </div>
        </section>

        {/* Featured Video */}
        <section className="mb-24">
          <h2 className="font-display font-black text-4xl uppercase tracking-tight mb-8">
            Latest <span className="text-primary">Upload</span>
          </h2>
          {featuredVideo && (
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_100px_rgba(0,0,0,0.5)]">
              <YouTubeEmbed videoId={featuredVideo.youtubeId} title={featuredVideo.title} />
            </div>
          )}
        </section>

        {/* IG Highlights */}
        <section>
          <h2 className="font-display font-black text-4xl uppercase tracking-tight mb-8">
            Instagram <span className="text-primary">Highlights</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map(item => (
              <a key={item.id} href={item.embedUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-white/10">
                  <AssetImage src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest mb-2">{item.type}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <span className="text-sm text-white/50">{item.likes} Likes</span>
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
