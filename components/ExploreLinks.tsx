import Link from "next/link";

export function ExploreLinks() {
  return (
    <nav className="mb-6">
      <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        Explore
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Link
          href="/trending"
          className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-zinc-100 hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <span className="text-2xl">🔥</span>
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Trending Emojis</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Most popular emojis</p>
          </div>
        </Link>
        <Link
          href="/collections"
          className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-zinc-100 hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <span className="text-2xl">📚</span>
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Collections</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Emojis by occasion</p>
          </div>
        </Link>
        <Link
          href="/guide"
          className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-zinc-100 hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <span className="text-2xl">📖</span>
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Emoji Guide</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">How to use emojis</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
