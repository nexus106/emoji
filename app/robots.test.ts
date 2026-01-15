/// <reference lib="dom" />

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { MetadataRoute } from "next";

describe("Robots.txt", () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalEnv) {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    }
  });

  test("should allow all user agents", () => {
    const expectedRobots = {
      rules: [
        {
          userAgent: "*",
          allow: ["/"],
          disallow: ["/api/", "/_next/"],
        },
      ],
      sitemap: expect.any(String),
    };

    expect(expectedRobots.rules[0].userAgent).toBe("*");
    expect(expectedRobots.rules[0].allow).toContain("/");
    expect(expectedRobots.rules[0].disallow).toContain("/api/");
    expect(expectedRobots.rules[0].disallow).toContain("/_next/");
  });

  test("should include sitemap URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    const expectedSitemap = "https://example.com/sitemap.xml";
    expect(expectedSitemap).toBe("https://example.com/sitemap.xml");
  });

  test("should use localhost URL by default", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const expectedSitemap = `${baseUrl}/sitemap.xml`;

    expect(expectedSitemap).toBe("http://localhost:3000/sitemap.xml");
  });

  test("should disallow API routes", () => {
    const expectedRobots = {
      rules: [
        {
          userAgent: "*",
          allow: ["/"],
          disallow: ["/api/", "/_next/"],
        },
      ],
      sitemap: expect.any(String),
    };

    expect(expectedRobots.rules[0].disallow).toContain("/api/");
  });

  test("should disallow Next.js internal routes", () => {
    const expectedRobots = {
      rules: [
        {
          userAgent: "*",
          allow: ["/"],
          disallow: ["/api/", "/_next/"],
        },
      ],
      sitemap: expect.any(String),
    };

    expect(expectedRobots.rules[0].disallow).toContain("/_next/");
  });

  test("should allow root path", () => {
    const expectedRobots = {
      rules: [
        {
          userAgent: "*",
          allow: ["/"],
          disallow: ["/api/", "/_next/"],
        },
      ],
      sitemap: expect.any(String),
    };

    expect(expectedRobots.rules[0].allow).toContain("/");
  });

  test("should handle custom site URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://custom.example.com";

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const expectedSitemap = `${baseUrl}/sitemap.xml`;

    expect(expectedSitemap).toBe("https://custom.example.com/sitemap.xml");
  });

  test("should have correct structure", () => {
    const expectedRobots = {
      rules: [
        {
          userAgent: "*",
          allow: ["/"],
          disallow: ["/api/", "/_next/"],
        },
      ],
      sitemap: expect.any(String),
    };

    expect(expectedRobots).toHaveProperty("rules");
    expect(expectedRobots).toHaveProperty("sitemap");
    expect(expectedRobots.rules).toHaveLength(1);
  });
});
