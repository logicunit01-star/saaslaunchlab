const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ARTICLES_DIR = path.join(__dirname, '../src/content/articles');
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));

console.log(`Auditing ${files.length} articles...\n`);

const articles = files.map(file => {
  const fullPath = path.join(ARTICLES_DIR, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  // Find all markdown links [text](url)
  const linkMatches = [...content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  const internalLinks = [];
  const externalLinks = [];

  linkMatches.forEach(m => {
    const text = m[1];
    const url = m[2];
    if (url.startsWith('/') || url.includes('saaslaunchlab.com')) {
      internalLinks.push({ text, url });
    } else if (url.startsWith('http://') || url.startsWith('https://')) {
      externalLinks.push({ text, url });
    }
  });

  // Check headings
  const h1Matches = [...content.matchAll(/^#\s+(.+)$/gm)];
  const h2Matches = [...content.matchAll(/^##\s+(.+)$/gm)];
  const h3Matches = [...content.matchAll(/^###\s+(.+)$/gm)];
  const h4Matches = [...content.matchAll(/^####\s+(.+)$/gm)];

  return {
    file,
    slug: data.slug || file.replace(/\.md$/, ''),
    title: data.title,
    category: data.category,
    readingTime: data.readingTime,
    wordCount: data.wordCount || content.split(/\s+/).length,
    publishedAt: data.publishedAt,
    modifiedAt: data.modifiedAt,
    featuredImage: data.featuredImage,
    featuredImageAlt: data.featuredImageAlt,
    internalLinks,
    externalLinks,
    h1Count: h1Matches.length,
    h2Count: h2Matches.length,
    h3Count: h3Matches.length,
    h4Count: h4Matches.length,
    headingsInFrontmatter: data.headings ? data.headings.length : 0,
    hasFaq: /FAQ|Frequently Asked Questions/i.test(content),
    contentLength: content.length
  };
});

// Calculate inbound links for each article
const inboundLinks = {};
articles.forEach(a => { inboundLinks[a.slug] = []; });

articles.forEach(source => {
  source.internalLinks.forEach(l => {
    const slugMatch = l.url.match(/\/blog\/([^/#?]+)/);
    if (slugMatch && inboundLinks[slugMatch[1]]) {
      inboundLinks[slugMatch[1]].push({ from: source.slug, text: l.text });
    }
  });
});

console.log('--- SUMMARY STATS ---');
console.log(`Total Articles: ${articles.length}`);
const categories = [...new Set(articles.map(a => a.category))];
console.log(`Categories (${categories.length}):`, categories);

console.log('\n--- ARTICLES OVERVIEW ---');
articles.forEach((a, i) => {
  const inbounds = inboundLinks[a.slug] || [];
  console.log(`${i+1}. [${a.slug}]`);
  console.log(`   Title: "${a.title}"`);
  console.log(`   Category: ${a.category} | Words: ${a.wordCount} | Has FAQ: ${a.hasFaq}`);
  console.log(`   Dates: Pub: ${a.publishedAt?.slice(0,10)} | Mod: ${a.modifiedAt?.slice(0,10)}`);
  console.log(`   Internal Links Out: ${a.internalLinks.length} | Inbound: ${inbounds.length}`);
  console.log(`   External Links: ${a.externalLinks.length}`);
  if (inbounds.length === 0) {
    console.log(`   ⚠️ ORPHAN (0 inbound internal links)`);
  }
});

fs.writeFileSync(path.join(__dirname, '../audit-data.json'), JSON.stringify({ articles, inboundLinks }, null, 2));
console.log('\nWrote audit-data.json');
