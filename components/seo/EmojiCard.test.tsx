/// <reference lib="dom" />

import { describe, test, expect, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import EmojiCard from "./EmojiCard";
import type { Emoji } from "@/lib/types";

afterEach(() => {
  cleanup();
});

describe("EmojiCard Component", () => {
  const mockEmoji: Emoji = {
    id: "1f600",
    emoji: "😀",
    name: "Grinning Face",
    keywords: ["grin", "happy", "smile"],
    category: "people",
  };

  test("renders emoji character", () => {
    render(<EmojiCard emoji={mockEmoji} />);

    const emoji = screen.getByText("😀");
    expect(emoji).toBeTruthy();
  });

  test("links to correct emoji page", () => {
    render(<EmojiCard emoji={mockEmoji} />);

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/emoji/1f600");
  });

  test("has title attribute with emoji name", () => {
    render(<EmojiCard emoji={mockEmoji} />);

    const link = screen.getByRole("link");
    expect(link.getAttribute("title")).toBe("Grinning Face");
  });

  test("renders with medium size by default", () => {
    const { container } = render(<EmojiCard emoji={mockEmoji} />);

    const link = container.firstChild as HTMLElement;
    expect(link.className).toContain("w-14 h-14 text-3xl");
  });

  test("renders with small size when specified", () => {
    const { container } = render(<EmojiCard emoji={mockEmoji} size="sm" />);

    const link = container.firstChild as HTMLElement;
    expect(link.className).toContain("w-12 h-12 text-2xl");
  });

  test("renders with large size when specified", () => {
    const { container } = render(<EmojiCard emoji={mockEmoji} size="lg" />);

    const link = container.firstChild as HTMLElement;
    expect(link.className).toContain("w-16 h-16 text-4xl");
  });

  test("has hover and active state classes", () => {
    const { container } = render(<EmojiCard emoji={mockEmoji} />);

    const link = container.firstChild as HTMLElement;
    expect(link.className).toContain("hover:scale-110");
    expect(link.className).toContain("active:scale-95");
  });

  test("has dark mode classes", () => {
    const { container } = render(<EmojiCard emoji={mockEmoji} />);

    const link = container.firstChild as HTMLElement;
    expect(link.className).toContain("dark:bg-zinc-900");
    expect(link.className).toContain("dark:hover:bg-zinc-800");
  });
});
