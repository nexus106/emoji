import type { Emoji, EmojiCategoryData } from "./types";
import { getSiteUrl, getEmojiUrl, getCategoryUrl, generateEmojiDescription } from "./seo";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Generate WebSite schema for root
 */
export function getWebSiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Emoji Copy",
    url: siteUrl,
    description: "Copy and paste emojis from a complete emoji dictionary. Browse 2000+ emojis across 8 categories.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate ImageObject schema for emoji
 */
export function getEmojiSchema(emoji: Emoji, url: string) {
  const siteUrl = getSiteUrl();
  const description = generateEmojiDescription(emoji);

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: emoji.name,
    description: description,
    contentUrl: url,
    thumbnailUrl: `${siteUrl}/og/emoji-${emoji.id}.png`,
    representativeOfPage: true,
    associatedArticle: {
      "@type": "Article",
      headline: `${emoji.emoji} ${emoji.name} - Emoji Dictionary`,
      description: description,
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${siteUrl}${item.href}`,
    })),
  };
}

/**
 * Generate CollectionPage schema for category pages
 */
export function getCollectionPageSchema(
  emojis: Emoji[],
  category: EmojiCategoryData,
  url: string
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.icon} ${category.label} Emojis`,
    description: `Browse all ${category.label} emojis. Copy and paste ${emojis.length} ${category.label.toLowerCase()} emojis.`,
    url: url,
    about: {
      "@type": "Thing",
      name: `${category.label} Emojis`,
    },
    numberOfItems: emojis.length,
    itemListElement: emojis.slice(0, 10).map((emoji, index) => ({
      "@type": "ImageObject",
      position: index + 1,
      name: emoji.name,
      contentUrl: `${siteUrl}${getEmojiUrl(emoji.id)}`,
      thumbnail: emoji.emoji,
    })),
  };
}

/**
 * Generate WebPage schema for generic pages
 */
export function getWebPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    inLanguage: "en",
  };
}
