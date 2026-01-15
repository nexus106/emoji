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
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-zinc-200 dark:bg-zinc-800 sm:h-20 sm:w-20" />
            <div>
              <div className="mb-2 h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-5 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Skeleton Categories */}
        <div className="mb-8">
          <div className="mb-3 h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        </div>

        {/* Skeleton Emoji Grid */}
        <div className="mb-8 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          ))}
        </div>

        {/* Skeleton Pagination */}
        <div className="flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
