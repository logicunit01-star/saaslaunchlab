const fs = require('fs');
const path = require('path');
const tw = require('tailwindcss');

async function main() {
  console.log("Compiling Tailwind CSS with official brand colors...");

  const baseCss = `
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --muted: #64748b;
  --muted-bg: #f8fafc;
  --border: #e2e8f0;
  --brand-cyan: #0ea5e9;
  --brand-cyan-hover: #0284c7;
  --brand-navy: #0f172a;
  --brand-navy-light: #1e293b;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Editorial prose styling for markdown article content */
.article-prose {
  color: #1e293b;
  font-size: 1.125rem;
  line-height: 1.8;
  word-break: break-word;
}

.article-prose h2 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2.75rem;
  margin-bottom: 1.25rem;
  color: #0f172a;
  letter-spacing: -0.02em;
  scroll-margin-top: 5rem;
}

.article-prose h3 {
  font-size: 1.45rem;
  font-weight: 600;
  line-height: 1.35;
  margin-top: 2.25rem;
  margin-bottom: 0.85rem;
  color: #0f172a;
  letter-spacing: -0.015em;
  scroll-margin-top: 5rem;
}

.article-prose h4 {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 1.75rem;
  margin-bottom: 0.65rem;
  color: #1e293b;
  scroll-margin-top: 5rem;
}

.article-prose p {
  margin-bottom: 1.5rem;
}

.article-prose a {
  color: #0ea5e9;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s ease;
}

.article-prose a:hover {
  color: #0284c7;
}

.article-prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.article-prose ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.article-prose li {
  margin-bottom: 0.5rem;
}

.article-prose blockquote {
  border-left: 4px solid #0ea5e9;
  padding-left: 1.25rem;
  margin: 1.75rem 0;
  font-style: italic;
  color: #334155;
  background-color: #f0f9ff;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.article-prose pre {
  background-color: #0f172a;
  color: #f8fafc;
  padding: 1.25rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.925rem;
  line-height: 1.6;
  margin: 1.75rem 0;
  border: 1px solid #1e293b;
}

.article-prose code {
  background-color: #f1f5f9;
  color: #0f172a;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.article-prose pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
}

.article-prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 0.975rem;
}

.article-prose th,
.article-prose td {
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  text-align: left;
}

.article-prose th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #0f172a;
}

.article-prose tr:nth-child(even) {
  background-color: #fafbfc;
}

.article-prose img {
  border-radius: 0.5rem;
  margin: 2rem auto;
  max-width: 100%;
  height: auto;
  border: 1px solid #f1f5f9;
}
`;

  const compiler = await tw.compile(baseCss, {
    base: process.cwd(),
    async loadStylesheet(id, base) {
      if (id === 'tailwindcss') {
        return {
          content: fs.readFileSync('node_modules/tailwindcss/index.css', 'utf8'),
          base: 'node_modules/tailwindcss'
        };
      }
      return { content: '', base };
    }
  });

  // Collect all classes from src/
  const srcFiles = [];
  function scan(dir) {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) {
        scan(p);
      } else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.md')) {
        srcFiles.push(p);
      }
    }
  }
  scan('src');

  const candidates = new Set();
  // Standard and brand color candidate utilities
  const brandClasses = [
    'text-sky-300', 'text-sky-400', 'text-sky-500', 'text-sky-600', 'text-sky-700', 'text-sky-800',
    'bg-sky-50', 'bg-sky-100', 'bg-sky-200', 'bg-sky-500', 'bg-sky-600', 'bg-sky-50/50',
    'border-sky-100', 'border-sky-200', 'border-sky-300', 'border-sky-500',
    'ring-sky-500', 'ring-sky-500/20', 'ring-sky-500/50',
    'focus:ring-sky-500', 'focus-visible:ring-sky-500',
    'hover:bg-sky-50', 'hover:bg-sky-600', 'hover:border-sky-500',
    'hover:text-sky-500', 'hover:text-sky-600', 'hover:text-sky-700',
    'group-hover:text-sky-500', 'group-hover:text-sky-600',
    'selection:bg-sky-500', 'selection:text-white',
    'bg-slate-900', 'bg-slate-950', 'text-slate-950', 'text-slate-900', 'text-slate-800', 'text-slate-700',
    'text-slate-600', 'text-slate-500', 'text-slate-400', 'text-slate-300', 'text-slate-200', 'text-slate-100',
    'border-slate-100', 'border-slate-200', 'border-slate-300', 'border-slate-800', 'border-slate-900',
    'hover:bg-slate-50', 'hover:bg-slate-100', 'hover:bg-slate-200', 'hover:bg-slate-800', 'hover:bg-slate-900',
    'hover:text-slate-900', 'hover:text-slate-950', 'hover:text-white',
    'flex', 'flex-col', 'flex-1', 'grid', 'hidden', 'block', 'inline-block', 'inline-flex',
    'items-center', 'items-start', 'justify-between', 'justify-center',
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-12',
    'gap-2', 'gap-3', 'gap-4', 'gap-6', 'gap-8', 'gap-10', 'gap-12', 'gap-16',
    'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8', 'p-10', 'px-3', 'px-4', 'px-5', 'px-6', 'px-8',
    'py-1', 'py-1.5', 'py-2', 'py-2.5', 'py-3', 'py-4', 'py-6', 'py-8', 'py-10', 'py-12', 'py-14', 'py-16', 'py-20',
    'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full',
    'shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-2xl',
    'max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-3xl', 'max-w-4xl', 'max-w-7xl',
    'w-full', 'w-auto', 'w-3', 'w-3.5', 'w-4', 'w-5', 'w-6', 'w-8', 'w-16',
    'h-full', 'h-auto', 'h-3', 'h-3.5', 'h-4', 'h-5', 'h-6', 'h-8', 'h-16', 'h-18',
    'aspect-16/10', 'aspect-16/9', 'object-cover', 'object-contain',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl',
    'font-sans', 'font-serif', 'font-mono', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold',
    'tracking-tight', 'tracking-wide', 'tracking-wider', 'tracking-widest', 'uppercase',
    'sticky', 'top-0', 'top-28', 'z-40', 'z-50', 'backdrop-blur-md', 'backdrop-blur-xs',
    'border', 'border-b', 'border-t', 'border-l-4', 'overflow-hidden', 'overflow-x-auto', 'overflow-y-auto'
  ];
  brandClasses.forEach(c => candidates.add(c));

  for (const f of srcFiles) {
    const text = fs.readFileSync(f, 'utf8');
    const matches = text.match(/[a-zA-Z0-9_\-:\/\[\]\.]+/g) || [];
    for (const m of matches) candidates.add(m);
  }

  console.log(`Scanning ${srcFiles.length} files, found ${candidates.size} potential class tokens.`);
  const compiled = compiler.build([...candidates]);
  console.log(`Generated CSS length: ${compiled.length} bytes.`);

  fs.writeFileSync('src/app/globals.css', compiled, 'utf8');
  console.log("Successfully updated src/app/globals.css with compiled styles!");
}

main().catch(console.error);
