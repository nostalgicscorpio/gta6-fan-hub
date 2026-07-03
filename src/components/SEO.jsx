import { Helmet } from 'react-helmet-async';
import { ASSETS } from '../config/assets';

export default function SEO({ title, description, image, url, schema }) {
 const defaultTitle = "GTA VI Fan Hub | Premium Experience";
 const defaultDescription = "The ultimate fan hub for Grand Theft Auto VI. Explore the interactive map, characters, news, and official media from the state of Leonida.";
 const defaultImage = ASSETS.COVER_ART.MAIN;
 
 // Only access window if it's available (helpful for SSR/SSG if used later)
 const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
 const currentUrl = typeof window !== 'undefined' ? window.location.href : SITE_URL;

 const seo = {
 title: title ? `${title} | GTA VI Fan Hub` : defaultTitle,
 description: description || defaultDescription,
 image: image || defaultImage,
 url: url || currentUrl,
 };

 return (
 <Helmet>
 <title>{seo.title}</title>
 <meta name="description" content={seo.description} />
 <link rel="canonical" href={seo.url} />
 
 {/* Open Graph */}
 <meta property="og:type" content={schema && schema['@type'] === 'NewsArticle' ? 'article' : 'website'} />
 <meta property="og:url" content={seo.url} />
 <meta property="og:title" content={seo.title} />
 <meta property="og:description" content={seo.description} />
 <meta property="og:image" content={seo.image} />
 <meta property="og:site_name" content="GTA VI Fan Hub" />
 {schema && schema['@type'] === 'NewsArticle' && schema.datePublished && (
   <meta property="article:published_time" content={schema.datePublished} />
 )}
 <meta property="og:locale" content="en_US" />

 {/* Twitter */}
 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:url" content={seo.url} />
 <meta name="twitter:title" content={seo.title} />
 <meta name="twitter:description" content={seo.description} />
 <meta name="twitter:image" content={seo.image} />
 <meta name="twitter:creator" content="@RockstarGames" />

 {/* JSON-LD Structured Data */}
 {schema && (
 <script type="application/ld+json">
 {JSON.stringify(schema)}
 </script>
 )}
 </Helmet>
 );
}
