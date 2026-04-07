import { timeline } from "../timeline";
import { projects } from "../projects";
import { blogPosts } from "../blog";

describe("timeline data", () => {
  it("has exactly 4 items", () => {
    expect(timeline).toHaveLength(4);
  });

  it("each item has required fields", () => {
    for (const item of timeline) {
      expect(item.id).toBeTruthy();
      expect(item.company).toBeTruthy();
      expect(item.date).toBeTruthy();
      expect(item.rolePt).toBeTruthy();
      expect(item.roleEn).toBeTruthy();
      expect(item.descPt).toBeTruthy();
      expect(item.descEn).toBeTruthy();
    }
  });
});

describe("projects data", () => {
  it("has at least 1 project", () => {
    expect(projects.length).toBeGreaterThanOrEqual(1);
  });

  it("has at least 2 live projects (used as featured on home)", () => {
    const live = projects.filter((p) => p.status === "live");
    expect(live.length).toBeGreaterThanOrEqual(2);
  });

  it("each project has required fields", () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy();
      expect(p.namePt).toBeTruthy();
      expect(p.nameEn).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(Array.isArray(p.tags)).toBe(true);
      expect(Array.isArray(p.links)).toBe(true);
    }
  });

  it("wide projects have terminal items", () => {
    const wideProjects = projects.filter((p) => p.wide === true);
    for (const p of wideProjects) {
      expect(p.terminal).toBeDefined();
      expect(p.terminal!.length).toBeGreaterThan(0);
    }
  });
});

describe("blogPosts data", () => {
  it("has at least 1 post", () => {
    expect(blogPosts.length).toBeGreaterThanOrEqual(1);
  });

  it("has exactly 1 featured post", () => {
    const featured = blogPosts.filter((p) => p.featured === true);
    expect(featured).toHaveLength(1);
  });

  it("each post has a positive readMin", () => {
    for (const post of blogPosts) {
      expect(post.readMin).toBeGreaterThan(0);
    }
  });

  it("each post has required fields", () => {
    for (const post of blogPosts) {
      expect(post.id).toBeTruthy();
      expect(post.slug).toBeTruthy();
      expect(post.tag).toBeTruthy();
      expect(post.titlePt).toBeTruthy();
      expect(post.titleEn).toBeTruthy();
      expect(post.headerSymbolPt).toBeTruthy();
      expect(post.headerSymbolEn).toBeTruthy();
      expect(post.date).toBeTruthy();
    }
  });
});
