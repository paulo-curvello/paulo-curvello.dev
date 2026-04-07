"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Mail } from "lucide-react";

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { timeline } from "@/lib/data/timeline";
import { projects } from "@/lib/data/projects";
import { StackTag } from "@/components/shared/StackTag";

const stackTags = [
  { tag: "C#",               highlighted: true },
  { tag: ".NET",             highlighted: true },
  { tag: "SQL",              highlighted: false },
  { tag: "TypeScript",       highlighted: true },
  { tag: "React",            highlighted: true },
  { tag: "Next.js",          highlighted: false },
  { tag: "REST APIs",        highlighted: false },
  { tag: "AWS",              highlighted: false },
  { tag: "Docker",           highlighted: false },
  { tag: "CI/CD",            highlighted: false },
  { tag: "Azure DevOps",     highlighted: false },
  { tag: "Entity Framework", highlighted: false },
];

// Static data — computed once, not on every render
const featuredProjects = projects.filter((p) => p.status === "live").slice(0, 2);

export function HomePageClient() {
  const locale = useLocale();
  const isEn = locale === "en";
  const t    = useTranslations("home");

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Glow */}
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(79,70,229,.13) 0%,transparent 70%)", top: "-100px", right: "-100px", pointerEvents: "none" }} aria-hidden="true" />

        <div className="hero-grid sec-pad" style={{ paddingTop: "5.5rem", paddingBottom: "5rem" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--indigo)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t("eyebrow")}
            </p>
            <h1 style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "0.7rem" }}>
              {t("name")}
            </h1>
            <p style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--white-70)", marginBottom: "0.3rem" }}>
              {t("rolePrimary")} ·{" "}
              <span style={{ color: "var(--indigo)" }}>{t("roleSpecialty")}</span>
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "var(--white-40)", letterSpacing: "0.06em", marginBottom: "1.6rem" }}>
              {t("location")}
            </p>
            <p style={{ fontSize: "15px", color: "var(--white-70)", lineHeight: 1.75, fontWeight: 500, maxWidth: "510px", marginBottom: "1.65rem" }}>
              {t.rich("bio", { strong: (chunks) => <strong style={{ color: "var(--color-text)", fontWeight: 700 }}>{chunks}</strong> })}
            </p>
            <div style={{ display: "flex", gap: "1.25rem", marginBottom: "1.65rem", flexWrap: "wrap" }}>
              {[
                { icon: <GithubIcon />,   label: t("githubLink"),   href: "https://github.com/paulo-curvello" },
                { icon: <LinkedinIcon />, label: t("linkedinLink"), href: "https://www.linkedin.com/in/paulo-curvello/" },
                { icon: <Mail size={15} />, label: t("emailLink"),  href: "mailto:prgbarata@gmail.com" },
              ].map(({ icon, label, href }) => (
                <a key={href} href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "var(--white-40)", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--indigo)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white-40)")}
                >
                  {icon}{label}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <Link href={`/${locale}/blog`}
                style={{ background: "var(--violet)", color: "#fff", padding: "0.7rem 1.6rem", borderRadius: "4px", fontSize: "14px", fontWeight: 700, fontFamily: "'Syne', sans-serif", transition: "all 0.18s", textDecoration: "none", display: "inline-block", letterSpacing: "0.02em" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--indigo)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--violet)")}
              >
                {t("ctaBlog")}
              </Link>
              <Link href={`/${locale}/projects`}
                style={{ background: "transparent", color: "var(--white-70)", padding: "0.7rem 1.6rem", borderRadius: "4px", fontSize: "14px", fontWeight: 500, border: "1px solid var(--white-10)", transition: "all 0.18s", fontFamily: "'Syne', sans-serif", textDecoration: "none", display: "inline-block" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--indigo)"; el.style.color = "var(--indigo)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--white-10)"; el.style.color = "var(--white-70)"; }}
              >
                {t("ctaProjects")}
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-avatar-wrap"
            style={{ borderRadius: "12px", border: "1px solid var(--white-10)", overflow: "hidden", background: "linear-gradient(135deg,#1a1a2e,#16213e,#0d1b2a)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.jpg" alt="Paulo Curvello" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", top: "0.85rem", right: "0.85rem", width: "9px", height: "9px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 0 3px rgba(52,211,153,.2)" }} aria-hidden="true" />
            <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#fff", opacity: 0.85, letterSpacing: "0.07em", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }} aria-hidden="true">@paulocurvellodev</div>
          </div>
        </div>
      </section>

      {/* ── STACK BAR ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", borderTop: "1px solid var(--white-06)", borderBottom: "1px solid var(--white-06)" }}>
        <div className="sec-pad" style={{ paddingTop: "2.75rem", paddingBottom: "2.75rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "var(--white-40)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>{t("stackLabel")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {stackTags.map(({ tag, highlighted }) => (
              <StackTag key={tag} highlighted={highlighted}>{tag}</StackTag>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", borderBottom: "1px solid var(--white-06)" }}>
        <div className="sec-pad" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <h2 style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "2.25rem" }}>{t("timelineTitle")}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {timeline.map((item) => (
              <div key={item.id} style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "1.35rem", alignItems: "start" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--indigo-dim)", border: "1px solid var(--indigo-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "var(--indigo)", flexShrink: 0, marginTop: "0.2rem" }}>
                  {item.num}
                </div>
                <div
                  style={{ background: "var(--white-06)", border: "1px solid var(--white-10)", borderRadius: "8px", padding: "1.3rem 1.5rem", transition: "border-color 0.18s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--indigo-mid)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--white-10)")}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.3rem" }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em" }}>{isEn ? item.roleEn : item.rolePt}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--white-40)", letterSpacing: "0.06em", flexShrink: 0 }}>{item.date}</div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "var(--indigo)", letterSpacing: "0.04em", marginBottom: "0.65rem" }}>{item.company}</div>
                  <div style={{ fontSize: "13px", color: "var(--white-40)", lineHeight: 1.65, fontWeight: 500 }}>{isEn ? item.descEn : item.descPt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", borderBottom: "1px solid var(--white-06)" }}>
        <div className="sec-pad" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>{t("featuredTitle")}</h2>
            <Link href={`/${locale}/projects`}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "var(--indigo)", textDecoration: "none", letterSpacing: "0.04em" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {t("featuredAll")}
            </Link>
          </div>
          <div className="feat-grid">
            {featuredProjects.map((project) => {
              const name = isEn ? project.nameEn : project.namePt;
              const desc = isEn ? project.descEn : project.descPt;
              const href = project.links[0]?.href ?? `/${locale}/projects`;
              const isExternal = href.startsWith("http");
              return (
                <Link key={project.id}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  style={{ background: "var(--white-06)", border: "1px solid var(--white-10)", borderRadius: "10px", padding: "1.5rem", transition: "border-color 0.18s, transform 0.2s", position: "relative", overflow: "hidden", display: "block", textDecoration: "none", color: "inherit" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--indigo-mid)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--white-10)"; el.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                    <div style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.03em" }}>{name}</div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", background: "var(--violet)", color: "#fff", padding: "0.2rem 0.55rem", borderRadius: "3px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t("featuredBadge")}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--white-40)", lineHeight: 1.65, fontWeight: 500, marginBottom: "1rem" }}>{desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.1rem" }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ padding: "0.22rem 0.6rem", borderRadius: "3px", fontSize: "10px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", background: "var(--indigo-dim)", color: "var(--indigo)", border: "1px solid var(--indigo-mid)" }}>{tag}</span>
                    ))}
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "var(--indigo)", letterSpacing: "0.04em" }}>
                    {t("viewProject")}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BLOG CTA ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="sec-pad" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{ background: "var(--white-06)", border: "1px solid var(--white-10)", borderRadius: "12px", padding: "3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(79,70,229,.15) 0%,transparent 70%)", pointerEvents: "none" }} aria-hidden="true" />
            <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.7rem", position: "relative", zIndex: 1 }}>{t("blogCtaTitle")}</h2>
            <p style={{ fontSize: "14px", color: "var(--white-40)", fontWeight: 500, marginBottom: "1.65rem", position: "relative", zIndex: 1, fontFamily: "'DM Mono', monospace", letterSpacing: "0.02em" }}>{t("blogCtaDesc")}</p>
            <Link href={`/${locale}/blog`}
              style={{ background: "var(--violet)", color: "#fff", padding: "0.7rem 1.6rem", borderRadius: "4px", fontSize: "14px", fontWeight: 700, fontFamily: "'Syne', sans-serif", transition: "all 0.18s", textDecoration: "none", display: "inline-block", letterSpacing: "0.02em", position: "relative", zIndex: 1 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--indigo)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--violet)")}
            >
              {t("blogCtaBtn")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
