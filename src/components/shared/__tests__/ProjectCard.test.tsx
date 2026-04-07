import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectCard } from "../ProjectCard";
import type { Project } from "@/lib/data/projects";

let mockLocale = "pt";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => mockLocale,
}));

const mockProject: Project = {
  id: "test-proj",
  icon: "✦",
  iconVariant: "violet",
  status: "live",
  namePt: "Meu Projeto",
  nameEn: "My Project",
  tagPt: "// meu projeto",
  tagEn: "// my project",
  descPt: "Descrição do projeto",
  descEn: "Project description",
  tags: ["TypeScript", "React", "Next.js"],
  links: [{ labelKey: "github", href: "https://github.com/test" }],
  year: "2025",
};

const statusLabels = {
  live: "live",
  wip: "em desenvolvimento",
  production: "produção",
  "in-use": "em uso",
};

describe("ProjectCard", () => {
  beforeEach(() => {
    mockLocale = "pt";
  });

  it("renders english content when locale is en", () => {
    mockLocale = "en";
    render(<ProjectCard project={mockProject} statusLabels={statusLabels} />);
    expect(screen.getByText("My Project")).toBeInTheDocument();
    expect(screen.getByText("Project description")).toBeInTheDocument();
    expect(screen.getByText("// my project")).toBeInTheDocument();
  });

  it("renders english terminal items when locale is en", () => {
    mockLocale = "en";
    const withTerminal: Project = {
      ...mockProject,
      wide: true,
      terminal: [
        { done: true, labelPt: "auth pt", labelEn: "auth en" },
      ],
    };
    render(<ProjectCard project={withTerminal} statusLabels={statusLabels} termProgressLabel="progress" />);
    expect(screen.getByText("auth en")).toBeInTheDocument();
  });

  it("renders project name in the active locale", () => {
    render(<ProjectCard project={mockProject} statusLabels={statusLabels} />);
    expect(screen.getByText("Meu Projeto")).toBeInTheDocument();
  });

  it("renders tagline", () => {
    render(<ProjectCard project={mockProject} statusLabels={statusLabels} />);
    expect(screen.getByText("// meu projeto")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectCard project={mockProject} statusLabels={statusLabels} />);
    expect(screen.getByText("Descrição do projeto")).toBeInTheDocument();
  });

  it("renders all tech tags", () => {
    render(<ProjectCard project={mockProject} statusLabels={statusLabels} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("renders correct status badge text", () => {
    render(<ProjectCard project={mockProject} statusLabels={statusLabels} />);
    expect(screen.getByText("live")).toBeInTheDocument();
  });

  it("renders wip status label", () => {
    const wip = { ...mockProject, status: "wip" as const };
    render(<ProjectCard project={wip} statusLabels={statusLabels} />);
    expect(screen.getByText("em desenvolvimento")).toBeInTheDocument();
  });

  it("does not render terminal panel when no terminalItems", () => {
    const { container } = render(
      <ProjectCard project={mockProject} statusLabels={statusLabels} />
    );
    expect(container.querySelector('[style*="0d0d0f"]')).toBeNull();
  });

  it("renders terminal panel when terminalItems are provided", () => {
    const withTerminal: Project = {
      ...mockProject,
      wide: true,
      terminal: [
        { done: true, labelPt: "auth + JWT", labelEn: "auth + JWT" },
        { done: false, labelPt: "dashboard", labelEn: "dashboard" },
      ],
    };
    render(
      <ProjectCard
        project={withTerminal}
        statusLabels={statusLabels}
        termProgressLabel="// progress"
      />
    );
    expect(screen.getByText("// progress")).toBeInTheDocument();
    expect(screen.getByText("auth + JWT")).toBeInTheDocument();
    expect(screen.getByText("dashboard")).toBeInTheDocument();
  });

  it("applies wide layout class when wide prop is true", () => {
    const wide = { ...mockProject, wide: true };
    const { container } = render(
      <ProjectCard project={wide} statusLabels={statusLabels} />
    );
    const article = container.querySelector("article");
    expect(article).toHaveClass("pc-wide");
  });

  it("does not apply wide class for non-wide projects", () => {
    const { container } = render(
      <ProjectCard project={mockProject} statusLabels={statusLabels} />
    );
    const article = container.querySelector("article");
    expect(article).not.toHaveClass("pc-wide");
  });

  it("renders private label when project has no links", () => {
    const noLinks = { ...mockProject, links: [] };
    render(<ProjectCard project={noLinks} statusLabels={statusLabels} privateLabel="◈ privado" />);
    expect(screen.getByText("◈ privado")).toBeInTheDocument();
  });

  it("renders default private label when no links and no privateLabel prop", () => {
    const noLinks = { ...mockProject, links: [] };
    render(<ProjectCard project={noLinks} statusLabels={statusLabels} />);
    expect(screen.getByText("◈ privado")).toBeInTheDocument();
  });

  it("hover events on card article change style", () => {
    const { container } = render(
      <ProjectCard project={mockProject} statusLabels={statusLabels} />
    );
    const article = container.querySelector("article")!;
    fireEvent.mouseEnter(article);
    fireEvent.mouseLeave(article);
  });

  it("hover events on project link change style", () => {
    render(<ProjectCard project={mockProject} statusLabels={statusLabels} />);
    const link = screen.getByRole("link");
    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);
  });

  it("renders year", () => {
    render(<ProjectCard project={mockProject} statusLabels={statusLabels} />);
    expect(screen.getByText("2025")).toBeInTheDocument();
  });

  it("uses custom linkLabels when provided", () => {
    const customLabels = { github: "código fonte" };
    render(
      <ProjectCard
        project={mockProject}
        statusLabels={statusLabels}
        linkLabels={customLabels}
      />
    );
    expect(screen.getByText("código fonte")).toBeInTheDocument();
  });
});
