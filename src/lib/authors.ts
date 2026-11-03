export interface AuthorInfo {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

export const AUTHORS: Record<string, AuthorInfo> = {
  "alex-vance": {
    slug: "alex-vance",
    name: "Alex Vance [PLACEHOLDER]",
    role: "Lead Systems Architect & Technical Editor",
    bio: "Systems architect and technical writer specializing in multi-tenant cloud platforms, PostgreSQL scaling, and rapid SaaS engineering. [PLACEHOLDER_BIO: Verified engineering experience and background to be updated].",
    avatar: "/images/authors/alex-vance.webp",
    twitter: "https://x.com/[PLACEHOLDER_TWITTER]",
    github: "https://github.com/[PLACEHOLDER_GITHUB]",
    linkedin: "https://linkedin.com/in/[PLACEHOLDER_LINKEDIN]"
  },
  "editorial-team": {
    slug: "editorial-team",
    name: "Editorial Staff & Technical Reviewers",
    role: "Systems Architects & Software Editors",
    bio: "The SaaS Launch Lab editorial collective brings together software engineers, cloud architects, and product veterans dedicated to publishing rigorous, hype-free SaaS engineering blueprints.",
    avatar: "/images/authors/editorial-team.webp",
    twitter: "https://x.com/[PLACEHOLDER_TWITTER]",
    github: "https://github.com/[PLACEHOLDER_GITHUB]",
    linkedin: "https://linkedin.com/in/[PLACEHOLDER_LINKEDIN]"
  }
};

export function getAuthorBySlug(slug: string): AuthorInfo | null {
  return AUTHORS[slug] || null;
}

export function getDefaultAuthor(): AuthorInfo {
  return AUTHORS["alex-vance"];
}

export function getAllAuthorSlugs(): string[] {
  return Object.keys(AUTHORS);
}
