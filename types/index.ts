export type Project = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  featured: boolean;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  lang: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
};
