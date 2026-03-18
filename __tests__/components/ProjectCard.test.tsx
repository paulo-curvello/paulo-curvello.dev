import React from "react";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/types";

const baseProject: Project = {
  title: "My Project",
  description: "A cool project description.",
  url: "https://github.com/example/repo",
  tags: ["React", "TypeScript", "Next.js"],
  featured: true,
};

describe("ProjectCard", () => {
  it("renders project title", () => {
    render(
      <ProjectCard project={baseProject} viewProject="View Project" featuredLabel="Featured" />
    );
    expect(screen.getByText("My Project")).toBeInTheDocument();
  });

  it("renders project description", () => {
    render(
      <ProjectCard project={baseProject} viewProject="View Project" featuredLabel="Featured" />
    );
    expect(screen.getByText("A cool project description.")).toBeInTheDocument();
  });

  it("renders external link with correct href", () => {
    render(
      <ProjectCard project={baseProject} viewProject="View Project" featuredLabel="Featured" />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://github.com/example/repo");
  });

  it('link has target="_blank"', () => {
    render(
      <ProjectCard project={baseProject} viewProject="View Project" featuredLabel="Featured" />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it('link has rel="noopener noreferrer"', () => {
    render(
      <ProjectCard project={baseProject} viewProject="View Project" featuredLabel="Featured" />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders all tags", () => {
    render(
      <ProjectCard project={baseProject} viewProject="View Project" featuredLabel="Featured" />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("shows featured label when featured=true", () => {
    render(
      <ProjectCard project={baseProject} viewProject="View Project" featuredLabel="Featured" />
    );
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("hides featured label when featured=false", () => {
    const project: Project = { ...baseProject, featured: false };
    render(<ProjectCard project={project} viewProject="View Project" featuredLabel="Featured" />);
    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });

  it("renders viewProject prop text", () => {
    render(
      <ProjectCard project={baseProject} viewProject="View Project" featuredLabel="Featured" />
    );
    expect(screen.getByText(/View Project/)).toBeInTheDocument();
  });
});
