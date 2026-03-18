import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types";

type PostCardProps = {
  post: Post;
  locale: string;
  readMore: string;
};

export function PostCard({
  post,
  locale,
  readMore,
}: PostCardProps): React.ReactElement {
  const { slug, frontmatter } = post;

  return (
    <article className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-foreground/20">
      <Link href={`/blog/${slug}`} locale={locale as "pt" | "en"}>
        <time className="text-xs text-muted" dateTime={frontmatter.date}>
          {formatDate(frontmatter.date, locale)}
        </time>
        <h2 className="mt-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
          {frontmatter.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-foreground/70">
          {frontmatter.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-opacity group-hover:opacity-75">
          {readMore} →
        </span>
      </Link>
    </article>
  );
}
