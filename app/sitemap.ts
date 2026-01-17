import { MetadataRoute } from "next";
import { getAllEmojis } from "@/lib/emojis";
import { categories } from "@/lib/categories";
import { getAllCollections } from "@/lib/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const emojis = getAllEmojis();
  const collections = getAllCollections();

  // Emoji URLs
  const emojiUrls = emojis.map((emoji) => ({
    url: `${baseUrl}/emoji/${emoji.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Category URLs
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Collection URLs
  const collectionUrls = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Homepage
  const homeUrl = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  };

  // Additional pages
  const additionalUrls = [
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [homeUrl, ...additionalUrls, ...categoryUrls, ...collectionUrls, ...emojiUrls];
}
