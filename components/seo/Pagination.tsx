import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

type PageNumber = number | "...";

/**
 * Generate pagination array with ellipsis for large page counts
 * Example: [1, 2, "...", 5, 6, 7, "...", 99, 100]
 */
function generatePagination(current: number, total: number): PageNumber[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: PageNumber[] = [];

  // Always include first 2 pages
  pages.push(1, 2);

  // Add ellipsis if current page is far from start
  if (current > 4) {
    pages.push("...");
  }

  // Add pages around current page
  const start = Math.max(3, current - 1);
  const end = Math.min(total - 2, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis if current page is far from end
  if (current < total - 3) {
    pages.push("...");
  }

  // Always include last 2 pages
  pages.push(total - 1, total);

  // Remove duplicates
  return pages.filter((page, index, self) =>
    index === self.findIndex((p) => p === page)
  );
}

/**
 * Pagination component for category pages
 */
export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = generatePagination(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center gap-2 mt-8">
      <ul className="flex items-center gap-2">
        {currentPage > 1 && (
          <li>
            <Link
              href={`${baseUrl}?page=${currentPage - 1}`}
              className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Previous page"
            >
              ← Previous
            </Link>
          </li>
        )}

        {pages.map((page, index) => (
          <li key={`${page}-${index}`}>
            {page === "..." ? (
              <span className="px-3 py-2 text-zinc-400">...</span>
            ) : (
              <Link
                href={`${baseUrl}?page=${page}`}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  page === currentPage
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <Link
              href={`${baseUrl}?page=${currentPage + 1}`}
              className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Next page"
            >
              Next →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
