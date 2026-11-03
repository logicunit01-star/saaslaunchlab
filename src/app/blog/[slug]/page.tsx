import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import {
  getArticleBySlug,
  getAllSlugs,
  getRelatedArticles
} from "@/lib/articles";
import { getCategorySlugByName } from "@/lib/categories";
import { getDefaultAuthor } from "@/lib/authors";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleAuthorBox } from "@/components/blog/ArticleAuthorBox";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { ArrowLeft } from "lucide-react";

function extractFaqs(markdown: string): { question: string; answer: string }[] {
  const faqMatch = markdown.match(
    /(?:##|###)\s*(?:Frequently Asked Questions|FAQs|FAQ)[\s\S]*?(?=(?:##\s+[^#]|$))/i
  );
  if (!faqMatch) return [];
  const faqSection = faqMatch[0];

  const faqs: { question: string; answer: string }[] = [];
  const qMatches = [
    ...faqSection.matchAll(/\*\*(.+?\?)\*\*\s*([\s\S]*?)(?=(?:\*\*|$))/g)
  ];
  for (const m of qMatches) {
    const q = m[1].replace(/[*#]/g, "").trim();
    const a = m[2].replace(/[*#]/g, "").trim();
    if (q && a && q.length > 5 && a.length > 10) {
      faqs.push({ question: q, answer: a });
    }
  }
  return faqs;
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found"
    };
  }

  const canonicalUrl = `${siteConfig.url}/blog/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      section: article.category,
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.featuredImageAlt || article.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage]
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(
    article.slug,
    article.category,
    3
  );

  const author = getDefaultAuthor();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: `${siteConfig.url}${article.featuredImage}`,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      url: `${siteConfig.url}/author/${author.slug}`,
      sameAs: [author.linkedin, author.github, author.twitter].filter(Boolean)
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/articles/saas-website-architecture.webp`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${article.slug}`
    },
    articleSection: article.category,
    wordCount: article.wordCount
  };

  const categorySlug = getCategorySlugByName(article.category);

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
        name: article.category,
        item: `${siteConfig.url}/blog/category/${categorySlug}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${siteConfig.url}/blog/${article.slug}`
      }
    ]
  };

  const faqs = extractFaqs(article.content);
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer
            }
          }))
        }
      : null;

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top back navigation */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all publications</span>
            </Link>
          </div>

          {/* Main Reading Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Article Content (680-800px reading width) */}
            <article className="lg:col-span-8 max-w-[800px] mx-auto w-full">
              {/* Header */}
              <ArticleHeader article={article} />

              {/* Mobile Table of Contents */}
              <div className="lg:hidden">
                <TableOfContents headings={article.headings} />
              </div>

              {/* Article Content Body */}
              <div className="mt-8 article-prose">
                <ArticleBody content={article.content} />
              </div>

              {/* Author & Editorial Verification Box */}
              <ArticleAuthorBox
                author={author}
                modifiedAt={article.modifiedAt}
                publishedAt={article.publishedAt}
              />

              {/* End of article footer banner */}
              <div className="mt-14 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  Read more from {siteConfig.name}
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Explore practical breakdowns on software architecture, MVP velocity, and
                  production engineering.
                </p>
                <div className="pt-2">
                  <Link
                    href="/blog"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700"
                  >
                    <span>Browse complete article archive</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} />
            </article>

            {/* Desktop Sticky Sidebar for Table of Contents */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <TableOfContents headings={article.headings} />

                {/* Editorial Publication Meta Box */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    About this blueprint
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Part of the {article.category} series on building, architecting, and scaling
                    commercial software products.
                  </p>
                  <div className="text-[11px] text-slate-400 space-y-1 border-t border-slate-100 pt-3">
                    <div>Length: ~{article.wordCount.toLocaleString()} words</div>
                    <div>Est. Reading: {article.readingTime} minutes</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
