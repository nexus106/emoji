# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application bootstrapped with `create-next-app`. It uses the App Router architecture with React 19, TypeScript, and Tailwind CSS v4. This is an emoji dictionary website that allows users to browse, search, and copy emojis.

## Development Commands

- **Start dev server**: `bun run dev` (uses Bun as the runtime)
- **Build for production**: `bun run build`
- **Start production server**: `bun run start`
- **Lint code**: `bun run lint`
- **Run tests**: `bun test`
- **Generate emoji data**: `bun run generate-emojis` (pre-generates `lib/emojis.json`)

Note: This project uses Bun as the package manager and runtime. All npm scripts are prefixed with `bun --bun`.

## Architecture

### App Router Structure
- `app/layout.tsx` - Root layout with font configuration (Geist Sans and Geist Mono)
- `app/page.tsx` - Home page component
- `app/emoji/[id]/page.tsx` - Dynamic emoji detail pages with CopyButton component
- `app/emoji/[id]/error.tsx` - Error boundary for emoji pages
- `app/emoji/[id]/loading.tsx` - Loading state for emoji pages
- `app/category/[slug]/page.tsx` - Dynamic category listing pages with pagination
- `app/category/[slug]/error.tsx` - Error boundary for category pages
- `app/category/[slug]/loading.tsx` - Loading state for category pages
- `app/collections/page.tsx` - Collections index page
- `app/collections/[id]/page.tsx` - Dynamic collection detail pages
- `app/guide/page.tsx` - Guide/how-to page
- `app/trending/page.tsx` - Trending/popular emojis page
- `app/robots.ts` - Dynamic robots.txt generation
- `app/sitemap.ts` - Dynamic sitemap.xml generation
- `app/globals.css` - Global styles using Tailwind CSS v4's `@import "tailwindcss"` syntax

### Components Structure (`components/`)
- `components/seo/Breadcrumb.tsx` - Breadcrumb navigation component
- `components/seo/EmojiCard.tsx` - Emoji card component for listings
- `components/seo/JsonLd.tsx` - JSON-LD structured data component
- `components/seo/Pagination.tsx` - Pagination component
- `components/seo/PopularEmojis.tsx` - Popular emojis section component

Each component has a corresponding test file (`.test.tsx`).

### Library Structure (`lib/`)
Core data and utilities:
- `lib/types.ts` - TypeScript type definitions (Emoji, EmojiCategory, EmojiCategoryData, BreadcrumbItem, etc.)
- `lib/emojis.json` - Pre-generated emoji data (2000+ emojis)
- `lib/emojis.ts` - Emoji data access layer with functions like `getAllEmojis()`, `getEmojiById()`, `searchEmojis()`
- `lib/categories.ts` - Emoji category definitions and `getCategoryById()`, `getAllCategories()`
- `lib/collections.ts` - Collection definitions and helpers
- `lib/popular-emojis.ts` - Popular/trending emoji data

SEO & Metadata:
- `lib/metadata.ts` - Metadata generation functions (`getSiteMetadata()`, `getEmojiMetadata()`, `getCategoryMetadata()`)
- `lib/seo.ts` - SEO utilities (`getSiteUrl()`, `getEmojiUrl()`, `getCategoryUrl()`, `slugify()`, `paginateArray()`)
- `lib/structured-data.ts` - JSON-LD schema generators (`getWebSiteSchema()`, `getEmojiSchema()`, `getBreadcrumbSchema()`)
- `lib/related-emojis.ts` - Related emoji suggestions

Each module has a corresponding test file (`.test.ts` or `.test.tsx`).

### Scripts (`scripts/`)
- `scripts/generate-emojis.ts` - Generates `lib/emojis.json` from `@emoji-mart/data`
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
- Emoji data is pre-generated into `lib/emojis.json` via `scripts/generate-emojis.ts`
- Supports 8 categories: people, nature, foods, activity, places, objects, symbols, flags
- `lib/emojis.ts` provides functions to access the JSON data with caching

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

### SEO Features
- Dynamic metadata generation for all pages
- Structured data (JSON-LD) for search engines
- Breadcrumb navigation
- Pagination for category pages
- Related emoji suggestions
- Popular/trending emojis section
- Dynamic sitemap and robots.txt generation
- Open Graph and Twitter Card support

## Key Patterns

- Next.js Image component is used for optimization
- All components use client-side `className` prop (standard React 19 pattern)
- Dark mode classes follow the pattern `dark:prop` (Tailwind convention)
- Emoji data access should use functions from `lib/emojis.ts` (e.g., `getAllEmojis()`, `searchEmojis()`)
- Emoji data is loaded from `lib/emojis.json` for performance
- All pages use dynamic metadata generation from `lib/metadata.ts`
- Structured data is generated using functions from `lib/structured-data.ts`
- SEO utilities are available in `lib/seo.ts` for URL generation and text processing
