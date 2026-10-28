"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, FileText } from "lucide-react";
import { ArticleMeta } from "@/types/article";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: ArticleMeta[];
}

export function SearchModal({ isOpen, onClose, articles }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search articles"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blueprints, architecture, MVP, AI cost..."
            className="w-full text-slate-900 placeholder:text-slate-400 bg-transparent text-base focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 transition-colors"
          >
            ESC
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === "" ? (
            <div className="py-12 text-center text-sm text-slate-400">
              Type keywords to search {articles.length} in-depth technical guides & blueprints...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No articles found matching &ldquo;<span className="font-semibold text-slate-800">{query}</span>&rdquo;.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {filtered.length} {filtered.length === 1 ? "Result" : "Results"}
              </div>
              {filtered.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  onClick={onClose}
                  className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-start space-x-3 pr-4">
                    <FileText className="w-5 h-5 text-slate-400 mt-0.5 shrink-0 group-hover:text-sky-500 transition-colors" />
                    <div>
                      <div className="text-xs font-medium text-sky-600 mb-0.5">
                        {article.category}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {article.title}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 shrink-0 mt-1 transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
