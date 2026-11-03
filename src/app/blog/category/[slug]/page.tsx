import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getAllArticles } from "@/lib/articles";
import {
  CATEGORIES,
  getCategoryBySlug,
  getAllCategorySlugs
} from "@/lib/categories";
import { ArticleCard } from "@/components/magazine/ArticleCard";
import { ChevronRight, Layers, ArrowLeft } from "lucide-react";

export const revalidate = 3600;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const canonicalUrl = `${siteConfig.url}/blog/category/${slug}`;

  return {
    title: `${category.title} | SaaS Launch Lab`,
    description: category.description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${category.title} | SaaS Launch Lab`,
      description: category.description,
      url: canonicalUrl,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | SaaS Launch Lab`,
      description: category.description
    }
  };
}

export default async function CategoryHubPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const categoryArticles = allArticles.filter(
    (a) => a.category.toLowerCase() === category.name.toLowerCase()
  );

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
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${siteConfig.url}/blog/category/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/blog" className="hover:text-sky-600 transition-colors">
              Articles
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-semibold">{category.name}</span>
          </nav>

          {/* Header Banner */}
          <div className="pb-8 border-b border-slate-200">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-sm mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Editorial Pillar &bull; {categoryArticles.length} Publications</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 tracking-tight leading-[1.15]">
              {category.h1}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
              {category.intro}
            </p>

            {/* Other Category Links */}
            <div className="flex items-center overflow-x-auto pt-6 scrollbar-none gap-2">
              <span className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-400 mr-1 uppercase tracking-wider shrink-0">
                Pillars:
              </span>
              <Link
                href="/blog"
                className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
              >
                All Articles
              </Link>
              {Object.values(CATEGORIES).map((cat) => {
                const isActive = cat.slug === slug;
                const count = allArticles.filter((a) => a.category === cat.name).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/blog/category/${cat.slug}`}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors shrink-0 ${
                      isActive
                        ? "bg-slate-950 text-white shadow-xs ring-1 ring-sky-500/50"
                        : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700 border border-slate-200/60"
                    }`}
                  >
                    {cat.name} ({count})
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="mt-12">
            {categoryArticles.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                No articles found in this category yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryArticles.map((article, idx) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    priority={idx < 3}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bottom navigation link */}
          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors py-2 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse All Engineering Blueprints</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
