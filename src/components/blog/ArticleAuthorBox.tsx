import Link from "next/link";
import { AuthorInfo } from "@/lib/authors";
import { formatDate } from "@/lib/utils";
import {
  UserCheck,
  RefreshCw,
  Linkedin,
  Github,
  Twitter,
  ShieldCheck
} from "lucide-react";

interface ArticleAuthorBoxProps {
  author: AuthorInfo;
  modifiedAt?: string;
  publishedAt?: string;
}

export function ArticleAuthorBox({
  author,
  modifiedAt,
  publishedAt
}: ArticleAuthorBoxProps) {
  const reviewDate = modifiedAt || publishedAt || new Date().toISOString();

  return (
    <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-sky-50/20 border border-slate-200 shadow-xs">
      {/* Editorial review badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200/80 text-xs text-slate-500">
        <div className="inline-flex items-center space-x-1.5 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Peer-Reviewed Technical Blueprint</span>
        </div>
        <div className="flex items-center space-x-1.5 font-medium text-slate-600">
          <RefreshCw className="w-3 h-3 text-slate-400" />
          <span>Reviewed & Updated on: {formatDate(reviewDate)}</span>
        </div>
      </div>

      {/* Author details */}
      <div className="pt-6 flex flex-col sm:flex-row items-start gap-5">
        <div className="w-14 h-14 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center font-bold text-xl shadow-xs border border-slate-700 shrink-0">
          <UserCheck className="w-7 h-7" />
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/author/${author.slug}`}
              className="text-base sm:text-lg font-bold text-slate-950 hover:text-sky-600 transition-colors font-serif"
            >
              {author.name}
            </Link>
            <span className="text-xs text-slate-400">&bull;</span>
            <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
              {author.role}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {author.bio}
          </p>

          {/* Social / professional profile links */}
          {(author.linkedin || author.github || author.twitter) ? (
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-semibold text-slate-700 hover:text-sky-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md transition-colors"
                >
                  <Linkedin className="w-3 h-3 text-sky-600" />
                  <span>LinkedIn</span>
                </a>
              )}
              {author.github && (
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-semibold text-slate-700 hover:text-sky-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md transition-colors"
                >
                  <Github className="w-3 h-3 text-slate-700" />
                  <span>GitHub</span>
                </a>
              )}
              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-semibold text-slate-700 hover:text-sky-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md transition-colors"
                >
                  <Twitter className="w-3 h-3 text-sky-500" />
                  <span>X (Twitter)</span>
                </a>
              )}
            </div>
          ) : (
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700"
              >
                <span>Read our editorial review process & standards &rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
