import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BlogPageClient } from "@/components/pages/BlogPageClient";

const meta = {
  pt: {
    title: "Blog — Paulo Curvello",
    description:
      "Artigos sobre .NET, Clean Architecture, TDD, Docker e desenvolvimento de software. Conteúdo técnico direto ao ponto.",
  },
  en: {
    title: "Blog — Paulo Curvello",
    description:
      "Articles on .NET, Clean Architecture, TDD, Docker and software development. Technical content straight to the point.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as "pt" | "en"] ?? meta.pt;
  const url = `https://paulocurvello.com/${locale}/blog`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        pt: "https://paulocurvello.com/pt/blog",
        en: "https://paulocurvello.com/en/blog",
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: "Paulo Curvello",
      locale: locale === "en" ? "en_US" : "pt_BR",
      type: "website",
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogPageClient />;
}
