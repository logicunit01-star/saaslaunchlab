import {
  getAllArticles,
  getFeaturedArticle,
  getCategories
} from "@/lib/articles";
import { EditorialMasthead } from "@/components/magazine/EditorialMasthead";
import { FeaturedArticle } from "@/components/magazine/FeaturedArticle";
import { ArticleGrid } from "@/components/magazine/ArticleGrid";
import { EditorialSections } from "@/components/magazine/EditorialSections";

export const revalidate = 3600; // ISR hourly or static generation

export default async function HomePage() {
  const [articles, featuredArticle, categories] = await Promise.all([
    getAllArticles(),
    getFeaturedArticle(),
    getCategories()
  ]);

  return (
    <div className="flex flex-col">
      {/* 1. Editorial Masthead */}
      <EditorialMasthead />

      {/* 2. Flagship Featured Blueprint */}
      {featuredArticle && <FeaturedArticle article={featuredArticle} />}

      {/* 3. Latest Publications with Category Filtering & Pagination */}
      <ArticleGrid articles={articles} categories={categories} />

      {/* 4. Curated Editorial Deep-Dives (Architecture & AI) */}
      <EditorialSections articles={articles} />
    </div>
  );
}
