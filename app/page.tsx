import type { Metadata } from "next";
import Link from "next/link";
import { getAllEmojis } from "@/lib/emojis";
import { getPopularEmojis } from "@/lib/popular-emojis";
import { getEmojiUrl } from "@/lib/seo";
import { RecentlyUsed } from "@/components/RecentlyUsed";
import { ExploreLinks } from "@/components/ExploreLinks";
import EmojiSearchClient from "./EmojiSearchClient";

// Generate metadata for home page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Emoji Copy - Copy and Paste Emojis",
    description: "Copy and paste emojis from a complete emoji dictionary. Browse 2000+ emojis across 8 categories including smileys, people, animals, food, and more.",
    openGraph: {
      title: "Emoji Copy - Copy and Paste Emojis",
      description: "Copy and paste emojis from a complete emoji dictionary. Browse 2000+ emojis across 8 categories.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Emoji Copy - Copy and Paste Emojis",
      description: "Copy and paste emojis from a complete emoji dictionary.",
    },
  };
}

export default async function Home() {
  // Fetch all emojis on server
  const allEmojis = getAllEmojis();

  // Fetch popular emojis on server
  const popularEmojis = getPopularEmojis(12);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            Emoji Copy
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Click any emoji to copy it to your clipboard
          </p>
        </header>

        {/* Recently Used - Client Component */}
        <RecentlyUsed />

        {/* Popular Emojis - Server Rendered */}
        {popularEmojis.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Popular Emojis
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
              {popularEmojis.map((emoji) => (
                <Link
                  key={emoji.id}
                  href={getEmojiUrl(emoji.id)}
                  prefetch
                  className="flex aspect-square items-center justify-center rounded-lg bg-white p-2 text-2xl transition-all hover:bg-zinc-100 hover:scale-110 active:scale-95 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:text-3xl"
                  title={emoji.name}
                >
                  {emoji.emoji}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Emoji Search Client Component */}
        <EmojiSearchClient allEmojis={allEmojis} />

        {/* Explore Links - Static Component */}
        <ExploreLinks />
      </div>
    </div>
  );
}
