export interface CategoryInfo {
  slug: string;
  name: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  "ai-automation": {
    slug: "ai-automation",
    name: "AI & Automation",
    title: "AI & Automation in SaaS: Architecture, Costs & Models",
    h1: "AI & Automation in SaaS: Architecture, Tooling & Economics",
    description:
      "Engineering blueprints, cost frameworks, and architectural guides for integrating LLMs, autonomous workflows, and machine learning into production SaaS.",
    intro:
      "Artificial intelligence has rapidly transitioned from an experimental feature to a core architectural layer in modern SaaS applications. This hub brings together engineering blueprints, cost-modeling frameworks, and implementation guides for integrating LLMs, autonomous workflows, and machine learning into production products. Learn how to architect vector retrieval systems, budget realistically for inference and token usage, and automate complex customer workflows without blowing up your unit economics. Whether you are replacing brittle scripts or building an AI-first SaaS product, these guides provide technical clarity and practical benchmarks."
  },
  architecture: {
    slug: "architecture",
    name: "Architecture",
    title: "SaaS Architecture: Multi-Tenancy, Databases & Scaling",
    h1: "SaaS Architecture: Multi-Tenancy, Databases & Scalability",
    description:
      "Deep dives into multi-tenant database patterns, tenant data isolation, schema migration strategies, API design, and high-concurrency systems.",
    intro:
      "Software architecture decisions made during the earliest days of a SaaS build often determine whether a company can scale profitably or gets crushed by technical debt. This category covers foundational system design principles for SaaS engineers and technical founders. Explore deep dives into multi-tenant database patterns, tenant data isolation, schema migration strategies, API-first microservices versus modular monoliths, and high-concurrency infrastructure. Every architectural blueprint is designed to help you balance rapid delivery speed with robust security, compliance, and multi-region reliability as your customer base expands."
  },
  "audits-economics": {
    slug: "audits-economics",
    name: "Audits & Economics",
    title: "SaaS Audits & Economics: Costs, Pricing & Unit Margins",
    h1: "SaaS Audits & Economics: Unit Economics, Costs & Margins",
    description:
      "Detailed financial benchmarks, feature development costing breakdowns, gross margin optimization, and pre-launch architecture audits for SaaS.",
    intro:
      "Building a durable software business requires rigorous financial discipline and technical clarity around where capital actually goes. Our Audits & Economics publication hub breaks down the numbers behind successful SaaS operations: feature development budgets, serverless versus dedicated infrastructure costs, gross margin optimization, and pre-launch architectural audits. Discover how to identify hidden latency bottlenecks, eliminate runaway cloud bills, model customer acquisition cost against lifetime value, and run technical pre-flight checks before releasing software to enterprise customers. Ground your engineering decisions in sound commercial logic."
  },
  "growth-strategy": {
    slug: "growth-strategy",
    name: "Growth & Strategy",
    title: "SaaS Growth & Strategy: Scaling, Retention & Moats",
    h1: "SaaS Growth & Strategy: Scaling, Retention & Distribution",
    description:
      "Strategic playbooks on customer success, onboarding retention, pricing architecture, and compounding search engine optimization for SaaS founders.",
    intro:
      "Sustainable SaaS growth is an engineering problem as much as a marketing one. This section focuses on the operational, strategic, and architectural drivers of SaaS expansion. Learn how to design usage-based pricing models that align with customer value, build data-backed customer success engines that systematically reduce churn, and turn search engine optimization and technical content into compounding customer acquisition channels. From validating your first twenty pilot customers to scaling revenue through expansion tiers, these guides provide structured playbooks for founders navigating every stage of growth."
  },
  "mvp-engineering": {
    slug: "mvp-engineering",
    name: "MVP & Engineering",
    title: "SaaS MVP & Engineering: Velocity, Scoping & Stacks",
    h1: "SaaS MVP & Engineering Velocity: Scoping, Stacks & Launch",
    description:
      "Actionable guides on rapid MVP development, modern full-stack tech stacks, feature prioritization, and shipping production SaaS in 30 days.",
    intro:
      "Speed to customer feedback is the single most decisive factor in early-stage software success. The MVP & Engineering hub is dedicated to helping technical founders scope, architect, and ship functional SaaS products with maximum velocity and zero bloat. Master the art of ruthless feature prioritization, compare modern full-stack web frameworks like Next.js, Postgres, and Supabase, and follow battle-tested roadmaps for launching an MVP in 30 days. Stop building theoretical features in isolation and learn how to deliver reliable, production-grade software that proves product-market demand immediately."
  }
};

export function getCategoryBySlug(slug: string): CategoryInfo | null {
  return CATEGORIES[slug] || null;
}

export function getCategorySlugByName(name: string): string {
  const entry = Object.values(CATEGORIES).find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  return entry ? entry.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORIES);
}
