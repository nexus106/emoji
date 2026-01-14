import type { Emoji } from "./types";
import emojiData from "./emojis.json";

// ビルド時に生成されたJSONから絵文字を取得
const emojis = emojiData as Emoji[];

// 全ての絵文字を取得（ビルド時に生成されたJSONを使用）
export function getAllEmojis(): Emoji[] {
  return emojis;
}

// カテゴリ別に絵文字をグループ化するヘルパー関数
export function getEmojisByCategory(category: string): Emoji[] {
  return getAllEmojis().filter((emoji) => emoji.category === category);
}

// 絵文字を検索する関数
export function searchEmojis(query: string): Emoji[] {
  if (!query.trim()) {
    return getAllEmojis();
  }

  const lowerQuery = query.toLowerCase();
  return getAllEmojis().filter(
    (emoji) =>
      emoji.name.toLowerCase().includes(lowerQuery) ||
      emoji.id.toLowerCase().includes(lowerQuery) ||
      emoji.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  );
}

// 絵文字IDから取得する関数
export function getEmojiById(id: string): Emoji | undefined {
  return getAllEmojis().find((emoji) => emoji.id === id);
}
