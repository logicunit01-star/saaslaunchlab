import { Article, ArticleMeta, HeadingItem } from "@/types/article";
import { PRECOMPILED_ARTICLES } from "@/data/articles";

let cachedArticles: Article[] | null = null;

function loadArticles(): Article[] {
  if (cachedArticles) {
    return cachedArticles;
  }

  // 1. Primary: Use in-memory precompiled articles.
  // This is essential for Cloudflare Pages / Cloudflare Workers where the local Node filesystem (fs) is not available at runtime.
  if (Array.isArray(PRECOMPILED_ARTICLES) && PRECOMPILED_ARTICLES.length > 0) {
    cachedArticles = PRECOMPILED_ARTICLES;
    return cachedArticles;
  }

  // 2. Secondary fallback for local Node.js environment if precompiled array is empty
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const matter = require("gray-matter");

    const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");
    if (fs.existsSync(ARTICLES_DIR)) {
      const fileNames = fs.readdirSync(ARTICLES_DIR).filter((f: string) => f.endsWith(".md"));

      const articles: Article[] = fileNames
        .map((fileName: string) => {
          const fullPath = path.join(ARTICLES_DIR, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          const headings: HeadingItem[] = Array.isArray(data.headings) ? data.headings : [];

          return {
            slug: data.slug || fileName.replace(/\.md$/, ""),
            title: data.title || "Untitled",
            originalUrl: data.originalUrl || "",
            publishedAt: data.publishedAt || new Date().toISOString(),
            modifiedAt: data.modifiedAt || data.publishedAt || new Date().toISOString(),
            excerpt: data.excerpt || "",
            category: data.category || "General",
            readingTime: Number(data.readingTime) || 5,
            wordCount: Number(data.wordCount) || 1000,
            featuredImage: data.featuredImage || "/images/articles/placeholder.webp",
            featuredImageAlt: data.featuredImageAlt || data.title || "",
            headings,
            content: content.trim()
          };
        })
        .sort((a: Article, b: Article) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

      cachedArticles = articles;
      return articles;
    }
  } catch {
    // Non-Node.js runtime environment (e.g. Cloudflare Worker isolate)
  }

  return [];
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const articles = loadArticles();
  return articles.map(({ content, ...meta }) => meta);
}

export async function getAllArticlesWithContent(): Promise<Article[]> {
  return loadArticles();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = loadArticles();
  const article = articles.find((a) => a.slug === slug);
  return article || null;
}

export async function getFeaturedArticle(): Promise<ArticleMeta | null> {
  const articles = await getAllArticles();
  if (articles.length === 0) return null;
  // Look for standout flagship piece or the latest
  const flagship = articles.find((a) => a.slug === "saas-website-architecture") || articles[0];
  return flagship;
}

const TOPIC_CLUSTERS: Record<string, string[]> = {
  // Cluster A: SaaS Architecture
  "saas-website-architecture": [
    "multi-tenant-saas-architecture",
    "saas-database-design",
    "backend-choices-for-saas",
    "saas-integrations"
  ],
  "multi-tenant-saas-architecture": [
    "saas-website-architecture",
    "saas-database-design",
    "backend-choices-for-saas",
    "saas-integrations"
  ],
  "saas-database-design": [
    "saas-website-architecture",
    "multi-tenant-saas-architecture",
    "backend-choices-for-saas",
    "saas-integrations"
  ],
  "backend-choices-for-saas": [
    "saas-website-architecture",
    "multi-tenant-saas-architecture",
    "saas-database-design",
    "saas-integrations"
  ],
  "saas-integrations": [
    "saas-website-architecture",
    "multi-tenant-saas-architecture",
    "saas-database-design",
    "backend-choices-for-saas"
  ],

  // Cluster B: MVP & Building
  "mvp-development-cost": [
    "saas-mvp-in-30-days",
    "why-most-saas-mvps-fail",
    "no-code-saas-guide",
    "saas-product-development",
    "validate-saas-idea"
  ],
  "saas-mvp-in-30-days": [
    "mvp-development-cost",
    "why-most-saas-mvps-fail",
    "no-code-saas-guide",
    "saas-product-development"
  ],
  "why-most-saas-mvps-fail": [
    "mvp-development-cost",
    "saas-mvp-in-30-days",
    "validate-saas-idea",
    "saas-product-development"
  ],
  "no-code-saas-guide": [
    "mvp-development-cost",
    "saas-mvp-in-30-days",
    "saas-product-development",
    "validate-saas-idea"
  ],
  "saas-product-development": [
    "mvp-development-cost",
    "saas-mvp-in-30-days",
    "validate-saas-idea",
    "why-most-saas-mvps-fail"
  ],
  "validate-saas-idea": [
    "mvp-development-cost",
    "saas-mvp-in-30-days",
    "why-most-saas-mvps-fail",
    "saas-product-development"
  ],

  // Cluster C: SaaS Economics and Pricing
  "saas-platform-development-cost-2025-2026-per-feature": [
    "saas-development-cost",
    "cost-of-ai-in-saas",
    "how-to-turn-a-spreadsheet-into-a-saas-product"
  ],
  "saas-development-cost": [
    "saas-platform-development-cost-2025-2026-per-feature",
    "cost-of-ai-in-saas",
    "mvp-development-cost",
    "how-to-turn-a-spreadsheet-into-a-saas-product"
  ],
  "cost-of-ai-in-saas": [
    "saas-platform-development-cost-2025-2026-per-feature",
    "saas-development-cost",
    "how-to-turn-a-spreadsheet-into-a-saas-product"
  ],
  "how-to-turn-a-spreadsheet-into-a-saas-product": [
    "saas-platform-development-cost-2025-2026-per-feature",
    "saas-development-cost",
    "no-code-saas-guide",
    "mvp-development-cost"
  ],

  // Cluster D: Growth and Scaling
  "how-to-scale-a-saas-business": [
    "customer-success-in-saas-2026",
    "9-common-saas-seo-mistakes",
    "what-is-b2b-saas",
    "what-is-saas-sales"
  ],
  "customer-success-in-saas-2026": [
    "how-to-scale-a-saas-business",
    "what-is-b2b-saas",
    "what-is-saas-sales",
    "9-common-saas-seo-mistakes"
  ],
  "9-common-saas-seo-mistakes": [
    "how-to-scale-a-saas-business",
    "what-is-b2b-saas",
    "customer-success-in-saas-2026",
    "common-ux-mistakes-saas-conversion-rates"
  ],
  "what-is-b2b-saas": [
    "how-to-scale-a-saas-business",
    "what-is-saas-sales",
    "customer-success-in-saas-2026",
    "9-common-saas-seo-mistakes"
  ],
  "what-is-saas-sales": [
    "how-to-scale-a-saas-business",
    "what-is-b2b-saas",
    "customer-success-in-saas-2026",
    "9-common-saas-seo-mistakes"
  ]
};

export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  limit: number = 4
): Promise<ArticleMeta[]> {
  const all = await getAllArticles();
  const others = all.filter((a) => a.slug !== currentSlug);

  const clusterSlugs = TOPIC_CLUSTERS[currentSlug] || [];
  const clusterMatches: ArticleMeta[] = [];

  for (const cSlug of clusterSlugs) {
    const found = others.find((a) => a.slug === cSlug);
    if (found && !clusterMatches.some((m) => m.slug === found.slug)) {
      clusterMatches.push(found);
    }
  }

  if (clusterMatches.length >= limit) {
    return clusterMatches.slice(0, limit);
  }

  // Backfill with same category
  const sameCategory = others.filter(
    (a) => a.category === category && !clusterMatches.some((m) => m.slug === a.slug)
  );

  const combined = [...clusterMatches, ...sameCategory];
  if (combined.length >= limit) {
    return combined.slice(0, limit);
  }

  // Backfill with remaining articles
  const remaining = others.filter((a) => !combined.some((m) => m.slug === a.slug));
  return [...combined, ...remaining].slice(0, limit);
}

export async function getAllSlugs(): Promise<string[]> {
  const articles = loadArticles();
  return articles.map((a) => a.slug);
}

export async function getCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  const set = new Set(articles.map((a) => a.category));
  return Array.from(set).sort();
}
