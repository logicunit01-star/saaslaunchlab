"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { Search, Menu, X } from "lucide-react";
import { SearchModal } from "./SearchModal";
import { ArticleMeta } from "@/types/article";

interface HeaderProps {
  articles?: ArticleMeta[];
}

export function Header({ articles = [] }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Official Brand Logo */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex items-center py-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm"
              >
                <Image
                  src="/images/logo.png"
                  alt="SaaS Launch Lab"
                  width={210}
                  height={38}
                  priority
                  className="h-9 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
              {siteConfig.navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-700 hover:text-sky-500 transition-colors relative py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 rounded-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-sky-50 hover:border-sky-200 border border-transparent px-3.5 py-1.5 rounded-full transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
                aria-label="Search articles"
              >
                <Search className="w-4 h-4 text-sky-500" />
                <span className="hidden sm:inline text-xs font-medium">Search</span>
                <kbd className="hidden sm:inline text-[10px] font-sans bg-white px-1.5 py-0.5 rounded-sm border border-slate-200 text-slate-500">
                  /
                </kbd>
              </button>

              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-950 rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
              {siteConfig.navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-700 hover:text-sky-500 hover:bg-sky-50 px-3 py-2 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-400 px-3">
              Focused on modern SaaS architecture, engineering, and AI systems.
            </div>
          </div>
        )}
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
      />
    </>
  );
}
