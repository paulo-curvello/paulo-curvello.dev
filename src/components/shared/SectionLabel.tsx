interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "11px",
        color: "var(--indigo)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        marginBottom: "2.25rem",
      }}
    >
      {children}
      <span
        style={{
          height: "1px",
          background: "var(--white-10)",
          width: "60px",
          display: "inline-block",
        }}
      />
    </p>
  );
}
