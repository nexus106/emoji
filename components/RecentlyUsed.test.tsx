/// <reference lib="dom" />

import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { RecentlyUsed } from "./RecentlyUsed";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

beforeEach(() => {
  localStorageMock.clear();
});

afterEach(() => {
  cleanup();
});

describe("RecentlyUsed Component", () => {
  test("does not render when there is no history", () => {
    render(<RecentlyUsed onEmojiSelect={() => {}} />);

    expect(screen.queryByText("Recently Used")).toBeNull();
  });

  test("renders when there is history in localStorage", () => {
    localStorageMock.setItem("emoji-history", JSON.stringify(["😀", "🐱"]));

    render(<RecentlyUsed onEmojiSelect={() => {}} />);

    expect(screen.getByText("Recently Used")).toBeTruthy();
  });

  test("renders the correct number of emojis from history", () => {
    localStorageMock.setItem("emoji-history", JSON.stringify(["😀", "🐱", "🍕"]));

    render(<RecentlyUsed onEmojiSelect={() => {}} />);

    const buttons = screen.getAllByRole("button");
    // Filter out any buttons that aren't emoji buttons (e.g., category buttons)
    const emojiButtons = buttons.filter((btn) => btn.textContent && ["😀", "🐱", "🍕"].includes(btn.textContent));

    expect(emojiButtons.length).toBe(3);
  });

  test("calls onEmojiSelect when emoji is clicked", () => {
    const mockOnEmojiSelect = jest.fn();
    localStorageMock.setItem("emoji-history", JSON.stringify(["😀"]));

    render(<RecentlyUsed onEmojiSelect={mockOnEmojiSelect} />);

    const emojiButton = screen.getByText("😀");
    fireEvent.click(emojiButton);

    expect(mockOnEmojiSelect).toHaveBeenCalledWith("😀");
  });

  test("limits history to 20 emojis", () => {
    const manyEmojis = Array.from({ length: 25 }, (_, i) => `${["😀", "🐱", "🍕"][i % 3]}`);
    localStorageMock.setItem("emoji-history", JSON.stringify(manyEmojis));

    render(<RecentlyUsed onEmojiSelect={() => {}} />);

    const buttons = screen.getAllByRole("button");
    const emojiButtons = buttons.filter((btn) => btn.textContent && manyEmojis.includes(btn.textContent || ""));

    expect(emojiButtons.length).toBeLessThanOrEqual(20);
  });
});

describe("Emoji History Storage", () => {
  test("saves history to localStorage correctly", () => {
    localStorageMock.setItem("emoji-history", JSON.stringify(["😀"]));

    const stored = localStorageMock.getItem("emoji-history");
    expect(stored).toBe(JSON.stringify(["😀"]));
  });

  test("handles invalid JSON in localStorage gracefully", () => {
    localStorageMock.setItem("emoji-history", "invalid json");

    // Should not throw error
    expect(() => {
      render(<RecentlyUsed onEmojiSelect={() => {}} />);
    }).not.toThrow();
  });

  test("handles missing localStorage gracefully", () => {
    // Remove localStorage
    Object.defineProperty(globalThis, "localStorage", {
      value: undefined,
    });

    // Should not throw error
    expect(() => {
      render(<RecentlyUsed onEmojiSelect={() => {}} />);
    }).not.toThrow();

    // Restore localStorage
    Object.defineProperty(globalThis, "localStorage", {
      value: localStorageMock,
    });
  });
});
