/// <reference lib="dom" />

import { afterEach, describe, expect, test } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

afterEach(() => {
  cleanup();
});

describe("Home Page", () => {
  test("should render header with title", () => {
    render(<Home />);
    expect(screen.getByText("Emoji Copy")).toBeTruthy();
  });

  test("should render search input", () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText("Search emojis...");
    expect(searchInput).toBeTruthy();
  });

  test("should render category buttons", () => {
    render(<Home />);
    const allButton = screen.getByText("All");
    expect(allButton).toBeTruthy();
  });

  test("should render emoji grid", () => {
    render(<Home />);
    // Check that emojis are rendered by looking for any emoji button
    // The first emoji in the grid should be visible
    const emojiButtons = screen.getAllByRole("button");
    // Should have multiple buttons (categories + many emojis)
    expect(emojiButtons.length).toBeGreaterThan(10);
  });

  test("should display results count", () => {
    render(<Home />);
    // Should show "X emojis found" or similar
    const resultsText = screen.getByText(/emoji.*found/);
    expect(resultsText).toBeTruthy();
  });
});
