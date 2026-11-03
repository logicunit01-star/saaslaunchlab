import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Editorial Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={180}
                height={33}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed pt-1">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-xs text-slate-500">
              An independent digital publication dedicated to modern software craftsmanship,
              technical architecture, and SaaS product engineering.
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-4">
              Publication
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About & Standards
                </Link>
              </li>
              <li>
                <Link href="/author/editorial-team" className="hover:text-white transition-colors">
                  Editorial Staff
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Editorial
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial Pillars */}
          <div>
            <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-4">
              Pillars
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog/category/architecture" className="text-slate-400 hover:text-white transition-colors">
                  Architecture & Databases
                </Link>
              </li>
              <li>
                <Link href="/blog/category/ai-automation" className="text-slate-400 hover:text-white transition-colors">
                  AI & Automation
                </Link>
              </li>
              <li>
                <Link href="/blog/category/mvp-engineering" className="text-slate-400 hover:text-white transition-colors">
                  MVP & Engineering
                </Link>
              </li>
              <li>
                <Link href="/blog/category/growth-strategy" className="text-slate-400 hover:text-white transition-colors">
                  Growth & Strategy
                </Link>
              </li>
              <li>
                <Link href="/blog/category/audits-economics" className="text-slate-400 hover:text-white transition-colors">
                  Audits & Economics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal row */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Editorial Standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
