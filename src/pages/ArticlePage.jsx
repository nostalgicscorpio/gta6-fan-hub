import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiCalendar, HiClock, HiUser, HiLink, HiOutlineShare } from 'react-icons/hi';
import { newsService } from '../services/newsService';
import SEO from '../components/SEO';
import AssetImage from '../components/AssetImage';
import YouTubeEmbed from '../components/YouTubeEmbed';

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [prevArticle, setPrevArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    let mounted = true;
    setIsLoading(true);

    newsService.fetchNews().then(allNews => {
      if (!mounted) return;
      const index = allNews.findIndex(item => item.slug === slug);
      if (index !== -1) {
        const foundArticle = allNews[index];
        setArticle(foundArticle);
        setPrevArticle(index > 0 ? allNews[index - 1] : null);
        setNextArticle(index < allNews.length - 1 ? allNews[index + 1] : null);

        if (foundArticle.relatedArticles && foundArticle.relatedArticles.length > 0) {
          setRelatedArticles(allNews.filter(item => foundArticle.relatedArticles.includes(item.slug)));
        } else {
          setRelatedArticles([]);
        }
      } else {
        setArticle(null);
      }
      setIsLoading(false);
    });

    return () => { mounted = false; };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 px-6 flex flex-col items-center justify-center bg-gta-black">
        <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-bold">Loading Intel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 px-6 flex flex-col items-center justify-center text-center bg-gta-black">
        <h1 className="font-display text-4xl text-white mb-4">Article Not Found</h1>
        <button onClick={() => navigate('/')} className="text-primary hover:text-white transition-colors cursor-pointer">
          Return to Home
        </button>
      </div>
    );
  }

 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.5 }}
 className="pb-24 bg-gta-black"
 >
 <SEO 
 title={article.title} 
 description={article.excerpt} 
 image={article.image} 
 schema={{
 "@context": "https://schema.org",
 "@type": "NewsArticle",
 "headline": article.title,
 "image": [article.image],
 "datePublished": article.date,
 "author": [{
 "@type": "Organization",
 "name": article.author || "Rockstar Games"
 }]
 }}
 />
 {/* Full-Width Cinematic Hero Banner */}
 <div className="relative w-full h-[60vh] sm:h-[70vh] xl:h-[80vh] overflow-hidden">
 <AssetImage
 src={article.image}
 alt={article.title}
 className="absolute inset-0 w-full h-full object-cover object-center"
 />
 {/* Gradients for text readability and blending into the page */}
 <div className="absolute inset-0 bg-black/40" />
 <div className="absolute inset-0 bg-gradient-to-t from-gta-black via-gta-black/60 to-transparent" />
 <div className="absolute inset-0 bg-gradient-to-r from-gta-black/80 via-transparent to-transparent" />
 
 {/* Content over hero */}
 <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-24 max-w-[900px] mx-auto px-6 lg:px-8 w-full z-10">
 <button
 onClick={() => navigate('/')}
 className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-10 w-fit group cursor-pointer text-sm font-medium tracking-wide uppercase"
 >
 <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
 Back to Hub
 </button>
 
 <span className="text-[12px] tracking-[0.5em] uppercase font-bold text-black bg-primary px-5 py-2 rounded-sm w-fit mb-6 shadow-[0_0_30px_rgba(255,106,0,0.4)] block">
 {article.category}
 </span>
 
 <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-[0.9] tracking-tight uppercase">
 {article.title}
 </h1>
 
 {/* Metadata Row */}
 <div className="flex flex-wrap items-center gap-6 text-[11px] tracking-widest uppercase text-white/70 font-bold bg-black/50 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 w-fit">
 <div className="flex items-center gap-2">
 <HiUser className="text-primary w-4 h-4" />
 {article.author || 'Rockstar Games'}
 </div>
 <div className="w-1 h-1 rounded-full bg-gta-border" />
 <div className="flex items-center gap-2">
 <HiCalendar className="text-primary w-4 h-4" />
 {article.date}
 </div>
 <div className="w-1 h-1 rounded-full bg-gta-border" />
 <div className="flex items-center gap-2">
 <HiClock className="text-primary w-4 h-4" />
 {article.readTime} read
 </div>
 </div>
 </div>
 </div>

 {/* Main Article Content */}
 <div className="max-w-[900px] mx-auto px-6 lg:px-8 mt-12 sm:mt-16 relative">
 
 {/* Share Buttons Floating/Inline */}
 <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/10">
 <span className="text-xs uppercase tracking-widest text-gta-muted font-bold mr-2">Share</span>
 <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-all flex items-center justify-center text-white cursor-pointer shadow-lg">
 <HiOutlineShare className="w-4 h-4" />
 </button>
 <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 transition-all flex items-center justify-center text-white cursor-pointer">
 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
 </button>
 <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 transition-all flex items-center justify-center text-white cursor-pointer">
 <HiLink className="w-4 h-4" />
 </button>
 </div>

 {/* Dynamic Rich Content */}
 <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/90 prose-p:leading-[2.2] prose-p:text-xl prose-p:tracking-wide prose-p:font-light">
 {article.body && article.body.map((block, idx) => {
 switch (block.type) {
 case 'paragraph':
 return (
 <p key={idx} className="mb-8 font-light text-white/80">
 {block.content}
 </p>
 );
 case 'subtitle':
 return (
 <h2 key={idx} className="font-display font-bold text-3xl sm:text-4xl text-white mt-20 mb-8 uppercase tracking-[0.05em] drop-shadow-md">
 {block.content}
 </h2>
 );
 case 'quote':
 return (
 <blockquote key={idx} className="relative my-16 py-8 pl-10 border-l-4 border-primary bg-gradient-to-r from-primary/10 to-transparent rounded-r-2xl">
 <p className="text-2xl sm:text-3xl font-display font-medium text-white italic leading-relaxed m-0 tracking-wide">
 "{block.content}"
 </p>
 </blockquote>
 );
 case 'image':
 return (
 <figure key={idx} className="my-12">
 <div className="rounded-xl overflow-hidden border border-white/5 shadow-2xl">
 <AssetImage src={block.src} alt={block.caption || 'Article image'} className="w-full h-auto m-0" />
 </div>
 {block.caption && (
 <figcaption className="text-center text-xs tracking-widest uppercase text-gta-muted mt-4 font-bold">
 {block.caption}
 </figcaption>
 )}
 </figure>
 );
 case 'youtube':
 return (
 <figure key={idx} className="my-12">
 <YouTubeEmbed videoId={block.videoId} title={block.caption || 'YouTube Video'} />
 {block.caption && (
 <figcaption className="text-center text-xs tracking-widest uppercase text-gta-muted mt-4 font-bold">
 {block.caption}
 </figcaption>
 )}
 </figure>
 );
 case 'separator':
 return (
 <div key={idx} className="flex justify-center items-center gap-3 my-16">
 <div className="w-2 h-2 rounded-full bg-primary/40" />
 <div className="w-2 h-2 rounded-full bg-primary/70" />
 <div className="w-2 h-2 rounded-full bg-primary/40" />
 </div>
 );
 default:
 // Fallback for simple string bodies from Phase 8
 if (typeof block === 'string') {
 return <p key={idx} className="mb-8 font-light text-white/80">{block}</p>;
 }
 return null;
 }
 })}
 </div>

 {/* Prev / Next Article Navigation */}
 <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-center">
 {prevArticle ? (
 <div 
 onClick={() => navigate(`/news/${prevArticle.slug}`)}
 className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-start p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
 >
 <span className="text-[10px] tracking-widest text-gta-muted uppercase font-bold mb-2 flex items-center gap-2">
 <HiArrowLeft className="text-primary transition-transform group-hover:-translate-x-1" /> Previous
 </span>
 <h4 className="font-display font-bold text-white text-lg group-hover:text-primary transition-colors line-clamp-1">
 {prevArticle.title}
 </h4>
 </div>
 ) : <div className="w-full sm:w-1/2" />}
 
 {nextArticle ? (
 <div 
 onClick={() => navigate(`/news/${nextArticle.slug}`)}
 className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-end text-right p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
 >
 <span className="text-[10px] tracking-widest text-gta-muted uppercase font-bold mb-2 flex items-center gap-2">
 Next <svg className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
 </span>
 <h4 className="font-display font-bold text-white text-lg group-hover:text-primary transition-colors line-clamp-1">
 {nextArticle.title}
 </h4>
 </div>
 ) : <div className="w-full sm:w-1/2" />}
 </div>
 </div>

 {/* Related Articles - Now Below Content in a Grid */}
 {relatedArticles.length > 0 && (
 <div className="max-w-[900px] mx-auto px-6 lg:px-8 mt-24">
 <div className="flex items-center justify-between mb-10">
 <h3 className="font-display font-black text-3xl text-white">
 Related <span className="text-primary">News</span>
 </h3>
 <div className="h-px flex-grow ml-8 bg-gradient-to-r from-white/20 to-transparent" />
 </div>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
 {relatedArticles.map((related) => (
 <div 
 key={related.id}
 onClick={() => navigate(`/news/${related.slug}`)}
 className="group cursor-pointer glass-card card-hover-glow flex flex-col h-full"
 >
 <div className="relative h-40 overflow-hidden">
 <AssetImage 
 src={related.image} 
 alt={related.title}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-gta-card via-transparent to-transparent" />
 <div className="badge-tl">
 <span className="text-[9px] tracking-widest uppercase font-bold text-primary bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
 {related.category}
 </span>
 </div>
 </div>
 <div className="card-content">
 <h4 className="font-display font-bold text-white group-hover:text-primary transition-colors line-clamp-2 mb-3">
 {related.title}
 </h4>
 <div className="mt-auto flex items-center justify-between text-xs text-gta-muted font-medium">
 <span>{related.date}</span>
 <span>{related.readTime} read</span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Related Media & Entites */}
 <div className="max-w-[900px] mx-auto px-6 lg:px-8 mt-16 pb-16">
 {/* Related Screenshots */}
 {article.relatedScreenshots && article.relatedScreenshots.length > 0 && (
 <div className="mb-16">
 <h3 className="font-display font-bold text-2xl text-white mb-6 uppercase tracking-wider">
 Related <span className="text-primary">Screenshots</span>
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {article.relatedScreenshots.map((img, idx) => (
 <div key={idx} className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg border border-white/5 relative group/img">
 <AssetImage 
 src={img} 
 alt={`Related Scene ${idx + 1}`} 
 className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" 
 />
 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity" />
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Related Trailers */}
 {article.relatedTrailers && article.relatedTrailers.length > 0 && (
 <div className="mb-16">
 <h3 className="font-display font-bold text-2xl text-white mb-6 uppercase tracking-wider">
 Related <span className="text-primary">Trailers</span>
 </h3>
 <div className="grid grid-cols-1 gap-4">
 {article.relatedTrailers.map((slug, idx) => (
 <button 
 key={idx}
 onClick={() => navigate(`/trailers/${slug}`)}
 className="w-full sm:w-1/2 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-left border border-white/5 flex items-center gap-4 group cursor-pointer"
 >
 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
 <svg className="w-5 h-5 ml-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
 </div>
 <div>
 <span className="text-[10px] tracking-widest text-gta-muted uppercase font-bold block mb-1">Watch</span>
 <span className="font-display font-bold text-white group-hover:text-primary transition-colors">Trailer {idx + 1}</span>
 </div>
 </button>
 ))}
 </div>
 </div>
 )}

 {/* Related Characters */}
 {article.relatedCharacters && article.relatedCharacters.length > 0 && (
 <div className="mb-16">
 <h3 className="font-display font-bold text-2xl text-white mb-6 uppercase tracking-wider">
 Related <span className="text-primary">Characters</span>
 </h3>
 <div className="flex flex-wrap gap-4">
 {article.relatedCharacters.map((charSlug, idx) => (
 <button 
 key={idx}
 onClick={() => navigate(`/characters/${charSlug}`)}
 className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5 flex items-center gap-3 cursor-pointer text-white font-bold uppercase tracking-widest text-xs hover:text-primary"
 >
 <HiUser className="text-primary" />
 {charSlug.replace('-', ' ')}
 </button>
 ))}
 </div>
 </div>
 )}
 </div>
 </motion.div>
 );
}
