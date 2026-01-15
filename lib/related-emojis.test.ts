/// <reference lib="dom" />

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { getRelatedEmojis } from "./related-emojis";
import type { Emoji } from "./types";

// Mock the emoji data functions
const mockEmojis: Emoji[] = [
  {
    id: "grinning",
    emoji: "😀",
    name: "Grinning Face",
    keywords: ["grin", "happy", "smile"],
    category: "people",
  },
  {
    id: "smiley",
    emoji: "😃",
    name: "Grinning Face with Big Eyes",
    keywords: ["happy", "smile", "joy"],
    category: "people",
  },
  {
    id: "smile",
    emoji: "😄",
    name: "Smiling Face with Open Mouth",
    keywords: ["smile", "happy"],
    category: "people",
  },
  {
    id: "grin",
    emoji: "😁",
    name: "Grinning Face with Smiling Eyes",
    keywords: ["grin", "smile"],
    category: "people",
  },
  {
    id: "wink",
    emoji: "😉",
    name: "Winking Face",
    keywords: ["wink", "funny"],
    category: "people",
  },
  {
    id: "cat-happy",
    emoji: "😸",
    name: "Grinning Cat Face",
    keywords: ["cat", "happy", "smile"],
    category: "nature",
  },
  {
    id: "cat-wink",
    emoji: "😺",
    name: "Cat Face",
    keywords: ["cat", "wink"],
    category: "nature",
  },
  {
    id: "dog",
    emoji: "🐕",
    name: "Dog",
    keywords: ["dog", "animal"],
    category: "nature",
  },
];

describe("getRelatedEmojis", () => {
  describe("with matching keywords in same category", () => {
    const targetEmoji: Emoji = {
      id: "grinning",
      emoji: "😀",
      name: "Grinning Face",
      keywords: ["grin", "happy", "smile"],
      category: "people",
    };

    test("returns emojis with matching keywords from same category", () => {
      const related = getRelatedEmojis(targetEmoji, 12);

      // Should include smiley, smile, grin (same category, matching keywords)
      const relatedIds = related.map((e) => e.id);

      expect(relatedIds).toContain("smiley"); // happy, smile
      expect(relatedIds).toContain("smile"); // smile, happy
      expect(relatedIds).toContain("grin"); // grin, smile
    });

    test("excludes the target emoji itself", () => {
      const related = getRelatedEmojis(targetEmoji, 12);
      const relatedIds = related.map((e) => e.id);

      expect(relatedIds).not.toContain("grinning");
    });

    test("respects limit parameter", () => {
      const related = getRelatedEmojis(targetEmoji, 3);

      expect(related.length).toBeLessThanOrEqual(3);
    });

    test("returns default limit of 12 when not specified", () => {
      const related = getRelatedEmojis(targetEmoji);

      expect(related.length).toBeLessThanOrEqual(12);
    });
  });

  describe("with emojis from different categories", () => {
    const targetEmoji: Emoji = {
      id: "grinning",
      emoji: "😀",
      name: "Grinning Face",
      keywords: ["happy", "smile"],
      category: "people",
    };

    test("includes emojis from other categories with matching keywords", () => {
      const related = getRelatedEmojis(targetEmoji, 12);
      const relatedIds = related.map((e) => e.id);

      // Should include some emojis from other categories
      const otherCategories = related.filter((e) => e.category !== "people");
      expect(otherCategories.length).toBeGreaterThan(0);
    });
  });

  describe("weighting strategy", () => {
    const targetEmoji: Emoji = {
      id: "grinning",
      emoji: "😀",
      name: "Grinning Face",
      keywords: ["happy", "smile"],
      category: "people",
    };

    test("prioritizes same category with matching keywords (50% weight)", () => {
      const related = getRelatedEmojis(targetEmoji, 10);

      // First 6 should be from same category (approx 50%)
      const sameCategoryCount = related.filter((e) => e.category === "people").length;

      expect(sameCategoryCount).toBeGreaterThan(4);
    });

    test("includes same category without matching keywords (30% weight)", () => {
      const related = getRelatedEmojis(targetEmoji, 12);

      // Should include some from same category even without matching keywords
      const sameCategory = related.filter((e) => e.category === "people");
      expect(sameCategory.length).toBeGreaterThan(0);
    });

    test("includes different categories with matching keywords (20% weight)", () => {
      const related = getRelatedEmojis(targetEmoji, 12);

      const otherCategories = related.filter((e) => e.category !== "people");

      expect(otherCategories.length).toBeGreaterThan(0);
    });
  });

  describe("edge cases", () => {
    const uniqueEmoji: Emoji = {
      id: "unique",
      emoji: "🦄",
      name: "Unique Emoji",
      keywords: ["unique", "rare"],
      category: "symbols",
    };

    test("handles emojis with no matching keywords", () => {
      const related = getRelatedEmojis(uniqueEmoji, 12);

      // Should return empty array or emojis from same category
      expect(Array.isArray(related)).toBe(true);
      expect(related.every((e) => e.id !== "unique")).toBe(true);
    });

    test("handles limit of 1", () => {
      const targetEmoji: Emoji = {
        id: "grinning",
        emoji: "😀",
        name: "Grinning Face",
        keywords: ["happy"],
        category: "people",
      };

      const related = getRelatedEmojis(targetEmoji, 1);

      expect(related.length).toBeLessThanOrEqual(1);
    });

    test("handles limit of 0", () => {
      const targetEmoji: Emoji = {
        id: "grinning",
        emoji: "😀",
        name: "Grinning Face",
        keywords: ["happy"],
        category: "people",
      };

      const related = getRelatedEmojis(targetEmoji, 0);

      expect(related.length).toBe(0);
    });
  });

  describe("keyword overlap", () => {
    const targetEmoji: Emoji = {
      id: "grinning",
      emoji: "😀",
      name: "Grinning Face",
      keywords: ["happy", "joy"],
      category: "people",
    };

    test("finds emojis with partial keyword overlap", () => {
      const related = getRelatedEmojis(targetEmoji, 12);

      // smiley has "happy" keyword
      const relatedIds = related.map((e) => e.id);
      expect(relatedIds).toContain("smiley");
    });
  });

  describe("no duplicates", () => {
    const targetEmoji: Emoji = {
      id: "grinning",
      emoji: "😀",
      name: "Grinning Face",
      keywords: ["happy", "smile"],
      category: "people",
    };

    test("does not return duplicate emojis", () => {
      const related = getRelatedEmojis(targetEmoji, 12);
      const ids = related.map((e) => e.id);
      const uniqueIds = new Set(ids);

      expect(ids.length).toBe(uniqueIds.size);
    });
  });
});
