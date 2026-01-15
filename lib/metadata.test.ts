/// <reference lib="dom" />

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import {
  getSiteMetadata,
  getEmojiMetadata,
  getCategoryMetadata,
  getNotFoundMetadata,
} from "./metadata";
import type { Emoji, EmojiCategoryData } from "./types";

describe("Metadata Generators", () => {
  describe("getSiteMetadata", () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

    afterEach(() => {
      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    });

    test("generates base site metadata with localhost", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const metadata = getSiteMetadata();

      expect(metadata).toEqual({
        metadataBase: expect.any(URL),
        title: {
          default: "Emoji Copy - Copy & Paste Emojis",
          template: "%s | Emoji Copy",
        },
        description: expect.any(String),
        openGraph: {
          type: "website",
          locale: "en_US",
          url: "http://localhost:3000",
          siteName: "Emoji Copy",
          title: "Emoji Copy - Copy & Paste Emojis",
          description: expect.any(String),
          images: [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: "Emoji Copy",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: "Emoji Copy - Copy & Paste Emojis",
          description: expect.any(String),
          images: ["/og-image.png"],
        },
        robots: {
          index: true,
          follow: true,
        },
      });
    });

    test("generates metadata with custom URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

      const metadata = getSiteMetadata();

      expect(metadata.metadataBase).toEqual(new URL("https://example.com"));
      expect(metadata.openGraph?.url).toBe("https://example.com");
    });

    test("includes title template", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const metadata = getSiteMetadata();

      expect(metadata.title).toEqual({
        default: "Emoji Copy - Copy & Paste Emojis",
        template: "%s | Emoji Copy",
      });
    });
  });

  describe("getEmojiMetadata", () => {
    const mockEmoji: Emoji = {
      id: "1f600",
      emoji: "😀",
      name: "Grinning Face",
      keywords: ["grin", "happy", "smile"],
      category: "people",
    };

    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

    afterEach(() => {
      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    });

    test("generates metadata for emoji page", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const metadata = getEmojiMetadata(mockEmoji);

      expect(metadata.title).toContain("😀");
      expect(metadata.title).toContain("Grinning Face");
      expect(metadata.description).toBeTruthy();
      expect(metadata.alternates?.canonical).toContain("/emoji/1f600");
    });

    test("includes Open Graph metadata", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const metadata = getEmojiMetadata(mockEmoji);

      expect(metadata.openGraph).toEqual({
        type: "website",
        title: expect.stringContaining("😀"),
        description: expect.any(String),
        url: expect.stringContaining("/emoji/1f600"),
        images: [
          {
            url: "/og/emoji-1f600.png",
            width: 1200,
            height: 630,
            alt: "😀 Grinning Face",
          },
        ],
      });
    });

    test("includes Twitter metadata", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const metadata = getEmojiMetadata(mockEmoji);

      expect(metadata.twitter).toEqual({
        card: "summary_large_image",
        title: expect.stringContaining("😀"),
        description: expect.any(String),
        images: ["/og/emoji-1f600.png"],
      });
    });

    test("includes canonical URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

      const metadata = getEmojiMetadata(mockEmoji);

      expect(metadata.alternates?.canonical).toBe("https://example.com/emoji/1f600");
    });
  });

  describe("getCategoryMetadata", () => {
    const mockCategory: EmojiCategoryData = {
      id: "people",
      label: "People & Body",
      icon: "👋",
    };

    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

    afterEach(() => {
      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    });

    test("generates metadata for category page", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const metadata = getCategoryMetadata(mockCategory, 1, 150);

      expect(metadata.title).toContain("👋");
      expect(metadata.title).toContain("People & Body");
      expect(metadata.description).toContain("150");
      expect(metadata.description).toContain("People & Body");
    });

    test("includes page number in title for paginated pages", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const metadata = getCategoryMetadata(mockCategory, 2, 150);

      expect(metadata.title).toContain("Page 2");
    });

    test("does not include page number for first page", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      const metadata = getCategoryMetadata(mockCategory, 1, 150);

      expect(metadata.title).not.toContain("Page 1");
    });

    test("includes canonical URL without page params", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

      const metadata = getCategoryMetadata(mockCategory, 2, 150);

      expect(metadata.alternates?.canonical).toBe("https://example.com/category/people");
    });
  });

  describe("getNotFoundMetadata", () => {
    test("generates not found metadata", () => {
      const metadata = getNotFoundMetadata();

      expect(metadata).toEqual({
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      });
    });
  });
});
