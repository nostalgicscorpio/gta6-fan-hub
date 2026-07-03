import { ASSETS } from '../config/assets';

// Data schema designed to scale to thousands of official Rockstar assets.
// Simply drop new images into the public/images folder and register them here.
export const categories = ['All', 'Screenshots', 'Artwork', 'Wallpapers', 'Cover Art', 'Characters', 'Locations', 'Promotional'];

export const mediaItems = [
  {
    id: 'media-001',
    src: ASSETS.SCREENSHOTS.SUNSET,
    title: 'Vice City Sunset',
    category: 'Screenshots',
    description: 'A breathtaking view of the Vice City skyline at dusk.',
    tags: ['Sunset', 'Skyline']
  },
  {
    id: 'media-002',
    src: ASSETS.SCREENSHOTS.NIGHTLIFE,
    title: 'Neon Nights',
    category: 'Screenshots',
    description: 'The vibrant neon-lit streets of Vice City.',
    tags: ['Night', 'Neon']
  },
  {
    id: 'media-003',
    src: ASSETS.SCREENSHOTS.SWAMP,
    title: 'Leonida Wetlands',
    category: 'Screenshots',
    description: 'Airboat cruising through the dense Grassrivers.',
    tags: ['Swamp', 'Wilderness']
  },
  {
    id: 'media-004',
    src: ASSETS.SCREENSHOTS.CHASE,
    title: 'Highway Pursuit',
    category: 'Screenshots',
    description: 'High-speed chase on the Leonida interstate.',
    tags: ['Action', 'Chase']
  },
  {
    id: 'media-005',
    src: ASSETS.SCREENSHOTS.BEACH,
    title: 'Ocean Beach Day',
    category: 'Screenshots',
    description: 'Crowded beaches and clear waters.',
    tags: ['Beach', 'Ocean']
  },
  {
    id: 'media-006',
    src: ASSETS.SCREENSHOTS.DOWNTOWN,
    title: 'Downtown Vice',
    category: 'Screenshots',
    description: 'Looking up at the monolithic structures of downtown Vice City.',
    tags: ['City', 'Skyscrapers']
  },
  {
    id: 'media-007',
    src: ASSETS.CHARACTERS.JASON.PROFILE,
    title: 'Jason Profile',
    category: 'Characters',
    description: 'Official character portrait for Jason.',
    tags: ['Jason', 'Protagonist']
  },
  {
    id: 'media-008',
    src: ASSETS.CHARACTERS.LUCIA.PROFILE,
    title: 'Lucia Profile',
    category: 'Characters',
    description: 'Official character portrait for Lucia.',
    tags: ['Lucia', 'Protagonist']
  },
  {
    id: 'media-009',
    src: ASSETS.CHARACTERS.LUCIA.GALLERY[1],
    title: 'Lucia Alternate 1',
    category: 'Characters',
    description: 'Alternate shot of Lucia.',
    tags: ['Lucia']
  },
  {
    id: 'media-010',
    src: ASSETS.CHARACTERS.LUCIA.GALLERY[2],
    title: 'Lucia Alternate 2',
    category: 'Characters',
    description: 'Another alternate shot of Lucia.',
    tags: ['Lucia']
  },
  {
    id: 'media-011',
    src: ASSETS.CHARACTERS.BRIAN_HEDER.PROFILE,
    title: 'Brian Heder Profile',
    category: 'Characters',
    description: 'Official character portrait for Brian Heder.',
    tags: ['Brian Heder']
  },
  {
    id: 'media-012',
    src: ASSETS.CHARACTERS.CAL_HAMPTON.PROFILE,
    title: 'Cal Hampton Profile',
    category: 'Characters',
    description: 'Official character portrait for Cal Hampton.',
    tags: ['Cal Hampton']
  },
  {
    id: 'media-013',
    src: ASSETS.CHARACTERS.BOOBIE_IKE.PROFILE,
    title: 'Boobie Ike Profile',
    category: 'Characters',
    description: 'Official character portrait for Boobie Ike.',
    tags: ['Boobie Ike']
  },
  {
    id: 'media-014',
    src: ASSETS.CHARACTERS.DREQUAN_PRIEST.PROFILE,
    title: 'Dre\'Quan Priest Profile',
    category: 'Characters',
    description: 'Official character portrait for Dre\'Quan Priest.',
    tags: ['Dre\'Quan Priest']
  },
  {
    id: 'media-015',
    src: ASSETS.CHARACTERS.RAUL_BAUTISTA.PROFILE,
    title: 'Raul Bautista Profile',
    category: 'Characters',
    description: 'Official character portrait for Raul Bautista.',
    tags: ['Raul Bautista']
  },
  {
    id: 'media-016',
    src: ASSETS.LOCATIONS.LEONIDA_MAP,
    title: 'Leonida Map',
    category: 'Locations',
    description: 'Topographical map of the Leonida state.',
    tags: ['Map', 'Leonida']
  },
  {
    id: 'media-017',
    src: ASSETS.COVER_ART.MAIN,
    title: 'Main Cover Art',
    category: 'Cover Art',
    description: 'The official key art for Grand Theft Auto VI.',
    tags: ['Key Art', 'Cover']
  },
  {
    id: 'media-018',
    src: ASSETS.TRAILERS.HERO_BG,
    title: 'Trailer Hero Background',
    category: 'Promotional',
    description: 'Promotional background image from Trailer 1.',
    tags: ['Trailer', 'Promo']
  },
  {
    id: 'media-019',
    src: ASSETS.UI.NEWS_THUMB,
    title: 'News Thumbnail Default',
    category: 'Promotional',
    description: 'Default promotional thumbnail for news articles.',
    tags: ['UI', 'Promo']
  }
];
