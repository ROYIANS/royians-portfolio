# Component Guidelines

> How components are built in this project.

---

## Overview

This project uses React 19 with Next.js 16 App Router. Components leverage the Once UI system for consistent design. Client-side interactivity is handled with "use client" directives, while most components are server components by default.

---

## Component Structure

### Standard Component File Structure

```tsx
// 1. "use client" directive (only if client-side interactivity needed)
"use client";

// 2. Imports
import { useState, useEffect } from "react";
import { SomeComponent } from "@once-ui-system/core";
import styles from "./ComponentName.module.scss";

// 3. Types (if component-specific)
type ComponentProps = {
  title: string;
  description?: string;
};

// 4. Component definition (named export)
export const ComponentName: React.FC<ComponentProps> = ({ 
  title, 
  description 
}) => {
  // 5. Hooks (if client component)
  const [state, setState] = useState("");

  // 6. Effects (if client component)
  useEffect(() => {
    // effect logic
  }, []);

  // 7. Render
  return (
    <div className={styles.container}>
      {/* JSX content */}
    </div>
  );
};
```

### Component Organization Patterns

**Server Components (default)**:
- No "use client" directive
- Can directly use async/await
- Cannot use hooks or browser APIs
- Example: `src/app/page.tsx`, `src/app/about/page.tsx`

**Client Components**:
- Requires "use client" directive at top of file
- Can use hooks (useState, useEffect, etc.)
- Can access browser APIs
- Example: `src/components/Header.tsx`

---

## Props Conventions

### Type Definitions

```tsx
// Use type for component props (not interface)
type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
};

// Inline types for simple components
export const SimpleComponent: React.FC<{ text: string }> = ({ text }) => {
  return <div>{text}</div>;
};
```

### Props Destructuring

Always destructure props in the function signature:

```tsx
// ✅ Good - destructured in function signature
export const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return <div>...</div>;
};

// ❌ Bad - accessing via props object
export const Card: React.FC<CardProps> = (props) => {
  return <div>{props.title}</div>;
};
```

### Optional Props

Use TypeScript optional chaining for optional props:

```tsx
type CardProps = {
  title: string;
  subtitle?: string;  // Optional
};

export const Card: React.FC<CardProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}  {/* Conditional rendering */}
    </div>
  );
};
```

---

## Styling Patterns

### CSS Modules

This project uses SCSS modules for component-scoped styles:

```tsx
// ComponentName.module.scss
.container {
  padding: 1rem;
  background: var(--background-primary);
}

.title {
  font-size: 1.5rem;
  color: var(--text-primary);
}
```

```tsx
// ComponentName.tsx
import styles from "./ComponentName.module.scss";

export const ComponentName = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  );
};
```

### Once UI Components

Prefer Once UI system components over custom HTML elements:

```tsx
import { Flex, Text, Button } from "@once-ui-system/core";

// ✅ Good - using Once UI components
export const Card = () => {
  return (
    <Flex direction="column" padding="m">
      <Text variant="heading-strong-m">Title</Text>
      <Button variant="primary">Click me</Button>
    </Flex>
  );
};

// ❌ Bad - using raw HTML when Once UI component exists
export const Card = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "16px" }}>
      <h1>Title</h1>
      <button>Click me</button>
    </div>
  );
};
```

### Responsive Design

Use Once UI's responsive props:

```tsx
<Flex
  direction="row"           // Default direction
  s={{ direction: "column" }} // Small screen direction
>
  {/* Content */}
</Flex>
```

---

## Accessibility

### Semantic HTML

Use semantic HTML elements when Once UI components don't apply:

```tsx
// ✅ Good - semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// ❌ Bad - non-semantic
<div className="nav">
  <div className="nav-item">
    <span onClick={handleClick}>About</span>
  </div>
</div>
```

### ARIA Attributes

Add ARIA attributes when needed:

```tsx
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <CloseIcon />
</button>
```

### Keyboard Navigation

Ensure interactive elements are keyboard accessible:

```tsx
// ✅ Good - keyboard accessible
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === "Enter" && handleClick()}
>
  Click me
</div>
```

---

## Common Mistakes

### 1. Missing "use client" Directive

```tsx
// ❌ Bad - using hooks without "use client"
import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};

// ✅ Good - with "use client"
"use client";

import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

### 2. Wrong Export Pattern

```tsx
// ❌ Bad - default export for shared components
export default function Header() { ... }

// ✅ Good - named export for shared components
export const Header = () => { ... };
```

### 3. Inline Styles

```tsx
// ❌ Bad - inline styles
<div style={{ padding: "16px", backgroundColor: "red" }}>...</div>

// ✅ Good - CSS modules or Once UI
<div className={styles.container}>...</div>
// or
<Flex padding="m" background="danger-weak">...</Flex>
```

### 4. Not Using TypeScript

```tsx
// ❌ Bad - missing types
export const Card = ({ title, description }) => { ... };

// ✅ Good - with proper types
type CardProps = {
  title: string;
  description?: string;
};

export const Card: React.FC<CardProps> = ({ title, description }) => { ... };
```
