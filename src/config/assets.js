/**
 * Centralized Asset Configuration
 * 
 * When you receive the official Rockstar assets, place them in the public/images/ folders.
 * Then, update these paths to point to the new files (e.g. '/images/characters/jason.png').
 * The rest of the application will automatically update.
 */

export const ASSETS = {
  CHARACTERS: {
    JASON: {
      PROFILE: '/images/characters/jason.jpg',
      GALLERY: ['/images/characters/jason.jpg'],
      ARTWORK: [],
    },
    LUCIA: {
      PROFILE: '/images/characters/lucia.jpg',
      GALLERY: ['/images/characters/lucia.jpg', '/images/characters/lucia1.jpg', '/images/characters/lucia2.jpg'],
      ARTWORK: [],
    },
    BRIAN_HEDER: {
      PROFILE: '/images/characters/brian-heder.jpg',
      GALLERY: [],
      ARTWORK: [],
    },
    CAL_HAMPTON: {
      PROFILE: '/images/characters/cal-hampton.jpg',
      GALLERY: [],
      ARTWORK: [],
    },
    BOOBIE_IKE: {
      PROFILE: '/images/characters/boobie-ike.jpg',
      GALLERY: [],
      ARTWORK: [],
    },
    DREQUAN_PRIEST: {
      PROFILE: '/images/characters/drequan-priest.jpg',
      GALLERY: [],
      ARTWORK: [],
    },
    RAUL_BAUTISTA: {
      PROFILE: '/images/characters/raul-bautista.jpg',
      GALLERY: [],
      ARTWORK: [],
    }
  },
  LOCATIONS: {
    LEONIDA_MAP: '/images/locations/leonida-map.jpg',
  },
  SCREENSHOTS: {
    SUNSET: '/images/screenshots/ss-sunset.jpg',
    NIGHTLIFE: '/images/screenshots/ss-nightlife.jpg',
    SWAMP: '/images/screenshots/ss-swamp.jpg',
    CHASE: '/images/screenshots/ss-chase.jpg',
    BEACH: '/images/screenshots/ss-beach.jpg',
    DOWNTOWN: '/images/screenshots/ss-downtown.jpg',
  },
  TRAILERS: {
    HERO_BG: '/images/trailers/hero-bg.jpg',
  },
  UI: {
    GRID: null,
    NEWS_THUMB: '/images/ui/news-thumb.jpg',
  },
  COVER_ART: {
    MAIN: '/images/cover-art/vice-city.jpg',
  },
  LOGOS: {
    MAIN: null,
  },
  ARTWORK: {
    PROMO_1: null,
  }
};
