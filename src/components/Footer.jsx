import { motion } from 'framer-motion';
import { FaTwitter, FaYoutube, FaInstagram, FaDiscord } from 'react-icons/fa';
import { trackButtonClick } from '../utils/analytics';
import { revealVariants, staggerContainer } from '../utils/animations';

import { SOCIAL_LINKS } from '../config/socials';

const socialLinks = [
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaYoutube, href: SOCIAL_LINKS.YOUTUBE, label: 'YouTube' },
  { icon: FaInstagram, href: SOCIAL_LINKS.INSTAGRAM, label: 'Instagram' },
  { icon: FaDiscord, href: SOCIAL_LINKS.DISCORD, label: 'Discord' },
];

const footerLinks = [
  { title: 'Explore', items: [{name: 'Home', href: '/#home'}, {name: 'News', href: '/news'}, {name: 'Trailers', href: '/trailers'}, {name: 'Screenshots', href: '/media'}] },
  { title: 'Creator', items: [{name: 'Community Hub', href: '/community'}, {name: 'YouTube', href: '/youtube'}, {name: 'Instagram', href: '/instagram'}, {name: 'Gameplay', href: '/gameplay'}] },
  { title: 'Game', items: [{name: 'Characters', href: '/#characters'}, {name: 'Map', href: '/#map'}] },
];

export default function Footer() {
  const handleSocialClick = (label) => {
    trackButtonClick(`Social: ${label}`);
  };

  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.05)] bg-[#0B0B0D]">
      {/* Subtle Gradient border highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(255,138,42,0.3)] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8"
        >
          {/* Brand */}
          <motion.div variants={revealVariants} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-display font-black text-3xl tracking-widest text-[#FFFFFF]">GTA</span>
              <span className="font-display font-black text-3xl tracking-widest text-[#FF8A2A]">VI</span>
              <span className="text-[10px] text-[#8D8D97] ml-2 tracking-[0.2em] uppercase font-bold border border-[rgba(255,255,255,0.1)] px-2 py-1 rounded-sm">
                Fan Hub
              </span>
            </div>
            <p className="text-sm text-[#8D8D97] leading-relaxed max-w-sm mb-8 tracking-wide">
              The ultimate unofficial fan destination for everything Grand Theft Auto VI.
              Not affiliated with Rockstar Games or Take-Two Interactive.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  onClick={() => handleSocialClick(label)}
                  className="w-12 h-12 rounded-full bg-[#1B1C22] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-[#8D8D97] hover:text-[#FFFFFF] hover:border-[#FFFFFF]/30 transition-all duration-300 shadow-lg hover:shadow-[0_4px_16px_rgba(255,255,255,0.05)] focus-ring hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerLinks.map((col, i) => (
            <motion.div key={col.title} variants={revealVariants} custom={i + 1}>
              <h4 className="font-display font-bold text-[11px] tracking-[0.2em] text-[#FFFFFF] mb-6 uppercase">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => trackButtonClick(`Footer: ${item.name}`)}
                      className="text-sm font-medium text-[#8D8D97] hover:text-[#FF8A2A] transition-colors duration-300 focus-ring"
                    >
                      {item.name}
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
          className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs text-[#8D8D97] text-center sm:text-left leading-relaxed max-w-3xl tracking-wide">
            © {new Date().getFullYear()} GTA VI Fan Hub. This is an unofficial fan-made website.
            Grand Theft Auto, GTA, and all related marks are trademarks of Take-Two Interactive Software, Inc.
            All game imagery used under fair use for commentary and fan appreciation.
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] uppercase font-bold tracking-widest text-[#8D8D97] hover:text-[#FFFFFF] transition-colors cursor-pointer flex items-center gap-2 focus-ring"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              Back to Top
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
