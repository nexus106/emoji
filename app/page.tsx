"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getAllEmojis, getEmojisByCategory, searchEmojis } from "@/lib/emojis";
import { categories } from "@/lib/categories";
import { getCategoryUrl, getEmojiUrl } from "@/lib/seo";
import { getPopularEmojis } from "@/lib/popular-emojis";
import type { EmojiCategory } from "@/lib/types";

const HISTORY_KEY = "emoji-history";
const MAX_HISTORY = 20;

function getEmojiHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveEmojiHistory(history: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.error("Failed to save history:", err);
  }
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<EmojiCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [emojiHistory, setEmojiHistory] = useState<string[]>([]);
  const [popularEmojis, setPopularEmojis] = useState<Awaited<ReturnType<typeof getPopularEmojis>>>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    setEmojiHistory(getEmojiHistory());
    getPopularEmojis(12).then(setPopularEmojis);
  }, []);

  // Memoize and sort filtered emojis to ensure consistent order between server and client
  const filteredEmojis = useMemo(() => {
    const emojis = searchQuery
      ? searchEmojis(searchQuery)
      : selectedCategory === "all"
        ? getAllEmojis()
        : getEmojisByCategory(selectedCategory);

    // Sort by ID to ensure consistent rendering order
    return [...emojis].sort((a, b) => a.id.localeCompare(b.id));
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = async (emoji: string) => {
    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);

      // Update history
      const newHistory = [emoji, ...emojiHistory.filter((e) => e !== emoji)].slice(0, MAX_HISTORY);
      setEmojiHistory(newHistory);
      saveEmojiHistory(newHistory);

      setTimeout(() => setCopiedEmoji(null), 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            Emoji Copy
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Click any emoji to copy it to your clipboard
          </p>
        </header>

        {/* Recent Emojis */}
        {emojiHistory.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Recently Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {emojiHistory.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => copyToClipboard(emoji)}
                  className="flex aspect-square w-12 items-center justify-center rounded-lg bg-white text-2xl transition-all hover:bg-zinc-100 hover:scale-110 active:scale-95 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:w-14 sm:text-3xl"
                  title="Copy this emoji"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Emojis */}
        {popularEmojis.length > 0 && !searchQuery && selectedCategory === "all" && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Popular Emojis
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
              {popularEmojis.map((emoji) => (
                <Link
                  key={emoji.id}
                  href={getEmojiUrl(emoji.id)}
                  prefetch
                  className="flex aspect-square items-center justify-center rounded-lg bg-white p-2 text-2xl transition-all hover:bg-zinc-100 hover:scale-110 active:scale-95 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:text-3xl"
                  title={emoji.name}
                >
                  {emoji.emoji}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search emojis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500"
          />
        </div>

        {/* Category Navigation */}
        <nav className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={getCategoryUrl(category.id)}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(category.id);
                }}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Explore Links */}
        {!searchQuery && selectedCategory === "all" && (
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
        )}

        {/* Toast Notification */}
        {copiedEmoji && (
          <div className="fixed bottom-4 right-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg dark:bg-green-600">
            Copied {copiedEmoji}!
          </div>
        )}

        {/* Emoji Grid */}
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          {filteredEmojis.map((emoji) => (
            <Link
              key={emoji.id}
              href={getEmojiUrl(emoji.id)}
              prefetch={false}
              onClick={(e) => {
                // Allow copy on click, but navigate on right-click or modifier key
                if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  copyToClipboard(emoji.emoji);
                }
              }}
              className="group relative flex aspect-square items-center justify-center rounded-lg bg-white p-2 text-3xl transition-all hover:bg-zinc-100 hover:scale-110 active:scale-95 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:text-4xl"
              title={`${emoji.emoji} ${emoji.name} - Click to copy, Ctrl/Cmd+Click to view details`}
            >
              {emoji.emoji}
              {copiedEmoji === emoji.emoji && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500/20">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {filteredEmojis.length} emoji{filteredEmojis.length !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}
