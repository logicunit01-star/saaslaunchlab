export interface HeadingItem {
  level: number;
  title: string;
  id: string;
}

export interface Article {
  slug: string;
  title: string;
  originalUrl: string;
  publishedAt: string;
  modifiedAt: string;
  excerpt: string;
  category: string;
  readingTime: number;
  wordCount: number;
  featuredImage: string;
  featuredImageAlt: string;
  headings: HeadingItem[];
  content: string;
}

export type ArticleMeta = Omit<Article, 'content'>;
