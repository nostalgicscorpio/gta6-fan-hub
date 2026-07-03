import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCalendar, HiClock, HiEye } from 'react-icons/hi';
import { trailers } from '../data/trailers';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';
import NavOffset from '../components/NavOffset';

export default function TrailersHub() {
 const [lightboxOpen, setLightboxOpen] = useState(false);
 const [activeImage, setActiveImage] = useState('');

 useEffect(() => {
 window.scrollTo({ top: 0, behavior: 'instant' });
 }, []);

 const openLightbox = (img) => {
 setActiveImage(img);
 setLightboxOpen(true);
 document.body.style.overflow = 'hidden';
 };

 const closeLightbox = () => {
 setLightboxOpen(false);
 setActiveImage('');
 document.body.style.overflow = '';
 };

 const heroTrailer = trailers.find(t => t.featured) || trailers[0];

 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.5 }}
 className="bg-gta-black min-h-screen relative pb-32"
 >
 <SEO 
 title="Official Trailers - GTA VI" 
 description="Watch the official Grand Theft Auto VI trailers." 
 image={heroTrailer?.thumbnail} 
 schema={{
 "@context": "https://schema.org",
 "@type": "WebPage",
 "name": "Official Trailers - GTA VI",
 "description": "Watch the official Grand Theft Auto VI trailers."
 }}
 />

 {/* Cinematic Hero Background */}
 {heroTrailer?.thumbnail && (
 <div className="absolute top-0 left-0 right-0 h-[70vh] overflow-hidden opacity-30 pointer-events-none">
 <AssetImage
 src={heroTrailer.thumbnail}
 alt="Hero Background"
 className="w-full h-full object-cover object-center blur-sm scale-110"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-gta-black via-gta-black/80 to-transparent" />
 </div>
 )}

 <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col">
 <NavOffset />
 <div className="pt-8 sm:pt-12">
 <div className="mb-20 text-center">
 <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter uppercase drop-shadow-2xl mb-6">
 Official <span className="text-primary ">Trailers</span>
 </h1>
 <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
 Experience the next generation of Grand Theft Auto. Watch the latest official trailers and explore exclusive key scenes from Leonida.
 </p>
 </div>

 <div className="space-y-32">
 {trailers.map((trailer) => (
 <div key={trailer.id} className="relative z-10 flex flex-col gap-12">
 
 {/* Trailer Header Info */}
 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/10 pb-6">
 <div>
 {trailer.subtitle && (
 <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-primary mb-3 block">
 {trailer.subtitle}
 </span>
 )}
 <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
 {trailer.title}
 </h2>
 </div>
 
 {/* Stats row */}
 <div className="flex flex-wrap items-center gap-6 lg:gap-10">
 {trailer.date && (
 <div className="flex flex-col">
 <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 mb-1"><HiCalendar className="text-primary" /> Release</span>
 <span className="text-white font-medium">{trailer.date}</span>
 </div>
 )}
 {trailer.duration && (
 <div className="flex flex-col">
 <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 mb-1"><HiClock className="text-primary" /> Duration</span>
 <span className="text-white font-medium">{trailer.duration}</span>
 </div>
 )}
 {trailer.views && (
 <div className="flex flex-col">
 <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 mb-1"><HiEye className="text-primary" /> Views</span>
 <span className="text-white font-medium">{trailer.views}</span>
 </div>
 )}
 </div>
 </div>

 {/* Video Player */}
 <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.6)] border border-white/10 bg-black relative group">
 {trailer.youtubeId ? (
 <>
 <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
 <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
 <iframe
 src={`https://www.youtube.com/embed/${trailer.youtubeId}?autoplay=0&rel=0&modestbranding=1&color=white`}
 title={trailer.title}
 className="w-full h-full relative z-0"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowFullScreen
 />
 </>
 ) : (
 <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02]">
 <span className="text-primary/50 text-6xl mb-4 font-display">?</span>
 <p className="text-white/40 uppercase tracking-widest font-bold">Transmission Pending</p>
 </div>
 )}
 </div>

 {/* Description & Gallery */}
 <div className="flex flex-col lg:flex-row gap-12">
 <div className="lg:w-1/3">
 {trailer.description ? (
 <p className="text-lg text-white/70 leading-relaxed font-light">
 {trailer.description}
 </p>
 ) : (
 <p className="text-lg text-white/30 italic">No description available.</p>
 )}
 
 {trailer.platform && (
 <div className="mt-8 pt-8 border-t border-white/10">
 <span className="text-[10px] uppercase tracking-widest text-white/50 mb-2 block">Platforms</span>
 <p className="text-white font-medium">{trailer.platform}</p>
 </div>
 )}
 </div>

 <div className="lg:w-2/3">
 {trailer.gallery && trailer.gallery.length > 0 && (
 <div>
 <h3 className="text-sm font-display font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
 <span className="w-8 h-[1px] bg-primary/50"></span> Official Scenes
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {trailer.gallery.map((img, idx) => (
 <div 
 key={idx} 
 onClick={() => openLightbox(img)}
 className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg cursor-pointer group/img border border-white/5 relative"
 >
 <AssetImage 
 src={img} 
 alt={`${trailer.title} Scene ${idx + 1}`} 
 loading="lazy" 
 className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" 
 />
 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
 <span className="text-white font-bold tracking-widest uppercase text-[10px] bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">View</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>

 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Lightbox */}
 <AnimatePresence>
 {lightboxOpen && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 lg:p-12"
 onClick={closeLightbox}
 >
 <button 
 onClick={closeLightbox}
 className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all cursor-pointer z-50"
 >
 <HiX size={24} />
 </button>
 <motion.div
 initial={{ scale: 0.95, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.95, opacity: 0 }}
 transition={{ type: "spring", damping: 25, stiffness: 300 }}
 className="relative max-w-7xl w-full h-full max-h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10"
 onClick={(e) => e.stopPropagation()}
 >
 <AssetImage src={activeImage} alt="Fullscreen Scene" className="w-full h-full object-contain bg-black" />
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 </motion.div>
 );
}
