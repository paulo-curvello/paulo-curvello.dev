"use client";

import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/types";

type BlogListProps = {
  posts: Post[];
  locale: string;
  readMore: string;
  allLabel: string;
  noPosts: string;
};

export function BlogList({
  posts,
  locale,
  readMore,
  allLabel,
  noPosts,
}: BlogListProps): React.ReactElement {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.frontmatter.tags))
  ).sort();

  const filtered = activeTag
    ? posts.filter((p) => p.frontmatter.tags.includes(activeTag))
    : posts;

  const grouped = filtered.reduce<Record<string, Post[]>>((acc, post) => {
    const year = new Date(post.frontmatter.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  const btnClass = (active: boolean): string =>
    active
      ? "rounded-full border border-accent bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-colors"
      : "rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground";

  return (
    <div>
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div
          role="group"
          aria-label="Filter posts by tag"
          className="mb-10 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={btnClass(activeTag === null)}
          >
            {allLabel}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              aria-pressed={activeTag === tag}
              className={btnClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Year groups */}
      {filtered.length === 0 ? (
        <p className="text-muted">{noPosts}</p>
      ) : (
        <div className="space-y-14">
          {years.map((year) => (
            <div key={year}>
              <div className="mb-5 flex items-center gap-3 border-b border-border pb-3">
                <h2 className="text-xl font-bold text-foreground">{year}</h2>
                <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted">
                  {grouped[year].length} posts
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {grouped[year].map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    readMore={readMore}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
