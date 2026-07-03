import { ASSETS } from '../config/assets';

export const gameplayClips = [
  {
    id: 1,
    title: 'Vice City Drive',
    description: 'Cruising through the neon-lit streets of Vice City at dusk.',
    thumbnail: ASSETS.SCREENSHOTS.SUNSET,
    youtubeId: 'QdBZY2fkU-0', // Rockstar GTA VI trailer 1 as placeholder
    game: 'GTA VI',
    category: 'Free Roam',
    uploadDate: 'December 4, 2023'
  },
  {
    id: 2,
    title: 'Leonida Swamps',
    description: 'Navigating the muddy waters and wildlife of the Leonida swamps.',
    thumbnail: ASSETS.SCREENSHOTS.SWAMP,
    youtubeId: 'QdBZY2fkU-0',
    game: 'GTA VI',
    category: 'Wilderness',
    uploadDate: 'December 5, 2023'
  },
  {
    id: 3,
    title: 'Convenience Store',
    description: 'Intense sequence inside a local convenience store.',
    thumbnail: ASSETS.SCREENSHOTS.NIGHTLIFE,
    youtubeId: 'QdBZY2fkU-0',
    game: 'GTA VI',
    category: 'Missions',
    uploadDate: 'December 6, 2023'
  },
  {
    id: 4,
    title: 'Los Santos Customs',
    description: 'Customizing vehicles in the heart of Los Santos.',
    thumbnail: null, // We can rely on a default fallback or external image
    youtubeId: 'QkkoHAzjnUs', // GTA V Trailer
    game: 'GTA V',
    category: 'Vehicles',
    uploadDate: 'November 2, 2011'
  },
  {
    id: 5,
    title: 'Vinewood Heist',
    description: 'High stakes heist preparation in Vinewood Hills.',
    thumbnail: null,
    youtubeId: 'QkkoHAzjnUs',
    game: 'GTA V',
    category: 'Missions',
    uploadDate: 'May 1, 2013'
  }
];
