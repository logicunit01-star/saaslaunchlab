const http = require('http');

const BASE_URL = 'http://localhost:3005';
const visited = new Set();
const toVisit = ['/'];
const brokenLinks = [];
const allPages = new Set();

function fetchPage(urlPath) {
  return new Promise((resolve) => {
    http.get(BASE_URL + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      resolve({ statusCode: 500, error: err.message });
    });
  });
}

function extractLinks(html, currentPath) {
  const links = [];
  // Match href="/..." or href="http://localhost:3005/..."
  const regex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    let href = match[1];
    if (href.startsWith('http://localhost:3005')) {
      href = href.replace('http://localhost:3005', '');
    }
    if (href.startsWith('/') && !href.startsWith('//')) {
      // ignore anchor hashes
      const cleanHref = href.split('#')[0];
      if (cleanHref && !cleanHref.startsWith('/_next') && !cleanHref.endsWith('.css') && !cleanHref.endsWith('.ico')) {
        links.push(cleanHref);
      }
    }
  }
  return links;
}

async function run() {
  console.log('Starting internal site link crawl...');
  
  while (toVisit.length > 0) {
    const current = toVisit.pop();
    if (visited.has(current)) continue;
    visited.add(current);
    allPages.add(current);

    const res = await fetchPage(current);
    if (res.statusCode >= 400) {
      brokenLinks.push({ path: current, status: res.statusCode });
      console.log(`[BROKEN] ${current} -> ${res.statusCode}`);
      continue;
    }

    if (res.statusCode === 308 || res.statusCode === 307) {
      console.log(`[REDIRECT] ${current} -> ${res.statusCode} to ${res.headers.location}`);
      continue;
    }

    // Parse links if it's html
    if (res.headers && res.headers['content-type'] && res.headers['content-type'].includes('text/html')) {
      const pageLinks = extractLinks(res.body, current);
      for (const link of pageLinks) {
        if (link === '/saas-development-cost' || link === '/what-is-b2b-saas') {
          console.log(`FOUND ${link} linked from ${current}`);
        }
        if (!visited.has(link) && !toVisit.includes(link)) {
          toVisit.push(link);
        }
      }
    }
  }

  console.log(`\nCrawl complete!`);
  console.log(`Total unique internal paths checked: ${allPages.size}`);
  console.log(`Broken links found: ${brokenLinks.length}`);
  if (brokenLinks.length > 0) {
    console.log('Broken details:', brokenLinks);
  }
}

run();
