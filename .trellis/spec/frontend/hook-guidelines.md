# Hook Guidelines

> How hooks are used in this project.

---

## Overview

This project uses React hooks for state management and side effects in client components. The project follows Next.js App Router patterns where data fetching primarily happens in server components, reducing the need for client-side data fetching hooks.

---

## Custom Hook Patterns

### Hook Structure

```tsx
// hooks/useHookName.ts
"use client";

import { useState, useEffect } from "react";

type UseHookNameOptions = {
  initialValue?: string;
};

type UseHookNameReturn = {
  value: string;
  setValue: (value: string) => void;
  isLoading: boolean;
};

export const useHookName = (options?: UseHookNameOptions): UseHookNameReturn => {
  const [value, setValue] = useState(options?.initialValue ?? "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Hook logic here
  }, []);

  return {
    value,
    setValue,
    isLoading,
  };
};
```

### Real Example: TimeDisplay Hook

From `src/components/Header.tsx`:

```tsx
// Inline hook for time display
const useTimeDisplay = (timeZone: string, locale = "en-GB") => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return currentTime;
};
```

---

## Data Fetching

### Server Components (Preferred)

Data fetching should primarily happen in server components using async/await:

```tsx
// app/blog/page.tsx (Server Component)
export default async function BlogPage() {
  const posts = await fetchPosts(); // Direct database/API call
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
```

### Client-Side Data Fetching

When client-side data fetching is necessary, use React's built-in hooks:

```tsx
"use client";

import { useState, useEffect } from "react";

export const ClientDataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render data */}</div>;
};
```

### No External Data Fetching Libraries

This project does NOT use:
- React Query
- SWR
- Apollo Client

Data fetching is handled through:
- Server components with direct database/API calls
- Client components with native `fetch` API
- Next.js built-in data fetching patterns

---

## Naming Conventions

### Hook Naming Rules

1. **Always prefix with `use`**: `useTimeDisplay`, `useAuth`, `useLocalStorage`
2. **Use camelCase**: `useWindowSize`, `useMediaQuery`
3. **Be descriptive**: `useCurrentTime` not `useTime`
4. **Return object for multiple values**: `useAuth()` returns `{ user, login, logout }`

### File Naming

- Hook files: `useHookName.ts` (camelCase with `use` prefix)
- Location: `src/hooks/` directory (if custom hooks exist)
- Or inline in component files for component-specific hooks

---

## Common Mistakes

### 1. Using Hooks in Server Components

```tsx
// ❌ Bad - hooks in server component
export default async function Page() {
  const [count, setCount] = useState(0); // Error!
  return <div>{count}</div>;
}

// ✅ Good - use client component for hooks
"use client";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

### 2. Missing Dependencies in useEffect

```tsx
// ❌ Bad - missing dependency
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId dependency

// ✅ Good - all dependencies included
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### 3. Not Cleaning Up Effects

```tsx
// ❌ Bad - no cleanup
useEffect(() => {
  const interval = setInterval(updateTime, 1000);
}, []);

// ✅ Good - proper cleanup
useEffect(() => {
  const interval = setInterval(updateTime, 1000);
  return () => clearInterval(interval);
}, []);
```

### 4. Creating Hooks Unnecessarily

```tsx
// ❌ Bad - hook for simple logic
const useFullName = (first: string, last: string) => `${first} ${last}`;

// ✅ Good - just a utility function
const getFullName = (first: string, last: string) => `${first} ${last}`;
```

### 5. Using Hooks for Server-Side Data

```tsx
// ❌ Bad - fetching in client component when server component works
"use client";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch("/api/posts").then(res => res.json()).then(setPosts);
  }, []);
  
  return <div>{posts.map(...)}</div>;
};

// ✅ Good - server component with direct data access
export default async function Posts() {
  const posts = await db.posts.findMany();
  return <div>{posts.map(...)}</div>;
}
```
