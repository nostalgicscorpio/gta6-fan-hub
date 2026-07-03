import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiSearch, HiX, HiDocumentText, HiPlay, HiUser, HiPhotograph, HiLocationMarker } from 'react-icons/hi';

import { newsItems } from '../data/news';
import { trailers } from '../data/trailers';
import { characters } from '../data/characters';
import { screenshots } from '../data/screenshots';
import { locations } from '../data/mapLocations';
import { mediaItems } from '../data/mediaGallery';

export default function SearchModal({ isOpen, onClose }) {
 const [query, setQuery] = useState('');
 const [results, setResults] = useState([]);
 const [selectedIndex, setSelectedIndex] = useState(0);
 const inputRef = useRef(null);
 const navigate = useNavigate();

 // Handle global "/" shortcut
 useEffect(() => {
 const handleKeyDown = (e) => {
 // Don't trigger if user is in an input field (we don't have many, but good practice)
 if (e.key === '/' && !isOpen && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
 e.preventDefault();
 // Since SearchModal is mounted by App (and controlled by App state), we might need to open it via prop or expose a way.
 // Actually, App manages the state. So App should listen for "/" instead of SearchModal!
 // Wait, I will move the "/" listener to App.jsx.
 }
 };
 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }, [isOpen]);

 useEffect(() => {
 if (isOpen && inputRef.current) {
 inputRef.current.focus();
 } else {
 setQuery('');
 setSelectedIndex(0);
 }
 }, [isOpen]);

 useEffect(() => {
 if (!query.trim()) {
 setResults([]);
 return;
 }

 const lowerQuery = query.toLowerCase();
 
 // Aggregate search
 const matched = [];

 // News
 newsItems.forEach(n => {
 if (n.title.toLowerCase().includes(lowerQuery) || n.excerpt.toLowerCase().includes(lowerQuery)) {
 matched.push({ id: `news-${n.id}`, type: 'news', title: n.title, sub: n.category, url: `/news/${n.slug}`, icon: HiDocumentText });
 }
 });

 // Trailers
 trailers.forEach(t => {
 if (t.title.toLowerCase().includes(lowerQuery) || t.subtitle.toLowerCase().includes(lowerQuery)) {
 matched.push({ id: `trailer-${t.id}`, type: 'trailer', title: t.title, sub: t.subtitle, url: `/trailers/${t.slug}`, icon: HiPlay });
 }
 });

 // Characters
 characters.forEach(c => {
 if (c.name.toLowerCase().includes(lowerQuery) || c.role.toLowerCase().includes(lowerQuery)) {
 matched.push({ id: `char-${c.id}`, type: 'character', title: c.name, sub: c.role, url: `/characters/${c.slug}`, icon: HiUser });
 }
 });

 // Screenshots
 screenshots.forEach(s => {
 if (s.title.toLowerCase().includes(lowerQuery) || s.category.toLowerCase().includes(lowerQuery)) {
 matched.push({ id: `ss-${s.id}`, type: 'screenshot', title: s.title, sub: 'Screenshot', url: '/#screenshots', icon: HiPhotograph });
 }
 });

 // Map Locations
 locations.forEach(l => {
 if (l.name.toLowerCase().includes(lowerQuery) || l.desc.toLowerCase().includes(lowerQuery)) {
 matched.push({ id: `loc-${l.id}`, type: 'location', title: l.name, sub: 'Map Location', url: `/map?location=${l.id}`, icon: HiLocationMarker });
 }
 });

 // Media Gallery
 mediaItems.forEach(m => {
 if (
 m.title.toLowerCase().includes(lowerQuery) || 
 m.category.toLowerCase().includes(lowerQuery) ||
 m.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
 ) {
 matched.push({ id: `media-${m.id}`, type: 'media', title: m.title, sub: m.category, url: `/media?item=${m.id}`, icon: HiPhotograph });
 }
 });

 setResults(matched.slice(0, 10)); // Limit to 10 results
 setSelectedIndex(0);
 }, [query]);

 // Handle keyboard navigation
 const handleKeyDown = (e) => {
 if (e.key === 'ArrowDown') {
 e.preventDefault();
 setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
 } else if (e.key === 'ArrowUp') {
 e.preventDefault();
 setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
 } else if (e.key === 'Enter') {
 e.preventDefault();
 if (results[selectedIndex]) {
 handleNavigate(results[selectedIndex].url);
 }
 } else if (e.key === 'Escape') {
 onClose();
 }
 };

 const handleNavigate = (url) => {
 onClose();
 if (url.startsWith('/#')) {
 navigate('/');
 setTimeout(() => {
 const el = document.querySelector(url.substring(1));
 if (el) {
 const y = el.getBoundingClientRect().top + window.scrollY - 80;
 window.scrollTo({ top: y, behavior: 'smooth' });
 }
 }, 100);
 } else {
 navigate(url);
 }
 };

 const HighlightMatch = ({ text }) => {
 if (!query) return <span>{text}</span>;
 const parts = text.split(new RegExp(`(${query})`, 'gi'));
 return (
 <span>
 {parts.map((part, i) => 
 part.toLowerCase() === query.toLowerCase() 
 ? <span key={i} className="text-primary">{part}</span> 
 : <span key={i}>{part}</span>
 )}
 </span>
 );
 };

 return (
 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.2 }}
 className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
 onClick={onClose}
 >
 <motion.div
 initial={{ scale: 0.95, opacity: 0, y: -20 }}
 animate={{ scale: 1, opacity: 1, y: 0 }}
 exit={{ scale: 0.95, opacity: 0, y: -20 }}
 transition={{ duration: 0.2 }}
 className="w-full max-w-2xl bg-gta-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Search Input */}
 <div className="relative flex items-center p-4 border-b border-white/10 bg-white/5">
 <HiSearch className="w-6 h-6 text-primary ml-2 mr-4 flex-shrink-0" />
 <input
 ref={inputRef}
 type="text"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 onKeyDown={handleKeyDown}
 placeholder="Search news, characters, trailers..."
 className="w-full bg-transparent text-white text-xl placeholder-white/30 focus:outline-none"
 />
 <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors focus-ring rounded-md">
 <HiX className="w-5 h-5" />
 </button>
 </div>

 {/* Results */}
 {query.trim() && (
 <div className="overflow-y-auto p-2">
 {results.length > 0 ? (
 results.map((res, idx) => {
 const Icon = res.icon;
 const isSelected = idx === selectedIndex;
 return (
 <div
 key={res.id}
 onClick={() => handleNavigate(res.url)}
 onMouseEnter={() => setSelectedIndex(idx)}
 className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
 isSelected ? 'bg-primary/10 border border-primary/30' : 'hover:bg-white/5 border border-transparent'
 }`}
 >
 <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
 isSelected ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/50'
 }`}>
 <Icon className="w-5 h-5" />
 </div>
 <div className="flex flex-col overflow-hidden">
 <span className="text-[10px] tracking-widest uppercase font-bold text-white/50 mb-1">
 {res.type}
 </span>
 <span className="text-white text-base font-bold truncate">
 <HighlightMatch text={res.title} />
 </span>
 <span className="text-gta-muted text-sm truncate">
 <HighlightMatch text={res.sub} />
 </span>
 </div>
 </div>
 );
 })
 ) : (
 <div className="p-8 text-center text-gta-muted">
 <p>No results found for "<span className="text-white">{query}</span>"</p>
 </div>
 )}
 </div>
 )}
 
 {/* Footer / Shortcuts hint */}
 <div className="p-3 border-t border-white/5 bg-black/40 text-[10px] tracking-widest uppercase text-white/30 flex justify-end items-center gap-4">
 <span><kbd className="font-sans px-1.5 py-0.5 rounded bg-white/10 border border-white/20">↑↓</kbd> to navigate</span>
 <span><kbd className="font-sans px-1.5 py-0.5 rounded bg-white/10 border border-white/20">Enter</kbd> to select</span>
 <span><kbd className="font-sans px-1.5 py-0.5 rounded bg-white/10 border border-white/20">ESC</kbd> to close</span>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}
