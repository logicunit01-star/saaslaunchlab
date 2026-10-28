import Link from "next/link";
import Image from "next/image";
import { ArticleMeta } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, ArrowRight } from "lucide-react";

interface FeaturedArticleProps {
  article: ArticleMeta;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="py-8 sm:py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Featured Blueprint
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-8 hover:shadow-lg hover:border-sky-200 transition-all duration-200 group">
          {/* Article Image */}
          <div className="lg:col-span-7 relative aspect-16/10 rounded-xl overflow-hidden bg-slate-100">
            <Link href={`/blog/${article.slug}`} className="block w-full h-full">
              <Image
                src={article.featuredImage}
                alt={article.featuredImageAlt || article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </Link>
          </div>

          {/* Article Details */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div>
              <span className="inline-block text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-sm uppercase tracking-wide">
                {article.category}
              </span>
            </div>

            <Link href={`/blog/${article.slug}`}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-950 group-hover:text-sky-500 transition-colors leading-tight">
                {article.title}
              </h2>
            </Link>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>

            <div className="flex items-center space-x-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-sky-500" />
                <span>{formatDate(article.publishedAt)}</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>{article.readingTime} min read</span>
              </span>
            </div>

            <div className="pt-2">
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-900 group-hover:text-sky-500 transition-colors"
              >
                <span>Read Full Blueprint</span>
                <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
