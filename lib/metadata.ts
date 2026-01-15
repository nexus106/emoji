import type { Metadata } from "next";
import type { Emoji, EmojiCategoryData } from "./types";
import { getSiteUrl, getEmojiUrl, getCategoryUrl, generateEmojiDescription, generateCategoryDescription } from "./seo";

const SITE_NAME = "Emoji Copy";

/**
 * Base site metadata
 */
export function getSiteMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${SITE_NAME} - Copy & Paste Emojis`,
      template: `%s | ${SITE_NAME}`,
    },
    description: "Copy and paste emojis from a complete emoji dictionary. Browse 2000+ emojis across 8 categories.",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: SITE_NAME,
      title: `${SITE_NAME} - Copy & Paste Emojis`,
      description: "Copy and paste emojis from a complete emoji dictionary.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - Copy & Paste Emojis`,
      description: "Copy and paste emojis from a complete emoji dictionary.",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generate metadata for emoji detail page
 */
export function getEmojiMetadata(emoji: Emoji): Metadata {
  const siteUrl = getSiteUrl();
  const emojiUrl = `${siteUrl}${getEmojiUrl(emoji.id)}`;
  const description = generateEmojiDescription(emoji);

  return {
    title: `${emoji.emoji} ${emoji.name}`,
    description: description,
    openGraph: {
      title: `${emoji.emoji} ${emoji.name} | ${SITE_NAME}`,
      description: description,
      url: emojiUrl,
      type: "website",
      images: [
        {
          url: `/og/emoji-${emoji.id}.png`,
          width: 1200,
          height: 630,
          alt: `${emoji.emoji} ${emoji.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${emoji.emoji} ${emoji.name} | ${SITE_NAME}`,
      description: description,
      images: [`/og/emoji-${emoji.id}.png`],
    },
    alternates: {
      canonical: emojiUrl,
    },
  };
}

/**
 * Generate metadata for category page
 */
export function getCategoryMetadata(category: EmojiCategoryData, page?: number, emojiCount?: number): Metadata {
  const siteUrl = getSiteUrl();
  const categoryUrl = `${siteUrl}${getCategoryUrl(category.id)}`;
  const fullUrl = page && page > 1 ? `${categoryUrl}?page=${page}` : categoryUrl;
  const description = generateCategoryDescription(category, emojiCount);

  const pageTitle = page && page > 1 ? `${category.icon} ${category.label} Emojis (Page ${page})` : `${category.icon} ${category.label} Emojis`;

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: `${pageTitle} | ${SITE_NAME}`,
      description: description,
      url: fullUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${SITE_NAME}`,
      description: description,
    },
    alternates: {
      canonical: categoryUrl,
    },
  };
}

/**
 * Generate not found metadata
 */
export function getNotFoundMetadata(): Metadata {
  return {
    title: "Not Found",
    description: "The page you are looking for does not exist.",
  };
}
