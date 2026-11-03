const http = require('http');

function fetchHtml(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:3005' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function extractSchemas(html) {
  const schemas = [];
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (e) {
      schemas.push({ error: 'JSON Parse Error: ' + e.message, raw: match[1] });
    }
  }
  return schemas;
}

async function run() {
  console.log('Validating JSON-LD Schemas across key pages...\n');

  // 1. Homepage
  const homeHtml = await fetchHtml('/');
  const homeSchemas = extractSchemas(homeHtml);
  console.log('--- Homepage (/) ---');
  homeSchemas.forEach((s, i) => console.log(`  Schema ${i+1}: @type = ${s['@type']}`));

  // 2. Blog Index
  const blogHtml = await fetchHtml('/blog');
  const blogSchemas = extractSchemas(blogHtml);
  console.log('--- Blog Index (/blog) ---');
  blogSchemas.forEach((s, i) => console.log(`  Schema ${i+1}: @type = ${s['@type']}`));

  // 3. Category Page
  const catHtml = await fetchHtml('/blog/category/architecture');
  const catSchemas = extractSchemas(catHtml);
  console.log('--- Category Hub (/blog/category/architecture) ---');
  catSchemas.forEach((s, i) => console.log(`  Schema ${i+1}: @type = ${s['@type']}`));

  // 4. Author Page
  const authHtml = await fetchHtml('/author/alex-vance');
  const authSchemas = extractSchemas(authHtml);
  console.log('--- Author Profile (/author/alex-vance) ---');
  authSchemas.forEach((s, i) => console.log(`  Schema ${i+1}: @type = ${s['@type']}`));

  // 5. Article with FAQ
  const artFaqHtml = await fetchHtml('/blog/saas-website-architecture');
  const artFaqSchemas = extractSchemas(artFaqHtml);
  console.log('--- Article with FAQ (/blog/saas-website-architecture) ---');
  artFaqSchemas.forEach((s, i) => console.log(`  Schema ${i+1}: @type = ${s['@type']}`));

  // 6. Article without FAQ
  const artNoFaqHtml = await fetchHtml('/blog/saas-mvp-in-30-days');
  const artNoFaqSchemas = extractSchemas(artNoFaqHtml);
  console.log('--- Article without FAQ (/blog/saas-mvp-in-30-days) ---');
  artNoFaqSchemas.forEach((s, i) => console.log(`  Schema ${i+1}: @type = ${s['@type']}`));
}

run();
