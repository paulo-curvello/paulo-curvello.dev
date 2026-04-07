import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomePageClient } from "@/components/pages/HomePageClient";

const meta = {
  pt: {
    title: "Paulo Curvello — Engenheiro de Software Sênior",
    description:
      "Mais de 7 anos construindo aplicações web escaláveis. Especializado em .NET e C#, com experiência em React, Next.js, AWS e arquiteturas cloud modernas.",
  },
  en: {
    title: "Paulo Curvello — Senior Software Engineer",
    description:
      "7+ years building scalable, high-quality web applications. Specialized in .NET and C#, with experience in React, Next.js, AWS and modern cloud architectures.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as "pt" | "en"] ?? meta.pt;
  const url = `https://paulocurvello.com/${locale}`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { pt: "https://paulocurvello.com/pt", en: "https://paulocurvello.com/en" },
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

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePageClient />;
}
