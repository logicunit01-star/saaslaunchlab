"use client";

import { useState, useMemo } from "react";
import { ArticleMeta } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface ArticleGridProps {
  articles: ArticleMeta[];
  categories: string[];
}

const ARTICLES_PER_PAGE = 6;

export function ArticleGrid({ articles, categories }: ArticleGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(ARTICLES_PER_PAGE);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") {
      return articles;
    }
    return articles.filter((a) => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ARTICLES_PER_PAGE);
  };

  const hasMore = visibleCount < filteredArticles.length;

  return (
    <section id="articles" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
              Latest Publications
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Showing {displayedArticles.length} of {filteredArticles.length} blueprints
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto pb-2 md:pb-0 scrollbar-none gap-1.5">
            <span className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
              Topic:
            </span>
            {["All", ...categories].map((category) => {
              const count =
                category === "All"
                  ? articles.length
                  : articles.filter((a) => a.category === category).length;
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white shadow-xs ring-1 ring-sky-500/50"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                  aria-pressed={isActive}
                >
                  {category}{" "}
                  <span className={`text-[11px] ml-1 ${isActive ? "text-sky-300" : "text-slate-400"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {displayedArticles.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            No articles found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article, idx) => (
              <ArticleCard key={article.slug} article={article} priority={idx < 3} />
            ))}
          </div>
        )}

        {/* Load More Control */}
        {hasMore && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-sky-500 shadow-xs transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <span>Load More Blueprints</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
            <div className="text-xs text-slate-400 mt-2">
              Displaying {displayedArticles.length} of {filteredArticles.length} articles
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
