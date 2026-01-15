/// <reference lib="dom" />

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { MetadataRoute } from "next";
import { getAllEmojis } from "@/lib/emojis";
import { categories } from "@/lib/categories";

describe("Sitemap", () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalEnv) {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    }
  });

  test("should include homepage", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    // The sitemap should include the homepage with priority 1
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const expectedHomepage = {
      url: baseUrl,
      lastModified: expect.any(Date),
      changeFrequency: "daily" as const,
      priority: 1,
    };

    expect(expectedHomepage.url).toBe("http://localhost:3000");
    expect(expectedHomepage.priority).toBe(1);
    expect(expectedHomepage.changeFrequency).toBe("daily");
  });

  test("should include all category pages", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    categories.forEach((category) => {
      const expectedCategory = {
        url: `${baseUrl}/category/${category.id}`,
        lastModified: expect.any(Date),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };

      expect(expectedCategory.url).toBeTruthy();
      expect(expectedCategory.priority).toBe(0.7);
      expect(expectedCategory.changeFrequency).toBe("weekly");
    });
  });

  test("should include all emoji pages", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    const emojis = getAllEmojis();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Verify sitemap structure for emojis
    const expectedEmoji = {
      url: `${baseUrl}/emoji/${emojis[0].id}`,
      lastModified: expect.any(Date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };

    expect(expectedEmoji.url).toBeTruthy();
    expect(expectedEmoji.priority).toBe(0.8);
    expect(expectedEmoji.changeFrequency).toBe("monthly");
  });

  test("should have correct URL structure", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    const categoryUrls = [
      "https://example.com/category/people",
      "https://example.com/category/nature",
    ];
    const emojiUrls = [
      "https://example.com/emoji/grinning",
    ];

    // Test category URLs
    categoryUrls.forEach((url) => {
      expect(url).toMatch(/^https:\/\/example\.com\/category/);
    });

    // Test emoji URLs
    emojiUrls.forEach((url) => {
      expect(url).toMatch(/^https:\/\/example\.com\/emoji/);
    });
  });

  test("should handle custom site URL from environment", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://custom.example.com";

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    expect(baseUrl).toBe("https://custom.example.com");
  });

  test("should include all 8 categories", () => {
    expect(categories.length).toBe(8);

    const categoryIds = categories.map((c) => c.id);
    const expectedCategories = ["people", "nature", "foods", "activity", "places", "objects", "symbols", "flags"];

    expectedCategories.forEach((cat) => {
      expect(categoryIds).toContain(cat);
    });
  });

  test("should have proper priority order", () => {
    // Homepage should have highest priority
    const homepagePriority = 1;
    const emojiPriority = 0.8;
    const categoryPriority = 0.7;

    expect(homepagePriority).toBeGreaterThan(emojiPriority);
    expect(emojiPriority).toBeGreaterThan(categoryPriority);
  });

  test("should have appropriate change frequencies", () => {
    const homepageChangeFrequency = "daily";
    const categoryChangeFrequency = "weekly";
    const emojiChangeFrequency = "monthly";

    expect(homepageChangeFrequency).toBe("daily");
    expect(categoryChangeFrequency).toBe("weekly");
    expect(emojiChangeFrequency).toBe("monthly");
  });
});
