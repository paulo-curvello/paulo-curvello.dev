import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";

type Params = { locale: string; slug: string };

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}): Promise<React.ReactElement> {
  const { locale, slug } = await params;
  const t = await getTranslations("common");
  const post = await getPostBySlug(locale, slug);

  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <article>
      <Link
        href="/blog"
        locale={locale as "pt" | "en"}
        className="text-sm text-foreground/60 hover:text-foreground"
      >
        ← {t("back")}
      </Link>
      <header className="mt-6">
        <h1 className="text-3xl font-bold text-foreground">
          {frontmatter.title}
        </h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-foreground/50">
          <time dateTime={frontmatter.date}>
            {t("published_on")} {formatDate(frontmatter.date, locale)}
          </time>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-foreground/5 px-2 py-0.5 text-xs text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
