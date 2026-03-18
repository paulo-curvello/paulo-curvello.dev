import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Curvello Theme",
    description:
      "VS Code extension that automatically configures the editor with JetBrains Mono, file nesting, and terminal settings. Reverts cleanly on deactivation.",
    url: "https://github.com/paulo-curvello/curvello-theme",
    tags: ["TypeScript", "VS Code", "Extension"],
    featured: true,
  },
  {
    title: "Developer Portfolio",
    description:
      "Personal portfolio and blog built with Next.js 16, TypeScript, Tailwind CSS v4, and MDX. Fully bilingual (PT/EN) with dark mode.",
    url: "https://github.com/paulo-curvello/paulo-curvello.dev",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    featured: true,
  },
];
