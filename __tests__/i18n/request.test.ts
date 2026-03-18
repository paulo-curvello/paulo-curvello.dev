// Mock next-intl/server before imports
jest.mock("next-intl/server", () => ({
  getRequestConfig: (fn: (args: { requestLocale: Promise<string | undefined> }) => unknown) => fn,
}));

// Mock the routing module
jest.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
  },
}));

// Mock message imports
jest.mock("../../../messages/pt.json", () => ({ default: { nav: { home: "Início" } } }), {
  virtual: true,
});
jest.mock("../../../messages/en.json", () => ({ default: { nav: { home: "Home" } } }), {
  virtual: true,
});

describe("i18n/request config", () => {
  let configFn: (args: { requestLocale: Promise<string | undefined> }) => Promise<{
    locale: string;
    messages: Record<string, unknown>;
  }>;

  beforeEach(() => {
    jest.resetModules();
    jest.mock("next-intl/server", () => ({
      getRequestConfig: (fn: unknown) => fn,
    }));
    jest.mock("@/i18n/routing", () => ({
      routing: {
        locales: ["pt", "en"],
        defaultLocale: "pt",
      },
    }));
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    configFn = require("@/i18n/request").default as typeof configFn;
  });

  it("falls back to defaultLocale for undefined locale", async () => {
    const result = await configFn({ requestLocale: Promise.resolve(undefined) });
    expect(result.locale).toBe("pt");
  });

  it("falls back to defaultLocale for invalid locale", async () => {
    const result = await configFn({ requestLocale: Promise.resolve("fr") });
    expect(result.locale).toBe("pt");
  });

  it('returns correct locale for valid "pt"', async () => {
    const result = await configFn({ requestLocale: Promise.resolve("pt") });
    expect(result.locale).toBe("pt");
  });

  it('returns correct locale for valid "en"', async () => {
    const result = await configFn({ requestLocale: Promise.resolve("en") });
    expect(result.locale).toBe("en");
  });

  it("returns messages object", async () => {
    const result = await configFn({ requestLocale: Promise.resolve("pt") });
    expect(result.messages).toBeDefined();
    expect(typeof result.messages).toBe("object");
  });
});
