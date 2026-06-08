# Quality Guidelines

> Code quality standards for frontend development.

---

## Overview

This project uses Biome for linting and formatting. The configuration is in `biome.json`. Code quality is enforced through:

- Biome linter with recommended rules
- Biome formatter with specific settings
- TypeScript strict mode
- Next.js built-in linting (ESLint)

---

## Forbidden Patterns

### 1. Console Statements in Production

```tsx
// ❌ Bad - console.log in production code
export const Component = () => {
  console.log("Component rendered");
  return <div>Content</div>;
};

// ✅ Good - remove or use proper logging
export const Component = () => {
  // Development only
  if (process.env.NODE_ENV === "development") {
    console.log("Component rendered");
  }
  return <div>Content</div>;
};
```

### 2. Inline Styles

```tsx
// ❌ Bad - inline styles
<div style={{ padding: "16px", backgroundColor: "red" }}>...</div>

// ✅ Good - CSS modules or Once UI
<div className={styles.container}>...</div>
// or
<Flex padding="m" background="danger-weak">...</Flex>
```

### 3. Any Type

```tsx
// ❌ Bad - using any
const data: any = fetchData();

// ✅ Good - use unknown or specific types
const data: unknown = fetchData();
// or
const data: Post = fetchData();
```

### 4. Default Exports for Shared Components

```tsx
// ❌ Bad - default export for shared components
export default function Header() { ... }

// ✅ Good - named export for shared components
export const Header = () => { ... };
```

### 5. Hooks in Server Components

```tsx
// ❌ Bad - hooks in server component
export default async function Page() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}

// ✅ Good - use client component for hooks
"use client";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

---

## Required Patterns

### 1. TypeScript Strict Mode

All code must pass TypeScript strict mode checks:

```tsx
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 2. Biome Formatting

Code must be formatted according to `biome.json`:

```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  }
}
```

### 3. Named Exports for Components

Shared components must use named exports:

```tsx
// ✅ Good
export const Header = () => { ... };
export const Footer = () => { ... };
```

### 4. CSS Modules for Styling

Component styles must use CSS modules:

```tsx
// Component.module.scss
.container {
  padding: 1rem;
}

// Component.tsx
import styles from "./Component.module.scss";

export const Component = () => {
  return <div className={styles.container}>Content</div>;
};
```

### 5. Once UI Components

Prefer Once UI components over custom HTML when available:

```tsx
// ✅ Good - using Once UI
import { Flex, Text, Button } from "@once-ui-system/core";

export const Card = () => {
  return (
    <Flex direction="column" padding="m">
      <Text variant="heading-strong-m">Title</Text>
      <Button variant="primary">Click me</Button>
    </Flex>
  );
};
```

---

## Testing Requirements

### Current State

This project does NOT have:
- Unit tests
- Integration tests
- E2E tests

Testing is currently manual. This is acceptable for a portfolio site but may change as the project grows.

### Future Considerations

If testing is added, consider:
- **Unit tests**: For utility functions (`src/utils/`)
- **Component tests**: For complex interactive components
- **E2E tests**: For critical user flows (contact form, navigation)

---

## Code Review Checklist

### Before Submitting

- [ ] Code passes TypeScript strict mode (`npm run build`)
- [ ] Code passes Biome linting (`npm run biome-write`)
- [ ] No `any` types used
- [ ] No inline styles (use CSS modules or Once UI)
- [ ] Shared components use named exports
- [ ] Client components have "use client" directive
- [ ] Server components don't use hooks
- [ ] No console.log statements in production code

### Reviewing Code

- [ ] **Type safety**: Are types properly defined?
- [ ] **Component structure**: Does it follow project patterns?
- [ ] **Styling**: Are CSS modules or Once UI used correctly?
- [ ] **Performance**: Are there unnecessary re-renders?
- [ ] **Accessibility**: Is semantic HTML used?
- [ ] **Readability**: Is the code easy to understand?

---

## Running Quality Checks

### Format Code

```bash
npm run biome-write
```

This runs Biome formatter on all files.

### Type Check

```bash
npm run build
```

Next.js build includes TypeScript type checking.

### Lint

```bash
npm run lint
```

Runs Next.js ESLint (if configured).

### Full Quality Check

Run all checks in sequence:

```bash
npm run biome-write && npm run build && npm run lint
```
