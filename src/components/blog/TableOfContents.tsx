"use client";

import { useState, useEffect } from "react";
import { HeadingItem } from "@/types/article";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  // Filter only H2 and H3 for clean TOC
  const tocItems = headings.filter((h) => h.level === 2 || h.level === 3);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1
      }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length < 3) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="bg-slate-50/80 rounded-xl border border-slate-200 p-5 my-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-800">
          <List className="w-4 h-4 text-sky-500" />
          <span>Table of Contents</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="lg:hidden text-xs text-slate-500 flex items-center space-x-1"
          aria-expanded={isOpenMobile}
        >
          <span>{isOpenMobile ? "Collapse" : "Expand"}</span>
          {isOpenMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className={`${isOpenMobile ? "block" : "hidden"} lg:block mt-4 pt-3 border-t border-slate-200/60`}>
        <ul className="space-y-2 text-sm max-h-[480px] overflow-y-auto pr-2">
          {tocItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`${item.level === 3 ? "ml-4 text-xs" : "text-sm"} transition-colors`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpenMobile(false)}
                  className={`block py-1 transition-colors leading-snug ${
                    isActive
                      ? "text-sky-600 font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
