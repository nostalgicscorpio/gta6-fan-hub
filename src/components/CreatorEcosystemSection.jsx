import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { youtubeService } from '../services/youtubeService';
import { instagramService } from '../services/instagramService';
import YouTubeEmbed from './YouTubeEmbed';
import AssetImage from './AssetImage';
import { SOCIAL_LINKS } from '../config/socials';

export default function CreatorEcosystemSection() {
  const [videos, setVideos] = useState([]);
  const [aiCreations, setAiCreations] = useState([]);
  const [igHighlights, setIgHighlights] = useState([]);

  useEffect(() => {
    youtubeService.getLatestVideos().then(v => setVideos(v.slice(0, 2)));
    instagramService.getAICreations().then(setAiCreations);
    instagramService.getHighlights().then(h => setIgHighlights(h.slice(0, 3)));
  }, []);

  return (
    <section className="relative z-10 py-24 sm:py-32 bg-gta-black border-t border-white/5">
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-primary mb-4 flex items-center gap-3">
            <span className="w-12 h-[1px] bg-primary/50" />
            🔥 Latest GTA6WORLD Content
            <span className="w-12 h-[1px] bg-primary/50" />
          </span>
          <h2 className="font-display font-black text-5xl sm:text-6xl text-white uppercase tracking-tighter drop-shadow-2xl">
            Creator <span className="text-primary">Ecosystem</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto font-light text-sm">
            Curated videos, AI concepts, and fan edits straight from {SOCIAL_LINKS.CREATOR_NAME}.
          </p>
        </div>

        {/* Latest Videos (YouTube) */}
        <div className="mb-24">
          <h3 className="font-display font-black text-3xl uppercase tracking-tight mb-8 flex items-center gap-3">
            🎬 Latest <span className="text-[#FF0000]">Videos</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map(video => (
              <div key={video.id} className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <YouTubeEmbed videoId={video.youtubeId} title={video.title} />
                <div className="p-6 bg-white/[0.02]">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">{video.category}</span>
                  <h4 className="text-xl font-bold mt-2">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Creations & IG Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* AI Creations */}
          <div>
            <h3 className="font-display font-black text-3xl uppercase tracking-tight mb-8 flex items-center gap-3">
              🤖 AI <span className="text-primary">Creations</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {aiCreations.map(item => (
                <a key={item.id} href={item.embedUrl} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                    <AssetImage src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4">
                      <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Instagram Highlights */}
          <div>
            <h3 className="font-display font-black text-3xl uppercase tracking-tight mb-8 flex items-center gap-3">
              📸 Instagram <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#FD1D1D] to-[#C13584]">Highlights</span>
            </h3>
            <div className="flex flex-col gap-4">
              {igHighlights.map(item => (
                <a key={item.id} href={item.embedUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden relative">
                    <AssetImage src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest px-2 py-1 bg-primary/10 rounded-sm">{item.type}</span>
                    <h4 className="text-lg font-bold text-white mt-1 group-hover:text-primary transition-colors">{item.title}</h4>
                    <span className="text-xs text-white/50">❤️ {item.likes}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legacy */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-gta-purple/20 mix-blend-overlay pointer-events-none" />
          <div className="p-12 md:p-20 text-center relative z-10 flex flex-col items-center bg-black/40 backdrop-blur-sm">
            <h3 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">
              🎮 GTA V Legacy <span className="text-white/30 mx-2">→</span> <span className="text-primary">GTA VI Future</span>
            </h3>
            <p className="text-lg text-white/60 max-w-2xl font-light mb-8">
              Explore the evolution of the franchise. From Los Santos to Leonida, see how Rockstar Games is pushing the boundaries of interactive entertainment.
            </p>
            <a href="/youtube" className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,106,0,0.4)]">
              Explore The Vault
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
