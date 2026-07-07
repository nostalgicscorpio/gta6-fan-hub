import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { HiX, HiChevronLeft, HiChevronRight, HiDownload, HiCalendar, HiLocationMarker, HiTag, HiVideoCamera, HiUsers } from 'react-icons/hi';
import { categories } from '../data/mediaGallery';
import { galleryService } from '../services/galleryService';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';
import NavOffset from '../components/NavOffset';

// --- Reusable Lightbox Component ---
function MediaLightbox({ item, allItems, onClose, onNavigate }) {
 const currentIdx = allItems.findIndex((i) => i.id === item.id);
 const containerRef = useRef(null);

 useEffect(() => {
 containerRef.current?.focus();
 // Prevent scrolling when lightbox is open
 document.body.style.overflow = 'hidden';
 return () => { document.body.style.overflow = ''; };
 }, [item.id]);

 const handleKeyDown = useCallback((e) => {
 if (e.key === 'Escape') onClose();
 if (e.key === 'ArrowLeft' && currentIdx > 0) onNavigate(allItems[currentIdx - 1].id);
 if (e.key === 'ArrowRight' && currentIdx < allItems.length - 1) onNavigate(allItems[currentIdx + 1].id);
 }, [currentIdx, onClose, onNavigate, allItems]);

 return (
 <motion.div
 ref={containerRef}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
 onClick={onClose}
 onKeyDown={handleKeyDown}
 tabIndex={0}
 >
 {/* Controls Header */}
 <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
 <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs tracking-widest uppercase font-bold text-white shadow-lg">
 {currentIdx + 1} / {allItems.length}
 </div>
 <button
 onClick={onClose}
 className="p-3 bg-white/10 hover:bg-primary hover:text-black rounded-full text-white transition-colors border border-white/20 cursor-pointer shadow-lg"
 >
 <HiX className="w-6 h-6" />
 </button>
 </div>

 {/* Navigation Arrows */}
 {currentIdx > 0 && (
 <button
 onClick={(e) => { e.stopPropagation(); onNavigate(allItems[currentIdx - 1].id); }}
 className="absolute left-6 z-50 p-4 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-primary hover:bg-white/10 transition-all cursor-pointer hidden sm:block shadow-lg"
 >
 <HiChevronLeft className="w-8 h-8" />
 </button>
 )}
 {currentIdx < allItems.length - 1 && (
 <button
 onClick={(e) => { e.stopPropagation(); onNavigate(allItems[currentIdx + 1].id); }}
 className="absolute right-6 z-50 p-4 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-primary hover:bg-white/10 transition-all cursor-pointer hidden sm:block shadow-lg"
 >
 <HiChevronRight className="w-8 h-8" />
 </button>
 )}

 {/* Main Content Area */}
 <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center pt-24 pb-10 px-6 lg:px-24 gap-10">
 
 {/* Image Container */}
 <motion.div
 key={item.id}
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: -20 }}
 transition={{ type: "spring", stiffness: 200, damping: 20 }}
 className="relative flex-1 w-full flex items-center justify-center overflow-hidden"
 onClick={(e) => e.stopPropagation()}
 >
 <div className="relative w-full max-w-7xl mx-auto h-[60vh] md:h-[80vh] flex items-center justify-center">
 <AssetImage
 src={item.src}
 alt={item.title}
 className="max-w-full max-h-full object-contain drop-shadow-2xl"
 />
 </div>
 </motion.div>

 {/* Metadata Sidebar */}
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 20 }}
 transition={{ delay: 0.1, duration: 0.3 }}
 className="w-full lg:w-96 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 overflow-y-auto max-h-[80vh] custom-scrollbar shadow-2xl"
 onClick={(e) => e.stopPropagation()}
 >
 <div className="mb-6 border-b border-white/10 pb-6">
 <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary bg-primary/10 px-3 py-1 rounded-sm">
 {item.category}
 </span>
 <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-4 leading-tight">
 {item.title}
 </h2>
 <p className="text-white/70 text-sm mt-4 leading-relaxed font-light">
 {item.description}
 </p>
 </div>

 <div className="space-y-5">
 {item.location && (
 <div className="flex items-start gap-3 text-sm">
 <HiLocationMarker className="w-5 h-5 text-primary shrink-0 mt-0.5" />
 <div>
 <p className="text-[10px] uppercase tracking-widest text-gta-muted font-bold">Location</p>
 <p className="text-white">{item.location}</p>
 </div>
 </div>
 )}
 
 {item.releaseDate && (
 <div className="flex items-start gap-3 text-sm">
 <HiCalendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
 <div>
 <p className="text-[10px] uppercase tracking-widest text-gta-muted font-bold">Released</p>
 <p className="text-white">{item.releaseDate}</p>
 </div>
 </div>
 )}

 {item.trailerSource && (
 <div className="flex items-start gap-3 text-sm">
 <HiVideoCamera className="w-5 h-5 text-primary shrink-0 mt-0.5" />
 <div>
 <p className="text-[10px] uppercase tracking-widest text-gta-muted font-bold">Source</p>
 <p className="text-white">{item.trailerSource}</p>
 </div>
 </div>
 )}

 {item.charactersShown && item.charactersShown.length > 0 && (
 <div className="flex items-start gap-3 text-sm">
 <HiUsers className="w-5 h-5 text-primary shrink-0 mt-0.5" />
 <div>
 <p className="text-[10px] uppercase tracking-widest text-gta-muted font-bold">Featured</p>
 <p className="text-white">{item.charactersShown.join(', ')}</p>
 </div>
 </div>
 )}

 {item.tags && item.tags.length > 0 && (
 <div className="flex items-start gap-3 text-sm border-t border-white/10 pt-5 mt-5">
 <HiTag className="w-5 h-5 text-primary shrink-0 mt-0.5" />
 <div className="flex flex-wrap gap-2">
 {item.tags.map((tag, i) => (
 <span key={i} className="text-[10px] uppercase tracking-widest font-bold text-white/50 bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
 {tag}
 </span>
 ))}
 </div>
 </div>
 )}
 </div>

 <div className="mt-8 pt-6 border-t border-white/10">
 <button className="w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-black transition-all border border-primary/30 hover:border-transparent rounded-xl flex justify-center items-center gap-2 font-bold uppercase tracking-widest text-xs cursor-pointer group shadow-[0_0_10px_rgba(255,45,120,0.1)] hover:shadow-[0_0_15px_rgba(255,45,120,0.3)]">
 <HiDownload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
 Download Source
 </button>
 </div>
 </motion.div>
 </div>
 </motion.div>
 );
}

// --- Main Page Component ---
export default function MediaGalleryPage() {
 const [searchParams, setSearchParams] = useSearchParams();
 const [activeCategory, setActiveCategory] = useState('All');
 const [mediaItems, setMediaItems] = useState([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  galleryService.getGallery().then(data => {
    setMediaItems(data);
    setIsLoading(false);
  });
 }, []);

 // Filter logic
 const displayedMedia = activeCategory === 'All' 
 ? mediaItems 
 : mediaItems.filter(item => item.category === activeCategory);

 // Read URL for deep-linking an image
 const itemId = searchParams.get('item');
 const selectedItem = mediaItems.find(i => i.id === itemId) || null;

 const openLightbox = (id) => {
 setSearchParams({ item: id });
 };

 const closeLightbox = () => {
 setSearchParams({});
 };

 const navigateLightbox = (id) => {
 setSearchParams({ item: id });
 };

 // Scroll to top is handled in the main useEffect

 return (
 <div className="min-h-screen bg-gta-black pb-24 overflow-x-hidden font-sans flex flex-col">
 <SEO 
 title="Media Gallery" 
 description="View official screenshots, artwork, and wallpapers for Grand Theft Auto VI." 
 schema={{
 "@context": "https://schema.org",
 "@type": "WebPage",
 "name": "Media Gallery - GTA VI",
 "description": "View official screenshots, artwork, and wallpapers for Grand Theft Auto VI."
 }}
 />
 <NavOffset />
 <div className="max-w-[1600px] mx-auto px-6 lg:px-8 mt-12 sm:mt-16">
 
 {/* Header Section */}
 <div className="flex flex-col items-center text-center mb-16">
 <p className="text-[12px] tracking-[0.5em] uppercase text-primary font-bold mb-4 ">
 Official Assets
 </p>
 <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white drop-shadow-2xl mb-12">
 MEDIA <span className="text-primary">GALLERY</span>
 </h1>

 {/* Filter Chips */}
 <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl">
 {categories.map((cat) => (
 <button
 key={cat}
 onClick={() => setActiveCategory(cat)}
 className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 cursor-pointer border ${
 activeCategory === cat
 ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(255,45,120,0.3)] scale-105'
 : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
 }`}
 >
 {cat}
 </button>
 ))}
 </div>
 </div>

 {/* Masonry Grid */}
 {isLoading ? (
 <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
 {[...Array(8)].map((_, i) => (
 <div key={i} className="break-inside-avoid glass-card border border-white/10 shadow-xl overflow-hidden animate-pulse">
 <div className="aspect-[4/3] sm:aspect-auto sm:h-64 bg-white/5 w-full"></div>
 </div>
 ))}
 </div>
 ) : (
 <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
 <AnimatePresence>
 {displayedMedia.map((item, i) => (
 <motion.div
 layout
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95 }}
 transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
 key={item.id}
 className="break-inside-avoid relative group cursor-pointer"
 onClick={() => openLightbox(item.id)}
 >
 <div className="relative glass-card border border-white/10 shadow-xl group-hover:shadow-[0_10px_40px_rgba(255,106,0,0.15)] group-hover:border-primary/30 transition-all duration-500">
 <div className="aspect-[4/3] sm:aspect-auto sm:h-64 overflow-hidden relative">
 <AssetImage
 src={item.src}
 alt={item.title}
 loading="lazy"
 className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-out"
 />
 </div>
 
 {/* Hover Overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 card-content justify-end">
 <p className="text-[10px] tracking-widest uppercase font-bold text-primary mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
 {item.category}
 </p>
 <h3 className="font-display font-bold text-white text-xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
 {item.title}
 </h3>
 </div>
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 </motion.div>
 )}
 
 {!isLoading && displayedMedia.length === 0 && (
 <div className="text-center py-20 text-gta-muted text-lg">
 No media found in this category.
 </div>
 )}

 </div>

 {/* Lightbox Portal */}
 <AnimatePresence>
 {selectedItem && (
 <MediaLightbox
 item={selectedItem}
 allItems={displayedMedia.length > 0 ? displayedMedia : mediaItems}
 onClose={closeLightbox}
 onNavigate={navigateLightbox}
 />
 )}
 </AnimatePresence>
 </div>
 );
}
