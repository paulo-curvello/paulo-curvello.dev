import { render, screen } from "@testing-library/react";
import { StackTag } from "../StackTag";

describe("StackTag", () => {
  it("renders tag text", () => {
    render(<StackTag>TypeScript</StackTag>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("applies accent/highlighted styles when highlighted prop is true", () => {
    render(<StackTag highlighted>C#</StackTag>);
    const el = screen.getByText("C#");
    expect(el).toHaveStyle({ color: "var(--indigo)" });
    expect(el).toHaveStyle({ background: "var(--indigo-dim)" });
  });

  it("applies default outline styles when not highlighted", () => {
    render(<StackTag>Docker</StackTag>);
    const el = screen.getByText("Docker");
    expect(el).toHaveStyle({ color: "var(--white-70)" });
    expect(el).toHaveStyle({ background: "var(--white-06)" });
  });
});
