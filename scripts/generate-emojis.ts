import data from "@emoji-mart/data";
import { writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";

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

type EmojiCategory =
  | "people"
  | "nature"
  | "foods"
  | "activity"
  | "places"
  | "objects"
  | "symbols"
  | "flags";

interface Emoji {
  id: string;
  emoji: string;
  name: string;
  keywords: string[];
  category: EmojiCategory;
  skins?: Array<{ native: string }>;
}

// カテゴリマッピング
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

function normalizeCategoryId(categoryId: string): EmojiCategory {
  return categoryMapping[categoryId] || "symbols";
}

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

async function generateEmojis() {
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

  // JSONファイルを生成
  const outputPath = join(process.cwd(), "lib", "emojis.json");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(emojis, null, 2), "utf-8");

  console.log(`Generated ${emojis.length} emojis -> ${outputPath}`);
}

generateEmojis().catch(console.error);
