/// <reference lib="dom" />

import { describe, test, expect, afterEach, beforeEach } from "bun:test";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { EmojiGrid } from "./EmojiGrid";
import type { Emoji } from "@/lib/types";

// Mock navigator.clipboard
const mockClipboard = {
  writeText: async (text: string) => {
    // Mock implementation
    return;
  },
};

beforeEach(() => {
  Object.defineProperty(globalThis.navigator, "clipboard", {
    value: mockClipboard,
    writable: true,
  });
});

afterEach(() => {
  cleanup();
});

const mockEmojis: Emoji[] = [
  {
    id: "grinning",
    emoji: "😀",
    name: "Grinning Face",
    category: "people",
    keywords: ["smile", "happy"],
  },
  {
    id: "cat",
    emoji: "🐱",
    name: "Cat Face",
    category: "animals",
    keywords: ["pet", "kitten"],
  },
];

describe("EmojiGrid Component", () => {
  test("renders all emojis", () => {
    render(<EmojiGrid emojis={mockEmojis} />);

    expect(screen.getByText("😀")).toBeTruthy();
    expect(screen.getByText("🐱")).toBeTruthy();
  });

  test("renders correct count message", () => {
    render(<EmojiGrid emojis={mockEmojis} showCount={true} />);

    expect(screen.getByText("2 emojis found")).toBeTruthy();
  });

  test("renders singular count message for single emoji", () => {
    render(<EmojiGrid emojis={[mockEmojis[0]]} showCount={true} />);

    expect(screen.getByText("1 emoji found")).toBeTruthy();
  });

  test("does not render count message when showCount is false", () => {
    render(<EmojiGrid emojis={mockEmojis} showCount={false} />);

    expect(screen.queryByText(/emojis found/)).toBeNull();
  });

  test("shows toast notification when emoji is copied", async () => {
    render(<EmojiGrid emojis={mockEmojis} />);

    const emojiLink = screen.getByText("😀").closest("a");
    if (emojiLink) {
      fireEvent.click(emojiLink);

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(screen.getByText("Copied 😀!")).toBeTruthy();
    }
  });

  test("calls onEmojiCopy when emoji is copied", async () => {
    const mockOnEmojiCopy = jest.fn();
    render(<EmojiGrid emojis={mockEmojis} onEmojiCopy={mockOnEmojiCopy} />);

    const emojiLink = screen.getByText("😀").closest("a");
    if (emojiLink) {
      fireEvent.click(emojiLink);

      // Wait for state update
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(mockOnEmojiCopy).toHaveBeenCalledWith("😀");
    }
  });

  test("renders links with correct href", () => {
    render(<EmojiGrid emojis={mockEmojis} />);

    const grinningLink = screen.getByText("😀").closest("a");
    expect(grinningLink?.getAttribute("href")).toBe("/emoji/grinning");

    const catLink = screen.getByText("🐱").closest("a");
    expect(catLink?.getAttribute("href")).toBe("/emoji/cat");
  });

  test("renders emojis in correct order", () => {
    render(<EmojiGrid emojis={mockEmojis} />);

    const allEmojis = screen.getAllByRole("link");
    expect(allEmojis[0].textContent).toBe("😀");
    expect(allEmojis[1].textContent).toBe("🐱");
  });

  test("handles empty emoji array", () => {
    render(<EmojiGrid emojis={[]} />);

    expect(screen.getByText("0 emojis found")).toBeTruthy();
  });

  test("has proper accessibility attributes", () => {
    render(<EmojiGrid emojis={mockEmojis} />);

    const grinningLink = screen.getByText("😀").closest("a");
    expect(grinningLink?.getAttribute("title")).toContain("Grinning Face");
  });
});

describe("EmojiGrid Clipboard Functionality", () => {
  test("copies emoji to clipboard on click", async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined);

    Object.defineProperty(globalThis.navigator, "clipboard", {
      value: { writeText: mockWriteText },
      writable: true,
    });

    render(<EmojiGrid emojis={mockEmojis} />);

    const emojiLink = screen.getByText("😀").closest("a");
    if (emojiLink) {
      fireEvent.click(emojiLink);

      // Wait for async operation
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(mockWriteText).toHaveBeenCalledWith("😀");
    }
  });

  test("handles clipboard errors gracefully", async () => {
    const mockWriteText = jest.fn().mockRejectedValue(new Error("Clipboard error"));

    Object.defineProperty(globalThis.navigator, "clipboard", {
      value: { writeText: mockWriteText },
      writable: true,
    });

    // Should not throw error
    expect(() => {
      render(<EmojiGrid emojis={mockEmojis} />);
      const emojiLink = screen.getByText("😀").closest("a");
      if (emojiLink) {
        fireEvent.click(emojiLink);
      }
    }).not.toThrow();
  });
});
