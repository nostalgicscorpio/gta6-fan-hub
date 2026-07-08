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
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 px-6 flex flex-col items-center justify-center bg-[#0B0B0D]">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[#FF8A2A] rounded-full animate-spin mb-4" />
        <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-bold">Loading Intel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-[var(--navbar-height)] pb-20 px-6 flex flex-col items-center justify-center text-center bg-[#0B0B0D]">
        <h1 className="font-display text-4xl text-white mb-4">Article Not Found</h1>
        <button onClick={() => navigate('/')} className="text-[#FF5FAF] hover:text-white transition-colors cursor-pointer">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 bg-[#0B0B0D] min-h-screen"
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
      <header className="relative w-full h-[60vh] sm:h-[70vh] xl:h-[80vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <AssetImage
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Gradients for text readability and blending into the page */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#FF5FAF]/5 mix-blend-overlay pointer-events-none" />
        
        {/* Content over hero */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-24 max-w-5xl mx-auto px-6 lg:px-8 w-full z-10">
          <button
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 text-white/60 hover:text-[#FF5FAF] transition-colors mb-8 sm:mb-12 w-fit group cursor-pointer text-xs font-bold tracking-widest uppercase"
          >
            <HiArrowLeft className="transition-transform group-hover:-translate-x-1 text-[#FF5FAF]" />
            Back to Hub
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-white border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full w-fit mb-6 shadow-lg inline-block">
              {article.category}
            </span>
            
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8 drop-shadow-2xl leading-[0.9] tracking-tighter uppercase">
              {article.title}
            </h1>
            
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-xs tracking-widest uppercase text-white/70 font-bold bg-white/[0.02] backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 w-fit shadow-2xl">
              <div className="flex items-center gap-2 text-[#9A9AA3]">
                <HiUser className="text-[#FF8A2A] w-4 h-4" />
                <span className="text-white">{article.author || 'Rockstar Games'}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2 text-[#9A9AA3]">
                <HiCalendar className="text-[#FF8A2A] w-4 h-4" />
                <span className="text-white">{article.date}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2 text-[#9A9AA3]">
                <HiClock className="text-[#FF8A2A] w-4 h-4" />
                <span className="text-white">{article.readTime} read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Article Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 mt-12 sm:mt-16 relative">
        
        {/* Share Buttons Floating/Inline */}
        <div className="flex items-center justify-end gap-3 mb-12 pb-8 border-b border-white/10">
          <span className="text-[10px] uppercase tracking-widest text-[#9A9AA3] font-bold mr-2">Share Intel</span>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#FF8A2A] hover:border-transparent hover:text-black transition-all flex items-center justify-center text-white cursor-pointer shadow-lg group">
            <HiOutlineShare className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#1DA1F2] hover:border-transparent transition-all flex items-center justify-center text-white cursor-pointer group">
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white cursor-pointer group">
            <HiLink className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* Dynamic Rich Content */}
        <div className="prose prose-invert prose-lg max-w-none 
          prose-p:text-[#9A9AA3] prose-p:leading-[1.8] prose-p:text-lg sm:prose-p:text-xl prose-p:font-light prose-p:tracking-wide 
          prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wider prose-headings:text-white
          prose-a:text-[#FF8A2A] prose-a:no-underline hover:prose-a:text-[#FF5FAF] prose-a:transition-colors">
          
          {article.body && article.body.map((block, idx) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    key={idx} 
                    className="mb-8"
                  >
                    {block.content}
                  </motion.p>
                );
              case 'subtitle':
                return (
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    key={idx} 
                    className="text-3xl sm:text-4xl mt-16 mb-6"
                  >
                    {block.content}
                  </motion.h2>
                );
              case 'quote':
                return (
                  <motion.blockquote 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    key={idx} 
                    className="relative my-16 py-10 pl-10 sm:pl-16 border-l-4 border-[#FF5FAF] bg-gradient-to-r from-[#FF5FAF]/10 via-[#FF5FAF]/5 to-transparent rounded-r-3xl"
                  >
                    <HiClock className="absolute top-6 left-6 text-[#FF5FAF]/20 w-12 h-12 -rotate-12" />
                    <p className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white italic leading-tight m-0 tracking-wide drop-shadow-md">
                      "{block.content}"
                    </p>
                  </motion.blockquote>
                );
              case 'image':
                return (
                  <motion.figure 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    key={idx} 
                    className="my-12 sm:my-16"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                      <AssetImage src={block.src} alt={block.caption || 'Article image'} className="w-full h-auto m-0 hover:scale-105 transition-transform duration-700" />
                    </div>
                    {block.caption && (
                      <figcaption className="text-center text-xs tracking-[0.2em] uppercase text-white/40 mt-4 font-bold">
                        {block.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                );
              case 'youtube':
                return (
                  <motion.figure 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    key={idx} 
                    className="my-12 sm:my-16"
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                      <YouTubeEmbed videoId={block.videoId} title={block.caption || 'YouTube Video'} />
                    </div>
                    {block.caption && (
                      <figcaption className="text-center text-xs tracking-[0.2em] uppercase text-white/40 mt-4 font-bold">
                        {block.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                );
              case 'separator':
                return (
                  <div key={idx} className="flex justify-center items-center gap-3 my-16 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5FAF]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF8A2A]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5FAF]" />
                  </div>
                );
              default:
                // Fallback for simple string bodies from Phase 8
                if (typeof block === 'string') {
                  return <p key={idx} className="mb-8">{block}</p>;
                }
                return null;
            }
          })}
        </div>

        {/* Prev / Next Article Navigation */}
        <nav className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-center" aria-label="Pagination">
          {prevArticle ? (
            <div 
              onClick={() => navigate(`/news/${prevArticle.slug}`)}
              className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-start p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#FF5FAF]/30 hover:shadow-[0_0_30px_rgba(255,95,175,0.1)] transition-all duration-300"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#9A9AA3] uppercase font-bold mb-3 flex items-center gap-2">
                <HiArrowLeft className="text-[#FF5FAF] transition-transform group-hover:-translate-x-1" /> Previous Article
              </span>
              <h4 className="font-display font-bold text-white text-xl sm:text-2xl group-hover:text-[#FF5FAF] transition-colors line-clamp-2 leading-tight">
                {prevArticle.title}
              </h4>
            </div>
          ) : <div className="w-full sm:w-1/2" />}
          
          {nextArticle ? (
            <div 
              onClick={() => navigate(`/news/${nextArticle.slug}`)}
              className="w-full sm:w-1/2 group cursor-pointer flex flex-col items-end text-right p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#FF8A2A]/30 hover:shadow-[0_0_30px_rgba(255,138,42,0.1)] transition-all duration-300"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#9A9AA3] uppercase font-bold mb-3 flex items-center gap-2">
                Next Article <svg className="w-4 h-4 text-[#FF8A2A] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
              <h4 className="font-display font-bold text-white text-xl sm:text-2xl group-hover:text-[#FF8A2A] transition-colors line-clamp-2 leading-tight">
                {nextArticle.title}
              </h4>
            </div>
          ) : <div className="w-full sm:w-1/2" />}
        </nav>
      </main>

      {/* Related Media & Entities */}
      <aside className="max-w-5xl mx-auto px-6 lg:px-8 mt-24">
        
        {/* Related Articles Grid */}
        {relatedArticles.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-wider">
                Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A2A] to-[#FF5FAF]">News</span>
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedArticles.map((related) => (
                <div 
                  key={related.id}
                  onClick={() => navigate(`/news/${related.slug}`)}
                  className="group cursor-pointer bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-white/20 hover:shadow-2xl rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <AssetImage 
                      src={related.image} 
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[9px] tracking-widest uppercase font-bold text-white bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="font-display font-bold text-white text-xl group-hover:text-[#FF5FAF] transition-colors line-clamp-2 mb-4 leading-tight">
                      {related.title}
                    </h4>
                    <div className="mt-auto flex items-center justify-between text-[10px] tracking-widest text-[#9A9AA3] uppercase font-bold">
                      <span>{related.date}</span>
                      <span>{related.readTime} read</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Screenshots */}
        {article.relatedScreenshots && article.relatedScreenshots.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
                Related <span className="text-[#FF5FAF]">Screenshots</span>
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {article.relatedScreenshots.map((img, idx) => (
                <div key={idx} className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group/img">
                  <AssetImage 
                    src={img} 
                    alt={`Related Scene ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Trailers */}
        {article.relatedTrailers && article.relatedTrailers.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
                Related <span className="text-[#FF8A2A]">Trailers</span>
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {article.relatedTrailers.map((slug, idx) => (
                <button 
                  key={idx}
                  onClick={() => navigate(`/trailers/${slug}`)}
                  className="w-full p-6 sm:p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 border border-white/5 hover:border-[#FF8A2A]/30 flex items-center gap-6 group cursor-pointer shadow-lg"
                >
                  <div className="w-14 h-14 rounded-full bg-[#FF8A2A]/20 flex items-center justify-center text-[#FF8A2A] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] tracking-[0.2em] text-[#9A9AA3] uppercase font-bold block mb-1">Watch</span>
                    <span className="font-display font-bold text-white text-xl sm:text-2xl group-hover:text-[#FF8A2A] transition-colors">Trailer {idx + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related Characters */}
        {article.relatedCharacters && article.relatedCharacters.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider">
                Related <span className="text-[#9D4EDD]">Characters</span>
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-4">
              {article.relatedCharacters.map((charSlug, idx) => (
                <button 
                  key={idx}
                  onClick={() => navigate(`/characters/${charSlug}`)}
                  className="px-8 py-4 rounded-full bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 border border-white/10 hover:border-[#9D4EDD]/50 flex items-center gap-3 cursor-pointer text-white font-bold uppercase tracking-[0.15em] text-xs hover:text-[#9D4EDD] shadow-lg group"
                >
                  <HiUser className="text-[#9D4EDD] w-4 h-4 group-hover:scale-110 transition-transform" />
                  {charSlug.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </motion.article>
  );
}

