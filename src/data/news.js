import { ASSETS } from '../config/assets';

export const newsItems = [
  {
    id: 1,
    slug: 'grand-theft-auto-vi-trailer-1',
    date: 'December 4, 2023',
    category: 'TRAILERS',
    title: 'Grand Theft Auto VI Trailer 1',
    excerpt: 'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
    author: 'Rockstar Games',
    image: ASSETS.TRAILERS.HERO_BG,
    hot: true,
    breaking: true,
    readTime: '1 min',
    sourceUrl: 'https://www.rockstargames.com/newswire/article/417o255823k32a/grand-theft-auto-vi-trailer-1',
    body: [
      { type: 'paragraph', content: "Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet. Coming 2025 to PlayStation 5 and Xbox Series X|S." },
      { type: 'image', src: ASSETS.SCREENSHOTS.SUNSET, caption: 'Vice City Skyline' },
      { type: 'paragraph', content: "Watch Trailer 1 now on the official Rockstar Games YouTube channel." }
    ],
    relatedArticles: ['a-message-from-rockstar-games'],
    relatedScreenshots: [
      ASSETS.SCREENSHOTS.BEACH,
      ASSETS.SCREENSHOTS.CHASE,
      ASSETS.SCREENSHOTS.DOWNTOWN
    ],
    relatedTrailers: ['trailer-1'],
    relatedCharacters: ['jason', 'lucia']
  },
  {
    id: 2,
    slug: 'a-message-from-rockstar-games',
    date: 'November 8, 2023',
    category: 'ANNOUNCEMENTS',
    title: 'A Message from Rockstar Games',
    excerpt: 'In early December, we will release the first trailer for the next Grand Theft Auto.',
    author: 'Rockstar Games',
    image: ASSETS.UI.NEWS_THUMB,
    hot: false,
    breaking: false,
    readTime: '1 min',
    sourceUrl: 'https://www.rockstargames.com/newswire/article/8971o8789584a4/a-message-from-rockstar-games',
    body: [
      { type: 'paragraph', content: "Next month marks the 25th anniversary of Rockstar Games." },
      { type: 'paragraph', content: "Thanks to the incredible support of our players worldwide, we have had the opportunity to create games we are truly passionate about — without you, none of this would be possible, and we are so grateful to all of you for sharing this journey with us." },
      { type: 'paragraph', content: "In 1998, Rockstar Games was founded on the idea that video games could come to be as essential to culture as any other form of entertainment, and we hope that we have created games that you love in our efforts to be part of that evolution." },
      { type: 'quote', content: "We are very excited to let you know that in early December, we will release the first trailer for the next Grand Theft Auto." },
      { type: 'paragraph', content: "We look forward to many more years of sharing these experiences with all of you." },
      { type: 'paragraph', content: "Thank you,\nSam Houser" }
    ],
    relatedArticles: ['grand-theft-auto-vi-trailer-1'],
    relatedScreenshots: [],
    relatedTrailers: [],
    relatedCharacters: []
  }
];
