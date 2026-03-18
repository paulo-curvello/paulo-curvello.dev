// Mock fs before importing the module under test
jest.mock("fs");

import fs from "fs";
import { getPostsByLocale, getPostBySlug } from "@/lib/mdx";

const mockedFs = fs as jest.Mocked<typeof fs>;
const readdirSyncMock = mockedFs.readdirSync as jest.Mock;

describe("getPostsByLocale()", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns [] when directory doesn't exist", () => {
    mockedFs.existsSync.mockReturnValue(false);
    const result = getPostsByLocale("pt");
    expect(result).toEqual([]);
  });

  it("parses MDX files and returns Post[]", () => {
    mockedFs.existsSync.mockReturnValue(true);
    readdirSyncMock.mockReturnValue(["hello-world.mdx"]);
    mockedFs.readFileSync.mockReturnValue(
      `---
title: "Hello World"
date: "2024-01-15"
summary: "A test post"
tags: ["test"]
lang: "pt"
---
Post content here.`
    );

    const result = getPostsByLocale("pt");

    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("hello-world");
    expect(result[0].frontmatter.title).toBe("Hello World");
    expect(result[0].frontmatter.date).toBe("2024-01-15");
    expect(result[0].frontmatter.summary).toBe("A test post");
    expect(result[0].frontmatter.tags).toEqual(["test"]);
    expect(result[0].frontmatter.lang).toBe("pt");
  });

  it("sorts posts by date descending", () => {
    mockedFs.existsSync.mockReturnValue(true);
    readdirSyncMock.mockReturnValue(["old-post.mdx", "new-post.mdx"]);
    mockedFs.readFileSync
      .mockReturnValueOnce(
        `---
title: "Old Post"
date: "2023-06-01"
summary: "Older"
tags: []
lang: "pt"
---`
      )
      .mockReturnValueOnce(
        `---
title: "New Post"
date: "2024-01-01"
summary: "Newer"
tags: []
lang: "pt"
---`
      );

    const result = getPostsByLocale("pt");

    expect(result[0].slug).toBe("new-post");
    expect(result[1].slug).toBe("old-post");
  });

  it("ignores non-.mdx files", () => {
    mockedFs.existsSync.mockReturnValue(true);
    readdirSyncMock.mockReturnValue(["post.mdx", "readme.md", "image.png"]);
    mockedFs.readFileSync.mockReturnValue(
      `---
title: "Post"
date: "2024-01-01"
summary: "A post"
tags: []
lang: "pt"
---`
    );

    const result = getPostsByLocale("pt");

    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("post");
  });
});

describe("getPostBySlug()", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns null when file doesn't exist", async () => {
    mockedFs.existsSync.mockReturnValue(false);
    const result = await getPostBySlug("pt", "missing-post");
    expect(result).toBeNull();
  });

  it("returns frontmatter + content for valid slug", async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(
      `---
title: "My Post"
date: "2024-03-01"
summary: "Summary here"
tags: ["next", "typescript"]
lang: "en"
---
# Heading

Body content.`
    );

    const result = await getPostBySlug("en", "my-post");

    expect(result).not.toBeNull();
    expect(result!.frontmatter.title).toBe("My Post");
    expect(result!.frontmatter.date).toBe("2024-03-01");
    expect(result!.frontmatter.summary).toBe("Summary here");
    expect(result!.frontmatter.tags).toEqual(["next", "typescript"]);
    expect(result!.frontmatter.lang).toBe("en");
    expect(result!.content).toContain("# Heading");
    expect(result!.content).toContain("Body content.");
  });
});
