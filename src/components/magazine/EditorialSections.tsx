import Link from "next/link";
import Image from "next/image";
import { ArticleMeta } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowRight, Cpu, Layers } from "lucide-react";

interface EditorialSectionsProps {
  articles: ArticleMeta[];
}

export function EditorialSections({ articles }: EditorialSectionsProps) {
  const architectureArticles = articles
    .filter((a) => a.category === "Architecture" && a.slug !== "saas-website-architecture")
    .slice(0, 3);

  const aiArticles = articles
    .filter((a) => a.category === "AI & Automation")
    .slice(0, 3);

  return (
    <div className="border-t border-slate-200 bg-slate-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Core System Architecture */}
        {architectureArticles.length > 0 && (
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-md bg-sky-500 text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-950">
                    System Architecture & Engineering
                  </h3>
                  <p className="text-xs text-slate-500">
                    Production blueprints for multi-tenant data, databases, and APIs
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {architectureArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="flex flex-col bg-white p-5 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all group"
                >
                  <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-slate-100 mb-4">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider mb-1.5">
                    {article.category}
                  </span>
                  <h4 className="text-base font-bold font-serif text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readingTime} min</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: AI Tooling & Product Velocity */}
        {aiArticles.length > 0 && (
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-md bg-slate-900 text-sky-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-950">
                    AI Economics & Product Automation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Evaluating true token costs, no-code integrations, and AI product architecture
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="flex flex-col bg-white p-5 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all group"
                >
                  <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-slate-100 mb-4">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider mb-1.5">
                    {article.category}
                  </span>
                  <h4 className="text-base font-bold font-serif text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readingTime} min</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
