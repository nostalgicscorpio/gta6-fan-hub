import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiCalendar, HiClock, HiEye, HiDesktopComputer, HiTag } from 'react-icons/hi';
import { trailerService } from '../services/trailerService';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';

export default function TrailerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [trailer, setTrailer] = useState(null);
  const [allTrailers, setAllTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      trailerService.getTrailers(),
      trailerService.getTrailerById(id)
    ]).then(([data, currentTrailer]) => {
      if (!isMounted) return;
      setAllTrailers(data);
      setTrailer(currentTrailer || null);
      setIsLoading(false);
    });

    return () => { isMounted = false; };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 flex flex-col items-center justify-center bg-[#0B0B0D]">
        <div className="w-16 h-16 border-4 border-white/10 border-t-[#FF5FAF] rounded-full animate-spin shadow-[0_0_20px_rgba(255,95,175,0.4)]"></div>
      </div>
    );
  }

  const safeAllTrailers = allTrailers || [];
  const trailerIndex = safeAllTrailers.findIndex(item => String(item.id) === id || item.slug === id);
  const prevTrailer = trailerIndex > 0 ? safeAllTrailers[trailerIndex - 1] : null;
  const nextTrailer = trailerIndex !== -1 && trailerIndex < safeAllTrailers.length - 1 ? safeAllTrailers[trailerIndex + 1] : null;

  if (!trailer) {
    return (
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 px-6 flex flex-col items-center justify-center text-center bg-[#0B0B0D]">
        <h1 className="font-display font-black text-4xl text-white mb-4 uppercase">Transmission Lost</h1>
        <button onClick={() => navigate('/trailers')} className="text-[#FF5FAF] hover:text-white transition-colors cursor-pointer text-sm font-bold tracking-widest uppercase">
          Return to Hub
        </button>
      </div>
    );
  }

  const relatedTrailers = Array.isArray(trailer?.relatedTrailers)
    ? safeAllTrailers.filter(item => trailer.relatedTrailers.includes(item.slug))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 bg-[#0B0B0D] min-h-screen"
    >
      <SEO 
        title={`${trailer?.title || 'Loading'} - Official Video`} 
        description={trailer?.description || ''} 
        image={trailer?.thumbnail || ''} 
        schema={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": trailer?.title || '',
          "description": trailer?.description || '',
          "thumbnailUrl": [trailer?.thumbnail || ''],
          "uploadDate": trailer?.releaseDate || trailer?.date || '',
          "embedUrl": trailer?.videoUrl || ''
        }}
      />

      {/* Cinematic Hero Background */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] overflow-hidden opacity-30 pointer-events-none">
        <AssetImage
          src={trailer?.thumbnail}
          alt={trailer?.title}
          className="w-full h-full object-cover object-center blur-md scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
        <div className="absolute inset-0 bg-[#FF5FAF]/5 mix-blend-overlay z-10 pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col pt-[var(--navbar-height)] mt-8 sm:mt-12">
        <button
          onClick={() => navigate('/trailers')}
          className="flex items-center gap-2 text-white/60 hover:text-[#FF5FAF] transition-colors mb-10 w-fit group cursor-pointer text-xs font-bold tracking-widest uppercase"
        >
          <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Hub
        </button>

        {/* Video Embed */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(255,95,175,0.15)] border border-white/10 bg-black relative"
        >
          {/* Subtle top/bottom letterbox gradient for cinematic feel */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0B0B0D]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0B0D]/80 to-transparent pointer-events-none z-10" />
          
          {trailer.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.youtubeId}?autoplay=0&rel=0&modestbranding=1&color=white`}
              title={trailer.title}
              className="w-full h-full relative z-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : trailer.videoUrl ? (
            <video 
              src={trailer.videoUrl} 
              className="w-full h-full object-cover relative z-0"
              controls 
              poster={trailer.thumbnail}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-[#FF5FAF]/50 text-6xl mb-4 font-display">?</span>
              <p className="text-white/40 uppercase tracking-widest font-bold">Transmission Error</p>
            </div>
          )}
        </motion.div>

        {/* Info Section */}
        <div className="mt-16 flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex gap-4 mb-6">
                {trailer?.subtitle && (
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#FF5FAF] bg-white/5 border border-white/20 px-5 py-2 rounded-full shadow-lg inline-block backdrop-blur-md">
                    {trailer?.subtitle}
                  </span>
                )}
                {trailer?.tag && (
                  <span className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold text-white/70 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
                    <HiTag className="w-3 h-3 text-[#FF8A2A]" />
                    {trailer?.tag}
                  </span>
                )}
              </div>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-8 drop-shadow-2xl uppercase tracking-tight leading-[0.9]">
                {trailer?.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-[#9A9AA3] leading-[1.8] font-light mb-16 tracking-wide">
                {trailer?.description}
              </p>

              {/* Gallery */}
              {trailer?.gallery && Array.isArray(trailer.gallery) && trailer.gallery.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-wider">
                      Official <span className="text-[#9D4EDD]">Scenes</span>
                    </h3>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {(trailer.gallery || []).map((img, idx) => (
                      <div key={idx} className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-white/5">
                        <AssetImage src={img} alt={`${trailer?.title} screenshot ${idx + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:w-1/3">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 sticky top-32 shadow-2xl"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A9AA3] mb-8 border-b border-white/10 pb-4">
                Video Intel
              </h3>
              
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 text-[#FF5FAF] mb-2">
                    <HiCalendar className="w-5 h-5 opacity-80" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-90 text-white/50">Release Date</span>
                  </div>
                  <p className="text-white text-lg font-medium pl-8">{trailer?.releaseDate || trailer?.date}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-[#FF8A2A] mb-2">
                    <HiClock className="w-5 h-5 opacity-80" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-90 text-white/50">Duration</span>
                  </div>
                  <p className="text-white text-lg font-medium pl-8">{trailer?.duration}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-[#9D4EDD] mb-2">
                    <HiEye className="w-5 h-5 opacity-80" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-90 text-white/50">Views</span>
                  </div>
                  <p className="text-white text-lg font-medium pl-8">{trailer?.views}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-[#FF5FAF] mb-2">
                    <HiDesktopComputer className="w-5 h-5 opacity-80" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-90 text-white/50">Platform</span>
                  </div>
                  <p className="text-white text-base font-medium pl-8 leading-snug">{trailer?.platform}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Prev / Next Navigation */}
        <nav className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-center">
          {prevTrailer ? (
            <div 
              onClick={() => navigate(`/trailers/${prevTrailer.slug}`)}
              className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-start p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#FF5FAF]/30 hover:shadow-[0_0_30px_rgba(255,95,175,0.1)] transition-all duration-300"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#9A9AA3] uppercase font-bold mb-3 flex items-center gap-2">
                <HiArrowLeft className="text-[#FF5FAF] transition-transform group-hover:-translate-x-1" /> Previous Video
              </span>
              <h4 className="font-display font-bold text-white text-xl sm:text-2xl group-hover:text-[#FF5FAF] transition-colors line-clamp-1">
                {prevTrailer.title}
              </h4>
            </div>
          ) : <div className="w-full sm:w-1/2" />}
          
          {nextTrailer ? (
            <div 
              onClick={() => navigate(`/trailers/${nextTrailer.slug}`)}
              className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-end text-right p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#FF8A2A]/30 hover:shadow-[0_0_30px_rgba(255,138,42,0.1)] transition-all duration-300"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#9A9AA3] uppercase font-bold mb-3 flex items-center gap-2">
                Next Video <svg className="w-4 h-4 text-[#FF8A2A] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
              <h4 className="font-display font-bold text-white text-xl sm:text-2xl group-hover:text-[#FF8A2A] transition-colors line-clamp-1">
                {nextTrailer.title}
              </h4>
            </div>
          ) : <div className="w-full sm:w-1/2" />}
        </nav>

        {/* Related Trailers */}
        {relatedTrailers && relatedTrailers.length > 0 && (
          <div className="mt-24 mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-wider">
                Related <span className="text-[#FF8A2A]">Content</span>
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(relatedTrailers || []).map((related) => (
                <div 
                  key={related?.id || Math.random()}
                  onClick={() => navigate(`/trailers/${related?.slug}`)}
                  className="group cursor-pointer bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF8A2A]/40 hover:shadow-[0_15px_40px_rgba(255,138,42,0.15)] transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <AssetImage 
                      src={related?.thumbnail} 
                      alt={related?.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-[9px] tracking-widest uppercase font-bold text-[#FF8A2A] mb-2">
                      {related?.subtitle || 'Related'}
                    </p>
                    <h4 className="font-display font-bold text-white text-lg group-hover:text-[#FF8A2A] transition-colors line-clamp-2 leading-tight">
                      {related?.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
