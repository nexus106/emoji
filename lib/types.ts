export type EmojiCategory =
  | "smileys"
  | "people"
  | "animals"
  | "food"
  | "activities"
  | "travel"
  | "objects"
  | "symbols"
  | "flags";

export interface Emoji {
  emoji: string;
  name: string;
  keywords: string[];
  category: EmojiCategory;
}

export interface EmojiCategoryData {
  id: EmojiCategory;
  label: string;
  icon: string;
}
