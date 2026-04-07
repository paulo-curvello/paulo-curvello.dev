"use client";

import { useTranslations } from "next-intl";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionLabel } from "@/components/shared/SectionLabel";

export function ProjectsPageClient() {
  const t = useTranslations("projects");

  const statusLabels: Record<string, string> = {
    live:       t("statusLive"),
    wip:        t("statusWip"),
    production: t("statusProd"),
    "in-use":   t("statusUse"),
  };

  const linkLabels: Record<string, string> = {
    github:      t("viewGithub"),
    marketplace: t("marketplace"),
    viewSite:    t("viewSite"),
    viewCode:    t("viewCode"),
  };

  return (
    <>
      <div className="page-pad" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel>{t("sectionLabel")}</SectionLabel>
        <h1 style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "0.9rem" }}>
          {t("title")}<span style={{ color: "var(--indigo)" }}>.</span>
        </h1>
        <p style={{ fontSize: "14px", color: "var(--white-40)", fontWeight: 500, fontFamily: "'DM Mono', monospace", letterSpacing: "0.02em", lineHeight: 1.65, maxWidth: "500px" }}>
          {t("subtitle")}
        </p>
      </div>

      <div className="proj-grid" style={{ maxWidth: "1100px", margin: "0 auto", paddingTop: "2rem", paddingBottom: "5rem" }}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            statusLabels={statusLabels}
            linkLabels={linkLabels}
            termProgressLabel={t("termProgress")}
            privateLabel={t("private")}
          />
        ))}
      </div>
    </>
  );
}
