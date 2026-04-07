import { render, screen, fireEvent } from "@testing-library/react";
import { BlogPageClient } from "../BlogPageClient";
import { vi } from "vitest";

const mockReplace = vi.fn();
let mockSearchParams = new URLSearchParams();
let mockLocale = "pt";

vi.mock("next/navigation", () => ({
  usePathname: () => "/pt/blog",
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => mockSearchParams,
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => mockLocale,
}));

// Mock the BlogCard to make testing easier without rendering full post details
vi.mock("@/components/shared/BlogCard", () => ({
  BlogCard: ({ post }: { post: { id: string | number; titlePt: string } }) => <div data-testid={`post-${post.id}`}>{post.titlePt}</div>,
}));

describe("BlogPageClient Filter", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockSearchParams = new URLSearchParams();
    mockLocale = "pt";
  });

  it("renders all filters perfectly", () => {
    render(<BlogPageClient />);
    const buttonTodos = screen.getByRole("button", { name: "todos" });
    const buttonPessoal = screen.getByRole("button", { name: "pessoal" });
    
    expect(buttonTodos).toBeInTheDocument();
    expect(buttonPessoal).toBeInTheDocument();
  });

  it("updates the URL when a filter is clicked", () => {
    render(<BlogPageClient />);
    
    // Click the 'pessoal' filter
    const buttonPessoal = screen.getByRole("button", { name: "pessoal" });
    fireEvent.click(buttonPessoal);
    
    // Assuming 'pessoal' translates to 'pessoal' in canonical logic
    expect(mockReplace).toHaveBeenCalledWith("/pt/blog?filter=pessoal", { scroll: false });
  });

  it("removes the filter query when 'todos' is clicked", () => {
    mockSearchParams = new URLSearchParams("?filter=pessoal");
    render(<BlogPageClient />);
    
    // Click the 'todos' filter
    const buttonTodos = screen.getByRole("button", { name: "todos" });
    fireEvent.click(buttonTodos);
    
    expect(mockReplace).toHaveBeenCalledWith("/pt/blog", { scroll: false });
  });

  it("translates filters when in English locale", () => {
    mockLocale = "en";
    render(<BlogPageClient />);
    
    // BlogPageClient uses `all` and `personal` for English
    const buttonAll = screen.getByRole("button", { name: "all" });
    const buttonPersonal = screen.getByRole("button", { name: "personal" });
    
    expect(buttonAll).toBeInTheDocument();
    expect(buttonPersonal).toBeInTheDocument();
    
    fireEvent.click(buttonPersonal);
    
    // URL canonical filter uses PT values internally ('pessoal'), though UI shows EN
    expect(mockReplace).toHaveBeenCalledWith("/pt/blog?filter=pessoal", { scroll: false });
  });
});
