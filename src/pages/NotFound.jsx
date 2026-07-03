import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { ASSETS } from '../config/assets';

export default function NotFound() {
 return (
 <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-sans">
 <SEO title="404 - Not Found" />
 <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: `url(${ASSETS.UI.GRID})` }} />
 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
 
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="relative z-10 text-center max-w-lg px-6"
 >
 <h1 className="font-display font-black text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-4 tracking-tighter">
 404
 </h1>
 <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-primary mb-6">
 Location Not Found
 </h2>
 <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10">
 The requested area of Leonida could not be located. The link may be broken or you might have ventured too far off the map.
 </p>
 <Link 
 to="/"
 className="inline-block px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-md hover:bg-primary hover:shadow-[0_0_20px_rgba(255,106,0,0.5)] transition-all"
 >
 Return to Hub
 </Link>
 </motion.div>
 </div>
 );
}
