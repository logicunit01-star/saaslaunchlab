const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const categories = ['audits-economics', 'architecture', 'mvp-engineering', 'growth-strategy', 'ai-automation'];

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  categories.forEach(cat => {
    // Replace /blog/category-name with /blog/category/category-name if not already /blog/category/
    const regex = new RegExp(`\\[([^\\]]+)\\]\\(\\/blog\\/${cat}\\)`, 'g');
    content = content.replace(regex, `[$1](/blog/category/${cat})`);
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Fixed category links in markdown articles.');
