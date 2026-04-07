"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

interface NavProps {
  locale: string;
  t: {
    home: string;
    blog: string;
    projects: string;
    contact: string;
  };
  langToggle: string;
  themeToggle: string;
}

export function Nav({ locale, t, langToggle, themeToggle }: NavProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const otherLocale = locale === "pt" ? "en" : "pt";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const isActive = (segment: string) => {
    if (segment === "") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(`/${locale}/${segment}`);
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.42rem 1.1rem",
    borderRadius: "4px",
    fontSize: "13px",
    fontWeight: 600,
    color: active ? "#fff" : "var(--white-40)",
    cursor: "pointer",
    border: "none",
    background: active ? "var(--violet)" : "transparent",
    fontFamily: "'Syne', sans-serif",
    transition: "all 0.18s",
    letterSpacing: "0.02em",
    textDecoration: "none",
    display: "inline-block",
  });

  return (
    <>
      {/* ── Desktop nav ── */}
      <nav
        className="nav-inner"
        aria-label="Main navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--nav-bg)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--white-10)",
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "var(--color-text)" }}>
            &lt;paulo <span style={{ color: "var(--indigo)" }}>/&gt;</span>
          </span>
        </Link>

        {/* Tab group — hidden on mobile */}
        <div
          className="nav-tabs-group"
          style={{ alignItems: "center", gap: "0.15rem", background: "var(--white-06)", border: "1px solid var(--white-10)", borderRadius: "6px", padding: "0.2rem" }}
        >
          <Link href={`/${locale}`}           style={tabStyle(isActive(""))}>{t.home}</Link>
          <Link href={`/${locale}/blog`}      style={tabStyle(isActive("blog"))}>{t.blog}</Link>
          <Link href={`/${locale}/projects`}  style={tabStyle(isActive("projects"))}>{t.projects}</Link>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={themeToggle}
            style={{ background: "transparent", border: "1px solid var(--white-10)", borderRadius: "4px", padding: "0.42rem 0.6rem", cursor: "pointer", color: "var(--white-40)", display: "flex", alignItems: "center", transition: "all 0.18s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--indigo-mid)"; (e.currentTarget as HTMLElement).style.color = "var(--indigo)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--white-10)"; (e.currentTarget as HTMLElement).style.color = "var(--white-40)"; }}
          >
            {mounted ? (theme === "dark" ? <Sun size={14} /> : <Moon size={14} />) : <span style={{ width: 14, height: 14, display: "inline-block" }} />}
          </button>

          {/* Language toggle */}
          <Link
            href={otherLocalePath}
            style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", background: "var(--indigo-dim)", border: "1px solid var(--indigo-mid)", color: "var(--indigo)", padding: "0.42rem 0.75rem", borderRadius: "4px", letterSpacing: "0.04em", transition: "all 0.18s", textDecoration: "none" }}
          >
            {langToggle}
          </Link>

          {/* Contact CTA — hidden on mobile */}
          <a
            href="https://www.linkedin.com/in/paulo-curvello/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-contact-cta"
            style={{ fontSize: "12px", fontFamily: "'DM Mono', monospace", background: "var(--indigo-dim)", border: "1px solid var(--indigo-mid)", color: "var(--indigo)", padding: "0.42rem 0.95rem", borderRadius: "4px", letterSpacing: "0.04em", transition: "all 0.18s", textDecoration: "none" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--violet)"; el.style.borderColor = "var(--violet)"; el.style.color = "#fff"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--indigo-dim)"; el.style.borderColor = "var(--indigo-mid)"; el.style.color = "var(--indigo)"; }}
          >
            {t.contact}
          </a>
        </div>
      </nav>

      {/* ── Mobile bottom nav ── */}
      <nav className="mob-nav" aria-label="Mobile navigation">
        <Link href={`/${locale}`}          className={`mob-nav-tab${isActive("") ? " active" : ""}`}>{t.home}</Link>
        <Link href={`/${locale}/blog`}     className={`mob-nav-tab${isActive("blog") ? " active" : ""}`}>{t.blog}</Link>
        <Link href={`/${locale}/projects`} className={`mob-nav-tab${isActive("projects") ? " active" : ""}`}>{t.projects}</Link>
      </nav>
    </>
  );
}
