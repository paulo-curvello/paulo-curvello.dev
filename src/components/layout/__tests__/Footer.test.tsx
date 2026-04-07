import { render, screen, fireEvent } from "@testing-library/react";
import { Footer } from "../Footer";

const footerProps = {
  t: {
    role: "Senior Software Engineer",
    github: "GitHub",
    linkedin: "LinkedIn",
    instagram: "@paulocurvellodev",
    email: "Email",
  },
};

describe("Footer", () => {
  it("renders the wordmark paulo.dev", () => {
    const { container } = render(<Footer {...footerProps} />);
    expect(container.textContent).toContain("paulo");
    expect(container.textContent).toContain(".dev");
  });

  it("renders the role tagline", () => {
    render(<Footer {...footerProps} />);
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
  });

  it("renders all 4 social links", () => {
    render(<Footer {...footerProps} />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("@paulocurvellodev")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("GitHub link points to the correct URL", () => {
    render(<Footer {...footerProps} />);
    const link = screen.getByText("GitHub").closest("a");
    expect(link).toHaveAttribute("href", "https://github.com/paulo-curvello");
  });

  it("Email link uses mailto", () => {
    render(<Footer {...footerProps} />);
    const link = screen.getByText("Email").closest("a");
    expect(link).toHaveAttribute("href", "mailto:prgbarata@gmail.com");
  });

  it("hover events on GitHub link change style", () => {
    render(<Footer {...footerProps} />);
    const link = screen.getByText("GitHub").closest("a")!;
    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);
  });

  it("hover events on LinkedIn link change style", () => {
    render(<Footer {...footerProps} />);
    const link = screen.getByText("LinkedIn").closest("a")!;
    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);
  });

  it("hover events on Instagram link change style", () => {
    render(<Footer {...footerProps} />);
    const link = screen.getByText("@paulocurvellodev").closest("a")!;
    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);
  });

  it("hover events on Email link change style", () => {
    render(<Footer {...footerProps} />);
    const link = screen.getByText("Email").closest("a")!;
    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);
  });
});
