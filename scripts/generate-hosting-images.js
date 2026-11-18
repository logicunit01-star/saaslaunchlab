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
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.3"/>
    </pattern>
  </defs>
`;

// 1. Featured Image: SaaS Hosting Costs & Cloud Infrastructure
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
    SaaS Hosting Costs &amp; Cloud Infrastructure
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="500" fill="#94A3B8">
    Compute, Managed Databases, Object Storage, Egress Bandwidth &amp; Cost Per Customer
  </text>

  <!-- Row 1: 3 Stage Cards -->
  <!-- Card 1: Early-Stage MVP -->
  <g transform="translate(60, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="1">EARLY-STAGE MVP (100 USERS)</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$85 <tspan font-size="18" font-weight="600" fill="#94A3B8">/mo</tspan></text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Single VM / Small Managed DB</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Cost per customer: $0.85/mo</text>
    <circle cx="300" cy="40" r="14" fill="#0284C7" fill-opacity="0.2"/>
    <path d="M 296 44 L 304 36 M 298 36 L 304 36 L 304 42" stroke="#38BDF8" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 2: Growing SaaS -->
  <g transform="translate(430, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#34D399" letter-spacing="1">GROWING SAAS (1,000 USERS)</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$330 <tspan font-size="18" font-weight="600" fill="#94A3B8">/mo</tspan></text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Scaled Compute, CDN &amp; Managed DB</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Cost per customer: $0.33/mo (2.2% MRR)</text>
    <circle cx="300" cy="40" r="14" fill="#059669" fill-opacity="0.2"/>
    <path d="M 296 44 L 304 36 M 298 36 L 304 36 L 304 42" stroke="#34D399" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Card 3: Established Scale -->
  <g transform="translate(800, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#A78BFA" letter-spacing="1">ESTABLISHED (10,000 USERS)</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">$1,500 <tspan font-size="18" font-weight="600" fill="#94A3B8">/mo</tspan></text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Multi-AZ DB, Autoscaling &amp; Hot Storage</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Cost per customer: $0.15/mo (&lt;1.5% MRR)</text>
    <circle cx="300" cy="40" r="14" fill="#7C3AED" fill-opacity="0.2"/>
    <circle cx="300" cy="40" r="6" stroke="#A78BFA" stroke-width="2" fill="none"/>
  </g>

  <!-- Row 2: 3 KPI & Efficiency Cards -->
  <!-- Card 4: Largest Cost Driver -->
  <g transform="translate(60, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" letter-spacing="1">DATABASE &amp; STORAGE (44%)</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">#1 Expense</text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">DB instances, IOPS, snapshots &amp; S3</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Indexing &amp; caching cut IOPS by 60%</text>
    <circle cx="300" cy="40" r="14" fill="#D97706" fill-opacity="0.2"/>
    <rect x="294" y="34" width="12" height="12" rx="2" stroke="#FBBF24" stroke-width="2" fill="none"/>
  </g>

  <!-- Card 5: Bandwidth & Egress -->
  <g transform="translate(430, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="1">EGRESS &amp; CDN EFFICIENCY</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">12% Budget</text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Cloud egress charges can spike rapidly</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">CDN caching shields origin traffic 80%+</text>
    <circle cx="300" cy="40" r="14" fill="#0284C7" fill-opacity="0.2"/>
    <path d="M 294 40 C 294 36, 306 36, 306 40 C 306 44, 294 44, 294 40" stroke="#38BDF8" stroke-width="2" fill="none"/>
  </g>

  <!-- Card 6: Infrastructure Margin -->
  <g transform="translate(800, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#10B981" stroke-width="1.5"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#10B981" letter-spacing="1">TARGET HOSTING MARGIN</text>
    <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#F8FAFC">&lt; 3–5% <tspan font-size="18" font-weight="600" fill="#94A3B8">of MRR</tspan></text>
    <text x="24" y="114" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Healthy B2B SaaS gross margin: 80%+</text>
    <text x="24" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Protects unit economics as scale grows</text>
    <circle cx="300" cy="40" r="14" fill="#059669" fill-opacity="0.2"/>
    <path d="M 295 40 L 298 43 L 305 36" stroke="#10B981" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Specialist SaaS Infrastructure &amp; Cloud Economics Publication</text>
  </g>
</svg>
`;

// 2. Cost Breakdown: How SaaS Infrastructure Expenses Are Distributed
const svgCostBreakdown = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 48)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">COST DISTRIBUTION</text>
  </g>

  <!-- Title -->
  <text x="60" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    How SaaS Infrastructure Expenses Are Distributed
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
    Typical percentage allocation of monthly cloud hosting across core infrastructure components
  </text>

  <!-- 6 Component Cards Grid (2 rows x 3 columns) -->
  <!-- 1. Database (36%) -->
  <g transform="translate(60, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="2"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">1. DATABASE HOSTING</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#F8FAFC">36%</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">PostgreSQL, MySQL, Redis, IOPS</text>
    <text x="24" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">CPU, RAM, read replicas &amp; storage scale</text>
  </g>

  <!-- 2. Compute (30%) -->
  <g transform="translate(430, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="2"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#34D399" letter-spacing="1">2. APPLICATION COMPUTE</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#F8FAFC">30%</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Web instances, APIs &amp; worker queues</text>
    <text x="24" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Autoscaling groups &amp; container runtimes</text>
  </g>

  <!-- 3. Bandwidth / CDN (12%) -->
  <g transform="translate(800, 190)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="2"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FBBF24" letter-spacing="1">3. BANDWIDTH &amp; CDN</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#F8FAFC">12%</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Data egress &amp; global edge caching</text>
    <text x="24" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Serving assets, API JSON payloads &amp; reports</text>
  </g>

  <!-- 4. Supporting Services (9%) -->
  <g transform="translate(60, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#A78BFA" letter-spacing="1">4. MONITORING &amp; SECURITY</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#F8FAFC">9%</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">APM, log ingestion, WAF &amp; alerts</text>
    <text x="24" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Sentry, Datadog, CloudWatch &amp; uptime</text>
  </g>

  <!-- 5. File & Object Storage (8%) -->
  <g transform="translate(430, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#F472B6" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F472B6" letter-spacing="1">5. FILE &amp; OBJECT STORAGE</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#F8FAFC">8%</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Amazon S3, Google Cloud Storage</text>
    <text x="24" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">User uploads, documents, invoices &amp; media</text>
  </g>

  <!-- 6. Backups & Disaster Recovery (5%) -->
  <g transform="translate(800, 370)">
    <rect width="340" height="160" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">6. BACKUPS &amp; DISASTER RECOVERY</text>
    <text x="24" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#F8FAFC">5%</text>
    <text x="24" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Automated snapshots &amp; replicas</text>
    <text x="24" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Guarantees RPO/RTO recovery objectives</text>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Calculated from verified multi-tenant SaaS production workload models</text>
  </g>
</svg>
`;

// 3. SaaS Application Infrastructure Architecture Diagram
const svgArchitecture = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 45)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">SYSTEM ARCHITECTURE</text>
  </g>

  <!-- Title -->
  <text x="60" y="118" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    SaaS Application Cloud Infrastructure Architecture
  </text>
  <text x="60" y="150" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
    Multi-tenant request lifecycle: Edge delivery, compute workers, database clusters &amp; observability
  </text>

  <!-- Horizontal Architecture Pipeline (5 stages) -->
  <!-- Layer 1: Edge & Ingress -->
  <g transform="translate(60, 185)">
    <rect width="200" height="340" rx="10" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="20" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">1. EDGE &amp; INGRESS</text>
    <rect x="20" y="55" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Cloudflare / CloudFront</text>
    <text x="30" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Global Anycast CDN</text>

    <rect x="20" y="130" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">WAF &amp; DDoS Shield</text>
    <text x="30" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Bot &amp; Rate Limiting</text>

    <rect x="20" y="205" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">SSL / TLS Termination</text>
    <text x="30" y="250" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Auto Custom Domains</text>

    <text x="20" y="305" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#38BDF8">Cost: ~12% Total</text>
  </g>

  <!-- Arrow 1 to 2 -->
  <path d="M 265 355 L 278 355 M 274 350 L 280 355 L 274 360" stroke="#38BDF8" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Layer 2: Compute & API -->
  <g transform="translate(285, 185)">
    <rect width="200" height="340" rx="10" fill="url(#cardGrad)" stroke="#34D399" stroke-width="1.5"/>
    <text x="20" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#34D399" letter-spacing="1">2. APP COMPUTE</text>
    <rect x="20" y="55" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Load Balancers (ALB)</text>
    <text x="30" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Health-check routing</text>

    <rect x="20" y="130" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">API / Web Workers</text>
    <text x="30" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Node / Go / Python Pods</text>

    <rect x="20" y="205" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Queue &amp; Background</text>
    <text x="30" y="250" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">BullMQ / Celery / SQS</text>

    <text x="20" y="305" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#34D399">Cost: ~30% Total</text>
  </g>

  <!-- Arrow 2 to 3 -->
  <path d="M 490 355 L 503 355 M 499 350 L 505 355 L 499 360" stroke="#34D399" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Layer 3: Database & Caching -->
  <g transform="translate(510, 185)">
    <rect width="200" height="340" rx="10" fill="url(#cardGrad)" stroke="#FBBF24" stroke-width="1.5"/>
    <text x="20" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FBBF24" letter-spacing="1">3. DATABASE &amp; CACHE</text>
    <rect x="20" y="55" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Primary Multi-Tenant DB</text>
    <text x="30" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">PostgreSQL / Supabase</text>

    <rect x="20" y="130" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Read Replicas</text>
    <text x="30" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Offload read analytics</text>

    <rect x="20" y="205" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">In-Memory Redis Cache</text>
    <text x="30" y="250" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Session &amp; Query Caching</text>

    <text x="20" y="305" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#FBBF24">Cost: ~36% Total</text>
  </g>

  <!-- Arrow 3 to 4 -->
  <path d="M 715 355 L 728 355 M 724 350 L 730 355 L 724 360" stroke="#FBBF24" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Layer 4: Object Storage -->
  <g transform="translate(735, 185)">
    <rect width="200" height="340" rx="10" fill="url(#cardGrad)" stroke="#F472B6" stroke-width="1.5"/>
    <text x="20" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F472B6" letter-spacing="1">4. OBJECT STORAGE</text>
    <rect x="20" y="55" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Amazon S3 / GCS</text>
    <text x="30" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Document &amp; File Uploads</text>

    <rect x="20" y="130" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Lifecycle Policies</text>
    <text x="30" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Glacier cold archiving</text>

    <rect x="20" y="205" width="160" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="30" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Media / Asset Serving</text>
    <text x="30" y="250" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Pre-signed URL delivery</text>

    <text x="20" y="305" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#F472B6">Cost: ~8% Total</text>
  </g>

  <!-- Arrow 4 to 5 -->
  <path d="M 940 355 L 953 355 M 949 350 L 955 355 L 949 360" stroke="#F472B6" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Layer 5: Observability & Backups -->
  <g transform="translate(960, 185)">
    <rect width="180" height="340" rx="10" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="1.5"/>
    <text x="18" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#A78BFA" letter-spacing="1">5. OPS &amp; BACKUPS</text>
    <rect x="18" y="55" width="144" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="26" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">Point-in-Time Backups</text>
    <text x="26" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Automated DB snapshots</text>

    <rect x="18" y="130" width="144" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="26" y="155" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">APM &amp; Error Tracking</text>
    <text x="26" y="175" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Sentry &amp; Datadog logs</text>

    <rect x="18" y="205" width="144" height="60" rx="6" fill="#0B192C" stroke="#334155"/>
    <text x="26" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F8FAFC">FinOps &amp; Alerts</text>
    <text x="26" y="250" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Spending anomaly limits</text>

    <text x="18" y="305" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#A78BFA">Cost: ~14% Total</text>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Scalable Cloud Engineering Blueprint</text>
  </g>
</svg>
`;

// 4. Hosting Cost Per Customer Calculation
const svgCostPerCustomer = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 48)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">UNIT ECONOMICS</text>
  </g>

  <!-- Title -->
  <text x="60" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    How to Calculate SaaS Hosting Cost Per Active Customer
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
    Measure true infrastructure efficiency against active customers, revenue, and gross margins
  </text>

  <!-- Formula Banner -->
  <g transform="translate(60, 190)">
    <rect width="1080" height="90" rx="10" fill="#0B192C" stroke="#0284C7" stroke-width="2"/>
    <text x="30" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="1">OFFICIAL UNIT METRIC FORMULA</text>
    <text x="30" y="68" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#F8FAFC">
      Hosting Cost Per Customer = Total Monthly Hosting Bill ÷ Monthly Active Customers (MAC)
    </text>
  </g>

  <!-- 3 Worked Step Cards -->
  <!-- Card 1: Input Example -->
  <g transform="translate(60, 305)">
    <rect width="340" height="225" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="1">STEP 1: IDENTIFY INPUTS</text>
    <text x="24" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC">Monthly Cloud Bill: <tspan fill="#38BDF8" font-weight="800">$330</tspan></text>
    <text x="24" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC">Active Customers: <tspan fill="#34D399" font-weight="800">1,000</tspan></text>
    <text x="24" y="144" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC">Subscription ARPU: <tspan fill="#FBBF24" font-weight="800">$15 / mo</tspan></text>
    <text x="24" y="176" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC">Total Monthly MRR: <tspan fill="#F8FAFC" font-weight="800">$15,000</tspan></text>
    <text x="24" y="204" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Growing B2B SaaS scenario</text>
  </g>

  <!-- Card 2: Unit Result -->
  <g transform="translate(430, 305)">
    <rect width="340" height="225" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="2"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#34D399" letter-spacing="1">STEP 2: CALCULATE UNIT COST</text>
    <text x="24" y="88" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#34D399">$0.33</text>
    <text x="24" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#F8FAFC">Per Active Customer / Month</text>
    <text x="24" y="152" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94A3B8">Calculation: $330 ÷ 1,000</text>
    <text x="24" y="178" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#FBBF24">Hosting = 2.2% of MRR</text>
    <text x="24" y="204" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">97.8% hosting gross profit margin</text>
  </g>

  <!-- Card 3: Common Pitfall Warning -->
  <g transform="translate(800, 305)">
    <rect width="340" height="225" rx="12" fill="url(#cardGrad)" stroke="#F87171" stroke-width="1.5"/>
    <text x="24" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F87171" letter-spacing="1">COMMON PITFALL TO AVOID</text>
    <text x="24" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F87171">Never Use Registered Accounts!</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#F8FAFC">10,000 registered users with only 1,000 active would show: $330 ÷ 10,000 = $0.033</text>
    <text x="24" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">This creates false optimism by hiding the true infrastructure load of active customers.</text>
    <text x="24" y="204" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">Always use Monthly Active Customers</text>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Unit economics modeling for SaaS leadership</text>
  </g>
</svg>
`;

// 5. Cloud Hosting Models Comparison
const svgHostingModels = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Top Badge -->
  <g transform="translate(60, 48)">
    <rect width="210" height="30" rx="15" fill="#1E293B" stroke="#0284C7" stroke-width="1.5"/>
    <text x="105" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="1.5">CLOUD MODELS</text>
  </g>

  <!-- Title -->
  <text x="60" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#F8FAFC" letter-spacing="-0.5">
    Cloud VMs vs Managed Hosting (PaaS) vs Serverless
  </text>
  <text x="60" y="156" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8">
    Compare control, operational complexity, pricing predictability, and ideal SaaS workloads
  </text>

  <!-- 3 Comparison Columns -->
  <!-- Column 1: Cloud Virtual Machines -->
  <g transform="translate(60, 190)">
    <rect width="340" height="340" rx="12" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="2"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#38BDF8" letter-spacing="1">CLOUD VIRTUAL MACHINES</text>
    <text x="24" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">AWS EC2, Google Compute, DigitalOcean</text>
    
    <g transform="translate(24, 75)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Infrastructure Control: <tspan fill="#34D399">High</tspan></text>
      <text x="0" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Server Management: <tspan fill="#F87171">Your Responsibility</tspan></text>
      <text x="0" y="68" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Pricing Model: <tspan fill="#38BDF8">Resource/Time-based</tspan></text>
      <text x="0" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Scaling Setup: <tspan fill="#FBBF24">Configured by Team</tspan></text>
      <text x="0" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Operational Overhead: <tspan fill="#F87171">High (DevOps needed)</tspan></text>
      
      <rect x="0" y="140" width="292" height="70" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="12" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">BEST SUITED FOR:</text>
      <text x="12" y="184" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#F8FAFC">Custom backend software stacks, steady loads &amp; predictable long-term costs.</text>
    </g>
  </g>

  <!-- Column 2: Managed Hosting / PaaS -->
  <g transform="translate(430, 190)">
    <rect width="340" height="340" rx="12" fill="url(#cardGrad)" stroke="#34D399" stroke-width="2"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#34D399" letter-spacing="1">MANAGED HOSTING / PAAS</text>
    <text x="24" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Render, Railway, Heroku, Fly.io</text>
    
    <g transform="translate(24, 75)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Infrastructure Control: <tspan fill="#FBBF24">Moderate</tspan></text>
      <text x="0" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Server Management: <tspan fill="#34D399">Provider-Managed</tspan></text>
      <text x="0" y="68" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Pricing Model: <tspan fill="#38BDF8">Plan + Usage Tiers</tspan></text>
      <text x="0" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Scaling Setup: <tspan fill="#34D399">1-Click / Simplified</tspan></text>
      <text x="0" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Operational Overhead: <tspan fill="#34D399">Low (Product Focus)</tspan></text>
      
      <rect x="0" y="140" width="292" height="70" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="12" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#34D399">BEST SUITED FOR:</text>
      <text x="12" y="184" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#F8FAFC">Startups &amp; lean engineering teams that want to ship without dedicated DevOps.</text>
    </g>
  </g>

  <!-- Column 3: Serverless Infrastructure -->
  <g transform="translate(800, 190)">
    <rect width="340" height="340" rx="12" fill="url(#cardGrad)" stroke="#A78BFA" stroke-width="2"/>
    <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#A78BFA" letter-spacing="1">SERVERLESS INFRASTRUCTURE</text>
    <text x="24" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">AWS Lambda, Cloudflare Workers, Supabase</text>
    
    <g transform="translate(24, 75)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Infrastructure Control: <tspan fill="#F87171">Lower (Sandboxed)</tspan></text>
      <text x="0" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Server Management: <tspan fill="#34D399">Fully Automated</tspan></text>
      <text x="0" y="68" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Pricing Model: <tspan fill="#A78BFA">Per Invocation / Execution</tspan></text>
      <text x="0" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Scaling Setup: <tspan fill="#34D399">Instant Automatic</tspan></text>
      <text x="0" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Operational Overhead: <tspan fill="#34D399">Near Zero Servers</tspan></text>
      
      <rect x="0" y="140" width="292" height="70" rx="6" fill="#0B192C" stroke="#334155"/>
      <text x="12" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#A78BFA">BEST SUITED FOR:</text>
      <text x="12" y="184" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#F8FAFC">Event-driven workflows, bursty traffic patterns &amp; scale-to-zero early prototypes.</text>
    </g>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(60, 565)">
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" letter-spacing="0.5">SaaS Launch Lab</text>
    <text x="140" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748B">•  Architectural trade-off assessment for technical founders</text>
  </g>
</svg>
`;

async function generateAll() {
  const images = [
    { name: 'saas-hosting-costs.webp', svg: svgFeatured },
    { name: 'saas-infrastructure-cost-breakdown.webp', svg: svgCostBreakdown },
    { name: 'saas-application-infrastructure-architecture.webp', svg: svgArchitecture },
    { name: 'hosting-cost-per-customer-calculation.webp', svg: svgCostPerCustomer },
    { name: 'cloud-hosting-models-comparison.webp', svg: svgHostingModels },
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
  console.error('Error generating images:', err);
  process.exit(1);
});
