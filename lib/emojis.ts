import type { Emoji } from "./types";

export const emojis: Emoji[] = [
  // Smileys & Emotion
  { emoji: "😀", name: "grinning face", keywords: ["smile", "happy", "grin"], category: "smileys" },
  { emoji: "😂", name: "face with tears of joy", keywords: ["lol", "laugh", "cry"], category: "smileys" },
  { emoji: "😍", name: "smiling face with heart-eyes", keywords: ["love", "heart", "eyes"], category: "smileys" },
  { emoji: "🥰", name: "smiling face with hearts", keywords: ["love", "crush", "adore"], category: "smileys" },
  { emoji: "😊", name: "smiling face with smiling eyes", keywords: ["smile", "happy", "blush"], category: "smileys" },
  { emoji: "😎", name: "smiling face with sunglasses", keywords: ["cool", "summer", "sunglasses"], category: "smileys" },
  { emoji: "🤔", name: "thinking face", keywords: ["think", "hmmm", "wonder"], category: "smileys" },
  { emoji: "😢", name: "crying face", keywords: ["sad", "cry", "tear"], category: "smileys" },
  { emoji: "😡", name: "pouting face", keywords: ["angry", "mad", "rage"], category: "smileys" },
  { emoji: "🥳", name: "partying face", keywords: ["party", "celebration", "fun"], category: "smileys" },

  // People & Body
  { emoji: "👋", name: "waving hand", keywords: ["wave", "hello", "bye"], category: "people" },
  { emoji: "🤝", name: "handshake", keywords: ["shake", "agreement", "deal"], category: "people" },
  { emoji: "👍", name: "thumbs up", keywords: ["thumbsup", "approve", "good"], category: "people" },
  { emoji: "👎", name: "thumbs down", keywords: ["thumbsdown", "disapprove", "bad"], category: "people" },
  { emoji: "👏", name: "clapping hands", keywords: ["clap", "applause", "praise"], category: "people" },
  { emoji: "🙏", name: "folded hands", keywords: ["pray", "please", "thanks"], category: "people" },
  { emoji: "💪", name: "flexed biceps", keywords: ["muscle", "strong", "flex"], category: "people" },
  { emoji: "🧠", name: "brain", keywords: ["smart", "think", "mind"], category: "people" },

  // Animals & Nature
  { emoji: "🐱", name: "cat face", keywords: ["cat", "kitten", "meow"], category: "animals" },
  { emoji: "🐶", name: "dog face", keywords: ["dog", "puppy", "woof"], category: "animals" },
  { emoji: "🐭", name: "mouse face", keywords: ["mouse", "rodent"], category: "animals" },
  { emoji: "🐹", name: "hamster", keywords: ["hamster", "rodent", "pet"], category: "animals" },
  { emoji: "🦊", name: "fox", keywords: ["fox", "wild"], category: "animals" },
  { emoji: "🐻", name: "bear", keywords: ["bear", "wild"], category: "animals" },
  { emoji: "🐼", name: "panda", keywords: ["panda", "bear"], category: "animals" },
  { emoji: "🦄", name: "unicorn", keywords: ["unicorn", "mythical", "magic"], category: "animals" },
  { emoji: "🌲", name: "evergreen tree", keywords: ["tree", "pine", "forest"], category: "animals" },
  { emoji: "🌸", name: "cherry blossom", keywords: ["flower", "bloom", "spring"], category: "animals" },

  // Food & Drink
  { emoji: "🍕", name: "pizza", keywords: ["pizza", "slice", "cheese"], category: "food" },
  { emoji: "🍔", name: "hamburger", keywords: ["burger", "beef", "fastfood"], category: "food" },
  { emoji: "🍟", name: "french fries", keywords: ["fries", "chips"], category: "food" },
  { emoji: "🌭", name: "hot dog", keywords: ["hotdog", "frankfurter"], category: "food" },
  { emoji: "🍿", name: "popcorn", keywords: ["popcorn", "snack", "movie"], category: "food" },
  { emoji: "🍩", name: "doughnut", keywords: ["donut", "dessert", "sweet"], category: "food" },
  { emoji: "🍦", name: "soft ice cream", keywords: ["icecream", "dessert", "cold"], category: "food" },
  { emoji: "🍪", name: "cookie", keywords: ["cookie", "biscuit", "sweet"], category: "food" },
  { emoji: "🎂", name: "birthday cake", keywords: ["cake", "birthday", "celebration"], category: "food" },
  { emoji: "☕", name: "hot beverage", keywords: ["coffee", "tea", "drink"], category: "food" },

  // Activities
  { emoji: "⚽", name: "soccer ball", keywords: ["soccer", "football", "sports"], category: "activities" },
  { emoji: "🏀", name: "basketball", keywords: ["basketball", "hoop", "sports"], category: "activities" },
  { emoji: "🎮", name: "video game", keywords: ["game", "gaming", "controller"], category: "activities" },
  { emoji: "🎨", name: "artist palette", keywords: ["art", "paint", "draw"], category: "activities" },
  { emoji: "🎤", name: "microphone", keywords: ["mic", "sing", "music"], category: "activities" },
  { emoji: "🎧", name: "headphone", keywords: ["headphones", "music", "audio"], category: "activities" },
  { emoji: "🎸", name: "guitar", keywords: ["guitar", "music", "instrument"], category: "activities" },
  { emoji: "🎹", name: "musical keyboard", keywords: ["piano", "keyboard", "music"], category: "activities" },
  { emoji: "🏆", name: "trophy", keywords: ["trophy", "winner", "prize"], category: "activities" },
  { emoji: "🎯", name: "bullseye", keywords: ["target", "goal", "aim"], category: "activities" },

  // Travel & Places
  { emoji: "✈️", name: "airplane", keywords: ["plane", "flight", "travel"], category: "travel" },
  { emoji: "🚗", name: "automobile", keywords: ["car", "auto", "vehicle"], category: "travel" },
  { emoji: "🚌", name: "bus", keywords: ["bus", "transport"], category: "travel" },
  { emoji: "🚕", name: "taxi", keywords: ["taxi", "cab"], category: "travel" },
  { emoji: "🏠", name: "house", keywords: ["house", "home"], category: "travel" },
  { emoji: "🏢", name: "office building", keywords: ["office", "work", "building"], category: "travel" },
  { emoji: "🏰", name: "castle", keywords: ["castle", "fantasy"], category: "travel" },
  { emoji: "⛩️", name: "shrine", keywords: ["shrine", "japan", "temple"], category: "travel" },
  { emoji: "🗼", name: "tokyo tower", keywords: ["tower", "tokyo", "japan"], category: "travel" },
  { emoji: "🗽", name: "statue of liberty", keywords: ["liberty", "nyc", "statue"], category: "travel" },

  // Objects
  { emoji: "💡", name: "light bulb", keywords: ["bulb", "idea", "light"], category: "objects" },
  { emoji: "📱", name: "mobile phone", keywords: ["phone", "mobile", "cell"], category: "objects" },
  { emoji: "💻", name: "laptop", keywords: ["computer", "laptop", "tech"], category: "objects" },
  { emoji: "⌨️", name: "keyboard", keywords: ["keyboard", "type"], category: "objects" },
  { emoji: "🖥️", name: "desktop computer", keywords: ["computer", "desktop", "monitor"], category: "objects" },
  { emoji: "📷", name: "camera", keywords: ["camera", "photo", "picture"], category: "objects" },
  { emoji: "⌚", name: "watch", keywords: ["watch", "time"], category: "objects" },
  { emoji: "💎", name: "gem stone", keywords: ["gem", "diamond", "jewel"], category: "objects" },
  { emoji: "💰", name: "money bag", keywords: ["money", "dollar", "cash"], category: "objects" },
  { emoji: "🔑", name: "key", keywords: ["key", "lock", "unlock"], category: "objects" },

  // Symbols
  { emoji: "❤️", name: "red heart", keywords: ["love", "heart", "red"], category: "symbols" },
  { emoji: "💔", name: "broken heart", keywords: ["heartbreak", "sad"], category: "symbols" },
  { emoji: "💕", name: "two hearts", keywords: ["love", "hearts"], category: "symbols" },
  { emoji: "💯", name: "hundred points", keywords: ["100", "score", "perfect"], category: "symbols" },
  { emoji: "✨", name: "sparkles", keywords: ["sparkle", "star", "shine"], category: "symbols" },
  { emoji: "⭐", name: "star", keywords: ["star", "rating"], category: "symbols" },
  { emoji: "🌟", name: "glowing star", keywords: ["star", "glow", "bright"], category: "symbols" },
  { emoji: "⚡", name: "high voltage", keywords: ["lightning", "bolt", "energy"], category: "symbols" },
  { emoji: "🔥", name: "fire", keywords: ["fire", "hot", "burn"], category: "symbols" },
  { emoji: "♻️", name: "recycle", keywords: ["recycle", "green"], category: "symbols" },

  // Flags
  { emoji: "🏁", name: "chequered flag", keywords: ["flag", "race", "finish"], category: "flags" },
  { emoji: "🏳️", name: "white flag", keywords: ["flag", "white", "surrender"], category: "flags" },
  { emoji: "🏴", name: "black flag", keywords: ["flag", "black"], category: "flags" },
  { emoji: "🇯🇵", name: "flag: Japan", keywords: ["japan", "jp", "flag"], category: "flags" },
  { emoji: "🇺🇸", name: "flag: United States", keywords: ["usa", "america", "flag"], category: "flags" },
  { emoji: "🇬🇧", name: "flag: United Kingdom", keywords: ["uk", "britain", "flag"], category: "flags" },
  { emoji: "🇨🇦", name: "flag: Canada", keywords: ["canada", "flag"], category: "flags" },
  { emoji: "🇦🇺", name: "flag: Australia", keywords: ["australia", "flag"], category: "flags" },
  { emoji: "🇫🇷", name: "flag: France", keywords: ["france", "flag"], category: "flags" },
  { emoji: "🇩🇪", name: "flag: Germany", keywords: ["germany", "flag"], category: "flags" },
];

// カテゴリ別に絵文字をグループ化するヘルパー関数
export function getEmojisByCategory(category: string): Emoji[] {
  return emojis.filter((emoji) => emoji.category === category);
}

// 全ての絵文字を取得
export function getAllEmojis(): Emoji[] {
  return emojis;
}

// 絵文字を検索する関数
export function searchEmojis(query: string): Emoji[] {
  const lowerQuery = query.toLowerCase();
  return emojis.filter(
    (emoji) =>
      emoji.name.toLowerCase().includes(lowerQuery) ||
      emoji.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  );
}
