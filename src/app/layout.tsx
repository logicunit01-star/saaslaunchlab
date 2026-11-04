import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllArticles } from "@/lib/articles";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SaaS Building Guides for Founders | SaaS Launch Lab",
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/favicon.ico",
    apple: "/images/favicon.png"
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/articles/saas-website-architecture.webp",
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/articles/saas-website-architecture.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const articles = await getAllArticles();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    sameAs: [
      "https://x.com/[PLACEHOLDER_TWITTER]",
      "https://github.com/[PLACEHOLDER_GITHUB]",
      "https://linkedin.com/in/[PLACEHOLDER_LINKEDIN]"
    ]
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900">
        <Header articles={articles} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="//js-na2.hs-scripts.com/246175508.js"
        />
      </body>
    </html>
  );
}
