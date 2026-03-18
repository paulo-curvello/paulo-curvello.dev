// Mock next-intl/navigation before importing
jest.mock("next-intl/navigation", () => ({
  createNavigation: (config: unknown) => ({
    Link: "MockLink",
    redirect: jest.fn(),
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    getPathname: jest.fn(),
    _config: config,
  }),
}));

// Mock the routing dependency
jest.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
  },
}));

describe("i18n/navigation", () => {
  let nav: {
    Link: unknown;
    redirect: jest.Mock;
    usePathname: jest.Mock;
    useRouter: jest.Mock;
    getPathname: jest.Mock;
  };

  beforeEach(() => {
    jest.resetModules();
    jest.mock("next-intl/navigation", () => ({
      createNavigation: (config: unknown) => ({
        Link: "MockLink",
        redirect: jest.fn(),
        usePathname: jest.fn(),
        useRouter: jest.fn(),
        getPathname: jest.fn(),
        _config: config,
      }),
    }));
    jest.mock("@/i18n/routing", () => ({
      routing: {
        locales: ["pt", "en"],
        defaultLocale: "pt",
      },
    }));
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    nav = require("@/i18n/navigation");
  });

  it("exports Link", () => {
    expect(nav.Link).toBeDefined();
  });

  it("exports redirect", () => {
    expect(nav.redirect).toBeDefined();
  });

  it("exports usePathname", () => {
    expect(nav.usePathname).toBeDefined();
  });

  it("exports useRouter", () => {
    expect(nav.useRouter).toBeDefined();
  });

  it("exports getPathname", () => {
    expect(nav.getPathname).toBeDefined();
  });
});
