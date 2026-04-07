import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionLabel } from "./SectionLabel";

describe("SectionLabel", () => {
  it("renders children text", () => {
    render(<SectionLabel>artigos & notas</SectionLabel>);
    expect(screen.getByText("artigos & notas")).toBeInTheDocument();
  });

  it("renders a trailing decorative line", () => {
    const { container } = render(<SectionLabel>test</SectionLabel>);
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBeGreaterThan(0);
  });
});
