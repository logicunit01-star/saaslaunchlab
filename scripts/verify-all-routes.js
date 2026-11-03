const http = require('http');
const fs = require('fs');
const path = require('path');

const articlesDir = 'src/content/articles';
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
const articleSlugs = files.map(f => f.replace('.md', ''));

const categories = [
  'ai-automation',
  'architecture',
  'audits-economics',
  'growth-strategy',
  'mvp-engineering'
];

const routes = [
  '/',
  '/blog',
  '/blog/page/2',
  '/blog/page/3',
  '/blog/page/4',
  '/author/alex-vance',
  '/author/editorial-team',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/sitemap.xml',
  '/robots.txt',
  '/rss.xml',
  ...categories.map(c => `/blog/category/${c}`),
  ...articleSlugs.map(s => `/blog/${s}`)
];

function fetchRoute(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:3005' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          size: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ path: urlPath, statusCode: 500, error: err.message });
    });
  });
}

async function verifyAll() {
  console.log(`Verifying all ${routes.length} canonical routes on http://localhost:3005...`);
  let errors = 0;
  for (const r of routes) {
    const res = await fetchRoute(r);
    if (res.statusCode !== 200) {
      console.log(`[FAIL] ${r} -> Status ${res.statusCode}`);
      errors++;
    }
  }

  // Check /blog/page/1 redirect
  const p1 = await fetchRoute('/blog/page/1');
  if (p1.statusCode !== 308) {
    console.log(`[FAIL] /blog/page/1 expected 308 redirect, got ${p1.statusCode}`);
    errors++;
  } else {
    console.log(`[PASS] /blog/page/1 redirects with 308 as expected`);
  }

  console.log(`\nVerification Complete! Checked ${routes.length + 1} endpoints. Failures: ${errors}`);
  if (errors === 0) {
    console.log('ALL ROUTES 100% HEALTHY!');
  }
}

verifyAll();
