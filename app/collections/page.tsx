import type { Metadata } from "next";
import Link from "next/link";
import { getAllCollections } from "@/lib/collections";
import { getSiteUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import type { BreadcrumbItem } from "@/lib/structured-data";

const SITE_NAME = "Emoji Copy";

// Revalidate every 24 hours
export const revalidate = 86400;

/**
 * Generate metadata for collections page
 */
export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    title: `Emoji Collections | ${SITE_NAME}`,
    description: "Browse curated emoji collections for every occasion. Find the perfect emoji for happy moments, love, celebrations, business, and more.",
    openGraph: {
      title: `Emoji Collections | ${SITE_NAME}`,
      description: "Browse curated emoji collections for every occasion. Find the perfect emoji for happy moments, love, celebrations, business, and more.",
      url: `${siteUrl}/collections`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Emoji Collections | ${SITE_NAME}`,
      description: "Browse curated emoji collections for every occasion.",
    },
    alternates: {
      canonical: `${siteUrl}/collections`,
    },
  };
}

/**
 * Generate structured data for collections page
 */
function getCollectionsSchema() {
  const siteUrl = getSiteUrl();
  const collections = getAllCollections();

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Emoji Collections",
    description: "Browse curated emoji collections for every occasion",
    url: `${siteUrl}/collections`,
    numberOfItems: collections.length,
  };
}

export default async function CollectionsPage() {
  const collections = getAllCollections();

  // Generate breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: "Emoji Collections", href: "/collections" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Structured Data */}
        <JsonLd data={getCollectionsSchema()} />
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
        <header className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <span className="text-6xl">📚</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Emoji Collections
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Browse curated emoji collections for every occasion and mood.
            Find the perfect emoji for any situation.
          </p>
        </header>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group flex flex-col rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              {/* Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-4xl dark:bg-zinc-800">
                {collection.icon}
              </div>

              {/* Title */}
              <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                {collection.title}
              </h2>

              {/* Description */}
              <p className="mb-4 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {collection.description}
              </p>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <span>Browse Collection</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>Can't find what you're looking for?</p>
          <p className="mt-2">
            <Link href="/guide" className="text-zinc-700 underline dark:text-zinc-300">Check our emoji guide</Link> or{" "}
            <Link href="/" className="text-zinc-700 underline dark:text-zinc-300">browse all emojis</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
