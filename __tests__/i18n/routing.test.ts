// Mock next-intl/routing before importing routing config
jest.mock("next-intl/routing", () => ({
  defineRouting: (config: { locales: string[]; defaultLocale: string }) => config,
}));

import { routing } from "@/i18n/routing";

describe("routing config", () => {
  it('locales contains "pt"', () => {
    expect(routing.locales).toContain("pt");
  });

  it('locales contains "en"', () => {
    expect(routing.locales).toContain("en");
  });

  it('defaultLocale is "pt"', () => {
    expect(routing.defaultLocale).toBe("pt");
  });

  it("locales has exactly two entries", () => {
    expect(routing.locales).toHaveLength(2);
  });
});
