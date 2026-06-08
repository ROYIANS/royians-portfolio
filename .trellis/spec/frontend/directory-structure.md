# Directory Structure

> How frontend code is organized in this project.

---

## Overview

This project is a Next.js 16 portfolio website using App Router, React 19, TypeScript, and Once UI system. The code follows a feature-based organization with shared components and resources.

---

## Directory Layout

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   ├── authenticate/  # Authentication endpoint
│   │   ├── check-auth/    # Auth verification endpoint
│   │   ├── og/            # Open Graph image generation
│   │   └── rss/           # RSS feed endpoint
│   ├── blog/              # Blog listing and [slug] pages
│   ├── gallery/           # Gallery page
│   ├── work/              # Work/projects listing and [slug] pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # Shared components
│   ├── about/             # About page specific components
│   ├── blog/              # Blog specific components
│   ├── gallery/           # Gallery specific components
│   ├── work/              # Work page specific components
│   ├── Header.tsx         # Main navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Providers.tsx      # Context providers wrapper
│   ├── RouteGuard.tsx     # Route protection component
│   └── index.ts           # Component barrel exports
├── resources/             # Configuration and content
│   ├── content.tsx        # Site content configuration
│   ├── once-ui.config.ts  # Once UI theme configuration
│   ├── icons.ts           # Icon definitions
│   └── custom.css         # Custom CSS overrides
├── types/                 # TypeScript type definitions
│   ├── config.types.ts    # Configuration types
│   └── content.types.ts   # Content structure types
└── utils/                 # Utility functions
    ├── formatDate.ts      # Date formatting utilities
    └── utils.ts           # General utilities
```

---

## Module Organization

### Pages (app/ directory)
- Each route has its own directory under `src/app/`
- Dynamic routes use `[slug]` convention (e.g., `blog/[slug]/page.tsx`)
- API routes are colocated under `api/` directory
- Each page directory can contain:
  - `page.tsx` - The page component
  - `layout.tsx` - Layout wrapper (optional)
  - `loading.tsx` - Loading state (optional)
  - `error.tsx` - Error boundary (optional)

### Components (components/ directory)
- **Shared components**: Root level (`Header.tsx`, `Footer.tsx`, etc.)
- **Feature components**: Organized by feature in subdirectories (`about/`, `blog/`, `gallery/`, `work/`)
- Each component directory can contain:
  - `.tsx` component file
  - `.module.scss` scoped styles (optional)
  - Supporting files (types, utils)

### Resources (resources/ directory)
- Site-wide configuration and content
- Theme configuration for Once UI
- Custom CSS overrides
- Icon definitions

---

## Naming Conventions

### Files and Directories
- **Components**: PascalCase (e.g., `Header.tsx`, `ProjectCard.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `utils.ts`)
- **Types**: camelCase with `.types.ts` suffix (e.g., `config.types.ts`)
- **Styles**: Component name + `.module.scss` (e.g., `Header.module.scss`)
- **Directories**: lowercase, hyphenated for multi-word (rare in this project)

### Component Exports
- Named exports for components: `export const Header = () => {}`
- Barrel exports via `index.ts` for shared components
- Default exports for page components

---

## Examples

### Well-organized feature component
```
src/components/about/
├── TableOfContents.tsx    # Named export
└── (other about components)
```

### Well-organized page
```
src/app/blog/
├── [slug]
│   └── page.tsx          # Dynamic blog post page
└── page.tsx              # Blog listing page
```

### Shared component with styles
```
src/components/
├── Header.tsx            # Component with "use client" directive
├── Header.module.scss    # Scoped styles
└── index.ts             # Barrel export
```
