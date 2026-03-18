import React from "react";
import { render, screen } from "@testing-library/react";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/types";

// Mock next-intl navigation Link
jest.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; locale?: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

const basePost: Post = {
  slug: "my-test-post",
  frontmatter: {
    title: "My Test Post",
    date: "2024-06-15",
    summary: "A short summary of the test post.",
    tags: ["testing", "jest", "react"],
    lang: "en",
  },
};

describe("PostCard", () => {
  it("renders post title", () => {
    render(<PostCard post={basePost} locale="en" readMore="Read more" />);
    expect(screen.getByText("My Test Post")).toBeInTheDocument();
  });

  it("renders post summary", () => {
    render(<PostCard post={basePost} locale="en" readMore="Read more" />);
    expect(screen.getByText("A short summary of the test post.")).toBeInTheDocument();
  });

  it("renders date formatted with locale", () => {
    render(<PostCard post={basePost} locale="en" readMore="Read more" />);
    // The formatted date should appear somewhere in the document
    const timeEl = screen.getByRole("time");
    expect(timeEl).toBeInTheDocument();
    // The text should be a human-readable date (not raw ISO)
    expect(timeEl.textContent).toMatch(/June|Jun/);
  });

  it("renders all tags", () => {
    render(<PostCard post={basePost} locale="en" readMore="Read more" />);
    expect(screen.getByText("testing")).toBeInTheDocument();
    expect(screen.getByText("jest")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
  });

  it("renders readMore prop text", () => {
    render(<PostCard post={basePost} locale="en" readMore="Read more" />);
    expect(screen.getByText(/Read more/)).toBeInTheDocument();
  });

  it("link href is /blog/${slug}", () => {
    render(<PostCard post={basePost} locale="en" readMore="Read more" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/my-test-post");
  });

  it("time element has correct dateTime attribute", () => {
    render(<PostCard post={basePost} locale="en" readMore="Read more" />);
    const timeEl = screen.getByRole("time");
    expect(timeEl).toHaveAttribute("dateTime", "2024-06-15");
  });
});
