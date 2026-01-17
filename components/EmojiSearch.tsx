"use client";

import { useState, useMemo } from "react";
import { categories } from "@/lib/categories";
import type { Emoji, EmojiCategory } from "@/lib/types";

interface EmojiSearchProps {
  emojis: Emoji[];
  onSearchResults: (results: Emoji[]) => void;
  defaultCategory?: EmojiCategory | "all";
}

export function useEmojiSearch(
  emojis: Emoji[],
  defaultCategory: EmojiCategory | "all" = "all"
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EmojiCategory | "all">(defaultCategory);

  // Memoize and sort filtered emojis to ensure consistent order
  const filteredEmojis = useMemo(() => {
    let results: Emoji[] = [];

    if (searchQuery) {
      // Search by name, id, or keywords
      const lowerQuery = searchQuery.toLowerCase();
      results = emojis.filter(
        (emoji) =>
          emoji.name.toLowerCase().includes(lowerQuery) ||
          emoji.id.toLowerCase().includes(lowerQuery) ||
          emoji.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
      );
    } else if (selectedCategory === "all") {
      results = emojis;
    } else {
      results = emojis.filter((emoji) => emoji.category === selectedCategory);
    }

    // Sort by ID to ensure consistent rendering order
    return results.sort((a, b) => a.id.localeCompare(b.id));
  }, [emojis, searchQuery, selectedCategory]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredEmojis,
  };
}

interface EmojiSearchBarProps {
  onSearchQueryChange: (query: string) => void;
  onCategoryChange: (category: EmojiCategory | "all") => void;
  searchQuery: string;
  selectedCategory: EmojiCategory | "all";
}

export function EmojiSearchBar({
  onSearchQueryChange,
  onCategoryChange,
  searchQuery,
  selectedCategory,
}: EmojiSearchBarProps) {
  return (
    <>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500"
        />
      </div>

      {/* Category Navigation */}
      <nav className="mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <span>{category.icon}</span>
              <span className="hidden sm:inline">{category.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
