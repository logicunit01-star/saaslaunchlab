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
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.3"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 50)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">AUDITS &amp; ECONOMICS</text>
  </g>

  <!-- Main Headline -->
  <text x="60" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    SaaS Unit Economics Dashboard
  </text>
  <text x="60" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500" fill="#94A3B8">
    CAC, LTV, ARPU, Gross Margin, LTV:CAC Ratio &amp; Payback Period
  </text>

  <!-- Row 1: 3 Cards -->
  <!-- Card 1: CAC -->
  <g transform="translate(60, 200)">
    <rect width="340" height="150" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">CAC (CUSTOMER ACQUISITION)</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$600</text>
    <text x="24" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Spend per acquired paying customer</text>
    <circle cx="300" cy="50" r="14" fill="#0284C7" fill-opacity="0.2"/>
    <path d="M 295 50 L 305 50 M 300 45 L 305 50 L 300 55" stroke="#38BDF8" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 2: LTV -->
  <g transform="translate(430, 200)">
    <rect width="340" height="150" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#34D399" letter-spacing="1">LTV (LIFETIME GROSS PROFIT)</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$2,000</text>
    <text x="24" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">25 mo lifetime @ $80/mo gross profit</text>
    <circle cx="300" cy="50" r="14" fill="#059669" fill-opacity="0.2"/>
    <path d="M 296 54 L 304 46 M 298 46 L 304 46 L 304 52" stroke="#34D399" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 3: ARPU -->
  <g transform="translate(800, 200)">
    <rect width="340" height="150" rx="12" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#A78BFA" letter-spacing="1">ARPU (AVG REVENUE / USER)</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$100<tspan font-size="18" font-weight="500" fill="#94A3B8"> / mo</tspan></text>
    <text x="24" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Monthly subscription revenue per account</text>
    <circle cx="300" cy="50" r="14" fill="#7C3AED" fill-opacity="0.2"/>
    <circle cx="300" cy="50" r="6" stroke="#A78BFA" stroke-width="2" fill="none"/>
  </g>

  <!-- Row 2: 3 Cards -->
  <!-- Card 4: Gross Margin -->
  <g transform="translate(60, 380)">
    <rect width="340" height="150" rx="12" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FBBF24" letter-spacing="1">GROSS MARGIN</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">80%</text>
    <text x="24" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">$0.80 retained per $1 after hosting &amp; COGS</text>
    <circle cx="300" cy="50" r="14" fill="#D97706" fill-opacity="0.2"/>
    <path d="M 296 48 L 304 48 M 296 52 L 304 52" stroke="#FBBF24" stroke-width="2" fill="none"/>
  </g>

  <!-- Card 5: LTV to CAC Ratio -->
  <g transform="translate(430, 380)">
    <rect width="340" height="150" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">LTV : CAC RATIO</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">3.33 : 1</text>
    <text x="24" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Healthy unit efficiency benchmark (>3:1)</text>
    <circle cx="300" cy="50" r="14" fill="#0284C7" fill-opacity="0.2"/>
    <path d="M 297 54 L 303 46" stroke="#38BDF8" stroke-width="2" fill="none"/>
  </g>

  <!-- Card 6: CAC Payback -->
  <g transform="translate(800, 380)">
    <rect width="340" height="150" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#34D399" letter-spacing="1">CAC PAYBACK PERIOD</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">7.5 mos</text>
    <text x="24" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Months of gross profit to recover CAC</text>
    <circle cx="300" cy="50" r="14" fill="#059669" fill-opacity="0.2"/>
    <path d="M 297 50 A 5 5 0 1 1 303 50" stroke="#34D399" stroke-width="2" fill="none"/>
  </g>

  <!-- Bottom Brand Footer & Legend -->
  <g transform="translate(60, 565)">
    <circle cx="12" cy="12" r="10" fill="#0284C7"/>
    <path d="M 8 12 L 11 15 L 17 9" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <text x="32" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#F8FAFC">SaaS Launch Lab</text>
    <text x="160" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#64748B">&#x2022; Engineering &amp; Economics Journal</text>
    <text x="1080" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-style="italic" fill="#64748B" text-anchor="end">Illustrative unit economics model for SaaS founders</text>
  </g>
</svg>
`;

async function run() {
  const outputPath = path.join(__dirname, '../public/images/articles/saas-unit-economics.webp');
  await sharp(Buffer.from(svg))
    .webp({ quality: 90 })
    .toFile(outputPath);
  console.log('Successfully generated:', outputPath);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
