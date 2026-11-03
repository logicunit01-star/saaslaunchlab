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
  "editorial-team": {
    slug: "editorial-team",
    name: "Editorial Staff & Technical Reviewers",
    role: "Systems Architects & Software Editors",
    bio: "The SaaS Launch Lab editorial collective brings together experienced software engineers, multi-tenant cloud architects, and tech product leaders dedicated to publishing rigorous, hype-free SaaS engineering blueprints.",
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
  return AUTHORS["editorial-team"];
}

export function getAllAuthorSlugs(): string[] {
  return Object.keys(AUTHORS);
}
