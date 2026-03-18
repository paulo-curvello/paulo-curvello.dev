import { getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default async function ProjectsPage(): Promise<React.ReactElement> {
  const t = await getTranslations("projects");

  const sorted = [...projects].sort((a, b) =>
    a.featured === b.featured ? 0 : a.featured ? -1 : 1
  );

  return (
    <section>
      <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
      <p className="mt-2 text-foreground/70">{t("subtitle")}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sorted.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            viewProject={t("view_project")}
            featuredLabel={t("featured")}
          />
        ))}
      </div>
    </section>
  );
}
