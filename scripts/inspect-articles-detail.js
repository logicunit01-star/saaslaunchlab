const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ARTICLES_DIR = path.join(__dirname, '../src/content/articles');
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));

const data = files.map(f => {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8');
  const { data: frontmatter, content } = matter(raw);

  const links = [...content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m => ({ text: m[1], url: m[2] }));
  const internalLinks = links.filter(l => l.url.startsWith('/') || l.url.includes('saaslaunchlab.com'));
  const externalLinks = links.filter(l => l.url.startsWith('http') && !l.url.includes('saaslaunchlab.com'));

  const tables = (content.match(/\|.+\|/g) || []).length > 2;
  const codeBlocks = (content.match(/```/g) || []).length / 2;
  const hasFaq = /##\s*FAQ|###\s*FAQ|Frequently Asked Questions/i.test(content);

  // Grab introduction (first 2 paragraphs)
  const paragraphs = content.split('\n\n').filter(p => p.trim() && !p.startsWith('#') && !p.startsWith('---'));
  const intro = paragraphs.slice(0, 2).join(' ').replace(/\n/g, ' ').slice(0, 250);

  return {
    slug: frontmatter.slug || f.replace('.md', ''),
    title: frontmatter.title,
    category: frontmatter.category,
    wordCount: frontmatter.wordCount || content.split(/\s+/).length,
    internalLinksCount: internalLinks.length,
    internalLinks,
    externalLinksCount: externalLinks.length,
    hasTables: tables,
    codeBlocksCount: Math.floor(codeBlocks),
    hasFaq,
    intro
  };
});

// Output comprehensive summary table
console.log('SLUG | CATEGORY | WORDS | OUT_LINKS | TABLES | CODE | FAQ');
console.log('---|---|---|---|---|---|---');
data.forEach(d => {
  console.log(`${d.slug} | ${d.category} | ${d.wordCount} | ${d.internalLinksCount} | ${d.hasTables} | ${d.codeBlocksCount} | ${d.hasFaq}`);
});

fs.writeFileSync(path.join(__dirname, '../articles-detail.json'), JSON.stringify(data, null, 2));
