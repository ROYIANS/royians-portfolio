# Type Safety

> Type safety patterns in this project.

---

## Overview

This project uses TypeScript 5.8 with strict mode enabled. The TypeScript configuration is in `tsconfig.json` with the following key settings:

- `strict: true` - Enables all strict type-checking options
- `noEmit: true` - No JavaScript output (Next.js handles compilation)
- `isolatedModules: true` - Ensures each file can be transpiled independently
- `moduleResolution: "bundler"` - Modern module resolution for Next.js

---

## Type Organization

### File Locations

Types are organized in the `src/types/` directory:

```
src/types/
├── config.types.ts    # Configuration and theme types
├── content.types.ts   # Content structure types (posts, projects, etc.)
└── index.ts          # Barrel exports
```

### Type Definition Patterns

**Shared types**: Define in `src/types/` for types used across multiple files:

```tsx
// src/types/content.types.ts
export type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  image?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
};
```

**Component-specific types**: Define inline or in the same file:

```tsx
// src/components/Header.tsx
type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  // Component implementation
};
```

**Page types**: Next.js provides built-in types for page props:

```tsx
// app/blog/[slug]/page.tsx
type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  // Page implementation
}
```

### Barrel Exports

Use `index.ts` files to export types:

```tsx
// src/types/index.ts
export * from "./config.types";
export * from "./content.types";
```

---

## Validation

### No Runtime Validation Library

This project does NOT use runtime validation libraries like:
- Zod
- Yup
- io-ts
- Joi

Reasoning:
- The application is a static portfolio site with minimal user input
- TypeScript provides compile-time type safety
- Server components validate data at the source (database/CMS)
- API routes are internal and don't need strict validation

### API Route Validation

For API routes, use TypeScript types for request/response:

```tsx
// app/api/data/route.ts
import { NextResponse } from "next/server";

type ResponseData = {
  success: boolean;
  data?: unknown;
  error?: string;
};

export async function GET() {
  try {
    const data = await fetchData();
    return NextResponse.json({ success: true, data } satisfies ResponseData);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" } satisfies ResponseData,
      { status: 500 }
    );
  }
}
```

### Form Validation

For forms, use HTML5 validation or simple client-side checks:

```tsx
"use client";

import { useState } from "react";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple client-side validation
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error && <span className="error">{error}</span>}
    </form>
  );
};
```

---

## Common Patterns

### Type Inference

Let TypeScript infer types when possible:

```tsx
// ✅ Good - TypeScript infers the type
const [count, setCount] = useState(0); // inferred as number
const [name, setName] = useState(""); // inferred as string

// ❌ Bad - explicit type when not needed
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>("");
```

### Optional Properties

Use optional properties for non-required fields:

```tsx
type UserProfile = {
  name: string;           // Required
  bio?: string;           // Optional
  avatar?: string;        // Optional
  socialLinks?: string[]; // Optional
};
```

### Union Types

Use union types for fixed sets of values:

```tsx
type Theme = "light" | "dark" | "system";
type ButtonVariant = "primary" | "secondary" | "ghost";
type Status = "loading" | "success" | "error";
```

### Generic Types

Use generics for reusable components:

```tsx
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

export const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};
```

### Type Guards

Use type guards for runtime type checking:

```tsx
type ApiResponse = 
  | { success: true; data: unknown }
  | { success: false; error: string };

const isSuccess = (response: ApiResponse): response is { success: true; data: unknown } => {
  return response.success;
};

// Usage
const response = await fetchData();
if (isSuccess(response)) {
  console.log(response.data); // TypeScript knows data exists
} else {
  console.error(response.error); // TypeScript knows error exists
}
```

---

## Forbidden Patterns

### 1. Using `any`

```tsx
// ❌ Bad - using any
const data: any = fetchData();
data.foo; // No type checking!

// ✅ Good - use unknown for truly unknown types
const data: unknown = fetchData();

// ✅ Good - use specific types
const data: Post = fetchData();
```

### 2. Type Assertions

```tsx
// ❌ Bad - type assertions (as)
const data = fetchData() as Post; // Could be wrong!

// ✅ Good - type guards
const data = fetchData();
if (isPost(data)) {
  // TypeScript knows data is Post here
}

// ✅ Good - use satisfies for type checking without assertion
const config = {
  theme: "dark",
  language: "en",
} satisfies Config;
```

### 3. Non-null Assertions

```tsx
// ❌ Bad - non-null assertion
const element = document.getElementById("root")!;

// ✅ Good - check for null
const element = document.getElementById("root");
if (!element) {
  throw new Error("Root element not found");
}
// TypeScript knows element is not null here
```

### 4. Ignoring TypeScript Errors

```tsx
// ❌ Bad - ignoring errors with comments
// @ts-ignore
const data = someFunction();

// ❌ Bad - using @ts-nocheck
// @ts-nocheck
const data = someFunction();

// ✅ Good - fix the type error
const data: ExpectedType = someFunction();
```

### 5. Inconsistent Type Naming

```tsx
// ❌ Bad - inconsistent naming
type user = { name: string };
type POST = { title: string };
type button_variant = "primary" | "secondary";

// ✅ Good - consistent PascalCase
type User = { name: string };
type Post = { title: string };
type ButtonVariant = "primary" | "secondary";
```
