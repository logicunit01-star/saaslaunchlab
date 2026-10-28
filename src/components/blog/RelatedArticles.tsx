import Link from "next/link";
import Image from "next/image";
import { ArticleMeta } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, ArrowRight } from "lucide-react";

interface RelatedArticlesProps {
  articles: ArticleMeta[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-950">
            Related Publications
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Recommended blueprints in this technical discipline
          </p>
        </div>
        <Link
          href="/#articles"
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center space-x-1"
        >
          <span>View all blueprints</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="flex flex-col bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all duration-200 group"
          >
            <Link
              href={`/blog/${article.slug}`}
              className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden block"
            >
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </Link>

            <div className="flex flex-col flex-1 p-5 justify-between space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">
                  {article.category}
                </span>
                <Link href={`/blog/${article.slug}`} className="block mt-1">
                  <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(article.publishedAt)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readingTime}m read</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
