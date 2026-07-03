import { useState } from 'react';
import { HiPlay } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function YouTubeEmbed({ videoId, title = "YouTube Video", thumbnailFallback = "" }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate YouTube thumbnail URL
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : thumbnailFallback;

  if (!videoId) {
    return (
      <div className="relative aspect-video w-full bg-[#1B1C22] rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.05)]">
        <span className="text-white/40 font-display uppercase tracking-widest text-sm">Video Unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#131316] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.45)] group cursor-pointer">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center" onClick={() => setIsLoaded(true)}>
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              if (thumbnailFallback) e.target.src = thumbnailFallback;
            }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          
          {/* Custom Premium Play Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#FF4FA2] group-hover:border-[#FF4FA2] group-hover:shadow-[0_0_40px_rgba(255,79,162,0.6)] transition-all duration-300"
          >
            <HiPlay className="w-10 h-10 text-white group-hover:text-black ml-1 transition-colors duration-300" />
          </motion.div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
}
