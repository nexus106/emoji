import type { Emoji } from "./types";
import { getEmojiById } from "./emojis";

export interface EmojiCollection {
  id: string;
  title: string;
  description: string;
  icon: string;
  emojiIds: string[];
}

/**
 * Predefined emoji collections based on use cases
 */
export const collections: EmojiCollection[] = [
  {
    id: "happy",
    title: "Happy & Positive",
    description: "Emojis to express happiness, joy, and positive emotions",
    icon: "😊",
    emojiIds: [
      "grinning", "smiley", "smile", "grin", "laughing",
      "blush", "relieved", "heart_eyes", "kissing_heart",
      "star-struck", "innocent", "joy", "slight_smile",
      "upside_down_face", "wink", "relaxed", "yum",
    ],
  },
  {
    id: "love",
    title: "Love & Romance",
    description: "Perfect for expressing love, affection, and romance",
    icon: "❤️",
    emojiIds: [
      "heart", "two_hearts", "sparkling_heart", "heart_eyes_cat",
      "kissing_heart", "love_letter", "cupid", "gift_heart",
      "heartpulse", "heartbeat", "revolving_hearts", "woman-heart",
      "man-heart", "heart_decoration", "heavy_heart_exclamation",
    ],
  },
  {
    id: "sad",
    title: "Sad & Emotional",
    description: "Emojis for expressing sadness, disappointment, and emotions",
    icon: "😢",
    emojiIds: [
      "cry", "sob", "frowning", "fearful", "weary",
      "pensive", "disappointed", "confounded", "tired_face",
      "cry", "anguished", "open_mouth", "hushed", "astonished",
      "sleeping", "worried", "triumph",
    ],
  },
  {
    id: "angry",
    title: "Angry & Frustrated",
    description: "Show anger, frustration, or annoyance with these emojis",
    icon: "😠",
    emojiIds: [
      "angry", "rage", "face_with_symbols_on_mouth", "exploding_head",
      "flushed", "grimacing", "unamused", "heavy_exclamation_mark",
      "angry_face_with_horns", "clown_face", "no_mouth",
      "neutral_face", "expressionless", "hushed", "frowning2",
    ],
  },
  {
    id: "business",
    title: "Business & Work",
    description: "Professional emojis for business and work communication",
    icon: "💼",
    emojiIds: [
      "briefcase", "office", "computer", "desktop_computer",
      "keyboard", "moneybag", "dollar", "chart",
      "clipboard", "file_folder", "email", "telephone",
      "speech_balloon", "memo", "pencil2", "pushpin",
      "round_pushpin", "straight_ruler", "triangular_ruler",
    ],
  },
  {
    id: "celebration",
    title: "Celebration & Party",
    description: "Celebrate special moments with these festive emojis",
    icon: "🎉",
    emojiIds: [
      "tada", "confetti_ball", "balloon", "ribbon",
      "gift", "birthday", "cake", "champagne",
      "wine_glass", "beers", "clap", "raising_hand",
      "party_popper", "sparkles", "star", "dizzy",
    ],
  },
  {
    id: "food",
    title: "Food & Drink",
    description: "Delicious food and drink emojis for foodies",
    icon: "🍕",
    emojiIds: [
      "pizza", "hamburger", "french_fries", "hotdog",
      "taco", "burrito", "ramen", "spaghetti",
      "sushi", "fried_shrimp", "egg", "cooking",
      "bento", "rice_cracker", "rice", "curry",
    ],
  },
  {
    id: "animals",
    title: "Animals & Nature",
    description: "Cute and adorable animal emojis",
    icon: "🐱",
    emojiIds: [
      "dog_face", "cat_face", "mouse_face", "hamster_face",
      "rabbit_face", "fox_face", "bear", "panda_face",
      "koala", "pig_face", "frog", "monkey_face",
      "chicken", "penguin", "turtle", "bug",
    ],
  },
  {
    id: "travel",
    title: "Travel & Places",
    description: "Explore the world with travel and location emojis",
    icon: "✈️",
    emojiIds: [
      "airplane", "rocket", "mountain", "beach_umbrella",
      "desert", "island", "park", "stadium",
      "house", "house_with_garden", "office", "hotel",
      "love_hotel", "convenience_store", "school", "department_store",
    ],
  },
  {
    id: "sports",
    title: "Sports & Activities",
    description: "Active emojis for sports, fitness, and recreation",
    icon: "⚽",
    emojiIds: [
      "soccer", "basketball", "football", "baseball",
      "tennis", "volleyball", "rugby_football", "golf",
      "pool", "bowling", "cricket_game", "field_hockey",
      "ice_hockey", "ping_pong", "badminton", "boxing_glove",
    ],
  },
];

/**
 * Get collection by ID
 */
export function getCollectionById(id: string): EmojiCollection | undefined {
  return collections.find((c) => c.id === id);
}

/**
 * Get all collections
 */
export function getAllCollections(): EmojiCollection[] {
  return collections;
}

/**
 * Get emojis for a collection
 * Now synchronous for better SSR performance
 */
export function getEmojisForCollection(collection: EmojiCollection): Emoji[] {
  const emojis: Emoji[] = [];
  for (const id of collection.emojiIds) {
    const emoji = getEmojiById(id);
    if (emoji) {
      emojis.push(emoji);
    }
  }
  return emojis;
}
