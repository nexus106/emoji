import type { Metadata } from "next";
import Link from "next/link";
import { getPopularEmojis } from "@/lib/popular-emojis";
import { getSiteUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import type { BreadcrumbItem } from "@/lib/structured-data";
import EmojiCard from "@/components/seo/EmojiCard";

const SITE_NAME = "Emoji Copy";

// Revalidate every 24 hours
export const revalidate = 86400;

/**
 * Generate metadata for trending page
 */
export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: `Trending Emojis | ${SITE_NAME}`,
    description: "Discover the most popular and trending emojis. Browse the top emojis that people are using right now.",
    openGraph: {
      title: `Trending Emojis | ${SITE_NAME}`,
      description: "Discover the most popular and trending emojis. Browse the top emojis that people are using right now.",
      url: `${siteUrl}/trending`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Trending Emojis | ${SITE_NAME}`,
      description: "Discover the most popular and trending emojis.",
    },
    alternates: {
      canonical: `${siteUrl}/trending`,
    },
  };
}

/**
 * Generate structured data for trending page
 */
function getTrendingSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Trending Emojis",
    description: "Discover the most popular and trending emojis.",
    url: `${siteUrl}/trending`,
  };
}

export default async function TrendingPage() {
  const trendingEmojis = await getPopularEmojis(100);

  // Generate breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: "Trending Emojis", href: "/trending" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Structured Data */}
        <JsonLd data={getTrendingSchema()} />
        <JsonLd data={await import("@/lib/structured-data").then(m => m.getBreadcrumbSchema(breadcrumbItems))} />

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

        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <span className="text-6xl">🔥</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Trending Emojis
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Discover the most popular emojis that people are using right now.
            Browse the top {trendingEmojis.length} trending emojis.
          </p>
        </header>

        {/* Ranking Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {trendingEmojis.map((emoji, index) => (
            <Link
              key={emoji.id}
              href={`/emoji/${emoji.id}`}
              className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:bg-zinc-100 hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              {/* Rank Badge */}
              <div className={`flex shrink-0 items-center justify-center rounded-full font-bold ${
                index < 3
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-10 h-10 text-lg"
                  : "bg-zinc-200 text-zinc-600 w-8 h-8 text-sm dark:bg-zinc-800 dark:text-zinc-400"
              }`}>
                {index + 1}
              </div>

              {/* Emoji */}
              <div className="flex shrink-0 items-center justify-center rounded-lg bg-zinc-100 p-2 text-4xl dark:bg-zinc-800">
                {emoji.emoji}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {emoji.name}
                </p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {emoji.keywords.slice(0, 2).join(", ")}
                </p>
              </div>

              {/* Arrow */}
              <svg className="h-5 w-5 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>Showing {trendingEmojis.length} trending emojis based on popular usage patterns.</p>
          <p className="mt-2">
            Want to browse all emojis? <Link href="/" className="text-zinc-700 underline dark:text-zinc-300">Visit the home page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
