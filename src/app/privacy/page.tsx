import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Shield, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SaaS Launch Lab",
  description:
    "Review the privacy policy for SaaS Launch Lab, including data practices, contact form submissions, and analytics telemetry.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`
  },
  openGraph: {
    title: "Privacy Policy | SaaS Launch Lab",
    description:
      "Review the privacy policy for SaaS Launch Lab, including data practices, contact form submissions, and analytics telemetry.",
    url: `${siteConfig.url}/privacy`,
    type: "website"
  }
};

export default function PrivacyPage() {
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
        name: "Privacy Policy",
        item: `${siteConfig.url}/privacy`
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
              <Shield className="w-3.5 h-3.5" />
              <span>Legal Documentation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Last updated: {lastUpdated} &bull; Effective immediately
            </p>
          </div>

          {/* Privacy Content */}
          <div className="mt-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                1. Overview & Commitment
              </h2>
              <p>
                At {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect your personal
                privacy and are committed to protecting it through transparent data handling practices.
                This Privacy Policy outlines how we collect, store, and process information when you visit
                our publication at {siteConfig.url}.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                2. Information We Collect
              </h2>
              <p>
                We minimize data collection to only what is strictly necessary to deliver high-quality editorial content:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>
                  <strong className="text-slate-800">Inquiry Data:</strong> When you submit a message via our contact form at{" "}
                  <Link href="/contact" className="text-sky-600 underline">
                    /contact
                  </Link>
                  , we collect your name, email address, and message content to respond to your inquiry.
                </li>
                <li>
                  <strong className="text-slate-800">Telemetry & Analytics:</strong> We may collect anonymized, non-personally
                  identifiable usage telemetry (such as aggregate page views, browser user agents, and referral sources) to evaluate
                  article readership and improve site performance.
                </li>
                <li>
                  <strong className="text-slate-800">Server Logs:</strong> Standard web server access logs (including truncated IP
                  addresses, timestamps, and request URIs) are retained temporarily for security auditing and DDoS mitigation.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                3. How We Use Collected Information
              </h2>
              <p>
                Information gathered is utilized strictly for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600">
                <li>Responding directly to editorial correspondence and reader questions.</li>
                <li>Maintaining the technical integrity, security, and uptime of our publication.</li>
                <li>Analyzing content performance to guide future technical guides and research topics.</li>
              </ul>
              <p>
                We do not sell, rent, monetize, or trade your personal data or contact details to third-party data brokers,
                advertisers, or marketing networks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                4. Cookies and Web Storage
              </h2>
              <p>
                {siteConfig.name} does not employ persistent tracking cookies for cross-site behavioral targeting or surveillance advertising.
                Any local storage utilized is restricted to user interface preferences (such as search modal state or reading session controls).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                5. Data Retention & Security
              </h2>
              <p>
                Inquiries sent through our contact form are stored in secure, encrypted mailboxes and retained only as long as
                necessary to service the conversation. We implement industry-standard TLS encryption for all transit to and from our site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-serif text-slate-900">
                6. Your Rights
              </h2>
              <p>
                Depending on your jurisdiction (including GDPR, CCPA, and relevant regulations), you may have the right to request access to,
                correction of, or deletion of any personal communications held by {siteConfig.name}. To exercise these rights, please reach out
                directly through our{" "}
                <Link href="/contact" className="text-sky-600 underline">
                  contact desk
                </Link>
                .
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-sky-600">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Editorial Inquiries</span>
              </div>
              <p className="text-sm text-slate-600">
                Questions regarding our privacy policies or data handling should be directed to our editorial team via our{" "}
                <Link href="/contact" className="text-sky-600 underline">
                  contact form
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
