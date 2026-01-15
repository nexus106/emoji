import Link from "next/link";
import type { Emoji } from "@/lib/types";

interface EmojiCardProps {
  emoji: Emoji;
  size?: "sm" | "md" | "lg";
}

/**
 * Reusable emoji card component with link to detail page
 */
export default function EmojiCard({ emoji, size = "md" }: EmojiCardProps) {
  const sizeClasses = {
    sm: "w-12 h-12 text-2xl",
    md: "w-14 h-14 text-3xl",
    lg: "w-16 h-16 text-4xl",
  };

  return (
    <Link
      href={`/emoji/${emoji.id}`}
      className={`
        flex aspect-square items-center justify-center
        rounded-lg bg-white p-2 transition-all
        hover:bg-zinc-100 hover:scale-110 active:scale-95
        dark:bg-zinc-900 dark:hover:bg-zinc-800
        ${sizeClasses[size]}
      `}
      title={emoji.name}
    >
      {emoji.emoji}
    </Link>
  );
}
