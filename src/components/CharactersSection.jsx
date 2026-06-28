import { motion } from 'framer-motion';
import { revealVariants, staggerContainer } from '../utils/animations';

const characters = [
  {
    id: 1,
    name: 'Lucia',
    role: 'Protagonist',
    bio: 'A determined woman navigating the criminal underworld of Leonida. The first female protagonist in mainline GTA history, Lucia brings a fierce, compelling perspective to a story of ambition and survival.',
    image: '/images/lucia.png',
    accent: 'from-gta-pink/60 to-gta-orange/60',
    stats: [
      { label: 'Origin', value: 'Leonida' },
      { label: 'Specialty', value: 'Heists & Strategy' },
    ],
  },
  {
    id: 2,
    name: 'Jason',
    role: 'Protagonist',
    bio: 'A small-time criminal with big ambitions. Together with Lucia, Jason forms one half of a Bonnie-and-Clyde duo tearing through the sun-soaked streets of Vice City in pursuit of the American Dream.',
    image: '/images/jason.png',
    accent: 'from-gta-orange/60 to-gta-gold/60',
    stats: [
      { label: 'Origin', value: 'Vice City' },
      { label: 'Specialty', value: 'Driving & Combat' },
    ],
  },
  {
    id: 3,
    name: 'Vice City',
    role: 'The City',
    bio: 'Reimagined and rebuilt from the ground up, Vice City returns as a living, breathing metropolis within the state of Leonida — complete with dynamic weather, evolving neighborhoods, and a vibrant nightlife scene.',
    image: '/images/vice-city.png',
    accent: 'from-gta-cyan/40 to-gta-purple/40',
    stats: [
      { label: 'Region', value: 'State of Leonida' },
      { label: 'Inspired By', value: 'Miami, FL' },
    ],
  },
];

export default function CharactersSection() {
  return (
    <section id="characters" className="relative py-20 sm:py-28">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-12 sm:mb-16"
        >
          <motion.p variants={revealVariants} className="text-[11px] tracking-[0.5em] uppercase text-gta-orange font-medium mb-2">
            Meet the Cast
          </motion.p>
          <motion.h2 variants={revealVariants} className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            MAIN <span className="text-gta-orange">CHARACTERS</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
        >
          {characters.map((char, i) => (
            <motion.div
              key={char.id}
              variants={revealVariants}
              custom={i}
              whileHover={{ y: -8 }}
              className="group glass-card rounded-xl overflow-hidden cursor-pointer card-hover-glow"
            >
              {/* Portrait */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${char.accent} opacity-20 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="absolute inset-0 bg-gradient-to-t from-gta-card via-gta-card/30 to-transparent" />

                {/* Role badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gta-orange bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-gta-orange/20">
                    {char.role}
                  </span>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-4 left-5">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:text-gta-orange transition-colors duration-300">
                    {char.name}
                  </h3>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 sm:p-6">
                <p className="text-sm text-gta-muted leading-relaxed mb-4">
                  {char.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {char.stats.map((stat) => (
                    <div key={stat.label} className="bg-white/[0.03] rounded-lg p-3 hover:bg-white/[0.06] transition-colors duration-200">
                      <p className="text-[9px] tracking-[0.3em] uppercase text-gta-muted mb-1">{stat.label}</p>
                      <p className="text-xs font-semibold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
