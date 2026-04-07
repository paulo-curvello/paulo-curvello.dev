"use client";

import { useLocale } from "next-intl";
import { Globe, Code, Package, ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data/projects";

const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const linkIcons: Record<string, React.ReactNode> = {
  github:      <GithubIcon />,
  viewSite:    <Globe size={12} style={{ flexShrink: 0 }} />,
  viewCode:    <Code size={12} style={{ flexShrink: 0 }} />,
  marketplace: <Package size={12} style={{ flexShrink: 0 }} />,
};

const iconBg: Record<string, string> = {
  violet: "var(--violet)",
  "indigo-gradient": "linear-gradient(135deg,#1e1b4b,var(--violet))",
  "indigo-dark": "#1a1a2e",
  blue: "linear-gradient(135deg,#1e3a5f,#1d4ed8)",
  green: "linear-gradient(135deg,#0d2b1e,#065f46)",
  purple: "linear-gradient(135deg,#2d1b4e,#6d28d9)",
};

const statusStyles: Record<string, React.CSSProperties> = {
  live:       { background: "rgba(52,211,153,.1)",   color: "#34d399", border: "1px solid rgba(52,211,153,.25)" },
  wip:        { background: "rgba(251,191,36,.08)",  color: "#fbbf24", border: "1px solid rgba(251,191,36,.2)" },
  production: { background: "var(--indigo-dim)",     color: "var(--indigo)", border: "1px solid var(--indigo-mid)" },
  "in-use":   { background: "rgba(52,211,153,.08)", color: "#34d399", border: "1px solid rgba(52,211,153,.2)" },
};

interface ProjectCardProps {
  project: Project;
  statusLabels: Record<string, string>;
  linkLabels?: Record<string, string>;
  termProgressLabel?: string;
  privateLabel?: string;
}

const defaultLinkLabels: Record<string, string> = {
  github:      "github",
  marketplace: "marketplace",
  viewSite:    "ver site",
  viewCode:    "código",
};

export function ProjectCard({ project, statusLabels, linkLabels, termProgressLabel, privateLabel }: ProjectCardProps) {
  const locale = useLocale();
  const resolvedLinkLabels = linkLabels ?? defaultLinkLabels;
  const name = locale === "en" ? project.nameEn : project.namePt;
  const tag  = locale === "en" ? project.tagEn  : project.tagPt;
  const desc = locale === "en" ? project.descEn : project.descPt;

  const cardStyle: React.CSSProperties = {
    border: "1px solid var(--white-10)",
    borderRadius: "10px",
    padding: "1.55rem",
    background: "var(--white-06)",
    transition: "border-color 0.18s, transform 0.2s",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <article
      className={project.wide ? "pc-wide" : undefined}
      style={cardStyle}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--indigo-mid)";
        el.style.transform = "translateY(-3px)";
        const bar = el.querySelector<HTMLElement>(".pc-top-bar");
        if (bar) bar.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--white-10)";
        el.style.transform = "translateY(0)";
        const bar = el.querySelector<HTMLElement>(".pc-top-bar");
        if (bar) bar.style.opacity = "0";
      }}
    >
      {/* Top gradient bar */}
      <div
        className="pc-top-bar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg,var(--violet),var(--indigo))",
          opacity: 0,
          transition: "opacity 0.18s",
        }}
      />

      <div>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
              background: iconBg[project.iconVariant] ?? "var(--violet)",
            }}
          >
            {project.icon}
          </div>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              padding: "0.22rem 0.58rem",
              borderRadius: "3px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              ...statusStyles[project.status],
            }}
          >
            {statusLabels[project.status] ?? project.status}
          </span>
        </div>

        <div style={{ fontSize: "19px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.28rem" }}>{name}</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--indigo)", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>{tag}</div>
        <p style={{ fontSize: "13px", color: "var(--white-40)", lineHeight: 1.65, fontWeight: 500, marginBottom: "1rem" }}>{desc}</p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                padding: "0.22rem 0.58rem",
                borderRadius: "3px",
                fontSize: "10px",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.05em",
                background: "var(--indigo-dim)",
                color: "var(--indigo)",
                border: "1px solid var(--indigo-mid)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--white-06)", paddingTop: "0.85rem" }}>
          <div style={{ display: "flex", gap: "0.65rem" }}>
            {project.links.length > 0 ? (
              project.links.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    color: "var(--white-40)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--indigo)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white-40)")}
                >
                  {linkIcons[link.labelKey] ?? <ArrowUpRight size={12} style={{ flexShrink: 0 }} />}
                  {resolvedLinkLabels[link.labelKey] ?? link.labelKey}
                </a>
              ))
            ) : (
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--white-40)", opacity: 0.4, letterSpacing: "0.04em" }}>
                {privateLabel ?? (locale === "en" ? "◈ private" : "◈ privado")}
              </span>
            )}
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "var(--white-40)", opacity: 0.45, letterSpacing: "0.06em" }}>
            {project.year}
          </span>
        </div>
      </div>

      {/* Terminal panel (wide projects only) */}
      {project.wide && project.terminal && (
        <div
          style={{
            background: "#0d0d0f",
            border: "1px solid var(--white-10)",
            borderRadius: "8px",
            padding: "1.1rem 1.2rem",
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            color: "var(--white-40)",
            lineHeight: 1.9,
            flexShrink: 0,
            minWidth: "200px",
          }}
        >
          <div style={{ color: "var(--indigo)", marginBottom: "0.4rem" }}>{termProgressLabel ?? "// progress"}</div>
          {project.terminal.map((item) => {
            const label = locale === "en" ? item.labelEn : item.labelPt;
            return (
              <div key={item.labelEn}>
                <span style={{ color: item.done ? "#34d399" : undefined, opacity: item.done ? 1 : 0.45 }}>
                  {item.done ? "✓" : "⏳"}
                </span>{" "}
                {label}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
