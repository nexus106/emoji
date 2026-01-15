import { MetadataRoute } from "next";
import { getAllEmojis } from "@/lib/emojis";
import { categories } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const emojis = getAllEmojis();

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

  // Homepage
  const homeUrl = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  };

  return [homeUrl, ...categoryUrls, ...emojiUrls];
}
