import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StackTag } from "./StackTag";

describe("StackTag", () => {
  it("renders the tag label", () => {
    render(<StackTag>TypeScript</StackTag>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("applies highlighted styles when highlighted=true", () => {
    const { container } = render(<StackTag highlighted>C#</StackTag>);
    const span = container.querySelector("span");
    expect(span?.style.background).toContain("indigo-dim");
  });

  it("applies muted styles when highlighted=false (default)", () => {
    const { container } = render(<StackTag>.NET</StackTag>);
    const span = container.querySelector("span");
    expect(span?.style.background).toContain("white-06");
  });
});
