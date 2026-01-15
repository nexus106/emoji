# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application bootstrapped with `create-next-app`. It uses the App Router architecture with React 19, TypeScript, and Tailwind CSS v4.

## Development Commands

- **Start dev server**: `bun run dev` (uses Bun as the runtime)
- **Build for production**: `bun run build`
- **Start production server**: `bun run start`
- **Lint code**: `bun run lint`
- **Run tests**: `bun test`

Note: This project uses Bun as the package manager and runtime. All npm scripts are prefixed with `bun --bun`.

## Architecture

### App Router Structure
- `app/layout.tsx` - Root layout with font configuration (Geist Sans and Geist Mono)
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles using Tailwind CSS v4's `@import "tailwindcss"` syntax
- `app/page.test.tsx` - Home page component tests

### Library Structure (`lib/`)
- `lib/types.ts` - TypeScript type definitions (Emoji, EmojiCategory, etc.)
- `lib/emojis.ts` - Emoji data access layer with caching (uses @emoji-mart/data)
- `lib/categories.ts` - Emoji category definitions
- `lib/*.test.ts` - Unit tests for library modules

### Scripts (`scripts/`)
- `scripts/screenshot.ts` - Playwright script for taking screenshots of the app

### Styling
- Uses Tailwind CSS v4 with the new `@import "tailwindcss"` syntax
- CSS variables defined in `:root` for theming (background/foreground colors)
- Dark mode support via `@media (prefers-color-scheme: dark)`
- Inline theme configuration in `@theme inline` block for CSS custom properties integration

### TypeScript Configuration
- Path alias `@/*` maps to root directory for cleaner imports
- Strict mode enabled
- Target: ES2017 with `dom.iterable` and `esnext` libs

### Data Source
- Uses `@emoji-mart/data` as the emoji data provider
- Emoji data is normalized and cached in `lib/emojis.ts`
- Supports 8 categories: people, nature, foods, activity, places, objects, symbols, flags

### Testing Setup
- Test framework: Bun's built-in test runner
- DOM testing: Happy DOM (via `@happy-dom/global-registrator`)
- Component testing: React Testing Library (`@testing-library/react`)
- E2E testing: Playwright (for screenshot script)
- All tests use `.test.ts` or `.test.tsx` suffix

### Font Setup
The root layout uses `next/font/google` to load Geist fonts:
- `--font-geist-sans` variable for sans-serif text
- `--font-geist-mono` variable for monospace text
- Applied via CSS variables to Tailwind's theme

## Key Patterns

- Next.js Image component is used for optimization
- All components use client-side `className` prop (standard React 19 pattern)
- Dark mode classes follow the pattern `dark:prop` (Tailwind convention)
- Emoji data access should use functions from `lib/emojis.ts` (e.g., `getAllEmojis()`, `searchEmojis()`)
- Emoji data is cached in-memory for performance
