import { ASSETS } from '../config/assets';

export const mapCategories = [
  { id: 'all', name: 'All Locations', color: 'bg-white' },
  { id: 'missions', name: 'Missions', color: 'bg-gta-orange' },
  { id: 'characters', name: 'Characters', color: 'bg-gta-pink' },
  { id: 'vehicles', name: 'Vehicles', color: 'bg-gta-yellow' },
  { id: 'collectibles', name: 'Collectibles', color: 'bg-gta-purple' },
  { id: 'businesses', name: 'Businesses', color: 'bg-gta-green' },
  { id: 'police', name: 'Police', color: 'bg-gta-blue' },
  { id: 'medical', name: 'Medical', color: 'bg-gta-red' },
  { id: 'activities', name: 'Activities', color: 'bg-gta-cyan' },
  { id: 'secrets', name: 'Secrets', color: 'bg-gray-400' },
];

export const locations = [
  {
    id: 'loc-vc-downtown',
    name: 'Vice City Downtown',
    category: 'businesses',
    desc: 'The beating heart of Leonida — skyscrapers, nightclubs, and high-stakes heists.',
    coordinates: { x: '60%', y: '45%' }, // Percentage based for scalability
    importance: 'High',
    relatedCharacters: ['Jason', 'Lucia'],
    relatedMissions: ['The Setup', 'Neon Nights'],
    facts: ['Highest density of high-end vehicles', 'Inspired by Ocean Drive'],
    image: ASSETS.SCREENSHOTS.DOWNTOWN
  },
  {
    id: 'loc-ocean-beach',
    name: 'Ocean Beach',
    category: 'activities',
    desc: 'Sun-drenched coastline with luxury resorts and shady dealings.',
    coordinates: { x: '75%', y: '60%' },
    importance: 'High',
    relatedCharacters: [],
    relatedMissions: [],
    facts: ['Known for pristine beaches and night parties.', 'Cruiser vehicles frequently spawn here.'],
    image: ASSETS.SCREENSHOTS.BEACH
  },
  {
    id: 'loc-vcpd-hq',
    name: 'VCPD Headquarters',
    category: 'police',
    desc: 'The main stronghold of the Vice City Police Department.',
    coordinates: { x: '58%', y: '48%' },
    importance: 'Critical',
    relatedCharacters: ['Lucia'],
    relatedMissions: ['Arrival', 'Departure Tax'],
    facts: ['Fully explorable terminals', 'Multiple runways for large aircraft'],
    image: ASSETS.SCREENSHOTS.DOWNTOWN // Placeholder
  },
  {
    id: 'loc-vc-hospital',
    name: 'Ocean View Medical',
    category: 'medical',
    desc: 'Primary respawn location for casualties in the Vice City area.',
    coordinates: { x: '65%', y: '52%' },
    importance: 'Medium',
    relatedCharacters: [],
    relatedMissions: [],
    facts: ['You will lose a percentage of your cash when respawning here.'],
    image: ASSETS.SCREENSHOTS.NIGHTLIFE
  },
  {
    id: 'loc-port-gellhorn',
    name: 'Port Gellhorn',
    category: 'businesses',
    desc: 'Industrial docks and smuggling routes along the southern coast.',
    coordinates: { x: '35%', y: '70%' },
    importance: 'Medium',
    relatedCharacters: [],
    relatedMissions: ['Smuggler\'s Run'],
    facts: ['Primary import/export hub for illegal goods.', 'Controlled by local syndicates.'],
    image: ASSETS.SCREENSHOTS.SUNSET
  },
  {
    id: 'loc-grassrivers',
    name: 'Grassrivers',
    category: 'activities',
    desc: 'Swamplands and backwater towns on the western frontier.',
    coordinates: { x: '25%', y: '40%' },
    importance: 'Medium',
    relatedCharacters: [],
    relatedMissions: [],
    facts: ['Airboats are the primary mode of transportation.', 'Beware of local wildlife (gators).'],
    image: ASSETS.SCREENSHOTS.SWAMP
  },
  {
    id: 'loc-pawn-and-gun',
    name: 'Pawn & Gun',
    category: 'businesses',
    desc: 'A local gun store providing weapons, ammo, and tactical gear.',
    coordinates: { x: '45%', y: '35%' },
    importance: 'High',
    relatedCharacters: ['Jason'],
    relatedMissions: ['Armed Robbery'],
    facts: ['Featured in Trailer 1 during a robbery sequence.', 'Sells advanced weaponry to trusted customers.'],
    image: ASSETS.UI.NEWS_THUMB
  },
  {
    id: 'loc-tulip-spawn',
    name: 'Declasse Tulip Spawn',
    category: 'vehicles',
    desc: 'Guaranteed spawn location for Jason\'s signature vehicle.',
    coordinates: { x: '55%', y: '42%' },
    importance: 'Low',
    relatedCharacters: ['Jason'],
    relatedMissions: ['Under Investigation'],
    facts: ['Helipad on roof', 'Impound lot around back'],
    image: ASSETS.SCREENSHOTS.NIGHTLIFE
  },
  {
    id: 'loc-mud-club',
    name: 'Leonida Mud Club',
    category: 'activities',
    desc: 'Off-road racing and dirt bike tracks located in the rural counties.',
    coordinates: { x: '30%', y: '25%' },
    importance: 'Low',
    relatedCharacters: [],
    relatedMissions: ['Swamp Things'],
    facts: ['High density of dangerous wildlife', 'Airboat required for deep traversal'],
    image: ASSETS.SCREENSHOTS.SWAMP
  },
  {
    id: 'loc-flamingo-collectible',
    name: 'Golden Flamingo #1',
    category: 'collectibles',
    desc: 'A hidden golden flamingo statue.',
    coordinates: { x: '80%', y: '65%' },
    importance: 'Low',
    relatedCharacters: [],
    relatedMissions: [],
    facts: ['Exclusive properties', 'Private security patrols'],
    image: ASSETS.SCREENSHOTS.SUNSET
  }
];
