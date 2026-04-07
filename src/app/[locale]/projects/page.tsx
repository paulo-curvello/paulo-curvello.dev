import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProjectsPageClient } from "@/components/pages/ProjectsPageClient";

const meta = {
  pt: {
    title: "Projetos — Paulo Curvello",
    description:
      "Projetos open source e trabalho profissional em .NET, React, AWS e mais. Do VS Code ao cloud, passando por Clean Architecture e TDD.",
  },
  en: {
    title: "Projects — Paulo Curvello",
    description:
      "Open source projects and professional work in .NET, React, AWS and more. From VS Code to cloud, through Clean Architecture and TDD.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as "pt" | "en"] ?? meta.pt;
  const url = `https://paulocurvello.com/${locale}/projects`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        pt: "https://paulocurvello.com/pt/projects",
        en: "https://paulocurvello.com/en/projects",
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

export default async function ProjectsPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsPageClient />;
}
