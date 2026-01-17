"use client";

import { useState } from "react";
import Link from "next/link";
import { getEmojiUrl } from "@/lib/seo";
import type { Emoji } from "@/lib/types";

interface EmojiGridProps {
  emojis: Emoji[];
  showCount?: boolean;
  onEmojiCopy?: (emoji: string) => void;
}

export function EmojiGrid({ emojis, showCount = true, onEmojiCopy }: EmojiGridProps) {
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const copyToClipboard = async (emoji: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);

      if (onEmojiCopy) {
        onEmojiCopy(emoji);
      }

      setTimeout(() => setCopiedEmoji(null), 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      {/* Emoji Grid */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
        {emojis.map((emoji) => (
          <Link
            key={emoji.id}
            href={getEmojiUrl(emoji.id)}
            prefetch={false}
            onClick={(e) => {
              // Allow copy on click, but navigate on right-click or modifier key
              if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                copyToClipboard(emoji.emoji, e);
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
      {showCount && (
        <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {emojis.length} emoji{emojis.length !== 1 ? "s" : ""} found
        </div>
      )}

      {/* Toast Notification */}
      {copiedEmoji && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg dark:bg-green-600">
          Copied {copiedEmoji}!
        </div>
      )}
    </>
  );
}
