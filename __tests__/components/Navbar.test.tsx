import React from "react";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";

jest.mock("@/components/ThemeToggle", () => ({
  ThemeToggle: () => <button aria-label="theme-toggle" />,
}));

// Mock next-intl navigation
jest.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    locale,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    locale?: string;
  }) => (
    <a href={href} data-locale={locale} {...props}>
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Navbar", () => {
  it("renders 3 navigation links (home, blog, projects)", () => {
    render(<Navbar locale="pt" />);
    // Expect links for home, blog, projects (the labels are keys since t() returns key)
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("blog")).toBeInTheDocument();
    expect(screen.getByText("projects")).toBeInTheDocument();
  });

  it('locale switcher shows "en" when locale is "pt"', () => {
    render(<Navbar locale="pt" />);
    // The locale switcher text is the otherLocale
    expect(screen.getByText("en")).toBeInTheDocument();
  });

  it('locale switcher shows "pt" when locale is "en"', () => {
    render(<Navbar locale="en" />);
    expect(screen.getByText("pt")).toBeInTheDocument();
  });

  it('the "<paulo />" brand link is present', () => {
    render(<Navbar locale="pt" />);
    expect(screen.getByText("<paulo />")).toBeInTheDocument();
  });

  it("brand link points to /", () => {
    render(<Navbar locale="pt" />);
    const brandLink = screen.getByText("<paulo />").closest("a");
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders the theme toggle", () => {
    render(<Navbar locale="pt" />);
    expect(screen.getByLabelText("theme-toggle")).toBeInTheDocument();
  });

  it("active nav link has aria-current=page", () => {
    render(<Navbar locale="pt" />);
    // usePathname returns "/" so the home link should be active
    const homeLink = screen.getByText("home").closest("a");
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("inactive nav links do not have aria-current", () => {
    render(<Navbar locale="pt" />);
    const blogLink = screen.getByText("blog").closest("a");
    expect(blogLink).not.toHaveAttribute("aria-current");
  });
});
