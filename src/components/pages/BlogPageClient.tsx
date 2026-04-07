"use client";

import { Suspense, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { blogPosts, blogFilters, blogFiltersEn } from "@/lib/data/blog";
import { BlogCard } from "@/components/shared/BlogCard";
import { SectionLabel } from "@/components/shared/SectionLabel";

// Canonical filter values stored in URL (locale-agnostic, always PT)
const CANONICAL_FILTERS = blogFilters;

// Display labels per locale, index-matched to CANONICAL_FILTERS
const DISPLAY_PT = blogFilters;
const DISPLAY_EN = blogFiltersEn;

function toCanonical(display: string): string {
  const idx = DISPLAY_EN.indexOf(display);
  return idx !== -1 ? CANONICAL_FILTERS[idx] : display;
}

function toDisplay(canonical: string, isEn: boolean): string {
  const idx = CANONICAL_FILTERS.indexOf(canonical);
  if (idx === -1) return canonical;
  return isEn ? DISPLAY_EN[idx] : DISPLAY_PT[idx];
}

function matchPost(post: (typeof blogPosts)[0], canonical: string): boolean {
  if (canonical === "todos") return true;
  return post.tag.toLowerCase() === canonical.toLowerCase();
}

function BlogInner() {
  const locale  = useLocale();
  const t       = useTranslations("blog");
  const isEn    = locale === "en";
  const router  = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawFilter   = searchParams.get("filter") ?? "todos";
  const canonical   = CANONICAL_FILTERS.includes(rawFilter) ? rawFilter : "todos";
  const activeDisplay = toDisplay(canonical, isEn);
  const displayFilters = isEn ? DISPLAY_EN : DISPLAY_PT;

  const setFilter = useCallback((display: string) => {
    const next = toCanonical(display);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "todos") {
      params.delete("filter");
    } else {
      params.set("filter", next);
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const featuredPost = blogPosts.find((p) => p.featured);
  const normalPosts  = blogPosts.filter((p) => !p.featured);
  const filtered     = normalPosts.filter((p) => matchPost(p, canonical));

  return (
    <>
      {/* Header */}
      <div className="page-pad" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel>{t("sectionLabel")}</SectionLabel>
        <h1 style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "0.9rem" }}>
          Blog<span style={{ color: "var(--indigo)" }}>.</span>
        </h1>
        <p style={{ fontSize: "14px", color: "var(--white-40)", fontWeight: 500, fontFamily: "'DM Mono', monospace", letterSpacing: "0.02em", lineHeight: 1.65, maxWidth: "500px" }}>
          {t("subtitle")}
        </p>
      </div>

      {/* Filters */}
      <div
        role="group"
        aria-label={t("filterAriaLabel")}
        className="filters-wrap"
        style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
      >
        {displayFilters.map((f) => {
          const isActive = f === activeDisplay;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={isActive}
              style={{ padding: "0.36rem 0.82rem", borderRadius: "3px", fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", cursor: "pointer", border: isActive ? "1px solid var(--indigo-mid)" : "1px solid var(--white-10)", color: isActive ? "var(--indigo)" : "var(--white-40)", background: isActive ? "var(--indigo-dim)" : "transparent", transition: "all 0.15s" }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="blog-grid" style={{ maxWidth: "1100px", margin: "0 auto", paddingTop: "2rem", paddingBottom: "5rem" }}>
        {featuredPost && matchPost(featuredPost, canonical) && (
          <BlogCard post={featuredPost} readTimeUnit={t("readTimeUnit")} />
        )}
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} readTimeUnit={t("readTimeUnit")} />
        ))}
      </div>
    </>
  );
}

export function BlogPageClient() {
  return (
    <Suspense>
      <BlogInner />
    </Suspense>
  );
}
