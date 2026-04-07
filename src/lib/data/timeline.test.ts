import { describe, it, expect } from "vitest";
import { timeline } from "./timeline";

describe("timeline data", () => {
  it("has 4 items", () => {
    expect(timeline).toHaveLength(4);
  });

  it("items are in chronological order", () => {
    const years = timeline.map((item) => parseInt(item.date.split(" ")[1]));
    for (let i = 1; i < years.length; i++) {
      expect(years[i]).toBeGreaterThanOrEqual(years[i - 1]);
    }
  });

  it("every item has PT and EN role", () => {
    for (const item of timeline) {
      expect(item.rolePt).toBeTruthy();
      expect(item.roleEn).toBeTruthy();
      expect(item.company).toBeTruthy();
    }
  });
});
