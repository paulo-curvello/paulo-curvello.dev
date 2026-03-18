import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Developer Portfolio",
    description:
      "Personal portfolio and blog built with Next.js 16, TypeScript, Tailwind CSS v4, and MDX. Fully bilingual (PT/EN) with dark mode.",
    url: "https://github.com/paulo-curvello",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    featured: true,
  },
  {
    title: "Curvello Theme",
    description:
      "VS Code extension that automatically configures the editor with JetBrains Mono, file nesting, and terminal settings. Reverts cleanly on deactivation.",
    url: "https://github.com/paulo-curvello/curvello-theme",
    tags: ["TypeScript", "VS Code", "Extension"],
    featured: true,
  },
  {
    title: "Blog",
    description:
      "Personal blog built with Astro. Optimized for performance with a 100/100 Lighthouse score, SEO, sitemap, RSS feed, and MDX support.",
    url: "https://github.com/paulo-curvello/blog",
    tags: ["Astro", "MDX", "TypeScript"],
    featured: true,
  },
];
