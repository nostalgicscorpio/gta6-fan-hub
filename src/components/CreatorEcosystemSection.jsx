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
    youtubeService.getLatestVideos().then(v => setVideos(v.slice(0, 1)));
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
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tighter drop-shadow-2xl">
            GTA6WORLD <span className="text-primary text-glow-sm">Originals</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto font-light text-sm">
            Curated videos, AI concepts, and fan edits straight from {SOCIAL_LINKS.CREATOR_NAME}.
          </p>
        </div>

        {/* Latest Videos (YouTube & IG) */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* YouTube Section */}
            <div className="flex flex-col h-full">
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mb-8 flex items-center gap-3">
                🎬 Featured <span className="text-[#FF0000]">Video</span>
              </h3>
              <div className="flex flex-col h-full">
                {videos.length === 0 ? (
                  <div className="rounded-2xl overflow-hidden glass-card flex-1 flex flex-col items-center justify-center border border-white/10 shadow-2xl p-12 text-center">
                    <span className="text-6xl mb-4 opacity-50">🎬</span>
                    <h4 className="text-2xl font-bold text-white mb-2">Videos Coming Soon</h4>
                    <p className="text-white/50 max-w-sm text-sm">Our creator team is hard at work on the next big video. Stay tuned.</p>
                  </div>
                ) : (
                  videos.map(video => (
                    <div key={video.id} className="rounded-2xl overflow-hidden glass-card card-hover-glow group relative flex flex-col border border-white/10 shadow-2xl h-full">
                      <div className="w-full relative z-20">
                        <YouTubeEmbed videoId={video.youtubeId} title={video.title} />
                      </div>
                      <div className="p-6 relative z-20 flex-1 flex flex-col justify-start bg-black/40 backdrop-blur-md">
                        <span className="text-xs text-primary uppercase font-bold tracking-widest">{video.category}</span>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white leading-tight mt-[16px]">{video.title}</h4>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Instagram Reels / Highlights */}
            <div className="flex flex-col h-full">
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mb-8 flex items-center gap-3">
                📸 Instagram <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#FD1D1D] to-[#C13584]">Reels</span>
              </h3>
              <div className="flex flex-col gap-4 h-full">
                {igHighlights.length === 0 ? (
                  <div className="rounded-2xl overflow-hidden glass-card flex-1 flex flex-col items-center justify-center border border-white/10 p-12 text-center h-full">
                    <span className="text-5xl mb-4 opacity-50">📱</span>
                    <h4 className="text-xl font-bold text-white mb-2">Reels Coming Soon</h4>
                    <p className="text-white/50 text-sm">Follow us on Instagram for the latest quick updates.</p>
                  </div>
                ) : (
                  igHighlights.map(item => (
                    <a key={item.id} href={item.embedUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group p-4 rounded-2xl glass-card card-hover-glow">
                      <div className="w-24 h-32 shrink-0 rounded-xl overflow-hidden relative shadow-lg">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                        <AssetImage src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 py-2">
                        <span className="text-[10px] text-primary uppercase font-bold tracking-widest px-2 py-1 bg-primary/10 rounded-md border border-primary/20">{item.type}</span>
                        <h4 className="text-lg font-bold text-white mt-3 group-hover:text-primary transition-colors leading-snug">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-3 text-xs text-white/50 font-medium">
                          <span>❤️ {item.likes}</span>
                          <span>•</span>
                          <span>View on Instagram</span>
                        </div>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        {/* AI Creations & Gameplay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* AI Creations */}
          <div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mb-8 flex items-center gap-3">
              🤖 AI <span className="text-primary">Generated</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 h-full">
              {aiCreations.length === 0 ? (
                <div className="col-span-2 rounded-2xl overflow-hidden glass-card flex-1 flex flex-col items-center justify-center border border-white/10 p-12 text-center h-full min-h-[250px]">
                  <span className="text-5xl mb-4 opacity-50">🤖</span>
                  <h4 className="text-xl font-bold text-white mb-2">AI Art Coming Soon</h4>
                  <p className="text-white/50 text-sm">Next-gen AI concepts and fan creations will be featured here.</p>
                </div>
              ) : (
                aiCreations.map(item => (
                  <a key={item.id} href={item.embedUrl} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="aspect-[4/5] relative rounded-2xl overflow-hidden glass-card card-hover-glow">
                      <AssetImage src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                        <h4 className="text-sm font-bold text-white leading-tight drop-shadow-md">{item.title}</h4>
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Gameplay Uploads */}
          <div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mb-8 flex items-center gap-3">
              🎮 Gameplay <span className="text-gta-gold">Uploads</span>
            </h3>
            <div className="glass-card p-10 h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,193,7,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="w-20 h-20 bg-gta-gold/10 rounded-full flex items-center justify-center mb-6 relative z-10 border border-gta-gold/20">
                  <span className="text-4xl">🕹️</span>
               </div>
               <h4 className="text-2xl font-bold text-white mb-4 relative z-10">Exclusive Gameplay</h4>
               <p className="text-white/60 mb-8 relative z-10">High quality 4K gameplay captures, myth-busting, and exploration directly from the creator studio.</p>
               <a href="/gameplay" className="btn-primary relative z-10 px-8 py-3 rounded-full text-sm">Watch Gameplay</a>
            </div>
          </div>
        </div>

        {/* Legacy */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-gta-purple/20 mix-blend-overlay pointer-events-none" />
          <div className="p-12 md:p-20 text-center relative z-10 flex flex-col items-center bg-black/40 backdrop-blur-sm">
            <h3 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-8 w-full">
              <div className="legacy-title-row">
                <span>🎮 GTA V LEGACY</span>
                <span className="transition-arrow text-white/30">→</span>
                <span className="text-primary">GTA VI FUTURE</span>
              </div>
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
