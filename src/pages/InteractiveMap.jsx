import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { HiX, HiLocationMarker, HiInformationCircle, HiCollection, HiPhotograph, HiArrowLeft } from 'react-icons/hi';
import { ASSETS } from '../config/assets';
import { locations, mapCategories } from '../data/mapLocations';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';

export default function InteractiveMap() {
 const [searchParams, setSearchParams] = useSearchParams();
 const navigate = useNavigate();
 
 const [activeCategory, setActiveCategory] = useState('all');
 const [selectedLoc, setSelectedLoc] = useState(null);
 const mapContainerRef = useRef(null);

 // Auto-select location from URL parameter
 useEffect(() => {
 const locId = searchParams.get('location');
 if (locId) {
 const found = locations.find(l => l.id === locId || l.name === locId);
 if (found) {
 setSelectedLoc(found);
 }
 }
 }, [searchParams]);

 // Handle marker click
 const handleMarkerClick = (loc) => {
 setSelectedLoc(loc);
 setSearchParams({ location: loc.id });
 };

 // Close panel
 const handleClosePanel = () => {
 setSelectedLoc(null);
 setSearchParams({});
 };

 // Filter locations
 const filteredLocations = activeCategory === 'all' 
 ? locations 
 : locations.filter(loc => loc.category === activeCategory);

 // Helper to get color for category
 const getCatColor = (catId) => {
 const cat = mapCategories.find(c => c.id === catId) || mapCategories.find(c => c.id === 'all');
 // Map tailwind class to actual hex/rgba if needed, but since we are just adding classnames we can just return it.
 // Actually, we can use the exact bg color classes.
 return cat.color;
 };

 return (
 <div className="relative pt-[var(--navbar-height)] h-screen w-full bg-[#050505] overflow-hidden flex flex-col font-sans">
 <SEO 
 title="Interactive Map" 
 schema={{
 "@context": "https://schema.org",
 "@type": "Map",
 "name": "Leonida Interactive Map",
 "description": "Explore the interactive map of Leonida and Vice City in Grand Theft Auto VI."
 }}
 />
 
 {/* Top Bar for Mobile/Quick Exit */}
 <div className="absolute top-[calc(var(--navbar-height)+1rem)] left-4 z-50 flex items-center gap-2">
 <button 
 onClick={() => navigate('/')}
 className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-3 text-white/70 hover:text-primary hover:shadow-[0_0_10px_rgba(255,45,120,0.2)] transition-all cursor-pointer"
 title="Back to Hub"
 >
 <HiArrowLeft className="w-5 h-5" />
 </button>
 </div>

 {/* Map Drag Container */}
 <div className="relative flex-1 w-full h-full overflow-hidden" ref={mapContainerRef}>
 <motion.div
 drag
 dragConstraints={mapContainerRef}
 dragElastic={0.1}
 initial={{ scale: 1.2, x: 0, y: 0 }}
 animate={{ scale: selectedLoc ? 1.4 : 1.2 }}
 transition={{ duration: 0.8, ease: "easeInOut" }}
 className="absolute origin-center cursor-grab active:cursor-grabbing w-[150vw] h-[150vh] sm:w-[120vw] sm:h-[120vh] -left-1/4 -top-1/4"
 >
 {/* Map Image - Configured to scale and span the drag container */}
 <AssetImage 
 src={ASSETS.LOCATIONS.LEONIDA_MAP} 
 alt="Interactive Map of Leonida" 
 className="w-full h-full object-cover select-none pointer-events-none opacity-80"
 />
 {/* Subtle Grid Overlay for Tech Look */}
 <div 
 className="absolute inset-0 bg-repeat opacity-10 pointer-events-none mix-blend-overlay"
 style={{ backgroundImage: `url(${ASSETS.UI.GRID})` }}
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-60" />

 {/* Markers */}
 {filteredLocations.map((loc) => {
 const isSelected = selectedLoc?.id === loc.id;
 const catColor = getCatColor(loc.category);
 // Convert bg-color class to text-color for glow if needed, or just use the bg class for the dot.
 
 return (
 <motion.div
 key={loc.id}
 className="absolute"
 style={{ left: loc.coordinates.x, top: loc.coordinates.y, transform: 'translate(-50%, -50%)' }}
 initial={{ opacity: 0, scale: 0 }}
 animate={{ opacity: 1, scale: isSelected ? 1.3 : 1 }}
 transition={{ duration: 0.3 }}
 >
 <div 
 onClick={() => handleMarkerClick(loc)}
 className="relative group cursor-pointer"
 >
 {/* Pulse Effect */}
 {isSelected && (
 <div className={`absolute inset-0 w-8 h-8 -ml-2 -mt-2 rounded-full animate-ping opacity-60 ${catColor}`} />
 )}
 {/* Pin */}
 <div className={`relative z-10 w-4 h-4 rounded-full ${catColor} border-2 border-black shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:scale-125 transition-transform duration-200`} />
 
 {/* Hover Tooltip (hidden if selected) */}
 {!isSelected && (
 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/80 backdrop-blur border border-white/10 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20 shadow-xl">
 <p className="text-xs font-bold text-white font-display uppercase tracking-wider">{loc.name}</p>
 </div>
 )}
 </div>
 </motion.div>
 );
 })}
 </motion.div>
 </div>

 {/* Floating Filter Panel */}
 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-6 sm:bottom-6 z-40 w-[90%] sm:w-auto overflow-x-auto scrollbar-hide">
 <div className="glass-card p-3 flex sm:flex-col gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10 max-h-[60vh] overflow-y-auto">
 {mapCategories.map(cat => (
 <button
 key={cat.id}
 onClick={() => setActiveCategory(cat.id)}
 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left whitespace-nowrap cursor-pointer ${
 activeCategory === cat.id 
 ? 'bg-white/10 border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]' 
 : 'hover:bg-white/5 border-transparent opacity-60 hover:opacity-100'
 } border`}
 >
 <div className={`w-3 h-3 rounded-full ${cat.color} shadow-[0_0_10px_currentColor]`} />
 <span className="text-[11px] font-bold uppercase tracking-widest text-white">{cat.name}</span>
 </button>
 ))}
 </div>
 </div>

 {/* Details Side Panel */}
 <AnimatePresence>
 {selectedLoc && (
 <motion.div
 initial={{ x: '100%', opacity: 0 }}
 animate={{ x: 0, opacity: 1 }}
 exit={{ x: '100%', opacity: 0 }}
 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
 className="absolute top-16 lg:top-20 right-0 bottom-0 w-full sm:w-96 bg-black/80 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-50 flex flex-col overflow-hidden"
 >
 {/* Header Image */}
 <div className="relative h-48 sm:h-64 shrink-0 bg-gta-card">
 {selectedLoc.image ? (
 <AssetImage src={selectedLoc.image} alt={selectedLoc.name} className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full flex items-center justify-center">
 <HiPhotograph className="w-12 h-12 text-white/20" />
 </div>
 )}
 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
 
 <button 
 onClick={handleClosePanel}
 className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-primary hover:text-black rounded-full text-white transition-colors cursor-pointer"
 >
 <HiX className="w-5 h-5" />
 </button>

 <div className="absolute bottom-4 left-6 right-6">
 <div className="flex items-center gap-2 mb-2">
 <div className={`w-2 h-2 rounded-full ${getCatColor(selectedLoc.category)}`} />
 <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/70">
 {mapCategories.find(c => c.id === selectedLoc.category)?.name || selectedLoc.category}
 </span>
 </div>
 <h2 className="font-display font-black text-3xl text-white leading-tight uppercase tracking-tight">
 {selectedLoc.name}
 </h2>
 </div>
 </div>

 {/* Content Scroll Area */}
 <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
 
 {/* Description */}
 <div>
 <p className="text-white/80 leading-relaxed font-light text-sm">
 {selectedLoc.desc}
 </p>
 </div>

 {/* Metadata Grid */}
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-white/5 rounded-xl p-4 border border-white/5">
 <p className="text-[9px] uppercase tracking-widest text-gta-muted font-bold mb-1">Importance</p>
 <p className={`text-sm font-bold ${selectedLoc.importance === 'Critical' ? 'text-gta-red' : selectedLoc.importance === 'High' ? 'text-primary' : 'text-white'}`}>
 {selectedLoc.importance}
 </p>
 </div>
 <div className="bg-white/5 rounded-xl p-4 border border-white/5">
 <p className="text-[9px] uppercase tracking-widest text-gta-muted font-bold mb-1">Coordinates</p>
 <p className="text-sm font-bold text-white font-mono">
 {selectedLoc.coordinates.x}, {selectedLoc.coordinates.y}
 </p>
 </div>
 </div>

 {/* Related Characters */}
 {selectedLoc.relatedCharacters && selectedLoc.relatedCharacters.length > 0 && (
 <div>
 <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 font-bold mb-3">
 <HiInformationCircle className="w-4 h-4 text-primary" /> Related Characters
 </h4>
 <div className="flex flex-wrap gap-2">
 {selectedLoc.relatedCharacters.map((char, i) => (
 <span key={i} className="px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
 {char}
 </span>
 ))}
 </div>
 </div>
 )}

 {/* Related Missions */}
 {selectedLoc.relatedMissions && selectedLoc.relatedMissions.length > 0 && (
 <div>
 <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 font-bold mb-3">
 <HiCollection className="w-4 h-4 text-primary" /> Missions
 </h4>
 <ul className="space-y-2">
 {selectedLoc.relatedMissions.map((miss, i) => (
 <li key={i} className="flex items-center gap-3 text-sm text-white/80">
 <span className="w-1.5 h-1.5 rounded-full bg-gta-muted" /> {miss}
 </li>
 ))}
 </ul>
 </div>
 )}

 {/* Interesting Facts */}
 {selectedLoc.facts && selectedLoc.facts.length > 0 && (
 <div>
 <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 font-bold mb-3">
 <HiLocationMarker className="w-4 h-4 text-primary" /> Interesting Facts
 </h4>
 <div className="bg-black/30 rounded-xl p-4 border border-white/5">
 <ul className="space-y-3">
 {selectedLoc.facts.map((fact, i) => (
 <li key={i} className="text-sm text-white/70 font-light leading-relaxed">
 <span className="text-primary mr-2">/</span> {fact}
 </li>
 ))}
 </ul>
 </div>
 </div>
 )}

 </div>
 </motion.div>
 )}
 </AnimatePresence>

 </div>
 );
}
