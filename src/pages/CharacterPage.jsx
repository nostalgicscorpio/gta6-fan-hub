import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiPlay, HiDocumentText, HiUser } from 'react-icons/hi';
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
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 flex flex-col items-center justify-center bg-[#0B0B0D]">
        <div className="w-16 h-16 border-4 border-white/10 border-t-[#FF5FAF] rounded-full animate-spin shadow-[0_0_20px_rgba(255,95,175,0.4)]"></div>
      </div>
    );
  }

  const charIndex = allCharacters.findIndex(item => item.slug === slug);
  const prevChar = charIndex > 0 ? allCharacters[charIndex - 1] : null;
  const nextChar = charIndex < allCharacters.length - 1 ? allCharacters[charIndex + 1] : null;

  if (!character) {
    return (
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 px-6 flex flex-col items-center justify-center text-center bg-[#0B0B0D]">
        <h1 className="font-display font-black text-4xl text-white mb-4 uppercase">Database Entry Not Found</h1>
        <button onClick={() => navigate('/')} className="text-[#FF5FAF] hover:text-white transition-colors cursor-pointer text-sm font-bold tracking-widest uppercase">
          Return to Hub
        </button>
      </div>
    );
  }

  const InfoList = ({ title, items }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A9AA3] mb-4 border-b border-white/10 pb-3">
          {title}
        </h3>
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center text-white/90 text-sm sm:text-base tracking-wide border-b border-white/5 pb-2 last:border-0 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A2A] mr-3" />
              {item.name}
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
      className="pb-24 bg-[#0B0B0D] min-h-screen"
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
      <header className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Accent Color Wash */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${character.accent} opacity-40 mix-blend-overlay z-10 pointer-events-none`} />
          <AssetImage
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/90 via-transparent to-transparent z-10" />
        
        {/* Content over hero */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-24 max-w-7xl mx-auto px-6 lg:px-8 w-full z-20">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-[#FF5FAF] transition-colors mb-10 w-fit group cursor-pointer text-xs font-bold tracking-widest uppercase"
          >
            <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Back to Hub
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8">
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-2xl tracking-tighter leading-none uppercase">
                {character.name}
              </h1>
              <div className="mb-2 sm:mb-4">
                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-[#FF5FAF] bg-white/5 border border-white/20 px-5 py-2 rounded-full shadow-lg inline-block backdrop-blur-md">
                  {character.role}
                </span>
              </div>
            </div>
            
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-white font-medium bg-white/[0.02] backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 w-fit shadow-2xl">
              {character.stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-[#9A9AA3] uppercase tracking-[0.2em] text-[10px] font-bold">{stat.label}</span>
                  <span className="text-white text-xs tracking-wide">{stat.value}</span>
                  {idx < character.stats.length - 1 && <div className="w-1 h-1 rounded-full bg-white/20 ml-3" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 sm:mt-20 flex flex-col lg:flex-row gap-16 relative">
        
        {/* Main Column */}
        <div className="lg:w-2/3">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-wider drop-shadow-lg">
                Official <span className="text-[#FF8A2A]">Biography</span>
              </h2>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <p className="text-lg sm:text-xl text-[#9A9AA3] leading-[1.8] font-light mb-16">
              {character.bio}
            </p>
          </motion.div>

          {character.quote && (
            <motion.blockquote 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative my-16 py-10 pl-12 sm:pl-16 border-l-4 border-[#FF5FAF] bg-gradient-to-r from-[#FF5FAF]/10 via-[#FF5FAF]/5 to-transparent rounded-r-3xl"
            >
              <div className="absolute top-6 left-6 text-[#FF5FAF]/20 font-display text-6xl -rotate-12 leading-none">"</div>
              <p className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white italic leading-tight m-0 tracking-wide drop-shadow-md">
                {character.quote}
              </p>
            </motion.blockquote>
          )}

          {/* Database Info Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-20 p-8 sm:p-10 bg-white/[0.02] backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl"
          >
            <InfoList title="Known Affiliations" items={character.affiliations || character.stats.filter(s => s.label === 'Affiliation').map(s => ({name: s.value}))} />
            <InfoList title="Confirmed Locations" items={character.knownLocations} />
            <InfoList title="Associated Vehicles" items={character.vehicles} />
          </motion.div>

          {/* Gallery */}
          {character.gallery && character.gallery.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="mb-24"
            >
              <div className="flex items-center gap-4 mb-10">
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-wider">
                  Media <span className="text-[#9D4EDD]">Gallery</span>
                </h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {character.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative group cursor-pointer">
                    <AssetImage 
                      src={img} 
                      alt={`${character.name} official media ${idx + 1}`} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Prev / Next Navigation */}
          <nav className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-center">
            {prevChar ? (
              <div 
                onClick={() => navigate(`/characters/${prevChar.slug}`)}
                className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-start p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#FF5FAF]/30 hover:shadow-[0_0_30px_rgba(255,95,175,0.1)] transition-all duration-300"
              >
                <span className="text-[10px] tracking-[0.2em] text-[#9A9AA3] uppercase font-bold mb-3 flex items-center gap-2">
                  <HiArrowLeft className="text-[#FF5FAF] transition-transform group-hover:-translate-x-1" /> Previous Entry
                </span>
                <h4 className="font-display font-bold text-white text-xl sm:text-2xl group-hover:text-[#FF5FAF] transition-colors line-clamp-1">
                  {prevChar.name}
                </h4>
              </div>
            ) : <div className="w-full sm:w-1/2" />}
            
            {nextChar ? (
              <div 
                onClick={() => navigate(`/characters/${nextChar.slug}`)}
                className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-end text-right p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#FF8A2A]/30 hover:shadow-[0_0_30px_rgba(255,138,42,0.1)] transition-all duration-300"
              >
                <span className="text-[10px] tracking-[0.2em] text-[#9A9AA3] uppercase font-bold mb-3 flex items-center gap-2">
                  Next Entry <svg className="w-4 h-4 text-[#FF8A2A] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
                <h4 className="font-display font-bold text-white text-xl sm:text-2xl group-hover:text-[#FF8A2A] transition-colors line-clamp-1">
                  {nextChar.name}
                </h4>
              </div>
            ) : <div className="w-full sm:w-1/2" />}
          </nav>
        </div>

        {/* Sidebar Column */}
        <aside className="lg:w-1/3 flex flex-col gap-12">
          
          {/* Related Trailers */}
          {relatedTrailers.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider">
                <HiPlay className="text-[#FF8A2A]" /> Featured <span className="text-[#FF8A2A]">Trailers</span>
              </h3>
              <div className="flex flex-col gap-4">
                {relatedTrailers.map(trailer => (
                  <div 
                    key={trailer.id}
                    onClick={() => navigate(`/trailers/${trailer.slug}`)}
                    className="group cursor-pointer bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-[#FF8A2A]/30 rounded-2xl overflow-hidden flex h-24 transition-all duration-300 shadow-lg"
                  >
                    <div className="w-1/3 relative overflow-hidden">
                      <AssetImage src={trailer.thumbnail} alt={trailer.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#FF8A2A] transition-colors duration-300">
                          <HiPlay className="w-4 h-4 text-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-center">
                      <span className="text-[9px] tracking-widest uppercase font-bold text-[#FF8A2A] mb-1 line-clamp-1">{trailer.subtitle}</span>
                      <h4 className="font-display font-bold text-white text-sm group-hover:text-[#FF8A2A] transition-colors line-clamp-2 leading-tight">{trailer.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider">
                <HiDocumentText className="text-[#FF5FAF]" /> Related <span className="text-[#FF5FAF]">News</span>
              </h3>
              <div className="flex flex-col gap-4">
                {relatedNews.map(news => (
                  <div 
                    key={news.id}
                    onClick={() => navigate(`/news/${news.slug}`)}
                    className="group cursor-pointer bg-white/[0.02] backdrop-blur-xl p-5 rounded-2xl border border-white/5 hover:border-[#FF5FAF]/30 transition-all duration-300 shadow-lg"
                  >
                    <span className="text-[9px] tracking-widest uppercase font-bold text-[#FF5FAF] mb-2 block">{news.category}</span>
                    <h4 className="font-display font-bold text-white text-base group-hover:text-[#FF5FAF] transition-colors line-clamp-2 mb-2 leading-tight">{news.title}</h4>
                    <p className="text-xs text-[#9A9AA3] line-clamp-2 font-light">{news.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

      </div>
    </motion.div>
  );
}
