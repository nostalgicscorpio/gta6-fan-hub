import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Wraps children with a smooth parallax background shift effect.
 * Use on section-level containers.
 */
export function ParallaxSection({ children, className = '', speed = 0.15, id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-gta-orange/[0.015] via-transparent to-gta-orange/[0.015] opacity-50" />
      </motion.div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

/**
 * Scroll-reveal animation variants (premium staggered fade-ups).
 */
export const revealVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/**
 * Stagger container for children.
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
