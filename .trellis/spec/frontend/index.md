# Frontend Development Guidelines

> Best practices for frontend development in this project.

---

## Overview

This directory contains guidelines for frontend development in this Next.js 16 portfolio project. The guidelines document actual conventions used in the codebase, not aspirational patterns.

---

## Guidelines Index

| Guide | Description | Status |
|-------|-------------|--------|
| [Directory Structure](./directory-structure.md) | Module organization and file layout | ✅ Filled |
| [Component Guidelines](./component-guidelines.md) | Component patterns, props, composition | ✅ Filled |
| [Hook Guidelines](./hook-guidelines.md) | Custom hooks, data fetching patterns | ✅ Filled |
| [State Management](./state-management.md) | Local state, global state, server state | ✅ Filled |
| [Quality Guidelines](./quality-guidelines.md) | Code standards, forbidden patterns | ✅ Filled |
| [Type Safety](./type-safety.md) | Type patterns, validation | ✅ Filled |

---

## Quick Reference

### Key Technologies
- **Framework**: Next.js 16 with App Router
- **React**: React 19
- **TypeScript**: 5.8 with strict mode
- **UI Library**: Once UI system
- **Linting**: Biome (formatter + linter)
- **Styling**: CSS Modules with SCSS

### Common Commands

```bash
# Development
npm run dev

# Format code
npm run biome-write

# Type check
npm run build

# Lint
npm run lint
```

### Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # Shared components
├── resources/    # Configuration and content
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

---

## How to Use These Guidelines

### For AI Assistants

When writing code for this project:

1. **Read the relevant guideline** before making changes
2. **Follow the patterns** documented in each file
3. **Check forbidden patterns** to avoid common mistakes
4. **Use code examples** as reference for implementation

### For Developers

When onboarding to this project:

1. **Start with Directory Structure** to understand code organization
2. **Read Component Guidelines** for component patterns
3. **Review Quality Standards** for code review expectations
4. **Check Type Safety** for TypeScript conventions

---

**Language**: All documentation is written in **English**.
