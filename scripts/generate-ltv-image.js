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
    SaaS Customer Lifetime Value (LTV)
  </text>
  <text x="60" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500" fill="#94A3B8">
    Revenue LTV, Gross Profit Margins, Cohort Retention &amp; LTV:CAC Ratio
  </text>

  <!-- Row 1: 3 Cards -->
  <!-- Card 1: Revenue LTV -->
  <g transform="translate(60, 195)">
    <rect width="340" height="155" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">REVENUE LTV</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$2,500</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Formula: ARPA ÷ Monthly Churn</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">$100 ÷ 0.04 = $2,500 gross revenue</text>
    <circle cx="300" cy="45" r="14" fill="#0284C7" fill-opacity="0.2"/>
    <path d="M 296 49 L 304 41 M 298 41 L 304 41 L 304 47" stroke="#38BDF8" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 2: Gross Profit LTV -->
  <g transform="translate(430, 195)">
    <rect width="340" height="155" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#34D399" letter-spacing="1">GROSS PROFIT LTV</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$2,000</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Formula: (ARPA × Margin) ÷ Churn</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">$100 × 0.80 ÷ 0.04 = $2,000 profit</text>
    <circle cx="300" cy="45" r="14" fill="#059669" fill-opacity="0.2"/>
    <path d="M 296 49 L 304 41 M 298 41 L 304 41 L 304 47" stroke="#34D399" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 3: Expected Lifetime -->
  <g transform="translate(800, 195)">
    <rect width="340" height="155" rx="12" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#A78BFA" letter-spacing="1">EXPECTED LIFETIME</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">25 <tspan font-size="20" font-weight="600" fill="#94A3B8">Months</tspan></text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Formula: 1 ÷ Monthly Churn (4%)</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Average customer account longevity</text>
    <circle cx="300" cy="45" r="14" fill="#7C3AED" fill-opacity="0.2"/>
    <circle cx="300" cy="45" r="6" stroke="#A78BFA" stroke-width="2" fill="none"/>
  </g>

  <!-- Row 2: 3 Cards -->
  <!-- Card 4: Monthly Churn -->
  <g transform="translate(60, 375)">
    <rect width="340" height="155" rx="12" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FBBF24" letter-spacing="1">MONTHLY CHURN RATE</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">4.0%</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Percentage of active accounts lost/mo</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">3% churn boosts LTV to $2,667</text>
    <circle cx="300" cy="45" r="14" fill="#D97706" fill-opacity="0.2"/>
    <path d="M 296 43 L 304 51 M 304 45 L 304 51 L 298 51" stroke="#FBBF24" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 5: Gross Margin -->
  <g transform="translate(430, 375)">
    <rect width="340" height="155" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">GROSS MARGIN</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">80%</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">$80 retained per $100 after COGS</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Hosting, third-party APIs &amp; support</text>
    <circle cx="300" cy="45" r="14" fill="#0284C7" fill-opacity="0.2"/>
    <circle cx="300" cy="45" r="7" stroke="#38BDF8" stroke-width="2" fill="none"/>
  </g>

  <!-- Card 6: LTV:CAC Ratio -->
  <g transform="translate(800, 375)">
    <rect width="340" height="155" rx="12" fill="url(#cardGrad)" stroke="#10B981" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#10B981" letter-spacing="1">LTV TO CAC RATIO</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">3.33 : 1</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">$2,000 LTV ÷ $600 CAC benchmark</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Healthy SaaS unit-economic efficiency</text>
    <circle cx="300" cy="45" r="14" fill="#059669" fill-opacity="0.2"/>
    <path d="M 295 45 L 298 48 L 305 41" stroke="#10B981" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Engineering &amp; Architecture Journal for High-Scale Founders</text>
  </g>
</svg>
`;

async function main() {
  const outputPath = path.join(__dirname, '../public/images/articles/saas-customer-lifetime-value.webp');
  console.log('Generating SaaS Customer Lifetime Value dashboard WebP graphic at:', outputPath);
  
  const buffer = Buffer.from(svg);
  await sharp(buffer)
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log('Successfully generated WebP image:', outputPath);
}

main().catch(console.error);
