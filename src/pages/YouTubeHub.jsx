import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import NavOffset from '../components/NavOffset';
import { youtubeService } from '../services/youtubeService';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { SOCIAL_LINKS } from '../config/socials';

export default function YouTubeHub() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    youtubeService.getLatestVideos().then(setVideos);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gta-black text-white pb-32"
    >
      <SEO 
        title="GTA 6 Gameplay & Reactions - YouTube Hub" 
        description={`Watch the latest GTA 6 gameplay, breakdowns, and reactions from ${SOCIAL_LINKS.CREATOR_NAME}.`}
      />
      <NavOffset />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-12">
        <div className="text-center mb-20">
          <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tighter mb-4 text-[#FF0000] drop-shadow-2xl">
            YouTube <span className="text-white">Vault</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            The complete collection of trailer breakdowns, GTA V legacy content, and GTA VI gameplay concepts.
          </p>
        </div>

        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {videos.map(video => (
              <div key={video.id} className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <YouTubeEmbed videoId={video.youtubeId} title={video.title} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest">{video.category}</span>
                    <span className="text-[10px] text-white/40 uppercase">{video.views} views</span>
                  </div>
                  <h2 className="text-2xl font-bold">{video.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
