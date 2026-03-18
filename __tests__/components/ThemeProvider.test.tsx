import { render, act } from "@testing-library/react";
import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "@/components/ThemeProvider";

// Helper to read current theme from context
function ThemeConsumer(): React.ReactElement {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

function mockMatchMedia(matches: boolean) {
  const listeners: ((e: { matches: boolean }) => void)[] = [];
  const mq = {
    matches,
    media: "(prefers-color-scheme: dark)",
    addEventListener: jest.fn((_: string, cb: (e: { matches: boolean }) => void) => {
      listeners.push(cb);
    }),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockReturnValue(mq),
  });
  return { mq, listeners };
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("defaults to dark when system prefers dark and no saved preference", () => {
    mockMatchMedia(true);
    const { getByTestId } = render(
      <ThemeProvider><ThemeConsumer /></ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("defaults to light when system prefers light and no saved preference", () => {
    mockMatchMedia(false);
    const { getByTestId } = render(
      <ThemeProvider><ThemeConsumer /></ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("respects saved dark preference over system light", () => {
    localStorage.setItem("theme", "dark");
    mockMatchMedia(false);
    const { getByTestId } = render(
      <ThemeProvider><ThemeConsumer /></ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("respects saved light preference over system dark", () => {
    localStorage.setItem("theme", "light");
    mockMatchMedia(true);
    const { getByTestId } = render(
      <ThemeProvider><ThemeConsumer /></ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("toggle switches from light to dark", () => {
    mockMatchMedia(false);
    const { getByTestId, getByRole } = render(
      <ThemeProvider><ThemeConsumer /></ThemeProvider>
    );
    act(() => { getByRole("button").click(); });
    expect(getByTestId("theme").textContent).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggle switches from dark to light", () => {
    mockMatchMedia(true);
    const { getByTestId, getByRole } = render(
      <ThemeProvider><ThemeConsumer /></ThemeProvider>
    );
    act(() => { getByRole("button").click(); });
    expect(getByTestId("theme").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("toggle persists preference to localStorage", () => {
    mockMatchMedia(false);
    const { getByRole } = render(
      <ThemeProvider><ThemeConsumer /></ThemeProvider>
    );
    act(() => { getByRole("button").click(); });
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("updates theme when system preference changes (no saved pref)", () => {
    const { listeners } = mockMatchMedia(false);
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>);
    act(() => { listeners.forEach((cb) => cb({ matches: true })); });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("ignores system preference changes when user has saved preference", () => {
    localStorage.setItem("theme", "light");
    const { listeners } = mockMatchMedia(false);
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>);
    act(() => { listeners.forEach((cb) => cb({ matches: true })); });
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("cleans up event listener on unmount", () => {
    const { mq } = mockMatchMedia(false);
    const { unmount } = render(<ThemeProvider><ThemeConsumer /></ThemeProvider>);
    unmount();
    expect(mq.removeEventListener).toHaveBeenCalled();
  });

  it("renders children", () => {
    mockMatchMedia(false);
    const { getByText } = render(
      <ThemeProvider><span>child</span></ThemeProvider>
    );
    expect(getByText("child")).toBeInTheDocument();
  });
});
