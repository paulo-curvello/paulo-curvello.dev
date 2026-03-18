import { getTranslations } from "next-intl/server";
import { getPostsByLocale } from "@/lib/mdx";
import { BlogList } from "@/components/BlogList";

type Params = { locale: string };

export default async function BlogPage({
  params,
}: {
  params: Promise<Params>;
}): Promise<React.ReactElement> {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const posts = getPostsByLocale(locale);

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 text-muted">{t("subtitle")}</p>
      </div>
      <BlogList
        posts={posts}
        locale={locale}
        readMore={t("read_more")}
        allLabel={t("filter_all")}
        noPosts={t("no_posts")}
      />
    </section>
  );
}
