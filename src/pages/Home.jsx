import Hero from '../components/Hero';
import CountdownTimer from '../components/CountdownTimer';
import NewsSection from '../components/NewsSection';
import TrailersSection from '../components/TrailersSection';
import ScreenshotsSection from '../components/ScreenshotsSection';
import GameplaySection from '../components/GameplaySection';
import CharactersSection from '../components/CharactersSection';
import MapSection from '../components/MapSection';
import CreatorEcosystemSection from '../components/CreatorEcosystemSection';
import SEO from '../components/SEO';

export default function Home() {
 return (
 <main className="bg-black min-h-screen font-sans selection:bg-primary/30 text-white overflow-hidden">
 <SEO 
 schema={{
 "@context": "https://schema.org",
 "@type": "WebSite",
 "name": "GTA VI Fan Hub",
 "url": import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
 "description": "The ultimate fan hub for Grand Theft Auto VI. Explore the interactive map, characters, news, and official media from the state of Leonida.",
 "publisher": {
 "@type": "Organization",
 "name": "GTA VI Fan Hub"
 }
 }}
 />
 <Hero />
 <CountdownTimer />
 <NewsSection />
 <TrailersSection />
 <ScreenshotsSection />
 <GameplaySection />
 <CharactersSection />
 <CreatorEcosystemSection />
 <MapSection />
 </main>
 );
}
