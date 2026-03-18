# paulo-curvello.dev

Personal developer portfolio and blog built with Next.js 16. Bilingual (PT/EN), with a blog, projects showcase, and career timeline. Live at [paulocurvello.com](https://paulocurvello.com).

## Features

- **Bilingual** — Portuguese (default) and English, powered by `next-intl`
- **Blog** — MDX-based posts with frontmatter, tag filtering, and year grouping
- **Projects showcase** — Static project cards with featured highlights
- **Career timeline** — Milestone-based career progression section
- **Dark mode** — OS preference detection + manual toggle, persisted in `localStorage`
- **Accessible** — Semantic HTML, `aria-*` attributes, keyboard navigation

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Blog content | MDX + `next-mdx-remote` + `gray-matter` |
| i18n | `next-intl` |
| UI components | shadcn/ui |
| Testing | Jest + React Testing Library |
| Runtime | Node.js 22 LTS |

## Project Structure

```
/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              # Home / landing page
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog index
│   │   │   └── [slug]/page.tsx   # Individual post
│   │   ├── projects/page.tsx     # Projects showcase
│   │   └── linkedin/page.tsx     # LinkedIn redirect
│   └── layout.tsx
├── content/
│   └── blog/
│       ├── pt/                   # Portuguese posts (.mdx)
│       └── en/                   # English posts (.mdx)
├── data/
│   └── projects.ts               # Static project list
├── components/                   # Shared React components
├── messages/
│   ├── pt.json                   # i18n strings – Portuguese
│   └── en.json                   # i18n strings – English
├── lib/
│   ├── mdx.ts                    # MDX parsing helpers
│   └── utils.ts                  # Tailwind cn() + formatDate()
├── types/
│   └── index.ts                  # Shared TypeScript types
├── i18n/                         # next-intl config
├── scripts/
│   └── warmup.mjs                # Dev server route pre-compiler
├── __tests__/                    # Jest test suites
└── public/                       # Static assets
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server on http://localhost:3000
npm run dev
```

## Development Commands

```bash
npm run dev           # Dev server with hot reload (port 3000)
npm run build         # Production build
npm start             # Start production server
npm run typecheck     # Type-check without emitting
npm run lint          # ESLint
npm test              # Run test suite
npm run test:coverage # Tests with coverage report
```

## Blog Posts

Create `.mdx` files in `content/blog/pt/` or `content/blog/en/`. All files require this frontmatter:

```yaml
---
title: "Post title"
date: "YYYY-MM-DD"
summary: "One-sentence summary shown in the blog index."
tags: ["tag1", "tag2"]
lang: "pt"
---
```

The filename becomes the URL slug: `my-post.mdx` → `/pt/blog/my-post`.

## Adding Projects

Edit `data/projects.ts`. Each entry follows the `Project` type:

```ts
{
  title: string;
  description: string;  // one sentence, shown on the card
  url: string;          // link to repo or live demo
  tags: string[];
  featured: boolean;    // featured projects appear first
}
```

## Testing

The project follows TDD. Tests live in `__tests__/` mirroring the source structure.

```bash
npm test
npm run test:coverage
```

Current coverage (99 tests, 12 suites):

| Metric | Coverage |
|---|---|
| Statements | 100% |
| Lines | 100% |
| Branches | 98.36% |
| Functions | 94.11% |

100% line and statement coverage is maintained on `components/`, `lib/`, `data/`, and `i18n/`.

## License

MIT
