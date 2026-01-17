import { getTrendingEmojis } from "@/lib/popular-emojis";
import EmojiCard from "./EmojiCard";

interface PopularEmojisProps {
  limit?: number;
  title?: string;
}

/**
 * Popular/Trending emojis section component
 */
export default async function PopularEmojis({
  limit = 20,
  title = "Popular Emojis",
}: PopularEmojisProps) {
  const emojis = await getTrendingEmojis(limit);

  if (emojis.length === 0) {
    return null;
  }

  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </h2>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
        {emojis.map((emoji) => (
          <EmojiCard key={emoji.id} emoji={emoji} size="sm" />
        ))}
      </div>
    </section>
  );
}
