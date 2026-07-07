import { useState } from 'react';
import { HiPlay } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { normalizeYouTubeId } from '../utils/youtubeUtils';

export default function YouTubeEmbed({ videoId, title = "YouTube Video", thumbnailFallback = "" }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const parsedId = normalizeYouTubeId(videoId);
  const thumbnailUrl = parsedId ? `https://img.youtube.com/vi/${parsedId}/maxresdefault.jpg` : thumbnailFallback;

  if (!parsedId) {
    return (
      <div className="relative aspect-video w-full bg-[#1B1C22] rounded-xl flex flex-col items-center justify-center border border-white/10 p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        <span className="text-[#FF0000] text-4xl mb-4">⚠️</span>
        <h4 className="text-white font-display uppercase tracking-widest text-lg mb-2 font-bold">Video Unavailable</h4>
        <p className="text-white/50 text-sm mb-6 max-w-sm">This video cannot currently be embedded.</p>
        <div className="flex items-center gap-4 z-10">
          <a href={videoId ? (videoId.includes('http') ? videoId : `https://www.youtube.com/watch?v=${videoId}`) : 'https://youtube.com'} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-[#FF0000] text-white text-xs font-bold rounded-full uppercase tracking-widest hover:bg-[#FF0000]/80 transition-colors">
            Watch on YouTube
          </a>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-white/10 text-white text-xs font-bold rounded-full uppercase tracking-widest hover:bg-white/20 transition-colors">
            Retry
          </button>
        </div>
        {thumbnailFallback && (
          <img src={thumbnailFallback} alt="Fallback" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
        )}
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

          <a 
            href={`https://www.youtube.com/watch?v=${parsedId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-black/60 hover:bg-[#FF0000] text-white text-xs font-bold rounded-md backdrop-blur-md transition-colors border border-white/10 flex items-center gap-2"
          >
            Watch on YouTube
          </a>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${parsedId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
}
