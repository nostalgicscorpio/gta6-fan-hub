import { ASSETS } from '../config/assets';

export const trailers = [
  {
    id: 1,
    slug: 'trailer-1',
    title: 'Grand Theft Auto VI — Trailer 1',
    subtitle: 'Official Reveal',
    description: 'The first official look at Grand Theft Auto VI. Welcome to Leonida, the home of the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
    duration: '1:31',
    views: '220M+ views',
    date: 'Dec 2023',
    youtubeId: 'QdBZY2fkU-0',
    platform: 'PlayStation 5, Xbox Series X|S',
    featured: true,
    thumbnail: ASSETS.TRAILERS.HERO_BG,
    gallery: [
      ASSETS.SCREENSHOTS.SUNSET,
      ASSETS.SCREENSHOTS.NIGHTLIFE,
      ASSETS.SCREENSHOTS.BEACH,
      ASSETS.SCREENSHOTS.DOWNTOWN
    ],
    relatedTrailers: ['trailer-2']
  },
  {
    id: 2,
    slug: 'trailer-2',
    title: 'Grand Theft Auto VI — Trailer 2',
    subtitle: 'Official Trailer 2',
    description:
      'Jason and Lucia find themselves caught in a criminal conspiracy stretching across Leonida.',
    duration: '2:46',
    views: '170M+ views',
    date: 'May 2025',
    youtubeId: 'VQRLujxTm3c',
    platform: 'PlayStation 5, Xbox Series X|S',
    featured: false,
    thumbnail: ASSETS.SCREENSHOTS.DOWNTOWN,
    gallery: [
      ASSETS.SCREENSHOTS.DOWNTOWN,
      ASSETS.SCREENSHOTS.BEACH,
      ASSETS.SCREENSHOTS.NIGHTLIFE,
      ASSETS.SCREENSHOTS.SUNSET
    ],
    relatedTrailers: ['trailer-1']
  }
];
