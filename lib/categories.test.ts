import { describe, expect, test } from "bun:test";
import { categories } from "./categories";
import { EmojiCategory } from "./types";

describe("Categories Data", () => {
  test("should have all required categories", () => {
    const requiredCategories: EmojiCategory[] = [
      "smileys",
      "people",
      "animals",
      "food",
      "activities",
      "travel",
      "objects",
      "symbols",
      "flags",
    ];

    expect(categories.length).toBe(requiredCategories.length);

    const categoryIds = categories.map((c) => c.id);
    requiredCategories.forEach((required) => {
      expect(categoryIds).toContain(required);
    });
  });

  test("each category should have required properties", () => {
    categories.forEach((category) => {
      expect(category).toHaveProperty("id");
      expect(category).toHaveProperty("label");
      expect(category).toHaveProperty("icon");
    });
  });

  test("each category icon should be a valid emoji", () => {
    categories.forEach((category) => {
      // Emoji should be non-empty and start with a valid unicode character
      expect(category.icon.length).toBeGreaterThan(0);
      expect(category.icon.codePointAt(0)).toBeGreaterThan(0);
    });
  });

  test("each category label should be non-empty", () => {
    categories.forEach((category) => {
      expect(category.label.length).toBeGreaterThan(0);
    });
  });

  test("category IDs should be unique", () => {
    const ids = categories.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });
});
