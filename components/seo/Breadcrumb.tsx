import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/structured-data";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-zinc-400 dark:text-zinc-600">/</span>}
            <Link
              href={item.href}
              className={
                index === items.length - 1
                  ? "text-zinc-900 dark:text-zinc-100 font-medium"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
