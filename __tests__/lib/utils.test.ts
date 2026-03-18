import { cn, formatDate } from "@/lib/utils";

describe("cn()", () => {
  it("merges multiple strings", () => {
    const result = cn("foo", "bar", "baz");
    expect(result).toBe("foo bar baz");
  });

  it("resolves Tailwind conflicts — later class wins", () => {
    const result = cn("p-2", "p-4");
    expect(result).toBe("p-4");
  });

  it("handles undefined values", () => {
    const result = cn("foo", undefined, "bar");
    expect(result).toBe("foo bar");
  });

  it("handles null values", () => {
    // clsx accepts ClassValue which includes false/null/undefined
    const result = cn("foo", null as unknown as undefined, "bar");
    expect(result).toBe("foo bar");
  });

  it("handles boolean values", () => {
    const result = cn("foo", false, "bar");
    expect(result).toBe("foo bar");
  });

  it("handles arrays", () => {
    const result = cn(["foo", "bar"], "baz");
    expect(result).toBe("foo bar baz");
  });

  it("handles objects", () => {
    const result = cn({ foo: true, bar: false, baz: true });
    expect(result).toBe("foo baz");
  });

  it("returns a string", () => {
    const result = cn("foo");
    expect(typeof result).toBe("string");
  });

  it("returns empty string for no args", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("handles mixed input types", () => {
    const result = cn("text-sm", ["font-bold"], { "text-red-500": true, "text-blue-500": false });
    expect(result).toBe("text-sm font-bold text-red-500");
  });
});

describe("formatDate()", () => {
  it("formats a date string in English", () => {
    const result = formatDate("2024-06-15", "en");
    expect(result).toMatch(/June|Jun/);
    expect(result).toMatch(/2024/);
    expect(result).toMatch(/15/);
  });

  it("formats a date string in Portuguese", () => {
    const result = formatDate("2024-06-15", "pt");
    expect(result).toMatch(/junho|jun/i);
    expect(result).toMatch(/2024/);
  });

  it("uses UTC timezone to avoid off-by-one errors", () => {
    // "2024-01-01" parsed as UTC midnight should always show January 1, not December 31
    const result = formatDate("2024-01-01", "en");
    expect(result).toMatch(/January|Jan/);
    expect(result).toMatch(/1/);
    expect(result).toMatch(/2024/);
  });

  it("returns a non-empty string", () => {
    const result = formatDate("2023-11-20", "en");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
