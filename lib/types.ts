import type { Emoji as EmojiMartEmoji, Category as EmojiMartCategory } from "@emoji-mart/data";

export type EmojiCategory =
  | "people"
  | "nature"
  | "foods"
  | "activity"
  | "places"
  | "objects"
  | "symbols"
  | "flags";

// EmojiMart のデータ型を再エクスポート
export type { EmojiMartEmoji, EmojiMartCategory };

export interface Emoji {
  id: string;
  emoji: string;
  name: string;
  keywords: string[];
  category: EmojiCategory;
  skins?: Array<{ native: string; src?: string }>;
}

export interface EmojiCategoryData {
  id: EmojiCategory;
  label: string;
  icon: string;
}
