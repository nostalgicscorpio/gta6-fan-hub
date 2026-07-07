import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiCalendar, HiClock, HiEye, HiDesktopComputer, HiTag } from 'react-icons/hi';
import { trailerService } from '../services/trailerService';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';
import NavOffset from '../components/NavOffset';

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
   <div className="min-h-screen pt-[var(--navbar-height)] pb-20 flex flex-col items-center justify-center bg-gta-black">
    <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin shadow-[0_0_15px_rgba(255,45,120,0.5)]"></div>
   </div>
  );
 }

 console.log("Trailer loaded:", trailer);

 const safeAllTrailers = allTrailers || [];
 const trailerIndex = safeAllTrailers.findIndex(item => String(item.id) === id || item.slug === id);
 const prevTrailer = trailerIndex > 0 ? safeAllTrailers[trailerIndex - 1] : null;
 const nextTrailer = trailerIndex !== -1 && trailerIndex < safeAllTrailers.length - 1 ? safeAllTrailers[trailerIndex + 1] : null;

 if (!trailer) {
 return (
 <div className="min-h-screen pt-[var(--navbar-height)] pb-20 px-6 flex flex-col items-center justify-center text-center bg-gta-black">
 <h1 className="font-display text-4xl text-white mb-4">Trailer Not Found</h1>
 <button onClick={() => navigate('/')} className="text-primary hover:text-white transition-colors cursor-pointer">
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
 className="pb-24 bg-gta-black"
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
 className="w-full h-full object-cover object-center blur-sm scale-110"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-gta-black to-transparent" />
 </div>

 <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col">
 <NavOffset />
 <div className="pt-8 sm:pt-12">
 <button
 onClick={() => navigate('/')}
 className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-10 w-fit group cursor-pointer text-sm font-medium tracking-wider uppercase"
 >
 <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
 Back to Hub
 </button>

 {/* Video Embed */}
 <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.9)] border border-white/10 bg-black relative">
 {/* Subtle top/bottom letterbox gradient for cinematic feel */}
 <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
 <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
 
 <iframe
 src={`https://www.youtube.com/embed/${trailer?.youtubeId}?autoplay=0&rel=0&modestbranding=1&color=white`}
 title={trailer?.title}
 className="w-full h-full relative z-0"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowFullScreen
 />
 </div>

 {/* Info Section */}
 <div className="mt-16 flex flex-col lg:flex-row gap-16">
 {/* Main Content */}
 <div className="lg:w-2/3">
 <div className="flex gap-4 mb-6">
 {trailer?.subtitle && (
 <span className="text-[12px] tracking-[0.5em] uppercase font-bold text-black bg-primary px-4 py-1.5 rounded-sm shadow-[0_0_30px_rgba(255,106,0,0.3)] inline-block">
 {trailer?.subtitle}
 </span>
 )}
 {trailer?.tag && (
 <span className="flex items-center gap-1.5 text-[12px] tracking-wider uppercase font-bold text-white/70 border border-white/10 px-4 py-1.5 rounded-sm">
 <HiTag className="w-3 h-3" />
 {trailer?.tag}
 </span>
 )}
 </div>
 <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-8 drop-shadow-2xl uppercase tracking-tight leading-[0.9]">
 {trailer?.title}
 </h1>
 
 <p className="text-xl sm:text-2xl text-white/80 leading-loose font-light mb-16 tracking-wide drop-shadow-md">
 {trailer?.description}
 </p>

 {/* Gallery */}
 {trailer?.gallery && Array.isArray(trailer.gallery) && trailer.gallery.length > 0 && (
 <div className="mb-12">
 <h3 className="text-sm font-display font-bold uppercase tracking-widest text-primary mb-6">Gallery</h3>
 <div className="grid grid-cols-2 gap-4">
 {(trailer.gallery || []).map((img, idx) => (
 <div key={idx} className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
 <AssetImage src={img} alt={`${trailer?.title} screenshot ${idx + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
 </div>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* Sidebar Stats */}
 <div className="lg:w-1/3">
 <div className="glass-card p-[var(--card-padding)] border border-white/5 sticky top-32 shadow-2xl">
 <h3 className="text-sm font-display font-bold uppercase tracking-widest text-white/50 mb-8 border-b border-white/10 pb-4">
 Trailer Stats
 </h3>
 
 <div className="space-y-8">
 <div>
 <div className="flex items-center gap-3 text-primary mb-2">
 <HiCalendar className="w-5 h-5 opacity-80" />
 <span className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-90">Release Date</span>
 </div>
 <p className="text-white text-xl font-medium pl-8">{trailer?.releaseDate || trailer?.date}</p>
 </div>

 <div>
 <div className="flex items-center gap-3 text-primary mb-2">
 <HiClock className="w-5 h-5 opacity-80" />
 <span className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-90">Duration</span>
 </div>
 <p className="text-white text-xl font-medium pl-8">{trailer?.duration}</p>
 </div>

 <div>
 <div className="flex items-center gap-3 text-primary mb-2">
 <HiEye className="w-5 h-5 opacity-80" />
 <span className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-90">Views</span>
 </div>
 <p className="text-white text-xl font-medium pl-8">{trailer?.views}</p>
 </div>

 <div>
 <div className="flex items-center gap-3 text-primary mb-2">
 <HiDesktopComputer className="w-5 h-5 opacity-80" />
 <span className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-90">Platform</span>
 </div>
 <p className="text-white text-lg font-medium pl-8 leading-snug">{trailer?.platform}</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Prev / Next Navigation */}
 <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-center">
 {prevTrailer ? (
 <div 
 onClick={() => navigate(`/trailers/${prevTrailer.slug}`)}
 className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-start p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-primary/20"
 >
 <span className="text-[10px] tracking-widest text-gta-muted uppercase font-bold mb-2 flex items-center gap-2">
 <HiArrowLeft className="text-primary transition-transform group-hover:-translate-x-1" /> Previous Trailer
 </span>
 <h4 className="font-display font-bold text-white text-lg group-hover:text-primary transition-colors line-clamp-1">
 {prevTrailer.title}
 </h4>
 </div>
 ) : <div className="w-full sm:w-1/2" />}
 
 {nextTrailer ? (
 <div 
 onClick={() => navigate(`/trailers/${nextTrailer.slug}`)}
 className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-end text-right p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-primary/20"
 >
 <span className="text-[10px] tracking-widest text-gta-muted uppercase font-bold mb-2 flex items-center gap-2">
 Next Trailer <HiArrowLeft className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1 rotate-180" />
 </span>
 <h4 className="font-display font-bold text-white text-lg group-hover:text-primary transition-colors line-clamp-1">
 {nextTrailer.title}
 </h4>
 </div>
 ) : <div className="w-full sm:w-1/2" />}
 </div>

 {/* Related Trailers */}
 {relatedTrailers && relatedTrailers.length > 0 && (
 <div className="mt-20">
 <h3 className="font-display font-black text-3xl text-white mb-8 border-b border-white/10 pb-4">
 More <span className="text-primary">Trailers</span>
 </h3>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 {(relatedTrailers || []).map((related) => (
 <div 
 key={related?.id || Math.random()}
 onClick={() => navigate(`/trailers/${related?.slug}`)}
 className="group cursor-pointer glass-card card-hover-glow flex flex-col h-full border border-white/5"
 >
 <div className="relative aspect-video overflow-hidden">
 <AssetImage 
 src={related?.thumbnail} 
 alt={related?.title}
 loading="lazy"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
 />
 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
 </div>
 <div className="card-content">
 <p className="text-[10px] tracking-widest uppercase font-bold text-primary mb-2">
 {related?.subtitle}
 </p>
 <h4 className="font-display font-bold text-white text-xl group-hover:text-primary transition-colors line-clamp-1">
 {related?.title}
 </h4>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 </motion.div>
 );
}
