export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Skeleton Breadcrumb */}
        <div className="mb-6 flex gap-2">
          <div className="h-5 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Skeleton Header */}
        <div className="mb-8 rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Large Emoji Display */}
            <div className="flex h-32 w-32 shrink-0 animate-pulse items-center justify-center rounded-2xl bg-zinc-200 dark:bg-zinc-800 md:h-40 md:w-40" />

            {/* Emoji Info */}
            <div className="flex-1">
              <div className="mb-2 h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mb-4 h-6 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mb-4 h-12 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mb-2 h-5 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex gap-2">
                <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton Related Emojis */}
        <div>
          <div className="mb-4 h-7 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
