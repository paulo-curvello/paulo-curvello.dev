import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostFrontmatter } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getPostsByLocale(locale: string): Post[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: data as PostFrontmatter,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<{ frontmatter: PostFrontmatter; content: string } | null> {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as PostFrontmatter, content };
}
