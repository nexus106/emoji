/// <reference lib="dom" />

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import {
  getWebSiteSchema,
  getEmojiSchema,
  getBreadcrumbSchema,
  getCollectionPageSchema,
  getWebPageSchema,
  type BreadcrumbItem,
} from "./structured-data";
import type { Emoji, EmojiCategoryData } from "./types";

describe("Structured Data Generators", () => {
  describe("getWebSiteSchema", () => {
    test("generates valid WebSite schema", () => {
      const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

      const schema = getWebSiteSchema();

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Emoji Copy",
        url: "https://example.com",
        description: expect.any(String),
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://example.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      });

      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    });
  });

  describe("getEmojiSchema", () => {
    const mockEmoji: Emoji = {
      id: "1f600",
      emoji: "😀",
      name: "Grinning Face",
      keywords: ["grin", "happy", "smile"],
      category: "people",
    };

    test("generates valid ImageObject schema", () => {
      const schema = getEmojiSchema(mockEmoji, "https://example.com/emoji/1f600");

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: "Grinning Face",
        description: expect.any(String),
        contentUrl: "https://example.com/emoji/1f600",
        thumbnailUrl: expect.stringContaining("emoji-1f600"),
        representativeOfPage: true,
        associatedArticle: {
          "@type": "Article",
          headline: expect.stringContaining("Grinning Face"),
          description: expect.any(String),
        },
      });
    });

    test("includes emoji in description", () => {
      const schema = getEmojiSchema(mockEmoji, "https://example.com/emoji/1f600");

      expect(schema.description).toContain("😀");
      expect(schema.description).toContain("Grinning Face");
    });
  });

  describe("getBreadcrumbSchema", () => {
    const items: BreadcrumbItem[] = [
      { name: "Home", href: "/" },
      { name: "People", href: "/category/people" },
      { name: "Grinning Face", href: "/emoji/1f600" },
    ];

    test("generates valid BreadcrumbList schema", () => {
      const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

      const schema = getBreadcrumbSchema(items);

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://example.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "People",
            item: "https://example.com/category/people",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Grinning Face",
            item: "https://example.com/emoji/1f600",
          },
        ],
      });

      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    });

    test("handles single item", () => {
      const singleItem: BreadcrumbItem[] = [{ name: "Home", href: "/" }];
      const schema = getBreadcrumbSchema(singleItem);

      expect(schema.itemListElement).toHaveLength(1);
      expect(schema.itemListElement[0].position).toBe(1);
    });

    test("handles empty items", () => {
      const schema = getBreadcrumbSchema([]);

      expect(schema.itemListElement).toEqual([]);
    });
  });

  describe("getCollectionPageSchema", () => {
    const mockCategory: EmojiCategoryData = {
      id: "people",
      label: "People & Body",
      icon: "👋",
    };

    const mockEmojis: Emoji[] = [
      {
        id: "1f600",
        emoji: "😀",
        name: "Grinning Face",
        keywords: ["grin"],
        category: "people",
      },
      {
        id: "1f603",
        emoji: "😃",
        name: "Grinning Face with Big Eyes",
        keywords: ["happy"],
        category: "people",
      },
    ];

    test("generates valid CollectionPage schema", () => {
      const schema = getCollectionPageSchema(mockEmojis, mockCategory, "https://example.com/category/people");

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "👋 People & Body Emojis",
        description: expect.stringContaining("People & Body"),
        url: "https://example.com/category/people",
        about: {
          "@type": "Thing",
          name: "People & Body Emojis",
        },
        numberOfItems: 2,
        itemListElement: expect.any(Array),
      });
    });

    test("includes emojis in itemListElement", () => {
      const schema = getCollectionPageSchema(mockEmojis, mockCategory, "https://example.com/category/people");

      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0]).toEqual({
        "@type": "ImageObject",
        position: 1,
        name: "Grinning Face",
        contentUrl: expect.stringContaining("/emoji/1f600"),
        thumbnail: "😀",
      });
    });

    test("limits itemListElement to 10 items", () => {
      const manyEmojis: Emoji[] = Array.from({ length: 15 }, (_, i) => ({
        id: `emoji-${i}`,
        emoji: "😀",
        name: `Emoji ${i}`,
        keywords: [],
        category: "people",
      }));

      const schema = getCollectionPageSchema(manyEmojis, mockCategory, "https://example.com/category/people");

      expect(schema.itemListElement).toHaveLength(10);
      expect(schema.numberOfItems).toBe(15);
    });
  });

  describe("getWebPageSchema", () => {
    test("generates valid WebPage schema", () => {
      const schema = getWebPageSchema(
        "Test Page",
        "Test description",
        "https://example.com/test"
      );

      expect(schema).toEqual({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Test Page",
        description: "Test description",
        url: "https://example.com/test",
        inLanguage: "en",
      });
    });

    test("handles special characters in title and description", () => {
      const schema = getWebPageSchema(
        "Test & Page: Hello!",
        "Description with \"quotes\" and 'apostrophes'",
        "https://example.com/test"
      );

      expect(schema.name).toBe("Test & Page: Hello!");
      expect(schema.description).toBe("Description with \"quotes\" and 'apostrophes'");
    });
  });
});
