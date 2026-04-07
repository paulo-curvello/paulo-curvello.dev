import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blog";

export const dynamic = "force-static";

const BASE = "https://paulocurvello.com";
const locales = ["pt", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog", "/projects"];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("monthly" as const) : ("weekly" as const),
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const blogEntries = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${BASE}/${locale}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...blogEntries];
}
