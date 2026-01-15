import type { Emoji } from "./types";
import { getAllEmojis, getEmojisByCategory } from "./emojis";

/**
 * Get related emojis based on keywords and category
 * 1. Same category with matching keywords (50% weight)
 * 2. Same category without matching keywords (30% weight)
 * 3. Different categories with matching keywords (20% weight)
 */
export function getRelatedEmojis(emoji: Emoji, limit: number = 12): Emoji[] {
  const related: Emoji[] = [];

  // 1. Same category, similar keywords (50% weight)
  const categoryEmojis = getEmojisByCategory(emoji.category)
    .filter((e) => e.id !== emoji.id)
    .filter((e) =>
      e.keywords.some((k) => emoji.keywords.includes(k)) ||
      emoji.keywords.some((k) => e.keywords.includes(k))
    );

  const similarCategoryCount = Math.ceil(limit * 0.5);
  related.push(...categoryEmojis.slice(0, similarCategoryCount));

  // 2. Same category, different emojis (30% weight)
  if (related.length < limit) {
    const moreFromCategory = getEmojisByCategory(emoji.category)
      .filter((e) => e.id !== emoji.id && !related.find((r) => r.id === e.id))
      .slice(0, Math.ceil(limit * 0.3));

    related.push(...moreFromCategory);
  }

  // 3. Different categories, matching keywords (20% weight)
  if (related.length < limit) {
    const allEmojis = getAllEmojis();
    const fromOtherCategories = allEmojis
      .filter(
        (e) =>
          e.id !== emoji.id &&
          e.category !== emoji.category &&
          !related.find((r) => r.id === e.id) &&
          e.keywords.some((k) => emoji.keywords.includes(k))
      )
      .slice(0, Math.ceil(limit * 0.2));

    related.push(...fromOtherCategories);
  }

  return related.slice(0, limit);
}
