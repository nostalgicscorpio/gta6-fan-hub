import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = process.env.VITE_SITE_URL || 'http://localhost:5173';

function extractSlugs(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = [];
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function generateSitemap() {
  const urls = [];
  
  // Static routes
  const staticRoutes = [
    '',
    '/news',
    '/trailers',
    '/map',
    '/media'
  ];
  
  staticRoutes.forEach(route => {
    urls.push({ loc: `${DOMAIN}${route}`, priority: route === '' ? '1.0' : '0.8', changefreq: 'daily' });
  });

  // Dynamic routes
  const newsSlugs = extractSlugs(path.join(__dirname, '../src/data/news.js'));
  const charSlugs = extractSlugs(path.join(__dirname, '../src/data/characters.js'));
  const trailerSlugs = extractSlugs(path.join(__dirname, '../src/data/trailers.js'));

  newsSlugs.forEach(slug => {
    urls.push({ loc: `${DOMAIN}/news/${slug}`, priority: '0.7', changefreq: 'weekly' });
  });

  charSlugs.forEach(slug => {
    urls.push({ loc: `${DOMAIN}/characters/${slug}`, priority: '0.6', changefreq: 'monthly' });
  });

  trailerSlugs.forEach(slug => {
    urls.push({ loc: `${DOMAIN}/trailers/${slug}`, priority: '0.7', changefreq: 'monthly' });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  
  console.log('✅ sitemap.xml and robots.txt generated successfully!');
}

generateSitemap();
