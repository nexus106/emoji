import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getEmojiById, getEmojisByCategory } from "@/lib/emojis";
import { categories } from "@/lib/categories";
import { getEmojiMetadata } from "@/lib/metadata";
import { getEmojiSchema, getBreadcrumbSchema, type BreadcrumbItem } from "@/lib/structured-data";
import { getEmojiUrl, getCategoryUrl } from "@/lib/seo";
import { getRelatedEmojis } from "@/lib/related-emojis";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import EmojiCard from "@/components/seo/EmojiCard";
import CopyButton from "./CopyButton";

// Revalidate every 24 hours (ISR)
export const revalidate = 86400;

/**
 * Generate metadata for emoji page
 */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const emoji = getEmojiById(params.id);

  if (!emoji) {
    return {
      title: "Emoji Not Found",
    };
  }

  return getEmojiMetadata(emoji);
}

/**
 * Generate static params for first 1000 emojis
 */
export async function generateStaticParams() {
  const emojis = getEmojisByCategory("people").slice(0, 100); // Limit for build time
  return emojis.map((emoji) => ({
    id: emoji.id,
  }));
}

/**
 * Get category by id
 */
function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export default function EmojiPage({ params }: { params: { id: string } }) {
  const emoji = getEmojiById(params.id);

  if (!emoji) {
    notFound();
  }

  const category = getCategoryById(emoji.category);
  const relatedEmojis = getRelatedEmojis(emoji, 12);

  // Generate breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: category?.label || emoji.category, href: getCategoryUrl(emoji.category) },
    { name: `${emoji.emoji} ${emoji.name}`, href: getEmojiUrl(emoji.id) },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Structured Data */}
        <JsonLd data={getEmojiSchema(emoji, `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${getEmojiUrl(emoji.id)}`)} />
        <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Back to Home */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Emoji Header */}
        <header className="mb-8 rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Large Emoji Display */}
            <div className="flex shrink-0 items-center justify-center rounded-2xl bg-zinc-100 p-8 text-8xl dark:bg-zinc-800 md:text-9xl">
              {emoji.emoji}
            </div>

            {/* Emoji Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                {emoji.name}
              </h1>
              <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-400">
                {emoji.emoji} {emoji.name}
              </p>

              {/* Copy Button */}
              <div className="mb-6">
                <CopyButton emoji={emoji.emoji} />
              </div>

              {/* Keywords */}
              {emoji.keywords.length > 0 && (
                <div className="mb-4">
                  <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Keywords
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {emoji.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Category */}
              {category && (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Category
                  </h2>
                  <Link
                    href={getCategoryUrl(category.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Related Emojis */}
        {relatedEmojis.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Related Emojis
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
              {relatedEmojis.map((relatedEmoji) => (
                <EmojiCard key={relatedEmoji.id} emoji={relatedEmoji} size="md" />
              ))}
            </div>
          </section>
        )}

        {/* More in Category */}
        {category && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              More in {category.icon} {category.label}
            </h2>
            <Link
              href={getCategoryUrl(category.id)}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              View All {category.label} Emojis
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
