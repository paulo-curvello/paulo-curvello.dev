import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--indigo)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>
          404
        </p>
        <h1 style={{ fontSize: "clamp(2rem,6vw,4rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.75rem" }}>
          Page not found
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "var(--white-40)", marginBottom: "2rem" }}>
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link href="/pt" style={{ background: "var(--violet)", color: "#fff", padding: "0.7rem 1.6rem", borderRadius: "4px", fontSize: "14px", fontWeight: 700, textDecoration: "none", letterSpacing: "0.02em", display: "inline-block" }}>
          Go home
        </Link>
      </div>
    </div>
  );
}
