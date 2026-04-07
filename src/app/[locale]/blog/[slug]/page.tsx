import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { blogPosts } from "@/lib/data/blog";
import { getPostMarkdown } from "@/lib/markdown";
import { BlogPostClient } from "@/components/pages/BlogPostClient";

export async function generateStaticParams() {
  const locales = ["pt", "en"];
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = locale === "en" ? post.titleEn : post.titlePt;
  const desc  = locale === "en" ? post.descEn  : post.descPt;
  const url   = `https://paulocurvello.com/${locale}/blog/${slug}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        pt: `https://paulocurvello.com/pt/blog/${slug}`,
        en: `https://paulocurvello.com/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: "Paulo Curvello",
      locale: locale === "en" ? "en_US" : "pt_BR",
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const contentHtml = getPostMarkdown(slug, locale);

  return <BlogPostClient post={post} contentHtml={contentHtml} />;
}
