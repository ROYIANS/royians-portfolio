# State Management

> How state is managed in this project.

---

## Overview

This project uses a minimal state management approach. There is no external state management library (no Redux, Zustand, Jotai, etc.). State is managed through:

- React's built-in `useState` for component-local state
- React Context for truly global state (theme, auth)
- Server components for data fetching (reducing client state)
- URL state for navigation and filters

---

## State Categories

### 1. Component-Local State

State that belongs to a single component:

```tsx
"use client";

import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};
```

**When to use**:
- UI state (modals, dropdowns, tooltips)
- Form input values
- Component-specific loading/error states
- Temporary data that doesn't need to persist

### 2. Global State (Context)

State shared across multiple components:

```tsx
// src/components/Providers.tsx
"use client";

import { ThemeProvider } from "@once-ui-system/core";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};
```

**When to use**:
- Theme/appearance settings
- Authentication state
- User preferences
- Site-wide configuration

### 3. Server State

Data fetched from server (managed in server components):

```tsx
// app/blog/page.tsx
export default async function BlogPage() {
  const posts = await fetchPosts(); // Direct server-side data access
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
```

**When to use**:
- Database queries
- API responses
- CMS content
- Any data that changes infrequently

### 4. URL State

State stored in the URL (query params, path segments):

```tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";

export const FilterControls = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentFilter = searchParams.get("filter") ?? "all";
  
  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);
    router.push(`?${params.toString()}`);
  };
  
  return (
    <select 
      value={currentFilter} 
      onChange={(e) => handleFilterChange(e.target.value)}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
    </select>
  );
};
```

**When to use**:
- Search queries
- Filter/sort parameters
- Pagination
- Shareable state (state that should persist across page refreshes)

---

## When to Use Global State

### Criteria for Promoting to Global State

Promote state to global (Context) when ALL of these are true:

1. **Multiple components need it**: 3+ unrelated components need the same data
2. **It's truly global**: The data applies to the entire application, not a feature
3. **It rarely changes**: The state doesn't update frequently (causes re-renders)
4. **It's not server-fetchable**: The data can't be fetched server-side

### Examples

**✅ Good candidates for global state**:
- Theme (dark/light mode)
- Authentication status
- User preferences (locale, timezone)
- Feature flags

**❌ Bad candidates for global state**:
- Form inputs (use local state)
- Component visibility (use local state)
- API response data (use server components)
- Filter state (use URL state)

---

## Server State

### Server Components Pattern

This project leverages Next.js App Router's server components for data fetching:

```tsx
// app/work/page.tsx (Server Component)
import { getProjects } from "@/lib/data";

export default async function WorkPage() {
  // Direct database/API call - no client state needed
  const projects = await getProjects();
  
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
```

### Client-Side Data Fetching

When server components aren't possible, fetch data in client components:

```tsx
"use client";

import { useState, useEffect } from "react";

export const LiveFeed = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/feed");
        const data = await response.json();
        setItems(data);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    
    // Optional: Poll for updates
    const interval = setInterval(fetchItems, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {items.map(item => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### No External State Management Libraries

This project intentionally does NOT use:
- Redux / Redux Toolkit
- Zustand
- Jotai
- Recoil
- MobX

Reasoning:
- Server components reduce the need for client-side data caching
- The application is relatively simple (portfolio site)
- Fewer dependencies = less bundle size and complexity
- React Context handles the few truly global states needed

---

## Common Mistakes

### 1. Using Global State for Local Concerns

```tsx
// ❌ Bad - global state for form input
const FormContext = createContext({ name: "", setName: () => {} });

export const Form = () => {
  const [name, setName] = useState("");
  return (
    <FormContext.Provider value={{ name, setName }}>
      <FormInput />
    </FormContext.Provider>
  );
};

// ✅ Good - local state for form input
export const Form = () => {
  const [name, setName] = useState("");
  return <FormInput value={name} onChange={setName} />;
};
```

### 2. Fetching Client-Side What Could Be Server-Side

```tsx
// ❌ Bad - client-side fetch for static data
"use client";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetch("/api/projects").then(res => res.json()).then(setProjects);
  }, []);
  
  return <div>{projects.map(...)}</div>;
};

// ✅ Good - server component
export default async function Projects() {
  const projects = await db.projects.findMany();
  return <div>{projects.map(...)}</div>;
}
```

### 3. Prop Drilling Instead of Context

```tsx
// ❌ Bad - passing theme through 5 levels
<App theme={theme}>
  <Layout theme={theme}>
    <Header theme={theme}>
      <Nav theme={theme}>
        <Button theme={theme} />
      </Nav>
    </Header>
  </Layout>
</App>

// ✅ Good - use Context for truly global state
<ThemeProvider theme={theme}>
  <App>
    <Layout>
      <Header>
        <Nav>
          <Button /> {/* Accesses theme via useTheme() */}
        </Nav>
      </Header>
    </Layout>
  </App>
</ThemeProvider>
```

### 4. Storing Derived State

```tsx
// ❌ Bad - storing calculated value
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]); // Unnecessary!

useEffect(() => {
  setFilteredItems(items.filter(item => item.active));
}, [items]);

// ✅ Good - derive state
const [items] = useState([]);
const filteredItems = items.filter(item => item.active); // Computed on render
```

### 5. Not Using URL State for Shareable State

```tsx
// ❌ Bad - local state for filters
const [filter, setFilter] = useState("all");
// User can't share/bookmark filtered view

// ✅ Good - URL state for filters
const searchParams = useSearchParams();
const filter = searchParams.get("filter") ?? "all";
// URL is shareable: /work?filter=active
```
