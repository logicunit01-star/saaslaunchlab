import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { getCategorySlugByName } from "@/lib/categories";
import { ChevronRight, Calendar, Clock, RefreshCw } from "lucide-react";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const isUpdated =
    article.modifiedAt &&
    article.modifiedAt !== article.publishedAt &&
    new Date(article.modifiedAt).getTime() > new Date(article.publishedAt).getTime() + 86400000;

  const categorySlug = getCategorySlugByName(article.category);

  return (
    <header className="space-y-6 pb-8 border-b border-slate-200">
      {/* Breadcrumbs: Home > Category > Article */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 flex-wrap">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <Link
          href={`/blog/category/${categorySlug}`}
          className="hover:text-sky-600 transition-colors font-medium text-slate-700"
        >
          {article.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="text-slate-500 truncate max-w-[220px] sm:max-w-[360px]" title={article.title}>
          {article.title}
        </span>
      </nav>

      {/* Category Pill */}
      <div>
        <Link
          href={`/blog/category/${categorySlug}`}
          className="inline-block text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 hover:text-sky-800 transition-colors px-2.5 py-1 rounded-sm uppercase tracking-wider"
        >
          {article.category}
        </Link>
      </div>

      {/* H1 Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-950 tracking-tight leading-[1.15]">
        {article.title}
      </h1>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-sans">
          {article.excerpt}
        </p>
      )}

      {/* Publication Meta */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
        <span className="flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Published: {formatDate(article.publishedAt)}</span>
        </span>

        {isUpdated && (
          <span className="flex items-center space-x-1.5 text-slate-600">
            <RefreshCw className="w-3 h-3 text-slate-400" />
            <span>Updated: {formatDate(article.modifiedAt)}</span>
          </span>
        )}

        <span>&bull;</span>

        <span className="flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{article.readingTime} min read</span>
        </span>

        <span>&bull;</span>

        <span>{article.wordCount.toLocaleString()} words</span>
      </div>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-slate-100 mt-6 border border-slate-200/80 shadow-xs">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt || article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 850px"
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}
