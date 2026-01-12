import { describe, expect, test } from "bun:test";
import { categories } from "./categories";
import { emojis, getAllEmojis, getEmojisByCategory, searchEmojis } from "./emojis";

describe("Emoji Data", () => {
  test("should have at least one emoji", () => {
    expect(emojis.length).toBeGreaterThan(0);
  });

  test("each emoji should have required properties", () => {
    emojis.forEach((emoji) => {
      expect(emoji).toHaveProperty("emoji");
      expect(emoji).toHaveProperty("name");
      expect(emoji).toHaveProperty("keywords");
      expect(emoji).toHaveProperty("category");
    });
  });

  test("each emoji should have at least one keyword", () => {
    emojis.forEach((emoji) => {
      expect(emoji.keywords.length).toBeGreaterThan(0);
    });
  });

  test("emojis should only contain valid categories", () => {
    const validCategories = new Set(categories.map((c) => c.id));
    emojis.forEach((emoji) => {
      expect(validCategories.has(emoji.category)).toBe(true);
    });
  });
});

describe("getAllEmojis", () => {
  test("should return all emojis", () => {
    const allEmojis = getAllEmojis();
    expect(allEmojis).toEqual(emojis);
    expect(allEmojis.length).toBe(emojis.length);
  });
});

describe("getEmojisByCategory", () => {
  test("should return emojis for a valid category", () => {
    const smileyEmojis = getEmojisByCategory("smileys");
    expect(smileyEmojis.length).toBeGreaterThan(0);
    smileyEmojis.forEach((emoji) => {
      expect(emoji.category).toBe("smileys");
    });
  });

  test("should return different emojis for different categories", () => {
    const smileyEmojis = getEmojisByCategory("smileys");
    const animalEmojis = getEmojisByCategory("animals");
    expect(smileyEmojis).not.toEqual(animalEmojis);
  });

  test("should return empty array for non-existent category", () => {
    const result = getEmojisByCategory("nonexistent" as any);
    expect(result).toEqual([]);
  });

  test("all categories should have at least one emoji", () => {
    categories.forEach((category) => {
      const categoryEmojis = getEmojisByCategory(category.id);
      expect(categoryEmojis.length).toBeGreaterThan(0);
    });
  });
});

describe("searchEmojis", () => {
  test("should find emojis by name", () => {
    const results = searchEmojis("cat");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((emoji) => {
      expect(emoji.name.toLowerCase()).toContain("cat");
    });
  });

  test("should find emojis by keyword", () => {
    const results = searchEmojis("love");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((emoji) => {
      const matchesName = emoji.name.toLowerCase().includes("love");
      const matchesKeyword = emoji.keywords.some((k) => k.toLowerCase().includes("love"));
      expect(matchesName || matchesKeyword).toBe(true);
    });
  });

  test("should be case insensitive", () => {
    const lowerResults = searchEmojis("dog");
    const upperResults = searchEmojis("DOG");
    const mixedResults = searchEmojis("DoG");
    expect(lowerResults).toEqual(upperResults);
    expect(lowerResults).toEqual(mixedResults);
  });

  test("should return empty array for non-matching query", () => {
    const results = searchEmojis("nonexistentemoji123");
    expect(results).toEqual([]);
  });

  test("should return all emojis for empty string", () => {
    const results = searchEmojis("");
    expect(results).toEqual(emojis);
  });
});
