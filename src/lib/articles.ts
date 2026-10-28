import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, ArticleMeta, HeadingItem } from "@/types/article";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

let cachedArticles: Article[] | null = null;

function loadArticles(): Article[] {
  if (cachedArticles) {
    return cachedArticles;
  }

  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  const articles: Article[] = fileNames
    .map((fileName) => {
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
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  cachedArticles = articles;
  return articles;
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

export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<ArticleMeta[]> {
  const all = await getAllArticles();
  const others = all.filter((a) => a.slug !== currentSlug);
  
  // Prefer same category
  const sameCategory = others.filter((a) => a.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Backfill with other categories
  const differentCategory = others.filter((a) => a.category !== category);
  return [...sameCategory, ...differentCategory].slice(0, limit);
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
