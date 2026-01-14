import { describe, expect, test } from "bun:test";
import { categories } from "./categories";
import { getAllEmojis, getEmojisByCategory, searchEmojis } from "./emojis";

describe("Emoji Data", () => {
  test("should have emojis", () => {
    const emojis = getAllEmojis();
    expect(emojis.length).toBeGreaterThan(0);
    // Should have significantly more emojis now with @emoji-mart/data
    expect(emojis.length).toBeGreaterThan(1000);
  });

  test("each emoji should have required properties", () => {
    const emojis = getAllEmojis();
    emojis.forEach((emoji) => {
      expect(emoji).toHaveProperty("id");
      expect(emoji).toHaveProperty("emoji");
      expect(emoji).toHaveProperty("name");
      expect(emoji).toHaveProperty("keywords");
      expect(emoji).toHaveProperty("category");
    });
  });

  test("emojis should only contain valid categories", () => {
    const emojis = getAllEmojis();
    const validCategories = new Set(categories.map((c) => c.id));
    emojis.forEach((emoji) => {
      expect(validCategories.has(emoji.category)).toBe(true);
    });
  });
});

describe("getAllEmojis", () => {
  test("should return all emojis", () => {
    const allEmojis = getAllEmojis();
    expect(allEmojis.length).toBeGreaterThan(0);
    // Calling again should return same result (cached)
    const allEmojis2 = getAllEmojis();
    expect(allEmojis).toEqual(allEmojis2);
  });
});

describe("getEmojisByCategory", () => {
  test("should return emojis for a valid category", () => {
    const peopleEmojis = getEmojisByCategory("people");
    expect(peopleEmojis.length).toBeGreaterThan(0);
    peopleEmojis.forEach((emoji) => {
      expect(emoji.category).toBe("people");
    });
  });

  test("should return different emojis for different categories", () => {
    const peopleEmojis = getEmojisByCategory("people");
    const natureEmojis = getEmojisByCategory("nature");
    expect(peopleEmojis).not.toEqual(natureEmojis);
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
      const matchesName = emoji.name.toLowerCase().includes("cat");
      const matchesId = emoji.id.toLowerCase().includes("cat");
      const matchesKeyword = emoji.keywords.some((k) => k.toLowerCase().includes("cat"));
      expect(matchesName || matchesId || matchesKeyword).toBe(true);
    });
  });

  test("should find emojis by keyword", () => {
    const results = searchEmojis("love");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((emoji) => {
      const matchesName = emoji.name.toLowerCase().includes("love");
      const matchesId = emoji.id.toLowerCase().includes("love");
      const matchesKeyword = emoji.keywords.some((k) => k.toLowerCase().includes("love"));
      expect(matchesName || matchesId || matchesKeyword).toBe(true);
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
    const allEmojis = getAllEmojis();
    expect(results).toEqual(allEmojis);
  });
});
