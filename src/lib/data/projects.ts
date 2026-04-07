export type ProjectStatus = "live" | "wip" | "production" | "in-use";

export interface TermItem {
  done: boolean;
  labelPt: string;
  labelEn: string;
}

export interface Project {
  id: string;
  icon: string;
  iconVariant: "violet" | "indigo-gradient" | "indigo-dark" | "blue" | "green" | "purple";
  status: ProjectStatus;
  namePt: string;
  nameEn: string;
  tagPt: string;
  tagEn: string;
  descPt: string;
  descEn: string;
  tags: string[];
  links: { labelKey: string; href: string }[];
  year: string;
  wide?: boolean;
  terminal?: TermItem[];
}

export const projects: Project[] = [
  {
    id: "curvello-theme",
    icon: "🎨",
    iconVariant: "violet",
    status: "live",
    namePt: "Curvello Theme",
    nameEn: "Curvello Theme",
    tagPt: "// vs code extension",
    tagEn: "// vs code extension",
    descPt:
      "Extensão para VS Code que configura automaticamente o editor com JetBrains Mono, aninhamento de arquivos e configurações de terminal. Reverte tudo ao ser desativada. Publicada no VS Code Marketplace.",
    descEn:
      "VS Code extension that automatically configures the editor with JetBrains Mono, file nesting, and terminal settings. Reverts cleanly on deactivation. Published to the VS Code Marketplace.",
    tags: ["TypeScript", "VS Code API", "Extension", "Developer Tools"],
    links: [
      { labelKey: "github", href: "https://github.com/paulocurvello" },
      { labelKey: "marketplace", href: "https://marketplace.visualstudio.com/items?itemName=PauloCurvello.curvello-theme" },
    ],
    year: "2024",
  },
  {
    id: "developer-portfolio",
    icon: "✦",
    iconVariant: "indigo-gradient",
    status: "live",
    namePt: "Developer Portfolio",
    nameEn: "Developer Portfolio",
    tagPt: "// portfólio bilíngue PT/EN",
    tagEn: "// bilingual portfolio PT/EN",
    descPt:
      "Portfólio pessoal e blog construído com Next.js 16, TypeScript, Tailwind CSS v4 e MDX. Totalmente bilíngue (PT/EN) com modo escuro e i18n via next-intl.",
    descEn:
      "Personal portfolio and blog built with Next.js 16, TypeScript, Tailwind CSS v4, and MDX. Fully bilingual (PT/EN) with dark mode and i18n via next-intl.",
    tags: ["Next.js 15", "TypeScript", "Tailwind v4", "MDX", "next-intl"],
    links: [
      { labelKey: "viewSite", href: "https://paulocurvello.com" },
      { labelKey: "viewCode", href: "https://github.com/paulocurvello" },
    ],
    year: "2026",
  },
];
