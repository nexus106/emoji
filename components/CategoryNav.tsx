import Link from "next/link";
import { categories } from "@/lib/categories";
import { getCategoryUrl } from "@/lib/seo";

export function CategoryNav() {
  return (
    <nav className="mb-8 overflow-x-auto">
      <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        Browse by Category
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={getCategoryUrl(category.id)}
            className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <span>{category.icon}</span>
            <span className="hidden sm:inline">{category.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
