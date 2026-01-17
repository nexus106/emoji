import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCollectionById, getAllCollections, getEmojisForCollection } from "@/lib/collections";
import { getSiteUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import EmojiCard from "@/components/seo/EmojiCard";
import type { BreadcrumbItem } from "@/lib/structured-data";

const SITE_NAME = "Emoji Copy";

// Revalidate every 24 hours
export const revalidate = 86400;

/**
 * Generate metadata for collection page
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const collection = getCollectionById(id);

  if (!collection) {
    return {
      title: "Collection Not Found",
    };
  }

  const siteUrl = getSiteUrl();
  const collectionUrl = `${siteUrl}/collections/${collection.id}`;

  return {
    title: `${collection.icon} ${collection.title} Emojis | ${SITE_NAME}`,
    description: collection.description,
    openGraph: {
      title: `${collection.icon} ${collection.title} Emojis | ${SITE_NAME}`,
      description: collection.description,
      url: collectionUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.icon} ${collection.title} Emojis | ${SITE_NAME}`,
      description: collection.description,
    },
    alternates: {
      canonical: collectionUrl,
    },
  };
}

/**
 * Generate static params for all collections
 */
export async function generateStaticParams() {
  return getAllCollections().map((collection) => ({
    id: collection.id,
  }));
}

/**
 * Generate structured data for collection page
 */
async function getCollectionSchema(collection: any, collectionUrl: string) {
  const emojis = await getEmojisForCollection(collection);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${collection.icon} ${collection.title} Emojis`,
    description: collection.description,
    url: collectionUrl,
    numberOfItems: emojis.length,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const collection = getCollectionById(id);

  if (!collection) {
    notFound();
  }

  const emojis = await getEmojisForCollection(collection);
  const siteUrl = getSiteUrl();
  const collectionUrl = `${siteUrl}/collections/${collection.id}`;

  // Generate breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: "Emoji Collections", href: "/collections" },
    { name: `${collection.icon} ${collection.title}`, href: `/collections/${collection.id}` },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Structured Data */}
        <JsonLd data={await getCollectionSchema(collection, collectionUrl)} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${siteUrl}${item.href}`,
          })),
        }} />

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Back to Collections */}
        <Link
          href="/collections"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Collections
        </Link>

        {/* Collection Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm dark:bg-zinc-900 sm:h-24 sm:w-24 sm:text-6xl">
              {collection.icon}
            </div>
            <div>
              <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                {collection.title} Emojis
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {collection.description}
              </p>
            </div>
          </div>
        </header>

        {/* Emoji Grid */}
        {emojis.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Showing {emojis.length} emoji{emojis.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
              {emojis.map((emoji) => (
                <EmojiCard key={emoji.id} emoji={emoji} size="md" prefetch={false} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              No emojis found in this collection.
            </p>
          </div>
        )}

        {/* Related Collections */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            More Collections
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getAllCollections()
              .filter((c) => c.id !== collection.id)
              .slice(0, 3)
              .map((relatedCollection) => (
                <Link
                  key={relatedCollection.id}
                  href={`/collections/${relatedCollection.id}`}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
                    {relatedCollection.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
                      {relatedCollection.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {relatedCollection.emojiIds.length} emojis
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
