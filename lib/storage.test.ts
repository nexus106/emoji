/// <reference lib="dom" />

import { afterEach, beforeEach, describe, expect, test } from "bun:test";

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

describe("Emoji History Storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("should save and retrieve emoji history", () => {
    const history = ["😀", "😂", "😍"];
    saveEmojiHistory(history);
    const retrieved = getEmojiHistory();
    expect(retrieved).toEqual(history);
  });

  test("should return empty array when no history exists", () => {
    const history = getEmojiHistory();
    expect(history).toEqual([]);
  });

  test("should overwrite existing history", () => {
    saveEmojiHistory(["😀"]);
    saveEmojiHistory(["😂", "😍"]);
    const retrieved = getEmojiHistory();
    expect(retrieved).toEqual(["😂", "😍"]);
  });

  test("should handle empty history", () => {
    saveEmojiHistory([]);
    const retrieved = getEmojiHistory();
    expect(retrieved).toEqual([]);
  });

  test("should persist history across multiple operations", () => {
    saveEmojiHistory(["😀"]);
    let history = getEmojiHistory();
    expect(history).toEqual(["😀"]);

    history = [...history, "😂"];
    saveEmojiHistory(history);
    const retrieved = getEmojiHistory();
    expect(retrieved).toEqual(["😀", "😂"]);
  });
});
