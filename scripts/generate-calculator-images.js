const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const width = 1200;
const height = 630;

// Shared SVG definitions
const defs = `
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
`;

// 1. Featured Image: SaaS Development Cost Calculator
const svgFeatured = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 48)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">AUDITS &amp; ECONOMICS</text>
  </g>

  <!-- Main Headline -->
  <text x="60" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    SaaS Development Cost Calculator
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="500" fill="#94A3B8">
    Estimate Software Project Budgets: Development Hours, Hourly Rates &amp; Contingency
  </text>

  <!-- Row 1: 3 Parameter Cards -->
  <!-- Card 1: Estimated Hours -->
  <g transform="translate(60, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="1">1. ESTIMATED EFFORT</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">1,200 <tspan font-size="18" font-weight="600" fill="#94A3B8">Hours</tspan></text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Core modules &amp; architecture scope</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Planning, frontend, backend &amp; QA</text>
    <circle cx="300" cy="40" r="14" fill="#0284C7" fill-opacity="0.2"/>
    <circle cx="300" cy="40" r="6" stroke="#38BDF8" stroke-width="2" fill="none"/>
  </g>

  <!-- Card 2: Blended Rate -->
  <g transform="translate(430, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#34D399" letter-spacing="1">2. BLENDED HOURLY RATE</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$35 <tspan font-size="18" font-weight="600" fill="#94A3B8">/hr</tspan></text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Base Cost: 1,200h × $35 = $42,000</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Blended rate across devs, QA &amp; UI</text>
    <circle cx="300" cy="40" r="14" fill="#059669" fill-opacity="0.2"/>
    <path d="M 296 44 L 304 36 M 298 36 L 304 36 L 304 42" stroke="#34D399" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 3: Total Project Budget -->
  <g transform="translate(800, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#10B981" stroke-width="2"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#10B981" letter-spacing="1">3. ESTIMATED BUDGET</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#10B981">$50,400</text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#F8FAFC">Base: $42,000 + 20% Contingency</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Includes $8,400 uncertainty reserve</text>
    <circle cx="300" cy="40" r="14" fill="#059669" fill-opacity="0.2"/>
    <path d="M 295 40 L 298 43 L 305 36" stroke="#10B981" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Row 2: 3 Takeaways & Benchmarks -->
  <!-- Card 4: Lean MVP -->
  <g transform="translate(60, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" letter-spacing="1">LEAN CUSTOM MVP</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">$15K – $40K</text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">400–800 Engineering Hours</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Validate core problem before scaling</text>
    <circle cx="300" cy="40" r="14" fill="#D97706" fill-opacity="0.2"/>
    <rect x="294" y="34" width="12" height="12" rx="2" stroke="#FBBF24" stroke-width="2" fill="none"/>
  </g>

  <!-- Card 5: Full SaaS Platform -->
  <g transform="translate(430, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#A78BFA" letter-spacing="1">GROWING / COMPLEX SAAS</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">$40K – $100K+</text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">1,000–2,500+ Engineering Hours</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Multi-tenant, integrations &amp; automations</text>
    <circle cx="300" cy="40" r="14" fill="#7C3AED" fill-opacity="0.2"/>
    <path d="M 295 40 L 305 40 M 300 35 L 300 45" stroke="#A78BFA" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 6: Contingency Rule -->
  <g transform="translate(800, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="1">CONTINGENCY BUFFER</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">10% – 25%</text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Essential risk &amp; scope protection</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Protects cash runway from surprises</text>
    <circle cx="300" cy="40" r="14" fill="#0284C7" fill-opacity="0.2"/>
    <path d="M 294 40 C 294 36, 306 36, 306 40 C 306 44, 294 44, 294 40" stroke="#38BDF8" stroke-width="2" fill="none"/>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Software Project Budget Estimator &amp; Planning Blueprint</text>
  </g>
</svg>
`;

// 2. Visual 2: SaaS Development Cost Estimation Process
const svgEstimationProcess = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 48)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">ESTIMATION FRAMEWORK</text>
  </g>

  <!-- Title -->
  <text x="60" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    SaaS Development Cost Estimation Process
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
    A reliable, step-by-step engineering formula from product scope to total project budget
  </text>

  <!-- 5 Step Horizontal Pipeline -->
  <!-- Step 1: Product Requirements -->
  <g transform="translate(60, 195)">
    <rect width="195" height="320" rx="10" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <rect x="18" y="20" width="32" height="32" rx="6" fill="#0284C7" fill-opacity="0.3"/>
    <text x="34" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#38BDF8" text-anchor="middle">1</text>
    <text x="18" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Product Scope</text>
    <text x="18" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Define core user workflows, roles &amp; modules.</text>
    <rect x="18" y="130" width="159" height="150" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="28" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• User Authentication</text>
    <text x="28" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Role Management</text>
    <text x="28" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Main Workflows</text>
    <text x="28" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Reporting &amp; Billing</text>
    <text x="28" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#38BDF8">Output: Feature Spec</text>
  </g>

  <!-- Arrow 1 to 2 -->
  <path d="M 260 355 L 275 355 M 271 350 L 277 355 L 271 360" stroke="#38BDF8" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Step 2: Feature Estimation -->
  <g transform="translate(280, 195)">
    <rect width="195" height="320" rx="10" fill="url(#cardGrad)" stroke="#34D399" stroke-width="1.5"/>
    <rect x="18" y="20" width="32" height="32" rx="6" fill="#059669" fill-opacity="0.3"/>
    <text x="34" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#34D399" text-anchor="middle">2</text>
    <text x="18" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Feature Hours</text>
    <text x="18" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Break requirements into engineering hours.</text>
    <rect x="18" y="130" width="159" height="150" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="28" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Auth: 70 hrs</text>
    <text x="28" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Database: 140 hrs</text>
    <text x="28" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• UI Dashboard: 100 hrs</text>
    <text x="28" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Billing: 100 hrs</text>
    <text x="28" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#34D399">Total: 1,000–1,200h</text>
  </g>

  <!-- Arrow 2 to 3 -->
  <path d="M 480 355 L 495 355 M 491 350 L 497 355 L 491 360" stroke="#34D399" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Step 3: Hourly Rate -->
  <g transform="translate(500, 195)">
    <rect width="195" height="320" rx="10" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="1.5"/>
    <rect x="18" y="20" width="32" height="32" rx="6" fill="#D97706" fill-opacity="0.3"/>
    <text x="34" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#FBBF24" text-anchor="middle">3</text>
    <text x="18" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Blended Rate</text>
    <text x="18" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Combine effective developer, QA &amp; PM rates.</text>
    <rect x="18" y="130" width="159" height="150" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="28" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Offshore: $25–$35</text>
    <text x="28" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Nearshore: $40–$65</text>
    <text x="28" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• US Agency: $75–$150</text>
    <text x="28" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">Formula: Hours × Rate</text>
    <text x="28" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#FBBF24">Base Cost: $42,000</text>
  </g>

  <!-- Arrow 3 to 4 -->
  <path d="M 700 355 L 715 355 M 711 350 L 717 355 L 711 360" stroke="#FBBF24" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Step 4: Contingency -->
  <g transform="translate(720, 195)">
    <rect width="195" height="320" rx="10" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="1.5"/>
    <rect x="18" y="20" width="32" height="32" rx="6" fill="#7C3AED" fill-opacity="0.3"/>
    <text x="34" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#A78BFA" text-anchor="middle">4</text>
    <text x="18" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Contingency</text>
    <text x="18" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Reserve 10%–25% for scope uncertainty.</text>
    <rect x="18" y="130" width="159" height="150" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="28" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• API surprises</text>
    <text x="28" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Scope adjustments</text>
    <text x="28" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">• Edge-case testing</text>
    <text x="28" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F8FAFC">Allowance: 20%</text>
    <text x="28" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#A78BFA">Reserve: +$8,400</text>
  </g>

  <!-- Arrow 4 to 5 -->
  <path d="M 920 355 L 935 355 M 931 350 L 937 355 L 931 360" stroke="#A78BFA" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Step 5: Final Project Budget -->
  <g transform="translate(940, 195)">
    <rect width="200" height="320" rx="10" fill="url(#cardGrad)" stroke="#10B981" stroke-width="2"/>
    <rect x="18" y="20" width="32" height="32" rx="6" fill="#059669" fill-opacity="0.3"/>
    <text x="34" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#10B981" text-anchor="middle">5</text>
    <text x="18" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#10B981">Final Budget</text>
    <text x="18" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Base Cost + Contingency = Project Budget.</text>
    <rect x="18" y="130" width="164" height="150" rx="6" fill="#0B192C" stroke="#10B981" stroke-width="1.5"/>
    <text x="28" y="158" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">Estimated Total:</text>
    <text x="28" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#10B981">$50,400</text>
    <text x="28" y="225" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">Protected Runway</text>
    <text x="28" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#34D399">✓ Realistic Estimate</text>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Step-by-step software estimation framework for founders</text>
  </g>
</svg>
`;

// 3. Visual 3: Feature Complexity Comparison
const svgComplexity = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 48)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">FEATURE ENGINEERING</text>
  </g>

  <!-- Title -->
  <text x="60" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    SaaS Feature Complexity &amp; Engineering Hours Comparison
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
    Why some features take days while others require weeks of architecture, testing &amp; security
  </text>

  <!-- 3 Columns Grid -->
  <!-- Col 1: Low Complexity -->
  <g transform="translate(60, 190)">
    <rect width="340" height="340" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="2"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#38BDF8" letter-spacing="1">LOW COMPLEXITY FEATURES</text>
    <text x="24" y="62" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#F8FAFC">15 – 40 <tspan font-size="16" font-weight="500" fill="#94A3B8">Hours / Module</tspan></text>
    <text x="24" y="88" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Standard CRUD, established libraries &amp; patterns</text>

    <g transform="translate(24, 110)">
      <rect width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Password Reset &amp; Email Magic Link (15–35h)</text>

      <rect y="52" width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="78" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">User Profile Editing &amp; Avatars (20–40h)</text>

      <rect y="104" width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Basic Transactional Email Notifications (20–45h)</text>

      <rect y="156" width="292" height="56" rx="6" fill="#0284C7" fill-opacity="0.15" stroke="#0284C7"/>
      <text x="14" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#38BDF8">WHY IT&apos;S PREDICTABLE:</text>
      <text x="14" y="198" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">Minimal business logic; relies on battle-tested libraries.</text>
    </g>
  </g>

  <!-- Col 2: Medium Complexity -->
  <g transform="translate(430, 190)">
    <rect width="340" height="340" rx="12" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="2"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#FBBF24" letter-spacing="1">MEDIUM COMPLEXITY</text>
    <text x="24" y="62" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#F8FAFC">40 – 100 <tspan font-size="16" font-weight="500" fill="#94A3B8">Hours / Module</tspan></text>
    <text x="24" y="88" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Custom UI interactions &amp; relational data queries</text>

    <g transform="translate(24, 110)">
      <rect width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Role-Based Access Control (RBAC) (35–80h)</text>

      <rect y="52" width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="78" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Interactive Analytics Dashboards (50–100h)</text>

      <rect y="104" width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Third-Party REST API Integration (25–100h)</text>

      <rect y="156" width="292" height="56" rx="6" fill="#D97706" fill-opacity="0.15" stroke="#D97706"/>
      <text x="14" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#FBBF24">WHY IT TAKES LONGER:</text>
      <text x="14" y="198" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">Requires custom state management &amp; UI polish.</text>
    </g>
  </g>

  <!-- Col 3: High Complexity -->
  <g transform="translate(800, 190)">
    <rect width="340" height="340" rx="12" fill="url(#cardGrad)" stroke="#F87171" stroke-width="2"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#F87171" letter-spacing="1">HIGH COMPLEXITY</text>
    <text x="24" y="62" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#F8FAFC">80 – 180+ <tspan font-size="16" font-weight="500" fill="#94A3B8">Hours / Module</tspan></text>
    <text x="24" y="88" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">High architectural, security &amp; financial stakes</text>

    <g transform="translate(24, 110)">
      <rect width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Multi-Tenant Database Architecture (80–180h)</text>

      <rect y="52" width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="78" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Subscription Billing &amp; Webhook States (60–140h)</text>

      <rect y="104" width="292" height="42" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="14" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">Automated Workflows &amp; Event Queues (40–120h)</text>

      <rect y="156" width="292" height="56" rx="6" fill="#DC2626" fill-opacity="0.15" stroke="#F87171"/>
      <text x="14" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#F87171">WHY IT&apos;S EXPENSIVE:</text>
      <text x="14" y="198" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">Zero tolerance for data leakage, state drift or payment bugs.</text>
    </g>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Engineering complexity matrix for SaaS project planning</text>
  </g>
</svg>
`;

// 4. Visual 4: Project Budget Distribution
const svgBudgetDistribution = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 48)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">PROJECT BUDGETING</text>
  </g>

  <!-- Title -->
  <text x="60" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    SaaS Project Budget Distribution Across 5 Delivery Phases
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
    Worked breakdown of a 1,000-hour SaaS development project ($35,000 base + 20% contingency = $42,000)
  </text>

  <!-- 5 Delivery Phase Cards -->
  <!-- Phase 1: Planning & Design (140h / 14%) -->
  <g transform="translate(60, 195)">
    <rect width="200" height="320" rx="10" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="20" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="1">PHASE 1: DESIGN</text>
    <text x="20" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">140 <tspan font-size="16" font-weight="600" fill="#94A3B8">hrs</tspan></text>
    <text x="20" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8">14% of Project</text>
    
    <rect x="20" y="120" width="160" height="130" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• User journeys (35h)</text>
    <text x="30" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• UI/UX Design (65h)</text>
    <text x="30" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Discovery (40h)</text>
    <text x="30" y="225" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">Cost: $4,900</text>

    <text x="20" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#64748B">Wireframes &amp; system flow</text>
  </g>

  <!-- Phase 2: Backend & Database (275h / 27.5%) -->
  <g transform="translate(280, 195)">
    <rect width="200" height="320" rx="10" fill="url(#cardGrad)" stroke="#34D399" stroke-width="1.5"/>
    <text x="20" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#34D399" letter-spacing="1">PHASE 2: BACKEND</text>
    <text x="20" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">275 <tspan font-size="16" font-weight="600" fill="#94A3B8">hrs</tspan></text>
    <text x="20" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#34D399">27.5% of Project</text>
    
    <rect x="20" y="120" width="160" height="130" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• DB Architecture (55h)</text>
    <text x="30" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Multi-Tenancy (100h)</text>
    <text x="30" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Auth &amp; RBAC (70h)</text>
    <text x="30" y="225" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#34D399">Cost: $9,625</text>

    <text x="20" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#64748B">Data models &amp; API core</text>
  </g>

  <!-- Phase 3: Frontend (305h / 30.5%) -->
  <g transform="translate(500, 195)">
    <rect width="200" height="320" rx="10" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="2"/>
    <text x="20" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" letter-spacing="1">PHASE 3: FRONTEND</text>
    <text x="20" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">305 <tspan font-size="16" font-weight="600" fill="#94A3B8">hrs</tspan></text>
    <text x="20" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FBBF24">30.5% (Largest Share)</text>
    
    <rect x="20" y="120" width="160" height="130" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• User Dashboard (100h)</text>
    <text x="30" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Workflows (85h)</text>
    <text x="30" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Reporting UI (65h)</text>
    <text x="30" y="225" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24">Cost: $10,675</text>

    <text x="20" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#64748B">Client apps &amp; state</text>
  </g>

  <!-- Phase 4: Integrations & Billing (140h / 14%) -->
  <g transform="translate(720, 195)">
    <rect width="200" height="320" rx="10" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="1.5"/>
    <text x="20" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#A78BFA" letter-spacing="1">PHASE 4: BILLING</text>
    <text x="20" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">140 <tspan font-size="16" font-weight="600" fill="#94A3B8">hrs</tspan></text>
    <text x="20" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#A78BFA">14% of Project</text>
    
    <rect x="20" y="120" width="160" height="130" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Stripe / Billing (65h)</text>
    <text x="30" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• External APIs (45h)</text>
    <text x="30" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Webhooks &amp; Mail (30h)</text>
    <text x="30" y="225" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#A78BFA">Cost: $4,900</text>

    <text x="20" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#64748B">Revenue collection pipes</text>
  </g>

  <!-- Phase 5: QA & Launch (140h / 14%) -->
  <g transform="translate(940, 195)">
    <rect width="200" height="320" rx="10" fill="url(#cardGrad)" stroke="#10B981" stroke-width="1.5"/>
    <text x="20" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#10B981" letter-spacing="1">PHASE 5: QA &amp; LAUNCH</text>
    <text x="20" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">140 <tspan font-size="16" font-weight="600" fill="#94A3B8">hrs</tspan></text>
    <text x="20" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#10B981">14% of Project</text>
    
    <rect x="20" y="120" width="160" height="130" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Functional QA (65h)</text>
    <text x="30" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Bug fixing (45h)</text>
    <text x="30" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#F8FAFC">• Cloud deploy (30h)</text>
    <text x="30" y="225" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#10B981">Cost: $4,900</text>

    <text x="20" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#64748B">Testing &amp; CI/CD release</text>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Base: $35,000 + 20% Contingency ($7,000) = $42,000 Total Estimated Budget</text>
  </g>
</svg>
`;

// 5. Visual 5: MVP vs Full SaaS Platform
const svgMvpVsFull = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 48)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">SCOPING STRATEGY</text>
  </g>

  <!-- Title -->
  <text x="60" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    Focused SaaS MVP vs. Expanded Full Platform
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
    Compare investment levels, engineering scope, delivery speed, and strategic risk
  </text>

  <!-- 2 Large Comparative Columns -->
  <!-- Col 1: Focused SaaS MVP -->
  <g transform="translate(60, 190)">
    <rect width="520" height="340" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="2"/>
    <text x="30" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#34D399" letter-spacing="1">APPROACH 1: FOCUSED SAAS MVP</text>
    <text x="30" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">$15,000 – $40,000</text>
    <text x="30" y="98" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#34D399">400–800 Engineering Hours  •  1–3 Months Timeline</text>

    <g transform="translate(30, 115)">
      <rect width="460" height="35" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="16" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">✓ One Core Customer Problem Solved Exceptionally Well</text>

      <rect y="45" width="460" height="35" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="16" y="67" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">✓ Clean Auth &amp; Standard Role Permissions (Admin / User)</text>

      <rect y="90" width="460" height="35" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="16" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">✓ Single Subscription Model (Stripe Checkout / Portal)</text>

      <rect y="135" width="460" height="60" rx="6" fill="#059669" fill-opacity="0.15" stroke="#34D399"/>
      <text x="16" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#34D399">STRATEGIC ADVANTAGE:</text>
      <text x="16" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#F8FAFC">Fast time-to-market; preserves 70%+ of capital for marketing &amp; pivots.</text>
    </g>
  </g>

  <!-- Col 2: Expanded Full Platform -->
  <g transform="translate(620, 190)">
    <rect width="520" height="340" rx="12" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="2"/>
    <text x="30" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#A78BFA" letter-spacing="1">APPROACH 2: EXPANDED FULL PLATFORM</text>
    <text x="30" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#F8FAFC">$100,000 – $250,000+</text>
    <text x="30" y="98" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#A78BFA">1,800–3,500+ Engineering Hours  •  6–12+ Months</text>

    <g transform="translate(30, 115)">
      <rect width="460" height="35" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="16" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">⚡ Multi-Tier Workspaces, Granular RBAC &amp; Audit Logs</text>

      <rect y="45" width="460" height="35" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="16" y="67" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">⚡ Custom Analytics Builder, Scheduled Reports &amp; Exports</text>

      <rect y="90" width="460" height="35" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="16" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#F8FAFC">⚡ Enterprise SSO, SCIM Sync &amp; Complex Webhook Automations</text>

      <rect y="135" width="460" height="60" rx="6" fill="#7C3AED" fill-opacity="0.15" stroke="#A78BFA"/>
      <text x="16" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#A78BFA">STRATEGIC ADVANTAGE:</text>
      <text x="16" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#F8FAFC">Meets enterprise compliance demands once market traction is proven.</text>
    </g>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Validate customer willingness to pay before investing in enterprise scope</text>
  </g>
</svg>
`;

async function generateAll() {
  const images = [
    { name: 'saas-development-cost-calculator.webp', svg: svgFeatured },
    { name: 'saas-development-cost-estimation-process.webp', svg: svgEstimationProcess },
    { name: 'feature-complexity-comparison.webp', svg: svgComplexity },
    { name: 'saas-project-budget-distribution.webp', svg: svgBudgetDistribution },
    { name: 'mvp-vs-full-saas-platform.webp', svg: svgMvpVsFull },
  ];

  const outDir = path.join(__dirname, '../public/images/articles');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const img of images) {
    const dest = path.join(outDir, img.name);
    console.log(`Generating WebP: ${img.name}...`);
    const buffer = Buffer.from(img.svg);
    await sharp(buffer)
      .webp({ quality: 90 })
      .toFile(dest);
    const stat = fs.statSync(dest);
    console.log(`✓ Created ${img.name} (${Math.round(stat.size / 1024)} KB)`);
  }
}

generateAll().catch(err => {
  console.error('Error generating calculator images:', err);
  process.exit(1);
});
