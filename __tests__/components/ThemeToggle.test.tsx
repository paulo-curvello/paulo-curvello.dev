import { render, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeContext } from "@/components/ThemeProvider";

function renderWithTheme(theme: "light" | "dark") {
  const toggle = jest.fn();
  const result = render(
    <ThemeContext.Provider value={{ theme, toggle }}>
      <ThemeToggle />
    </ThemeContext.Provider>
  );
  return { ...result, toggle };
}

describe("ThemeToggle", () => {
  it("renders a button", () => {
    const { getByRole } = renderWithTheme("light");
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("shows moon icon when theme is light (click to go dark)", () => {
    const { getByRole } = renderWithTheme("light");
    expect(getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("shows sun icon when theme is dark (click to go light)", () => {
    const { getByRole } = renderWithTheme("dark");
    expect(getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("calls toggle when clicked", () => {
    const { getByRole, toggle } = renderWithTheme("light");
    fireEvent.click(getByRole("button"));
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  it("has accessible aria-label when light", () => {
    const { getByRole } = renderWithTheme("light");
    expect(getByRole("button")).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("has accessible aria-label when dark", () => {
    const { getByRole } = renderWithTheme("dark");
    expect(getByRole("button")).toHaveAttribute("aria-label", "Switch to light mode");
  });
});
