import { projects } from "@/data/projects";

describe("projects data", () => {
  it("is an array", () => {
    expect(Array.isArray(projects)).toBe(true);
  });

  it("is non-empty", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields: title, description, url, tags, featured", () => {
    for (const project of projects) {
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("description");
      expect(project).toHaveProperty("url");
      expect(project).toHaveProperty("tags");
      expect(project).toHaveProperty("featured");
    }
  });

  it("tags is an array for every project", () => {
    for (const project of projects) {
      expect(Array.isArray(project.tags)).toBe(true);
    }
  });

  it("featured is boolean for every project", () => {
    for (const project of projects) {
      expect(typeof project.featured).toBe("boolean");
    }
  });

  it("url is a non-empty string for every project", () => {
    for (const project of projects) {
      expect(typeof project.url).toBe("string");
      expect(project.url.length).toBeGreaterThan(0);
    }
  });

  it("title is a non-empty string for every project", () => {
    for (const project of projects) {
      expect(typeof project.title).toBe("string");
      expect(project.title.length).toBeGreaterThan(0);
    }
  });

  it("description is a non-empty string for every project", () => {
    for (const project of projects) {
      expect(typeof project.description).toBe("string");
      expect(project.description.length).toBeGreaterThan(0);
    }
  });
});
