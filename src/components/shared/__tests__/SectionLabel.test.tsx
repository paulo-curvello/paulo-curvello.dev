import { render, screen } from "@testing-library/react";
import { SectionLabel } from "../SectionLabel";

describe("SectionLabel", () => {
  it("renders children text", () => {
    render(<SectionLabel>tech stack</SectionLabel>);
    expect(screen.getByText("tech stack")).toBeInTheDocument();
  });

  it("applies DM Mono font family", () => {
    render(<SectionLabel>label</SectionLabel>);
    const el = screen.getByText("label");
    expect(el).toHaveStyle({ fontFamily: "'DM Mono', monospace" });
  });

  it("renders the decorative line element", () => {
    const { container } = render(<SectionLabel>label</SectionLabel>);
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBeGreaterThan(0);
    // The decorative line has height: 1px
    const line = Array.from(spans).find(
      (s) => (s as HTMLElement).style.height === "1px"
    );
    expect(line).toBeTruthy();
  });
});
