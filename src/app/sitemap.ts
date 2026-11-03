import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getAllArticles } from "@/lib/articles";
import { getAllCategorySlugs } from "@/lib/categories";
import { getAllAuthorSlugs } from "@/lib/authors";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const baseUrl = siteConfig.url;

  // Static core & hub routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];

  // Paginated blog routes (/blog/page/2, /blog/page/3, etc.)
  const POSTS_PER_PAGE = 9;
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);
  const paginationRoutes: MetadataRoute.Sitemap = [];
  for (let p = 2; p <= totalPages; p++) {
    paginationRoutes.push({
      url: `${baseUrl}/blog/page/${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    });
  }

  // Category hub routes
  const categorySlugs = getAllCategorySlugs();
  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/blog/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85
  }));

  // Author profile routes
  const authorSlugs = getAllAuthorSlugs();
  const authorRoutes: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: `${baseUrl}/author/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6
  }));

  // Dynamic article routes
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.modifiedAt || article.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  return [
    ...staticRoutes,
    ...paginationRoutes,
    ...categoryRoutes,
    ...authorRoutes,
    ...articleRoutes
  ];
}
