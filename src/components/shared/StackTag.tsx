interface StackTagProps {
  children: React.ReactNode;
  highlighted?: boolean;
}

export function StackTag({ children, highlighted = false }: StackTagProps) {
  return (
    <span
      style={{
        padding: "0.32rem 0.8rem",
        borderRadius: "3px",
        fontSize: "12px",
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.04em",
        border: highlighted ? "1px solid var(--indigo-mid)" : "1px solid var(--white-10)",
        color: highlighted ? "var(--indigo)" : "var(--white-70)",
        background: highlighted ? "var(--indigo-dim)" : "var(--white-06)",
        cursor: "default",
        transition: "all 0.15s",
      }}
    >
      {children}
    </span>
  );
}
