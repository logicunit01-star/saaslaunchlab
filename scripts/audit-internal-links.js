const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ARTICLES_DIR = path.join(__dirname, '../src/content/articles');
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));

const allSlugs = files.map(f => f.replace('.md', ''));
const validCategories = [
  'ai-automation',
  'architecture',
  'audits-economics',
  'growth-strategy',
  'mvp-engineering'
];
const validSiteRoutes = ['/', '/blog', '/contact', '/about', '/terms', '/privacy'];

const report = [];

files.forEach(f => {
  const sourceSlug = f.replace('.md', '');
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8');
  const { content } = matter(raw);

  // Match only [text](url) that is NOT preceded by ! (which is an image)
  const links = [...content.matchAll(/(?<!\!)\[([^\]]+)\]\(([^)]+)\)/g)];
  links.forEach(m => {
    const text = m[1].trim();
    const url = m[2].trim();

    if (url.startsWith('/images/')) {
      return; // Ignore direct image links
    }

    if (url.startsWith('/') || url.includes('saaslaunchlab.com')) {
      let isBroken = false;
      let linkType = 'article';
      let destSlug = null;

      if (url.startsWith('/blog/category/')) {
        linkType = 'category';
        const catSlug = url.replace('/blog/category/', '').replace(/\/$/, '');
        destSlug = catSlug;
        isBroken = !validCategories.includes(catSlug);
      } else if (url.startsWith('/blog/')) {
        linkType = 'article';
        destSlug = url.replace('/blog/', '').replace(/\/$/, '');
        isBroken = !allSlugs.includes(destSlug);
      } else {
        const normalizedRoute = url === '/' ? '/' : url.replace(/\/$/, '');
        if (validSiteRoutes.includes(normalizedRoute) || url.startsWith('/author/')) {
          linkType = 'site';
          isBroken = false;
        } else {
          isBroken = true;
        }
      }

      const isGeneric = /^(here|click here|read more|cost|saas|link|article|guide|learn more)$/i.test(text);

      report.push({
        sourceSlug,
        text,
        url,
        linkType,
        destSlug,
        isBroken,
        isGeneric
      });
    }
  });
});

console.log(`Found ${report.length} total internal links.`);
const broken = report.filter(r => r.isBroken);
console.log(`Broken internal links (${broken.length}):`, broken);

const generic = report.filter(r => r.isGeneric);
console.log(`Generic / Mismatched anchor texts (${generic.length}):`, generic);

fs.writeFileSync(path.join(__dirname, '../internal-links-audit.json'), JSON.stringify(report, null, 2));
