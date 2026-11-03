import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getAllArticles } from "@/lib/articles";
import {
  getAuthorBySlug,
  getAllAuthorSlugs
} from "@/lib/authors";
import { ArticleCard } from "@/components/magazine/ArticleCard";
import {
  ChevronRight,
  UserCheck,
  Globe,
  Github,
  Twitter,
  Linkedin,
  ArrowLeft
} from "lucide-react";

export const revalidate = 3600;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return { title: "Author Not Found" };
  }

  const canonicalUrl = `${siteConfig.url}/author/${slug}`;

  return {
    title: `${author.name} | SaaS Launch Lab`,
    description: `Read technical blueprints, system architecture teardowns, and SaaS scaling guides authored and reviewed by ${author.name}.`,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${author.name} | SaaS Launch Lab`,
      description: `Read technical blueprints, system architecture teardowns, and SaaS scaling guides authored and reviewed by ${author.name}.`,
      url: canonicalUrl,
      type: "profile"
    }
  };
}

export default async function AuthorProfilePage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const articles = await getAllArticles();

  const authorJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      sameAs: [
        author.linkedin,
        author.github,
        author.twitter
      ].filter(Boolean)
    }
  };

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
        name: "Authors",
        item: `${siteConfig.url}/about`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: author.name,
        item: `${siteConfig.url}/author/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/about" className="hover:text-sky-600 transition-colors">
              About
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-semibold">{author.name}</span>
          </nav>

          {/* Author Profile Header Box */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-sky-50/30 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 text-sky-400 flex items-center justify-center font-bold text-2xl shadow-md border border-slate-700 shrink-0">
                <UserCheck className="w-10 h-10" />
              </div>

              <div className="space-y-2 flex-1">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-100/60 px-2.5 py-0.5 rounded-sm">
                  <span>{author.role}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-950 tracking-tight">
                  {author.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                  {author.bio}
                </p>

                {/* Verified Professional Profile Links */}
                <div className="flex items-center gap-3 pt-3 flex-wrap">
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                      <span>LinkedIn Profile [PLACEHOLDER]</span>
                    </a>
                  )}
                  {author.github && (
                    <a
                      href={author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-700" />
                      <span>GitHub [PLACEHOLDER]</span>
                    </a>
                  )}
                  {author.twitter && (
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                    >
                      <Twitter className="w-3.5 h-3.5 text-sky-500" />
                      <span>X / Twitter [PLACEHOLDER]</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Published Articles Section */}
          <div className="mt-14">
            <div className="pb-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-serif text-slate-950">
                  Published & Reviewed Blueprints
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Showing all {articles.length} architectural guides, MVP frameworks, and teardowns.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, idx) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  priority={idx < 3}
                />
              ))}
            </div>
          </div>

          {/* Back Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors py-2 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse All Articles</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
