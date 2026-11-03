import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { CATEGORIES } from "@/lib/categories";
import {
  ShieldCheck,
  Code2,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "About SaaS Launch Lab | Editorial Standards & Mission",
  description:
    "Learn about SaaS Launch Lab, our technical editorial standards, publication mission, and independent blueprints for founders and software engineers.",
  alternates: {
    canonical: `${siteConfig.url}/about`
  },
  openGraph: {
    title: "About SaaS Launch Lab | Editorial Standards & Mission",
    description:
      "Learn about SaaS Launch Lab, our technical editorial standards, publication mission, and independent blueprints for founders and software engineers.",
    url: `${siteConfig.url}/about`,
    type: "website"
  }
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteConfig.url}/about`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Masthead */}
          <div className="pb-10 border-b border-slate-200">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-sm mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Publication Standards & Mission</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 tracking-tight leading-[1.15]">
              About SaaS Launch Lab
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed font-sans">
              An independent technical journal providing actionable architectural blueprints, MVP engineering playbooks,
              and unit economic teardowns for modern software founders and lead engineers.
            </p>
          </div>

          {/* Mission & What We Cover */}
          <div className="mt-12 space-y-12 text-slate-700 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                What the Publication Covers
              </h2>
              <p>
                SaaS Launch Lab was founded to solve a pervasive problem in software publishing:
                most technical articles are either superficial marketing copy or disconnected theoretical exercises.
                We bridge the gap by publishing production-grade blueprints grounded in real-world systems engineering.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {Object.values(CATEGORIES).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/blog/category/${cat.slug}`}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-sky-50/50 hover:border-sky-300 transition-all group"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-sky-700 flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Who Writes the Publication */}
            <section className="space-y-4 pt-8 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-sky-600 font-semibold text-sm">
                <Users className="w-4 h-4" />
                <span>Our Editorial Entity</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Who Writes SaaS Launch Lab
              </h2>
              <p>
                Our articles and engineering guides are written and reviewed by experienced software engineers,
                multi-tenant cloud architects, and product veterans who have built, launched, and scaled
                commercial software systems.
              </p>
              <p>
                Every guide reflects direct experience: navigating database partitioning, profiling database query latency,
                designing token-efficient AI workflows, and negotiating vendor infrastructure pricing.
              </p>
              <div className="pt-2">
                <Link
                  href="/author/editorial-team"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  <span>Meet our editorial staff & technical reviewers</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </section>

            {/* Editorial Standards & Integrity */}
            <section className="space-y-4 pt-8 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-sky-600 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Integrity & Independence</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Strict Editorial Standards
              </h2>
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Zero Paid Placements</h3>
                    <p className="text-sm text-slate-600">
                      We do not accept sponsored posts, paid vendor inclusions, or disguised promotional articles.
                      Every recommendation is editorial.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">No Marketplace Affiliate Retainers</h3>
                    <p className="text-sm text-slate-600">
                      We maintain complete editorial independence from third-party gig platforms, freelance networks,
                      or outsourced developer brokers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Continuous Technical Review</h3>
                    <p className="text-sm text-slate-600">
                      Software frameworks and cloud pricing evolve rapidly. We periodically audit and update
                      published blueprints to keep code samples, security guidance, and cost benchmarks current.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact & Feedback */}
            <section className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <Code2 className="w-8 h-8 text-sky-600 mx-auto" />
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Have Architectural Feedback or a Technical Suggestion?
              </h3>
              <p className="text-sm text-slate-600 max-w-xl mx-auto">
                Our editorial team welcomes questions, errata reports, and suggestions for future technical deep dives.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  <span>Contact Our Editorial Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
