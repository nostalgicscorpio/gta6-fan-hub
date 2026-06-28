import { motion } from 'framer-motion';
import { FaTwitter, FaYoutube, FaInstagram, FaDiscord } from 'react-icons/fa';
import { trackButtonClick } from '../utils/analytics';
import { revealVariants, staggerContainer } from '../utils/animations';

const socialLinks = [
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaDiscord, href: '#', label: 'Discord' },
];

const footerLinks = [
  { title: 'Explore', items: ['Home', 'News', 'Trailers', 'Screenshots'] },
  { title: 'Game', items: ['Characters', 'Map', 'Vehicles', 'Missions'] },
  { title: 'Community', items: ['Forums', 'Fan Art', 'Discord', 'Reddit'] },
];

export default function Footer() {
  const handleSocialClick = (label) => {
    trackButtonClick(`Social: ${label}`);
  };

  return (
    <footer className="relative border-t border-gta-border/50">
      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gta-orange/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8"
        >
          {/* Brand */}
          <motion.div variants={revealVariants} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display font-black text-2xl tracking-wider text-gta-orange text-glow">GTA</span>
              <span className="font-display font-black text-2xl tracking-wider text-white">VI</span>
              <span className="text-xs text-gta-muted ml-2 tracking-wider uppercase">Fan Hub</span>
            </div>
            <p className="text-sm text-gta-muted leading-relaxed max-w-sm mb-6">
              The ultimate unofficial fan destination for everything Grand Theft Auto VI.
              Not affiliated with Rockstar Games or Take-Two Interactive.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  onClick={() => handleSocialClick(label)}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-gta-muted hover:text-gta-orange hover:border-gta-orange/40 hover:shadow-[0_0_15px_rgba(255,106,0,0.2)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerLinks.map((col, i) => (
            <motion.div key={col.title} variants={revealVariants} custom={i + 1}>
              <h4 className="font-display font-bold text-sm tracking-wider text-white mb-4 uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={() => trackButtonClick(`Footer: ${item}`)}
                      className="text-sm text-gta-muted hover:text-gta-orange transition-colors duration-200 hover:pl-1"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 pt-6 border-t border-gta-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-gta-muted/60 text-center sm:text-left">
            © {new Date().getFullYear()} GTA VI Fan Hub. This is an unofficial fan-made website.
            Grand Theft Auto, GTA, and all related marks are trademarks of Take-Two Interactive Software, Inc.
            All game imagery used under fair use for commentary and fan appreciation.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs text-gta-muted/40 hover:text-gta-orange transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              Back to Top
            </button>
            <p className="text-xs text-gta-muted/40">
              Built with React + Vite ⚡
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
