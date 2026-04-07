import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has required fields", () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.namePt).toBeTruthy();
      expect(project.nameEn).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  it("wide projects have terminal data", () => {
    const wideProjects = projects.filter((p) => p.wide);
    for (const project of wideProjects) {
      expect(project.terminal).toBeDefined();
      expect(project.terminal!.length).toBeGreaterThan(0);
    }
  });

  it("valid status values", () => {
    const validStatuses = ["live", "wip", "production", "in-use"];
    for (const project of projects) {
      expect(validStatuses).toContain(project.status);
    }
  });
});
