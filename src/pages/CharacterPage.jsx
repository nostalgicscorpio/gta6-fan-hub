import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiPlay, HiDocumentText } from 'react-icons/hi';
import SEO from '../components/SEO';
import { characterService } from '../services/characterService';
import { trailerService } from '../services/trailerService';
import { newsService } from '../services/newsService';
import AssetImage from '../components/AssetImage';

export default function CharacterPage() {
 const { slug } = useParams();
 const navigate = useNavigate();
 
 const [character, setCharacter] = useState(null);
 const [allCharacters, setAllCharacters] = useState([]);
 const [relatedTrailers, setRelatedTrailers] = useState([]);
 const [relatedNews, setRelatedNews] = useState([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  let isMounted = true;
  setIsLoading(true);

  Promise.all([
    characterService.getCharacters(),
    trailerService.getTrailers(),
    newsService.fetchNews()
  ]).then(([chars, trailers, news]) => {
    if (!isMounted) return;
    
    setAllCharacters(chars);
    const charIdx = chars.findIndex(item => item.slug === slug);
    const char = chars[charIdx];
    
    setCharacter(char);

    if (char) {
      setRelatedTrailers(char.relatedTrailers ? trailers.filter(t => char.relatedTrailers.includes(t.slug)) : []);
      setRelatedNews(char.relatedNews ? news.filter(n => char.relatedNews.includes(n.slug)) : []);
    }
    setIsLoading(false);
  });

  return () => { isMounted = false; };
 }, [slug]);

 if (isLoading) {
  return (
   <div className="min-h-screen pt-[var(--navbar-height)] pb-20 flex flex-col items-center justify-center bg-gta-black">
    <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin shadow-[0_0_15px_rgba(255,45,120,0.5)]"></div>
   </div>
  );
 }

 const charIndex = allCharacters.findIndex(item => item.slug === slug);
 const prevChar = charIndex > 0 ? allCharacters[charIndex - 1] : null;
 const nextChar = charIndex < allCharacters.length - 1 ? allCharacters[charIndex + 1] : null;

 if (!character) {
  return (
  <div className="min-h-screen pt-[var(--navbar-height)] pb-20 px-6 flex flex-col items-center justify-center text-center bg-gta-black">
  <h1 className="font-display text-4xl text-white mb-4">Database Entry Not Found</h1>
  <button onClick={() => navigate('/')} className="text-primary hover:text-white transition-colors cursor-pointer">
  Return to Hub
  </button>
  </div>
  );
 }

 const InfoList = ({ title, items }) => {
 if (!items || items.length === 0) return null;
 return (
 <div className="mb-8">
 <h3 className="text-sm font-display font-bold uppercase tracking-widest text-white/50 mb-4 border-b border-white/10 pb-2">
 {title}
 </h3>
 <ul className="space-y-3">
 {items.map((item, idx) => (
 <li key={idx} className="flex flex-col sm:flex-row sm:items-center text-white/90 text-lg tracking-wide border-b border-white/5 pb-2 last:border-0">
 <span className="font-medium mr-2">{item.name}</span>
 </li>
 ))}
 </ul>
 </div>
 );
 };

 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.5 }}
 className="pb-24 bg-gta-black min-h-screen"
 >
 <SEO 
 title={`${character.name} - Characters`} 
 description={character.bio} 
 image={character.image} 
 schema={{
 "@context": "https://schema.org",
 "@type": "Person",
 "name": character.name,
 "description": character.bio,
 "image": character.image
 }}
 />
 {/* Cinematic Hero Background */}
 <div className="relative w-full h-[60vh] sm:h-[70vh] xl:h-[80vh] overflow-hidden">
 <div className={`absolute inset-0 bg-gradient-to-tr ${character.accent} opacity-30 mix-blend-overlay z-10`} />
 <AssetImage
 src={character.image}
 alt={character.name}
 className="absolute inset-0 w-full h-full object-cover object-top scale-105"
 />
 <div className="absolute inset-0 bg-black/40 z-10" />
 <div className="absolute inset-0 bg-gradient-to-t from-gta-black via-gta-black/80 to-transparent z-10" />
 
 {/* Content over hero */}
 <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-24 max-w-7xl mx-auto px-6 lg:px-8 w-full z-20">
 <button
 onClick={() => navigate('/')}
 className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-10 w-fit group cursor-pointer text-sm font-medium tracking-wide uppercase"
 >
 <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
 Back to Hub
 </button>
 
 <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8">
 <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] tracking-tight leading-none uppercase">
 {character.name}
 </h1>
 <div className="mb-2">
 <span className="text-[12px] tracking-[0.5em] uppercase font-bold text-black bg-white/95 px-6 py-2 rounded-sm shadow-[0_0_30px_rgba(255,255,255,0.3)] inline-block backdrop-blur-sm">
 {character.role}
 </span>
 </div>
 </div>
 
 <div className="flex flex-wrap gap-6 text-sm text-white font-medium bg-black/40 backdrop-blur-md px-6 py-4 rounded-xl border border-white/5 w-fit">
 {character.stats.map((stat, idx) => (
 <div key={idx} className="flex items-center gap-3">
 <span className="text-gta-muted uppercase tracking-widest text-[10px]">{stat.label}</span>
 <span className="text-white">{stat.value}</span>
 {idx < character.stats.length - 1 && <div className="w-px h-4 bg-white/20 ml-3" />}
 </div>
 ))}
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 sm:mt-16 flex flex-col lg:flex-row gap-16">
 
 {/* Main Column */}
 <div className="lg:w-2/3">
 
 <div className="flex items-center gap-3 mb-8">
 <h2 className="font-display font-bold text-4xl text-white uppercase tracking-wider drop-shadow-lg">Official Biography</h2>
 </div>
 <p className="text-xl sm:text-2xl text-white/80 leading-loose font-light mb-20 drop-shadow-md">
 {character.bio}
 </p>

 {/* Database Info Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-20 p-[var(--card-padding)] glass-card border border-white/5">
 <InfoList title="Known Affiliations" items={character.affiliations} />
 <InfoList title="Confirmed Locations" items={character.locations} />
 <InfoList title="Associated Vehicles" items={character.vehicles} />
 </div>

 {/* Gallery */}
 {character.gallery && character.gallery.length > 0 && (
 <div className="mb-20">
 <h2 className="font-display font-bold text-3xl text-white mb-8 border-b border-white/10 pb-4">
 Media <span className="text-primary">Gallery</span>
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {character.gallery.map((img, idx) => (
 <div key={idx} className="aspect-video rounded-xl overflow-hidden shadow-lg border border-white/5 relative group">
 <AssetImage 
 src={img} 
 alt={`${character.name} official media ${idx + 1}`} 
 loading="lazy"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Prev / Next Navigation */}
 <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-center">
 {prevChar ? (
 <div 
 onClick={() => navigate(`/characters/${prevChar.slug}`)}
 className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-start p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-primary/20"
 >
 <span className="text-[10px] tracking-widest text-gta-muted uppercase font-bold mb-2 flex items-center gap-2">
 <HiArrowLeft className="text-primary transition-transform group-hover:-translate-x-1" /> Previous Database Entry
 </span>
 <h4 className="font-display font-bold text-white text-xl group-hover:text-primary transition-colors line-clamp-1">
 {prevChar.name}
 </h4>
 </div>
 ) : <div className="w-full sm:w-1/2" />}
 
 {nextChar ? (
 <div 
 onClick={() => navigate(`/characters/${nextChar.slug}`)}
 className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-end text-right p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-primary/20"
 >
 <span className="text-[10px] tracking-widest text-gta-muted uppercase font-bold mb-2 flex items-center gap-2">
 Next Database Entry <HiArrowLeft className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1 rotate-180" />
 </span>
 <h4 className="font-display font-bold text-white text-xl group-hover:text-primary transition-colors line-clamp-1">
 {nextChar.name}
 </h4>
 </div>
 ) : <div className="w-full sm:w-1/2" />}
 </div>
 </div>


 <div className="lg:w-1/3 flex flex-col gap-10">
 
 {/* Related Trailers */}
 {relatedTrailers.length > 0 && (
 <div>
 <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
 <HiPlay className="text-primary" /> Featured Trailers
 </h3>
 <div className="flex flex-col gap-4">
 {relatedTrailers.map(trailer => (
 <div 
 key={trailer.id}
 onClick={() => navigate(`/trailers/${trailer.slug}`)}
 className="group cursor-pointer glass-card flex h-24 border border-white/5"
 >
 <div className="w-1/3 relative overflow-hidden">
 <AssetImage src={trailer.thumbnail} alt={trailer.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary transition-colors">
 <HiPlay className="w-4 h-4 text-white ml-0.5" />
 </div>
 </div>
 </div>
 <div className="w-2/3 p-[var(--card-padding)] flex flex-col justify-center">
 <span className="text-[9px] tracking-widest uppercase font-bold text-primary mb-1 line-clamp-1">{trailer.subtitle}</span>
 <h4 className="font-display font-bold text-white text-sm group-hover:text-primary transition-colors line-clamp-2">{trailer.title}</h4>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Related News */}
 {relatedNews.length > 0 && (
 <div>
 <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
 <HiDocumentText className="text-primary" /> Related News
 </h3>
 <div className="flex flex-col gap-4">
 {relatedNews.map(news => (
 <div 
 key={news.id}
 onClick={() => navigate(`/news/${news.slug}`)}
 className="group cursor-pointer glass-card card-content border border-white/5"
 >
 <span className="text-[9px] tracking-widest uppercase font-bold text-primary mb-2 block">{news.category}</span>
 <h4 className="font-display font-bold text-white text-base group-hover:text-primary transition-colors line-clamp-2 mb-2">{news.title}</h4>
 <p className="text-xs text-gta-muted line-clamp-2">{news.excerpt}</p>
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
