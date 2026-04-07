import { describe, it, expect } from "vitest";
import { blogPosts, blogFilters, blogFiltersEn } from "./blog";

describe("blogPosts data", () => {
  it("has at least one featured post", () => {
    expect(blogPosts.some((p) => p.featured)).toBe(true);
  });

  it("every post has required fields", () => {
    for (const post of blogPosts) {
      expect(post.slug).toBeTruthy();
      expect(post.titlePt).toBeTruthy();
      expect(post.titleEn).toBeTruthy();
      expect(post.readMin).toBeGreaterThan(0);
    }
  });

  it("PT and EN filters have the same length", () => {
    expect(blogFilters.length).toBe(blogFiltersEn.length);
  });
});
