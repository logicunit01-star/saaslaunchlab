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
    name: "SaaS Launch Lab Editorial Team",
    role: "Technical Editorial Desk & Systems Architects",
    bio: "The SaaS Launch Lab editorial collective brings together software engineers, cloud architects, and product veterans dedicated to publishing rigorous, hype-free SaaS engineering blueprints and unit-economic breakdowns.",
    avatar: "/images/authors/editorial-team.webp"
  },
  "alex-vance": {
    slug: "alex-vance",
    name: "Alex Vance",
    role: "Lead Systems Architect & Technical Editor",
    bio: "Systems architect and technical writer specializing in multi-tenant cloud platforms, PostgreSQL scaling, distributed backend architecture, and rapid SaaS engineering.",
    avatar: "/images/authors/alex-vance.webp"
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
