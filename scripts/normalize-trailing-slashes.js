const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let totalReplacements = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace (/blog/some-slug/) with (/blog/some-slug)
  const updated = content.replace(/\/blog\/([a-z0-9-]+)\//g, (match, slug) => {
    return `/blog/${slug}`;
  });

  if (content !== updated) {
    const matches = (content.match(/\/blog\/([a-z0-9-]+)\//g) || []).length;
    totalReplacements += matches;
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`${file}: normalized ${matches} links`);
  }
});

console.log(`Total links normalized: ${totalReplacements}`);
