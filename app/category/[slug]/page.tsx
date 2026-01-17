import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getEmojisByCategory } from "@/lib/emojis";
import { categories } from "@/lib/categories";
import { getCategoryMetadata } from "@/lib/metadata";
import { getCollectionPageSchema, getBreadcrumbSchema, type BreadcrumbItem } from "@/lib/structured-data";
import { getCategoryUrl, paginateArray, totalPages } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import EmojiCard from "@/components/seo/EmojiCard";
import Pagination from "@/components/seo/Pagination";
import PopularEmojis from "@/components/seo/PopularEmojis";

// Revalidate every 7 days (ISR)
export const revalidate = 604800;

const EMOJIS_PER_PAGE = 96;

/**
 * Generate metadata for category page
 */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const category = categories.find((c) => c.id === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const pageNum = parseInt(page || "1");
  const allEmojis = getEmojisByCategory(category.id);

  return getCategoryMetadata(category, pageNum, allEmojis.length);
}

/**
 * Generate static params for all categories
 */
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.id,
  }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const category = categories.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  const pageNum = parseInt(page || "1");
  const allEmojis = getEmojisByCategory(category.id);
  const emojiCount = allEmojis.length;
  const totalPageCount = totalPages(emojiCount, EMOJIS_PER_PAGE);
  const emojis = paginateArray(allEmojis, pageNum, EMOJIS_PER_PAGE);

  // Generate breadcrumb
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: `${category.icon} ${category.label}`, href: getCategoryUrl(category.id) },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Structured Data */}
        <JsonLd
          data={getCollectionPageSchema(
            emojis,
            category,
            `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${getCategoryUrl(category.id)}`
          )}
        />
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

        {/* Category Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm dark:bg-zinc-900 sm:h-20 sm:w-20 sm:text-5xl">
              {category.icon}
            </div>
            <div>
              <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                {category.label} Emojis
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Browse {emojiCount} {category.label.toLowerCase()} emojis. Click any emoji to copy.
              </p>
            </div>
          </div>
        </header>

        {/* Popular Emojis - Show on first page */}
        {pageNum === 1 && <PopularEmojis limit={12} title="Trending Emojis" />}

        {/* Other Categories */}
        <nav className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Other Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={getCategoryUrl(cat.id)}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat.id === category.id
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Emoji Grid */}
        <div className="mb-8 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          {emojis.map((emoji) => (
            <EmojiCard key={emoji.id} emoji={emoji} size="md" prefetch={false} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pageNum}
          totalPages={totalPageCount}
          baseUrl={getCategoryUrl(category.id)}
        />

        {/* Page Info */}
        <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Page {pageNum} of {totalPageCount} • {emojiCount} total emojis
        </div>
      </div>
    </div>
  );
}
