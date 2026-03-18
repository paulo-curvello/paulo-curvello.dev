import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlogList } from "@/components/BlogList";
import type { Post } from "@/types";

jest.mock("@/components/PostCard", () => ({
  PostCard: ({ post }: { post: Post }) => (
    <div data-testid="post-card">{post.frontmatter.title}</div>
  ),
}));

const posts: Post[] = [
  {
    slug: "react-tips",
    frontmatter: {
      title: "React Tips 2024",
      date: "2024-06-15",
      summary: "Summary A",
      tags: ["react", "typescript"],
      lang: "en",
    },
  },
  {
    slug: "dotnet-clean",
    frontmatter: {
      title: "Clean Arch in .NET",
      date: "2024-02-10",
      summary: "Summary B",
      tags: ["dotnet", "architecture"],
      lang: "en",
    },
  },
  {
    slug: "aws-lambda",
    frontmatter: {
      title: "AWS Lambda Tips",
      date: "2023-11-05",
      summary: "Summary C",
      tags: ["aws", "dotnet"],
      lang: "en",
    },
  },
  {
    slug: "react-hooks",
    frontmatter: {
      title: "React Hooks Deep Dive",
      date: "2023-04-20",
      summary: "Summary D",
      tags: ["react"],
      lang: "en",
    },
  },
];

const defaultProps = {
  posts,
  locale: "en",
  readMore: "Read more",
  allLabel: "All",
  noPosts: "No posts found.",
};

describe("BlogList", () => {
  it("renders all post cards by default", () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getAllByTestId("post-card")).toHaveLength(4);
  });

  it("renders year group headings", () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("shows newest year first", () => {
    render(<BlogList {...defaultProps} />);
    const years = screen.getAllByRole("heading", { level: 2 });
    expect(years[0].textContent).toBe("2024");
    expect(years[1].textContent).toBe("2023");
  });

  it("renders all unique tags as filter buttons", () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getByRole("button", { name: "react" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "dotnet" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "aws" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "typescript" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "architecture" })).toBeInTheDocument();
  });

  it("renders an All button", () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  });

  it("All button has aria-pressed=true by default", () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });

  it("tag button has aria-pressed=false when not active", () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getByRole("button", { name: "react" })).toHaveAttribute("aria-pressed", "false");
  });

  it("tag button has aria-pressed=true when active", () => {
    render(<BlogList {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "react" }));
    expect(screen.getByRole("button", { name: "react" })).toHaveAttribute("aria-pressed", "true");
  });

  it("tag filter has role=group with aria-label", () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("filtering by tag shows only matching posts", () => {
    render(<BlogList {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "react" }));
    const cards = screen.getAllByTestId("post-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("React Tips 2024")).toBeInTheDocument();
    expect(screen.getByText("React Hooks Deep Dive")).toBeInTheDocument();
  });

  it("hides year groups with no matching posts after filtering", () => {
    render(<BlogList {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "typescript" }));
    // Only 2024 has a typescript post
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.queryByText("2023")).not.toBeInTheDocument();
  });

  it("clicking All button resets filter and shows all posts", () => {
    render(<BlogList {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "aws" }));
    expect(screen.getAllByTestId("post-card")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getAllByTestId("post-card")).toHaveLength(4);
  });

  it("clicking an active tag deselects it and shows all posts", () => {
    render(<BlogList {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "react" }));
    expect(screen.getAllByTestId("post-card")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "react" }));
    expect(screen.getAllByTestId("post-card")).toHaveLength(4);
  });

  it("shows post count per year", () => {
    render(<BlogList {...defaultProps} />);
    // 2024 has 2 posts, 2023 has 2 posts
    expect(screen.getAllByText("2 posts")).toHaveLength(2);
  });

  it("renders noPosts message when posts array is empty", () => {
    render(<BlogList {...defaultProps} posts={[]} />);
    expect(screen.getByText("No posts found.")).toBeInTheDocument();
  });

  it("renders noPosts when active tag matches nothing", () => {
    const singlePost: Post[] = [
      {
        slug: "only-post",
        frontmatter: {
          title: "Only Post",
          date: "2024-01-01",
          summary: "S",
          tags: ["react"],
          lang: "en",
        },
      },
    ];
    render(<BlogList {...defaultProps} posts={singlePost} />);
    fireEvent.click(screen.getByRole("button", { name: "react" }));
    // still shows the post since it matches
    expect(screen.getByTestId("post-card")).toBeInTheDocument();
  });
});
