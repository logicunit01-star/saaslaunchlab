import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getAllArticles } from "@/lib/articles";
import { CATEGORIES } from "@/lib/categories";
import { ArticleCard } from "@/components/magazine/ArticleCard";
import { Pagination } from "@/components/magazine/Pagination";
import { SlidersHorizontal, BookOpen } from "lucide-react";

export const revalidate = 3600;

const POSTS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: "All SaaS Engineering Blueprints & Articles | SaaS Launch Lab",
  description:
    "Browse all 28 in-depth SaaS engineering blueprints, multi-tenant database guides, MVP launch roadmaps, and AI architecture teardowns.",
  alternates: {
    canonical: `${siteConfig.url}/blog`
  },
  openGraph: {
    title: "All SaaS Engineering Blueprints & Articles | SaaS Launch Lab",
    description:
      "Browse all 28 in-depth SaaS engineering blueprints, multi-tenant database guides, MVP launch roadmaps, and AI architecture teardowns.",
    url: `${siteConfig.url}/blog`,
    type: "website"
  }
};

export default async function BlogIndexPage() {
  const articles = await getAllArticles();
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);
  const displayedArticles = articles.slice(0, POSTS_PER_PAGE);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${siteConfig.url}/blog`
      }
    ]
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: "SaaS Launch Lab Blueprints",
    description:
      "Production-tested SaaS engineering blueprints, database architectures, and economics.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="pb-8 border-b border-slate-200">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-sm mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Publication Archive</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 tracking-tight">
              All SaaS Engineering Blueprints
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Explore our complete collection of {articles.length} production-tested blueprints, architectural breakdowns,
              and strategic playbooks for building scalable software businesses.
            </p>

            {/* Category Filter Pills (Crawlable <a> links) */}
            <div className="flex items-center overflow-x-auto pt-6 scrollbar-none gap-2">
              <span className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-400 mr-1 uppercase tracking-wider shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
                Categories:
              </span>
              <span className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-950 text-white shrink-0 shadow-xs ring-1 ring-sky-500/50">
                All Articles ({articles.length})
              </span>
              {Object.values(CATEGORIES).map((cat) => {
                const count = articles.filter((a) => a.category === cat.name).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/blog/category/${cat.slug}`}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors shrink-0 border border-slate-200/60"
                  >
                    {cat.name}{" "}
                    <span className="text-[11px] text-slate-400 font-normal">
                      ({count})
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Article Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article, idx) => (
              <ArticleCard
                key={article.slug}
                article={article}
                priority={idx < 3}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination currentPage={1} totalPages={totalPages} basePath="/blog" />
        </div>
      </div>
    </>
  );
}
