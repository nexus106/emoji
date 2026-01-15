/// <reference lib="dom" />

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import {
  getSiteUrl,
  getEmojiUrl,
  getCategoryUrl,
  slugify,
  truncateText,
  generateEmojiDescription,
  generateCategoryDescription,
  paginateArray,
  totalPages,
} from "./seo";
import type { Emoji, EmojiCategoryData } from "./types";

describe("SEO Utilities", () => {
  describe("getSiteUrl", () => {
    test("returns localhost URL by default", () => {
      const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const url = getSiteUrl();
      expect(url).toBe("http://localhost:3000");

      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      }
    });

    test("returns custom URL from environment", () => {
      const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

      const url = getSiteUrl();
      expect(url).toBe("https://example.com");

      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    });
  });

  describe("getEmojiUrl", () => {
    test("generates correct emoji URL", () => {
      expect(getEmojiUrl("grinning")).toBe("/emoji/grinning");
      expect(getEmojiUrl("1f600")).toBe("/emoji/1f600");
      expect(getEmojiUrl("smiling-face-with-smiling-eyes")).toBe("/emoji/smiling-face-with-smiling-eyes");
    });
  });

  describe("getCategoryUrl", () => {
    test("generates correct category URL", () => {
      expect(getCategoryUrl("people")).toBe("/category/people");
      expect(getCategoryUrl("nature")).toBe("/category/nature");
      expect(getCategoryUrl("foods")).toBe("/category/foods");
    });
  });

  describe("slugify", () => {
    test("converts text to URL-safe slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("People & Body")).toBe("people-body");
      expect(slugify("Food & Drink")).toBe("food-drink");
      expect(slugify("Test@#$%String")).toBe("teststring");
    });

    test("handles empty string", () => {
      expect(slugify("")).toBe("");
    });

    test("handles multiple spaces", () => {
      expect(slugify("hello    world")).toBe("hello-world");
    });

    test("handles multiple hyphens", () => {
      expect(slugify("hello---world")).toBe("hello-world");
    });
  });

  describe("truncateText", () => {
    test("truncates text to max length", () => {
      expect(truncateText("Hello World", 5)).toBe("Hello...");
      expect(truncateText("This is a long text", 10)).toBe("This is a...");
    });

    test("returns original text if shorter than max", () => {
      expect(truncateText("Hi", 10)).toBe("Hi");
      expect(truncateText("Hello", 5)).toBe("Hello");
    });

    test("returns original text if exact length", () => {
      expect(truncateText("Hello", 5)).toBe("Hello");
    });
  });

  describe("generateEmojiDescription", () => {
    const mockEmoji: Emoji = {
      id: "1f600",
      emoji: "😀",
      name: "Grinning Face",
      keywords: ["grin", "happy", "smile", "joy"],
      category: "people",
    };

    test("generates SEO-friendly description for emoji", () => {
      const description = generateEmojiDescription(mockEmoji);
      expect(description).toContain("😀");
      expect(description).toContain("Grinning Face");
      expect(description).toContain("Keywords:");
      expect(description).toContain("grin");
    });

    test("handles emoji with no keywords", () => {
      const emojiNoKeywords: Emoji = {
        id: "1f600",
        emoji: "😀",
        name: "Grinning Face",
        keywords: [],
        category: "people",
      };

      const description = generateEmojiDescription(emojiNoKeywords);
      expect(description).toBeTruthy();
    });
  });

  describe("generateCategoryDescription", () => {
    const mockCategory: EmojiCategoryData = {
      id: "people",
      label: "People & Body",
      icon: "👋",
    };

    test("generates SEO-friendly description for category", () => {
      const description = generateCategoryDescription(mockCategory, 150);
      expect(description).toContain("People & Body");
      expect(description).toContain("150");
      expect(description).toContain("emojis");
    });

    test("handles category without count", () => {
      const description = generateCategoryDescription(mockCategory);
      expect(description).toContain("People & Body");
      expect(description).toContain("emojis");
    });
  });

  describe("paginateArray", () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    test("returns first page correctly", () => {
      const result = paginateArray(testArray, 1, 3);
      expect(result).toEqual([1, 2, 3]);
    });

    test("returns middle page correctly", () => {
      const result = paginateArray(testArray, 2, 3);
      expect(result).toEqual([4, 5, 6]);
    });

    test("returns last page correctly", () => {
      const result = paginateArray(testArray, 4, 3);
      expect(result).toEqual([10]);
    });

    test("returns empty array for page out of range", () => {
      const result = paginateArray(testArray, 5, 3);
      expect(result).toEqual([]);
    });
  });

  describe("totalPages", () => {
    test("calculates correct total pages", () => {
      expect(totalPages(10, 3)).toBe(4);
      expect(totalPages(10, 5)).toBe(2);
      expect(totalPages(10, 10)).toBe(1);
    });

    test("handles zero items", () => {
      expect(totalPages(0, 10)).toBe(0);
    });

    test("handles partial pages", () => {
      expect(totalPages(11, 5)).toBe(3);
      expect(totalPages(1, 10)).toBe(1);
    });
  });
});
