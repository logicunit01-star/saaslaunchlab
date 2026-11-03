import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog"
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/page/${page}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="flex items-center justify-center gap-2 pt-12 pb-6"
    >
      {/* Previous Page Link */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          rel="prev"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-sky-500 transition-colors shadow-xs"
        >
          <ChevronLeft className="w-4 h-4 text-slate-500" />
          <span>Previous</span>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 rounded-lg cursor-not-allowed">
          <ChevronLeft className="w-4 h-4 text-slate-300" />
          <span>Previous</span>
        </span>
      )}

      {/* Numbered Page Links */}
      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return isCurrent ? (
            <span
              key={p}
              aria-current="page"
              className="w-9 h-9 flex items-center justify-center text-xs font-bold text-white bg-slate-950 rounded-lg shadow-xs ring-1 ring-sky-500/50"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={getPageUrl(p)}
              className="w-9 h-9 flex items-center justify-center text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-sky-500 transition-colors"
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Next Page Link */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          rel="next"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-sky-500 transition-colors shadow-xs"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 rounded-lg cursor-not-allowed">
          <span>Next</span>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </span>
      )}
    </nav>
  );
}
