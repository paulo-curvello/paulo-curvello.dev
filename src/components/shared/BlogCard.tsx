"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { BlogPost } from "@/lib/data/blog";

const headerStyles: Record<string, React.CSSProperties> = {
  h1: { background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "var(--indigo)" },
  h2: { background: "linear-gradient(135deg,#0f0c29,#302b63)", color: "#a5b4fc" },
  h3: { background: "linear-gradient(135deg,#09090b,#1e1b4b)", color: "var(--indigo)" },
  h4: { background: "linear-gradient(135deg,#0d1117,#1e2a3a)", color: "#60a5fa" },
  h5: { background: "linear-gradient(135deg,#1a0a2e,#2d1b4e)", color: "#c084fc" },
  h6: { background: "linear-gradient(135deg,#0a1628,#0f2a1e)", color: "#34d399" },
};

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  featuredLabel?: string;
  readTimeUnit?: string;
}

export function BlogCard({ post, featured = false, featuredLabel, readTimeUnit }: BlogCardProps) {
  const locale = useLocale();
  const title  = locale === "en" ? post.titleEn        : post.titlePt;
  const desc   = locale === "en" ? post.descEn         : post.descPt;
  const symbol = locale === "en" ? post.headerSymbolEn : post.headerSymbolPt;
  const readTime = readTimeUnit ? `${post.readMin} ${readTimeUnit}` : `${post.readMin} min`;

  const cardStyle: React.CSSProperties = {
    border: "1px solid var(--white-10)",
    borderRadius: "8px",
    overflow: "hidden",
    background: "var(--white-06)",
    transition: "border-color 0.18s, transform 0.2s",
    display: "block",
    textDecoration: "none",
    color: "inherit",
  };

  const headerStyle: React.CSSProperties = {
    height: featured ? "auto" : "145px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Mono', monospace",
    fontSize: featured ? "66px" : "50px",
    fontWeight: 500,
    letterSpacing: "-0.05em",
    position: "relative",
    overflow: "hidden",
    ...headerStyles[post.headerVariant],
  };

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className={featured ? "blog-feat" : undefined}
      style={cardStyle}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--indigo-mid)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--white-10)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div className={featured ? "feat-head" : undefined} style={headerStyle}>
        <span
          style={{
            position: "absolute",
            top: "0.7rem",
            left: "0.7rem",
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
        {featured && featuredLabel && (
          <span
            style={{
              position: "absolute",
              top: "0.7rem",
              right: "0.7rem",
              background: "var(--violet)",
              color: "#fff",
              fontSize: "9px",
              padding: "0.22rem 0.52rem",
              borderRadius: "3px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {featuredLabel}
          </span>
        )}
        {!featured && (
          <span
            style={{
              position: "absolute",
              bottom: "0.7rem",
              right: "0.7rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.05em",
            }}
          >
            {readTime}
          </span>
        )}
        {symbol}
      </div>
      <div style={{ padding: featured ? "1.65rem" : "1.2rem" }}>
        <h3
          style={{
            fontSize: featured ? "20px" : "15px",
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: featured ? "14px" : "13px",
            color: "var(--white-40)",
            marginTop: "0.5rem",
            lineHeight: 1.65,
            fontWeight: 500,
            ...(featured && { maxWidth: "500px" }),
          }}
        >
          {desc}
        </p>
        <div
          style={{
            marginTop: "0.95rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: "var(--white-40)",
            borderTop: "1px solid var(--white-06)",
            paddingTop: "0.75rem",
          }}
        >
          <span>{post.date}</span>
          <span style={{ color: "var(--indigo)" }}>{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
