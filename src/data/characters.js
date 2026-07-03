import { ASSETS } from '../config/assets';

export const characters = [
  {
    id: 1,
    slug: 'jason',
    name: 'Jason',
    role: 'Protagonist',
    description: 'Partner to Lucia in a dynamic Bonnie-and-Clyde style relationship navigating the criminal underworld of Leonida.',
    bio: 'Jason is one half of the dual-protagonist dynamic introduced in Grand Theft Auto VI. Navigating the sun-drenched and neon-lit environments of Leonida, Jason operates in close partnership with Lucia. Trailer 1 highlights their deep bond built on trust, showcasing them executing armed robberies together and navigating the high-stakes criminal lifestyle of Vice City and its surrounding counties. While much of his background remains shrouded in mystery, his pragmatic and determined nature makes him a formidable force in the criminal enterprise.',
    image: ASSETS.CHARACTERS.JASON.PROFILE,
    quote: 'Trust.',
    accent: 'from-gta-orange/60 to-gta-gold/60',
    stats: [
      { label: 'Origin', value: 'Unknown' },
      { label: 'Status', value: 'Active' },
      { label: 'Affiliation', value: 'Lucia' },
      { label: 'Location', value: 'Leonida' }
    ],
    knownLocations: [
      { name: 'Vice City', confirmed: true },
      { name: 'Kelly County', confirmed: true },
      { name: 'Leonida', confirmed: true }
    ],
    gallery: ASSETS.CHARACTERS.JASON.GALLERY,
    relatedTrailers: ['trailer-1'],
    relatedNews: []
  },
  {
    id: 2,
    slug: 'lucia',
    name: 'Lucia',
    role: 'Protagonist',
    description: 'A resilient individual thrust into the criminal lifestyle of Vice City, navigating both the streets and the penal system.',
    bio: 'Lucia marks a historic milestone as the first female protagonist of the modern Grand Theft Auto era. First introduced in the official Trailer 1 within the walls of a Leonida Department of Corrections facility, Lucia’s journey is one of resilience and survival. Partnered with Jason, she forms a tight-knit duo operating on trust to execute daring robberies and navigate the chaotic, culturally rich environment of Vice City. Her story promises a deep dive into the complexities of crime, loyalty, and survival in the state of Leonida.',
    image: ASSETS.CHARACTERS.LUCIA.PROFILE,
    quote: 'The only way we\'re gonna get through this, is by sticking together, being a team.',
    accent: 'from-gta-pink/60 to-gta-orange/60',
    stats: [
      { label: 'Status', value: 'Incarcerated / Active' },
      { label: 'Affiliation', value: 'Jason' },
      { label: 'Location', value: 'Leonida' }
    ],
    knownLocations: [
      { name: 'Vice City', confirmed: true },
      { name: 'Leonida State Prison', confirmed: true }
    ],
    gallery: ASSETS.CHARACTERS.LUCIA.GALLERY,
    relatedTrailers: ['trailer-1'],
    relatedNews: []
  },
  {
    id: 3,
    slug: 'brian-heder',
    name: 'Brian Heder',
    role: 'Supporting Character',
    description: 'A tech-savvy hacker associated with the underground networks of Vice City.',
    bio: 'Brian Heder is known throughout the dark web and the criminal underground of Leonida as a top-tier digital infiltrator. With an uncanny ability to breach high-security systems, he provides essential support for complex heists. While he prefers the safety of his multi-monitor setup over field work, his contributions are indispensable to Jason and Lucia.',
    image: ASSETS.CHARACTERS.BRIAN_HEDER.PROFILE,
    quote: 'I\'m in.',
    accent: 'from-blue-500/60 to-purple-500/60',
    stats: [
      { label: 'Specialty', value: 'Cyber Security' },
      { label: 'Status', value: 'Active' },
      { label: 'Affiliation', value: 'Underground' },
      { label: 'Location', value: 'Vice City' }
    ],
    knownLocations: [
      { name: 'Vice City', confirmed: true }
    ],
    gallery: ASSETS.CHARACTERS.BRIAN_HEDER.GALLERY,
    relatedTrailers: [],
    relatedNews: []
  },
  {
    id: 4,
    slug: 'cal-hampton',
    name: 'Cal Hampton',
    role: 'Antagonist',
    description: 'A ruthless cartel enforcer with a grip on Leonida’s southern ports.',
    bio: 'Cal Hampton rose through the ranks of the Leonida cartel with brutal efficiency. Operating primarily out of the southern ports, he oversees the smuggling of weapons and contraband. He is fiercely territorial and represents a significant obstacle for any aspiring criminal organization in the region.',
    image: ASSETS.CHARACTERS.CAL_HAMPTON.PROFILE,
    quote: 'This is my city now.',
    accent: 'from-red-600/60 to-red-800/60',
    stats: [
      { label: 'Role', value: 'Enforcer' },
      { label: 'Status', value: 'Active' },
      { label: 'Affiliation', value: 'Cartel' },
      { label: 'Location', value: 'Leonida Ports' }
    ],
    knownLocations: [
      { name: 'Vice City Ports', confirmed: true }
    ],
    gallery: ASSETS.CHARACTERS.CAL_HAMPTON.GALLERY,
    relatedTrailers: [],
    relatedNews: []
  },
  {
    id: 5,
    slug: 'boobie-ike',
    name: 'Boobie Ike',
    role: 'Fixer',
    description: 'An eccentric but highly connected fixer in the Vice City nightclub scene.',
    bio: 'If you need something done quietly in Vice City, Boobie Ike is the man to see. Operating out of the city’s most exclusive VIP lounges, he leverages his extensive network of corrupt officials, celebrities, and street gangs to broker deals and solve problems for the highest bidder.',
    image: ASSETS.CHARACTERS.BOOBIE_IKE.PROFILE,
    quote: 'Everyone has a price, my friend.',
    accent: 'from-yellow-400/60 to-gta-gold/60',
    stats: [
      { label: 'Profession', value: 'Fixer' },
      { label: 'Status', value: 'Active' },
      { label: 'Affiliation', value: 'Independent' },
      { label: 'Location', value: 'Vice City Nightclubs' }
    ],
    knownLocations: [
      { name: 'Vice City', confirmed: true }
    ],
    gallery: ASSETS.CHARACTERS.BOOBIE_IKE.GALLERY,
    relatedTrailers: [],
    relatedNews: []
  },
  {
    id: 6,
    slug: 'drequan-priest',
    name: 'Dre\'Quan Priest',
    role: 'Gang Leader',
    description: 'Leader of a prominent street gang dominating the urban districts of Vice City.',
    bio: 'Dre\'Quan Priest commands respect through a combination of fear and fierce loyalty. Rising from the gritty streets of Vice City’s urban districts, he has organized local corner crews into a formidable syndicate. His ambitions often clash with rival organizations and the protagonists.',
    image: ASSETS.CHARACTERS.DREQUAN_PRIEST.PROFILE,
    quote: 'Respect is earned in blood.',
    accent: 'from-green-500/60 to-green-700/60',
    stats: [
      { label: 'Role', value: 'Gang Leader' },
      { label: 'Status', value: 'Active' },
      { label: 'Affiliation', value: 'Street Syndicate' },
      { label: 'Location', value: 'Vice City' }
    ],
    knownLocations: [
      { name: 'Vice City', confirmed: true }
    ],
    gallery: ASSETS.CHARACTERS.DREQUAN_PRIEST.GALLERY,
    relatedTrailers: [],
    relatedNews: []
  },
  {
    id: 7,
    slug: 'raul-bautista',
    name: 'Raul Bautista',
    role: 'Corrupt Official',
    description: 'A high-ranking Leonida official deeply entwined with organized crime.',
    bio: 'Raul Bautista presents a polished, legitimate face to the public while secretly pulling the strings of Leonida\'s criminal underworld. Utilizing his political influence, he provides cover for various illicit operations in exchange for a hefty cut of the profits.',
    image: ASSETS.CHARACTERS.RAUL_BAUTISTA.PROFILE,
    quote: 'Politics is just another form of business.',
    accent: 'from-gray-500/60 to-gray-700/60',
    stats: [
      { label: 'Profession', value: 'Politician' },
      { label: 'Status', value: 'Active' },
      { label: 'Affiliation', value: 'Leonida Government' },
      { label: 'Location', value: 'Leonida' }
    ],
    knownLocations: [
      { name: 'Leonida', confirmed: true }
    ],
    gallery: ASSETS.CHARACTERS.RAUL_BAUTISTA.GALLERY,
    relatedTrailers: [],
    relatedNews: []
  }
];
