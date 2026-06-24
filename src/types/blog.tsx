export type BlogSection = {
  heading?: string;
  body: string;
};

export type Blog = {
  id: number;
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  img: string;
  content: BlogSection[];
  relatedIds?: number[];
};
