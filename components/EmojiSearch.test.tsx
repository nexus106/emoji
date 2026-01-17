/// <reference lib="dom" />

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { renderHook, act, render, cleanup } from "@testing-library/react";
import { useEmojiSearch, EmojiSearchBar } from "./EmojiSearch";
import type { Emoji } from "@/lib/types";

afterEach(() => {
  cleanup();
});

const mockEmojis: Emoji[] = [
  {
    id: "grinning",
    emoji: "😀",
    name: "Grinning Face",
    category: "people",
    keywords: ["smile", "happy"],
  },
  {
    id: "cat",
    emoji: "🐱",
    name: "Cat Face",
    category: "animals",
    keywords: ["pet", "kitten"],
  },
  {
    id: "pizza",
    emoji: "🍕",
    name: "Pizza",
    category: "foods",
    keywords: ["food", "cheese"],
  },
];

describe("useEmojiSearch", () => {
  beforeEach(() => {
    // Reset state before each test
  });

  test("returns all emojis when no search query or category is set", () => {
    const { result } = renderHook(() => useEmojiSearch(mockEmojis));

    expect(result.current.filteredEmojis).toEqual(mockEmojis);
    expect(result.current.searchQuery).toBe("");
    expect(result.current.selectedCategory).toBe("all");
  });

  test("filters emojis by search query", () => {
    const { result } = renderHook(() => useEmojiSearch(mockEmojis));

    act(() => {
      result.current.setSearchQuery("grin");
    });

    expect(result.current.filteredEmojis).toHaveLength(1);
    expect(result.current.filteredEmojis[0].id).toBe("grinning");
  });

  test("filters emojis by category", () => {
    const { result } = renderHook(() => useEmojiSearch(mockEmojis));

    act(() => {
      result.current.setSelectedCategory("animals");
    });

    expect(result.current.filteredEmojis).toHaveLength(1);
    expect(result.current.filteredEmojis[0].id).toBe("cat");
  });

  test("filters emojis by keywords", () => {
    const { result } = renderHook(() => useEmojiSearch(mockEmojis));

    act(() => {
      result.current.setSearchQuery("pet");
    });

    expect(result.current.filteredEmojis).toHaveLength(1);
    expect(result.current.filteredEmojis[0].id).toBe("cat");
  });

  test("returns empty array when no emojis match", () => {
    const { result } = renderHook(() => useEmojiSearch(mockEmojis));

    act(() => {
      result.current.setSearchQuery("nonexistent");
    });

    expect(result.current.filteredEmojis).toHaveLength(0);
  });

  test("resets to all emojis when search query is cleared", () => {
    const { result } = renderHook(() => useEmojiSearch(mockEmojis));

    act(() => {
      result.current.setSearchQuery("grin");
    });
    expect(result.current.filteredEmojis).toHaveLength(1);

    act(() => {
      result.current.setSearchQuery("");
    });
    expect(result.current.filteredEmojis).toHaveLength(3);
  });

  test("sorts emojis by ID for consistent order", () => {
    const unsortedEmojis: Emoji[] = [
      { id: "z", emoji: "z", name: "Z", category: "people", keywords: [] },
      { id: "a", emoji: "a", name: "A", category: "people", keywords: [] },
      { id: "m", emoji: "m", name: "M", category: "people", keywords: [] },
    ];

    const { result } = renderHook(() => useEmojiSearch(unsortedEmojis));

    expect(result.current.filteredEmojis[0].id).toBe("a");
    expect(result.current.filteredEmojis[1].id).toBe("m");
    expect(result.current.filteredEmojis[2].id).toBe("z");
  });
});

describe("EmojiSearchBar", () => {
  test("renders search input", () => {
    const { container } = render(
      <EmojiSearchBar
        onSearchQueryChange={() => {}}
        onCategoryChange={() => {}}
        searchQuery=""
        selectedCategory="all"
      />
    );

    const input = container.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  test("renders category buttons", () => {
    const { container } = render(
      <EmojiSearchBar
        onSearchQueryChange={() => {}}
        onCategoryChange={() => {}}
        searchQuery=""
        selectedCategory="all"
      />
    );

    // Check for "All" button
    expect(container.textContent).toContain("All");
  });
});
