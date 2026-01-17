"use client";

import { useState, useEffect } from "react";

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

export function RecentlyUsed() {
  const [emojiHistory, setEmojiHistory] = useState<string[]>([]);
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load history from localStorage on mount (client-side only)
  useEffect(() => {
    setMounted(true);
    setEmojiHistory(getEmojiHistory());
  }, []);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted || emojiHistory.length === 0) {
    return null;
  }

  const handleEmojiClick = async (emoji: string) => {
    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);
      setTimeout(() => setCopiedEmoji(null), 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }

    // Update history
    const newHistory = [emoji, ...emojiHistory.filter((e) => e !== emoji)].slice(0, MAX_HISTORY);
    setEmojiHistory(newHistory);
    saveEmojiHistory(newHistory);
  };

  return (
    <div className="mb-6">
      <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        Recently Used
      </h2>
      <div className="flex flex-wrap gap-2">
        {emojiHistory.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            className="flex aspect-square w-12 items-center justify-center rounded-lg bg-white text-2xl transition-all hover:bg-zinc-100 hover:scale-110 active:scale-95 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:w-14 sm:text-3xl"
            title="Copy this emoji"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Toast Notification */}
      {copiedEmoji && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg dark:bg-green-600">
          Copied {copiedEmoji}!
        </div>
      )}
    </div>
  );
}

export function addToEmojiHistory(emoji: string, currentHistory: string[]): string[] {
  const newHistory = [emoji, ...currentHistory.filter((e) => e !== emoji)].slice(0, MAX_HISTORY);
  saveEmojiHistory(newHistory);
  return newHistory;
}
