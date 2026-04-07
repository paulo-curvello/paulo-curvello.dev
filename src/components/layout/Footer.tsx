"use client";

interface FooterProps {
  t: {
    role: string;
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
  };
}

export function Footer({ t }: FooterProps) {
  const linkStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    color: "var(--white-40)",
    textDecoration: "none",
    letterSpacing: "0.05em",
    transition: "color 0.15s",
  };

  return (
    <footer
      className="footer-inner"
      style={{
        borderTop: "1px solid var(--white-06)",
        gap: "1rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "16px",
            letterSpacing: "-0.04em",
          }}
        >
          paulo<span style={{ color: "var(--indigo)" }}>.</span>dev
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: "var(--white-40)",
            letterSpacing: "0.07em",
            marginTop: "0.2rem",
          }}
        >
          {t.role}
        </div>
      </div>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        <a href="https://github.com/paulo-curvello" target="_blank" rel="noopener noreferrer" style={linkStyle}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--indigo)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white-40)")}
        >
          {t.github}
        </a>
        <a href="https://www.linkedin.com/in/paulo-curvello/" target="_blank" rel="noopener noreferrer" style={linkStyle}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--indigo)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white-40)")}
        >
          {t.linkedin}
        </a>
        <a href="https://www.instagram.com/paulocurvellodev" target="_blank" rel="noopener noreferrer" style={linkStyle}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--indigo)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white-40)")}
        >
          {t.instagram}
        </a>
        <a href="mailto:prgbarata@gmail.com" style={linkStyle}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--indigo)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white-40)")}
        >
          {t.email}
        </a>
      </div>
    </footer>
  );
}
