import type { Emoji, EmojiCategoryData } from "./types";

/**
 * Get the base site URL from environment or default to localhost
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

/**
 * Generate canonical URL for an emoji page
 */
export function getEmojiUrl(id: string): string {
  return `/emoji/${id}`;
}

/**
 * Generate canonical URL for a category page
 */
export function getCategoryUrl(slug: string): string {
  return `/category/${slug}`;
}

/**
 * Convert text to URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Truncate text to max length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate SEO-friendly description for an emoji
 */
export function generateEmojiDescription(emoji: Emoji): string {
  const keywords = emoji.keywords.slice(0, 3).join(", ");
  return `Copy and use the ${emoji.emoji} ${emoji.name} emoji. ${keywords && `Keywords: ${keywords}.`}`;
}

/**
 * Generate SEO-friendly description for a category
 */
export function generateCategoryDescription(category: EmojiCategoryData, emojiCount?: number): string {
  const count = emojiCount ?? 0;
  return `Browse all ${category.label} emojis. Copy and paste ${count}+ ${category.label.toLowerCase()} emojis.`;
}

/**
 * Paginate an array
 */
export function paginateArray<T>(array: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return array.slice(start, start + perPage);
}

/**
 * Calculate total pages
 */
export function totalPages(count: number, perPage: number): number {
  return Math.ceil(count / perPage);
}
