import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Reads a markdown file for a given slug + locale.
 * Lookup order: [slug].[locale].md → [slug].[other-locale].md → [slug].md
 * Returns the rendered HTML string, or null if no file found.
 */
export function getPostMarkdown(slug: string, locale: string): string | null {
  const other = locale === "pt" ? "en" : "pt";
  const candidates = [
    path.join(CONTENT_DIR, `${slug}.${locale}.md`),
    path.join(CONTENT_DIR, `${slug}.${other}.md`),
    path.join(CONTENT_DIR, `${slug}.md`),
  ];

  for (const filepath of candidates) {
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, "utf-8");
      const { content } = matter(raw);
      return marked(content) as string;
    }
  }

  return null;
}
