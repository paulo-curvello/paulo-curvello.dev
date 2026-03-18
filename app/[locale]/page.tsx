import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

const STACK = [
  "C#",
  ".NET",
  "SQL",
  "TypeScript",
  "React",
  "Next.js",
  "REST APIs",
  "AWS",
  "Docker",
  "CI/CD",
  "Azure DevOps",
  "Entity Framework",
];

export default function HomePage(): React.ReactElement {
  const t = useTranslations("home");
  const tProjects = useTranslations("projects");

  const featuredProjects = projects.filter((p) => p.featured);

  const milestones = [
    {
      level: t("exp1_level"),
      company: t("exp1_company"),
      period: t("exp1_period"),
      desc: t("exp1_desc"),
    },
    {
      level: t("exp2_level"),
      company: t("exp2_company"),
      period: t("exp2_period"),
      desc: t("exp2_desc"),
    },
    {
      level: t("exp3_level"),
      company: t("exp3_company"),
      period: t("exp3_period"),
      desc: t("exp3_desc"),
    },
    {
      level: t("exp4_level"),
      company: t("exp4_company"),
      period: t("exp4_period"),
      desc: t("exp4_desc"),
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* ── Hero ── */}
      <section className="flex flex-col-reverse items-center gap-10 pt-8 md:flex-row md:items-start md:pt-16">
        {/* Text */}
        <div className="flex flex-1 flex-col gap-5">
          <div>
            <p className="mb-1 text-sm font-medium uppercase tracking-widest text-accent">
              {t("greeting")}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              Paulo Curvello
            </h1>
            <p className="mt-2 text-xl text-muted">
              {t("role")}{" "}
              <span className="font-semibold text-accent">·</span>{" "}
              {t("specialty")}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={13} />
              <span>{t("location")}</span>
            </div>
          </div>

          <p className="max-w-lg leading-relaxed text-foreground/80">
            {t("bio")}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/paulo-curvello"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/paulo-curvello"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="mailto:prgbarata@gmail.com"
              className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Mail size={16} />
              Email
            </a>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-85"
            >
              {t("cta_blog")}
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-surface"
            >
              {t("cta_projects")}
            </Link>
          </div>
        </div>

        {/* Photo */}
        <div className="shrink-0">
          <Image
            src="/avatar.jpg"
            alt="Paulo Curvello"
            width={240}
            height={240}
            priority
            className="rounded-2xl object-cover ring-2 ring-border"
          />
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="border-t border-border pt-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
          {t("stack_title")}
        </p>
        <div className="flex flex-wrap gap-2">
          {STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ── Career Path ── */}
      <section className="border-t border-border pt-10">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-foreground">
          {t("experience_title")}
        </h2>
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-border" />

          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="relative flex gap-5">
                {/* Timeline dot */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* Card */}
                <article className="flex-1 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-foreground/20">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{m.level}</h3>
                      <p className="text-sm font-medium text-accent">
                        {m.company}
                      </p>
                    </div>
                    <span className="mt-1 text-xs text-muted sm:mt-0">
                      {m.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {m.desc}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="border-t border-border pt-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("featured_projects_title")}
          </h2>
          <Link
            href="/projects"
            className="flex items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-75"
          >
            {t("all_projects_cta")}
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              viewProject={tProjects("view_project")}
              featuredLabel={tProjects("featured")}
            />
          ))}
        </div>
      </section>

      {/* ── Blog CTA ── */}
      <section className="border-t border-border pt-10">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
            {t("blog_section_title")}
          </h2>
          <p className="mb-6 text-muted">{t("blog_section_desc")}</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-85"
          >
            {t("all_posts_cta")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
