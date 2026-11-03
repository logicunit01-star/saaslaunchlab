import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { FileText, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | SaaS Launch Lab",
  description:
    "Review the terms of service governing access, content usage, and technical guides provided by SaaS Launch Lab.",
  alternates: {
    canonical: `${siteConfig.url}/terms`
  },
  openGraph: {
    title: "Terms of Service | SaaS Launch Lab",
    description:
      "Review the terms of service governing access, content usage, and technical guides provided by SaaS Launch Lab.",
    url: `${siteConfig.url}/terms`,
    type: "website"
  }
};

export default function TermsPage() {
  const lastUpdated = "November 2026";

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
        name: "Terms of Service",
        item: `${siteConfig.url}/terms`
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
          {/* Header */}
          <div className="pb-8 border-b border-slate-200">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-sm mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Terms & Conditions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Last updated: {lastUpdated} &bull; Effective immediately
            </p>
          </div>

          {/* Terms Content */}
          <div className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, reading, or navigating {siteConfig.name} ({siteConfig.url}), you agree to comply with and be bound
                by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                2. Intellectual Property & Content License
              </h2>
              <p>
                All editorial articles, blueprints, code snippets, architectural diagrams, and text published on {siteConfig.name}
                are the intellectual property of {siteConfig.name} unless otherwise noted.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600">
                <li>
                  <strong className="text-slate-800">Fair Use & Quotation:</strong> You may quote brief excerpts (up to 150 words)
                  provided you clearly attribute {siteConfig.name} with an active, clickable backlink to the original source article.
                </li>
                <li>
                  <strong className="text-slate-800">Code Snippets:</strong> Code snippets and architecture schemas provided within
                  articles are available for practical implementation in your own software projects under standard MIT license terms.
                </li>
                <li>
                  <strong className="text-slate-800">No Wholesale Scraping:</strong> Full reproduction, scraping, automated syndication,
                  or re-hosting of entire articles without prior written permission is strictly prohibited.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                3. Informational & Technical Disclaimer
              </h2>
              <p>
                The articles, architectural guides, and financial cost models presented on {siteConfig.name} are prepared for educational
                and informational purposes only. While our technical team strives for complete accuracy, software architectures and cloud pricing
                depend heavily on specific operational constraints.
              </p>
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start space-x-3 text-amber-900 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Important Technical Note:</strong> Always validate database schemas, security configurations, and cloud cost
                  projections against your own infrastructure environment before rolling systems into production.
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                4. Third-Party Links & Tools
              </h2>
              <p>
                Our articles frequently link to external developer documentation, open-source repositories, and developer tools.
                We do not endorse, control, or accept responsibility for the availability, content, or practices of third-party platforms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                5. Limitation of Liability
              </h2>
              <p>
                Under no circumstances shall {siteConfig.name}, its authors, editors, or contributors be held liable for any direct,
                indirect, incidental, or consequential damages resulting from the use or inability to use the information and code samples
                provided on this website.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                6. Contact Information
              </h2>
              <p>
                For questions regarding these Terms of Service or editorial permissions, please reach out via our{" "}
                <Link href="/contact" className="text-sky-600 underline">
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
