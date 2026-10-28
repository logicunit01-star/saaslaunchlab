import Link from "next/link";
import Image from "next/image";
import { ArticleMeta } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar } from "lucide-react";

interface ArticleCardProps {
  article: ArticleMeta;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  return (
    <article className="flex flex-col bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200 group">
      {/* Thumbnail */}
      <Link
        href={`/blog/${article.slug}`}
        className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden block"
      >
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt || article.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-103 transition-transform duration-300"
        />
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{article.readingTime} min</span>
            </span>
          </div>

          <Link href={`/blog/${article.slug}`} className="block">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-950 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(article.publishedAt)}</span>
          </span>
          <span className="font-medium text-slate-700 group-hover:text-sky-600 transition-colors">
            Read article &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}
