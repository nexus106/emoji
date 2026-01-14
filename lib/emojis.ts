import data from "@emoji-mart/data";
import type { Emoji, EmojiCategory } from "./types";

// @emoji-mart/data の生データ
const rawData = data as {
  categories: Array<{ id: string; emojis: string[] }>;
  emojis: Record<
    string,
    {
      id?: string;
      name?: string;
      keywords?: string[];
      skins?: Array<{ native: string }>;
    }
  >;
};

// @emoji-mart/data を既存の Emoji インターフェースに変換
function convertToEmoji(
  id: string,
  emojiData: { name?: string; keywords?: string[]; skins?: Array<{ native: string }> },
  category: EmojiCategory
): Emoji {
  const firstSkin = emojiData.skins?.[0];
  return {
    id,
    emoji: firstSkin?.native || "",
    name: emojiData.name || id,
    keywords: emojiData.keywords || [],
    category,
    skins: emojiData.skins?.map((skin) => ({ native: skin.native })),
  };
}

// カテゴリマッピング（@emoji-mart/data → 既存カテゴリ）
const categoryMapping: Record<string, EmojiCategory> = {
  people: "people",
  nature: "nature",
  foods: "foods",
  activity: "activity",
  places: "places",
  objects: "objects",
  symbols: "symbols",
  flags: "flags",
};

// カテゴリIDを既存の形式に変換
function normalizeCategoryId(categoryId: string): EmojiCategory {
  return categoryMapping[categoryId] || "symbols";
}

// 全ての絵文字を取得（キャッシュ付き）
let cachedEmojis: Emoji[] | null = null;

export function getAllEmojis(): Emoji[] {
  if (cachedEmojis) {
    return cachedEmojis;
  }

  const emojis: Emoji[] = [];

  for (const category of rawData.categories) {
    const normalizedCategory = normalizeCategoryId(category.id);

    for (const emojiId of category.emojis) {
      const emojiData = rawData.emojis[emojiId];
      if (emojiData && emojiData.skins?.[0]?.native) {
        emojis.push(convertToEmoji(emojiId, emojiData, normalizedCategory));
      }
    }
  }

  cachedEmojis = emojis;
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
