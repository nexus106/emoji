import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { getSiteUrl, getCategoryUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import type { BreadcrumbItem } from "@/lib/structured-data";

const SITE_NAME = "Emoji Copy";

/**
 * Generate metadata for guide page
 */
export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: `Emoji Guide | ${SITE_NAME}`,
    description: "Learn how to use emojis effectively. Discover emoji meanings, copy and paste methods, and browse emojis by category.",
    openGraph: {
      title: `Emoji Guide | ${SITE_NAME}`,
      description: "Learn how to use emojis effectively. Discover emoji meanings, copy and paste methods, and browse emojis by category.",
      url: `${siteUrl}/guide`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Emoji Guide | ${SITE_NAME}`,
      description: "Learn how to use emojis effectively.",
    },
    alternates: {
      canonical: `${siteUrl}/guide`,
    },
  };
}

/**
 * Generate structured data for guide page
 */
function getGuideSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Emoji Guide - How to Use Emojis",
    description: "Learn how to use emojis effectively. Discover emoji meanings, copy and paste methods, and browse emojis by category.",
    url: `${siteUrl}/guide`,
  };
}

export default function GuidePage() {
  // Generate breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: "Emoji Guide", href: "/guide" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Structured Data */}
        <JsonLd data={getGuideSchema()} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${getSiteUrl()}${item.href}`,
          })),
        }} />

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
        <header className="mb-8">
          <div className="mb-4 flex justify-center">
            <span className="text-6xl">📖</span>
          </div>
          <h1 className="mb-4 text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Emoji Guide
          </h1>
          <p className="text-center text-zinc-600 dark:text-zinc-400">
            Learn how to use emojis effectively and discover their meanings
          </p>
        </header>

        {/* Guide Content */}
        <article className="space-y-8">
          {/* How to Copy Section */}
          <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              📋 How to Copy Emojis
            </h2>
            <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <p>
                Copying emojis is easy! Just follow these simple steps:
              </p>
              <ol className="ml-6 list-decimal space-y-2">
                <li>Browse through our emoji collection or search for specific emojis</li>
                <li>Click on any emoji to copy it to your clipboard</li>
                <li>Paste the emoji anywhere you want (Ctrl+V or Cmd+V)</li>
              </ol>
              <p className="mt-4 text-sm">
                💡 <strong>Tip:</strong> You can also click on any emoji while holding Ctrl/Cmd to view its detailed page with more information.
              </p>
            </div>
          </section>

          {/* Emoji Categories Section */}
          <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              📁 Emoji Categories
            </h2>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Browse emojis by category to find exactly what you're looking for:
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={getCategoryUrl(category.id)}
                  className="flex flex-col items-center rounded-lg bg-zinc-100 p-4 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <span className="mb-2 text-3xl">{category.icon}</span>
                  <span className="text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {category.label}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Use Cases Section */}
          <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              💡 Popular Use Cases
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <div className="border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  Social Media Posts ✨
                </h3>
                <p className="text-sm">
                  Add emojis to your social media posts to make them more engaging and expressive. Use trending emojis to join popular conversations.
                </p>
              </div>
              <div className="border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  Business Communication 💼
                </h3>
                <p className="text-sm">
                  Use professional emojis like 👍, ✅, and 📧 to add clarity and friendliness to work emails and messages.
                </p>
              </div>
              <div className="border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  Creative Writing ✍️
                </h3>
                <p className="text-sm">
                  Enhance your creative content with relevant emojis that complement your message and add visual interest.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  Personal Messages 💬
                </h3>
                <p className="text-sm">
                  Express emotions and add personality to your personal messages with heartfelt, funny, or meaningful emojis.
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              🎯 Pro Tips
            </h2>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-zinc-900 dark:text-zinc-50">✓</span>
                <span>Use emojis sparingly in professional contexts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-900 dark:text-zinc-50">✓</span>
                <span>Consider cultural differences when using emojis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-900 dark:text-zinc-50">✓</span>
                <span>Test emoji appearance on different devices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-900 dark:text-zinc-50">✓</span>
                <span>Use trending emojis to stay current with popular culture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-900 dark:text-zinc-50">✓</span>
                <span>Combine multiple emojis to create unique expressions</span>
              </li>
            </ul>
          </section>

          {/* CTA Section */}
          <section className="rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 text-center shadow-sm dark:from-zinc-100 dark:to-zinc-200">
            <h2 className="mb-2 text-xl font-bold text-white dark:text-zinc-900">
              Ready to Find Your Perfect Emoji?
            </h2>
            <p className="mb-4 text-zinc-300 dark:text-zinc-700">
              Browse our collection of 2000+ emojis and copy them instantly!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              Browse Emojis
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        </article>
      </div>
    </div>
  );
}
