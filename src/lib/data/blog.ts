export interface BlogPost {
  id: string;
  slug: string;
  tag: string;
  headerVariant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headerSymbolPt: string;
  headerSymbolEn: string;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  date: string;
  readMin: number;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "welcome",
    slug: "welcome",
    tag: "pessoal",
    headerVariant: "h1",
    headerSymbolPt: "<bem vindo/>",
    headerSymbolEn: "<welcome/>",
    titlePt: "Bem Vindos",
    titleEn: "Welcome",
    descPt: "Primeiro post do meu blog pessoal.",
    descEn: "First post on my personal blog.",
    date: "18 Mar 2026",
    readMin: 3,
    featured: true,
  },
];

export const blogFilters = ["todos", "pessoal"];
export const blogFiltersEn = ["all", "personal"];
