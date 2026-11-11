const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070F1E"/>
      <stop offset="50%" stop-color="#0B192C"/>
      <stop offset="100%" stop-color="#0F2848"/>
    </linearGradient>
    <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A78BFA"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(80, 75)">
    <rect width="210" height="32" rx="16" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">AUDITS &amp; ECONOMICS</text>
  </g>

  <!-- Main Title -->
  <text x="80" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    SaaS Pricing Models Explained
  </text>
  <text x="80" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#94A3B8">
    Flat-Rate vs. Per-User vs. Usage-Based &amp; Hybrid Unit Economics
  </text>

  <!-- 3 Pricing Model Comparison Cards -->
  <!-- Card 1: Flat-Rate -->
  <g transform="translate(80, 260)">
    <rect width="320" height="250" rx="14" fill="url(#cardGrad1)" stroke="#334155" stroke-width="1.5"/>
    <rect x="24" y="24" width="100" height="28" rx="6" fill="#0284C7" fill-opacity="0.2"/>
    <text x="74" y="43" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" text-anchor="middle">FLAT-RATE</text>
    
    <text x="24" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#F8FAFC">$49<tspan font-size="15" font-weight="500" fill="#94A3B8"> / mo</tspan></text>
    <text x="24" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#CBD5E1">Fixed cost, predictable bills</text>
    
    <path d="M 24 150 L 296 150" stroke="#334155" stroke-width="1"/>
    
    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; Standardized features</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; Highest cash predictability</text>
    <text x="24" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; Limited expansion revenue</text>
  </g>

  <!-- Card 2: Per-User -->
  <g transform="translate(440, 260)">
    <rect width="320" height="250" rx="14" fill="url(#cardGrad1)" stroke="#059669" stroke-width="1.5"/>
    <rect x="24" y="24" width="100" height="28" rx="6" fill="#059669" fill-opacity="0.2"/>
    <text x="74" y="43" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#34D399" text-anchor="middle">PER-USER</text>
    
    <text x="24" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#F8FAFC">$12<tspan font-size="15" font-weight="500" fill="#94A3B8"> / seat / mo</tspan></text>
    <text x="24" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#CBD5E1">Scales with headcount</text>
    
    <path d="M 24 150 L 296 150" stroke="#334155" stroke-width="1"/>
    
    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; CRM &amp; collaboration tools</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; Natural account expansion</text>
    <text x="24" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; Seat-sharing friction risk</text>
  </g>

  <!-- Card 3: Usage-Based -->
  <g transform="translate(800, 260)">
    <rect width="320" height="250" rx="14" fill="url(#cardGrad1)" stroke="#7C3AED" stroke-width="1.5"/>
    <rect x="24" y="24" width="115" height="28" rx="6" fill="#7C3AED" fill-opacity="0.2"/>
    <text x="81" y="43" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#A78BFA" text-anchor="middle">USAGE-BASED</text>
    
    <text x="24" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#F8FAFC">$0.01<tspan font-size="15" font-weight="500" fill="#94A3B8"> / 1k API calls</tspan></text>
    <text x="24" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#CBD5E1">Pay-as-you-grow consumption</text>
    
    <path d="M 24 150 L 296 150" stroke="#334155" stroke-width="1"/>
    
    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; AI, APIs &amp; cloud infrastructure</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; Direct cost-margin alignment</text>
    <text x="24" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94A3B8">&#x2022; Metering infrastructure required</text>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(80, 560)">
    <circle cx="12" cy="12" r="10" fill="#0284C7"/>
    <path d="M 8 12 L 11 15 L 17 9" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <text x="32" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#F8FAFC">SaaS Launch Lab</text>
    <text x="160" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#64748B">&#x2022; Architecture, Economics &amp; Growth</text>
  </g>
</svg>
`;

async function run() {
  const outputPath = path.join(__dirname, '../public/images/articles/saas-pricing-models.webp');
  await sharp(Buffer.from(svg))
    .webp({ quality: 90 })
    .toFile(outputPath);
  console.log('Successfully generated:', outputPath);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
