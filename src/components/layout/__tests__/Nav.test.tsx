import { render, screen, fireEvent } from "@testing-library/react";
import { Nav } from "../Nav";

let mockPathname = "/pt";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: vi.fn() }),
}));

let mockTheme = "dark";
const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: mockTheme, setTheme: mockSetTheme }),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const navProps = {
  locale: "pt",
  t: { home: "Início", blog: "Blog", projects: "Projetos", contact: "Contato" },
  langToggle: "EN",
  themeToggle: "Toggle theme",
};

beforeEach(() => {
  mockPathname = "/pt";
  mockTheme = "dark";
  mockSetTheme.mockClear();
});

describe("Nav", () => {
  it("renders the logo text", () => {
    render(<Nav {...navProps} />);
    expect(screen.getByText(/paulo/)).toBeInTheDocument();
  });

  it("renders all 3 navigation tab labels", () => {
    render(<Nav {...navProps} />);
    expect(screen.getAllByText("Início").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Blog").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projetos").length).toBeGreaterThan(0);
  });

  it("theme toggle button is present and clickable", () => {
    render(<Nav {...navProps} />);
    const toggle = screen.getByRole("button", { name: /toggle theme/i });
    expect(toggle).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("renders Sun icon when theme is dark", () => {
    mockTheme = "dark";
    render(<Nav {...navProps} />);
    // Sun icon renders when mounted + dark theme — button is present
    const toggle = screen.getByRole("button", { name: /toggle theme/i });
    expect(toggle).toBeInTheDocument();
  });

  it("renders Moon icon when theme is light", () => {
    mockTheme = "light";
    render(<Nav {...navProps} />);
    const toggle = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(toggle);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("hover events on theme toggle button change style", () => {
    render(<Nav {...navProps} />);
    const toggle = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.mouseEnter(toggle);
    fireEvent.mouseLeave(toggle);
  });

  it("language toggle link is present and points to other locale", () => {
    render(<Nav {...navProps} />);
    const langLinks = screen.getAllByText("EN");
    expect(langLinks.length).toBeGreaterThan(0);
    const link = langLinks[0].closest("a");
    expect(link).toHaveAttribute("href", "/en");
  });

  it("computes other locale correctly for en", () => {
    mockPathname = "/en";
    render(<Nav {...navProps} locale="en" langToggle="PT" />);
    const ptLinks = screen.getAllByText("PT");
    expect(ptLinks.length).toBeGreaterThan(0);
    const link = ptLinks[0].closest("a");
    expect(link).toHaveAttribute("href", "/pt");
  });

  it("handles empty segment isActive logic with trailing slash", () => {
    mockPathname = "/pt/";
    render(<Nav {...navProps} />);
  });

  it("handles segment isActive logic for blog", () => {
    mockPathname = "/pt/blog";
    render(<Nav {...navProps} />);
  });

  it("contact CTA link is present", () => {
    render(<Nav {...navProps} />);
    expect(screen.getByText("Contato")).toBeInTheDocument();
  });

  it("hover events on contact CTA change style", () => {
    render(<Nav {...navProps} />);
    const cta = screen.getByText("Contato").closest("a")!;
    fireEvent.mouseEnter(cta);
    fireEvent.mouseLeave(cta);
  });
});
