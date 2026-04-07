import { render, screen, fireEvent } from "@testing-library/react";
import { BlogCard } from "../BlogCard";
import type { BlogPost } from "@/lib/data/blog";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "pt",
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const mockPost: BlogPost = {
  id: "test-post",
  slug: "test-post",
  tag: ".NET",
  headerVariant: "h1",
  headerSymbolPt: "<CA/>",
  headerSymbolEn: "<CA/>",
  titlePt: "Título em Português",
  titleEn: "Title in English",
  descPt: "Descrição em português",
  descEn: "Description in English",
  date: "12 Jan 2025",
  readMin: 15,
};

describe("BlogCard", () => {
  it("renders title in the active locale", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("Título em Português")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("Descrição em português")).toBeInTheDocument();
  });

  it("renders date", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("12 Jan 2025")).toBeInTheDocument();
  });

  it("renders readTime using readTimeUnit", () => {
    render(<BlogCard post={mockPost} readTimeUnit="min read" />);
    const matches = screen.getAllByText("15 min read");
    expect(matches.length).toBeGreaterThan(0);
  });

  it("renders default readTime without readTimeUnit", () => {
    render(<BlogCard post={mockPost} />);
    const matches = screen.getAllByText("15 min");
    expect(matches.length).toBeGreaterThan(0);
  });

  it("renders tag chip", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(".NET")).toBeInTheDocument();
  });

  it("renders header symbol", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("<CA/>")).toBeInTheDocument();
  });

  it("applies featured layout class when featured prop is true", () => {
    const { container } = render(
      <BlogCard post={mockPost} featured featuredLabel="Destaque" />
    );
    const card = container.querySelector("a");
    expect(card).toHaveClass("blog-feat");
  });

  it("does not apply featured class when not featured", () => {
    const { container } = render(<BlogCard post={mockPost} />);
    const card = container.querySelector("a");
    expect(card).not.toHaveClass("blog-feat");
  });

  it("renders featuredLabel when featured", () => {
    render(<BlogCard post={mockPost} featured featuredLabel="Destaque" />);
    expect(screen.getByText("Destaque")).toBeInTheDocument();
  });

  it("does not render featuredLabel when featured but no label provided", () => {
    render(<BlogCard post={mockPost} featured />);
    // No featuredLabel provided — the badge should not appear
    expect(screen.queryByText("Destaque")).not.toBeInTheDocument();
  });

  it("hover events on card change style", () => {
    const { container } = render(<BlogCard post={mockPost} />);
    const card = container.querySelector("a")!;
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
  });
});
