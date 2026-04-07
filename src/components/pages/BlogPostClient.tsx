"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { BlogPost } from "@/lib/data/blog";

const headerStyles: Record<string, React.CSSProperties> = {
  h1: { background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "var(--indigo)" },
  h2: { background: "linear-gradient(135deg,#0f0c29,#302b63)", color: "#a5b4fc" },
  h3: { background: "linear-gradient(135deg,#09090b,#1e1b4b)", color: "var(--indigo)" },
  h4: { background: "linear-gradient(135deg,#0d1117,#1e2a3a)", color: "#60a5fa" },
  h5: { background: "linear-gradient(135deg,#1a0a2e,#2d1b4e)", color: "#c084fc" },
  h6: { background: "linear-gradient(135deg,#0a1628,#0f2a1e)", color: "#34d399" },
};

interface BlogPostClientProps {
  post: BlogPost;
  contentHtml: string | null;
}

export function BlogPostClient({ post, contentHtml }: BlogPostClientProps) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const isEn = locale === "en";
  const title = isEn ? post.titleEn : post.titlePt;
  const desc  = isEn ? post.descEn  : post.descPt;

  return (
    <article style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 2.5rem 6rem" }}>

      {/* Back link */}
      <Link
        href={`/${locale}/blog`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "'DM Mono', monospace",
          fontSize: "12px",
          color: "var(--white-40)",
          textDecoration: "none",
          letterSpacing: "0.04em",
          marginBottom: "2.5rem",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--indigo)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white-40)")}
      >
        <ArrowLeft size={13} />
        {t("backToList")}
      </Link>

      {/* Header card */}
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid var(--white-10)",
          marginBottom: "2.5rem",
        }}
      >
        {/* Symbol banner */}
        <div
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Mono', monospace",
            fontSize: "80px",
            fontWeight: 500,
            letterSpacing: "-0.05em",
            position: "relative",
            ...headerStyles[post.headerVariant],
          }}
        >
          {/* Tag chip */}
          <span
            style={{
              position: "absolute",
              top: "0.8rem",
              left: "0.8rem",
              background: "var(--indigo-dim)",
              border: "1px solid var(--indigo-mid)",
              color: "var(--indigo)",
              fontSize: "9px",
              padding: "0.22rem 0.52rem",
              borderRadius: "3px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {post.tag}
          </span>
          {isEn ? post.headerSymbolEn : post.headerSymbolPt}
        </div>

        {/* Meta row */}
        <div
          style={{
            padding: "1.25rem 1.65rem",
            borderTop: "1px solid var(--white-10)",
            background: "var(--white-06)",
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            color: "var(--white-40)",
            flexWrap: "wrap",
          }}
        >
          <span>{post.date}</span>
          <span style={{ color: "var(--white-10)" }}>·</span>
          <span style={{ color: "var(--indigo)" }}>
            {post.readMin} {t("readTimeUnit")}
          </span>
        </div>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "clamp(1.6rem,4vw,2.4rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          marginBottom: "1.25rem",
        }}
      >
        {title}
      </h1>

      {/* Intro / description */}
      <p
        style={{
          fontSize: "15px",
          color: "var(--white-70)",
          lineHeight: 1.75,
          fontWeight: 500,
          marginBottom: "2.5rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--white-10)",
        }}
      >
        {desc}
      </p>

      {/* Article body */}
      {contentHtml ? (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      ) : (
        <div
          style={{
            border: "1px solid var(--indigo-mid)",
            borderRadius: "8px",
            background: "var(--indigo-dim)",
            padding: "1.5rem 1.75rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "18px",
              color: "var(--indigo)",
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            ✍
          </span>
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "12px",
                color: "var(--indigo)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              {t("articleInProgress")}
            </p>
            <p style={{ fontSize: "13px", color: "var(--white-40)", lineHeight: 1.65, fontWeight: 500 }}>
              {t("articleInProgressBody")}
            </p>
            <Link
              href="https://github.com/paulo-curvello"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                marginTop: "0.85rem",
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                color: "var(--indigo)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              ◈ @paulo-curvello
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
