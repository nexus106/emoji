"use client";

import { useEmojiSearch, EmojiSearchBar } from "@/components/EmojiSearch";
import { EmojiGrid } from "@/components/EmojiGrid";
import { CategoryNav } from "@/components/CategoryNav";
import type { Emoji } from "@/lib/types";

interface EmojiSearchClientProps {
  allEmojis: Emoji[];
}

export default function EmojiSearchClient({ allEmojis }: EmojiSearchClientProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredEmojis,
  } = useEmojiSearch(allEmojis);

  return (
    <>
      {/* Search Bar and Category Navigation */}
      <EmojiSearchBar
        onSearchQueryChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      {/* Emoji Grid - Only show when not searching and all categories selected */}
      {!searchQuery && selectedCategory === "all" && <CategoryNav />}

      {/* Filtered Emoji Grid */}
      <EmojiGrid emojis={filteredEmojis} />
    </>
  );
}
