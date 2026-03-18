import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  viewProject: string;
  featuredLabel: string;
};

export function ProjectCard({
  project,
  viewProject,
  featuredLabel,
}: ProjectCardProps): React.ReactElement {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-foreground/20">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-foreground">{project.title}</h2>
        {project.featured && (
          <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            {featuredLabel}
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm font-medium text-accent transition-opacity hover:opacity-75"
      >
        {viewProject} →
      </a>
    </article>
  );
}
