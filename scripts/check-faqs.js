const fs = require('fs');
const path = require('path');
const http = require('http');

const articlesDir = 'src/content/articles';
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

function checkArticle(slug) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3005/blog/${slug}`, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const hasFaqSchema = data.includes('"@type":"FAQPage"');
        const content = fs.readFileSync(path.join(articlesDir, `${slug}.md`), 'utf8');
        const hasFaqHeading = /##\s+.*(?:Frequently Asked Questions|FAQ)/i.test(content) || /###\s+.*(?:Frequently Asked Questions|FAQ)/i.test(content);
        resolve({ slug, hasFaqHeading, hasFaqSchema });
      });
    });
  });
}

async function run() {
  console.log('Checking FAQ consistency across all 28 articles...');
  let mismatch = 0;
  for (const f of files) {
    const slug = f.replace('.md', '');
    const res = await checkArticle(slug);
    if (res.hasFaqHeading !== res.hasFaqSchema) {
      console.log(`MISMATCH for ${slug}: heading=${res.hasFaqHeading}, schema=${res.hasFaqSchema}`);
      mismatch++;
    } else {
      console.log(`OK: ${slug} -> FAQ heading=${res.hasFaqHeading}, FAQ Schema=${res.hasFaqSchema}`);
    }
  }
  console.log(`Total mismatches: ${mismatch}`);
}

run();
