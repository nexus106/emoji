/// <reference lib="dom" />

import { describe, test, expect, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import { ExploreLinks } from "./ExploreLinks";

afterEach(() => {
  cleanup();
});

describe("ExploreLinks Component", () => {
  test("renders explore section heading", () => {
    render(<ExploreLinks />);

    expect(screen.getByText("Explore")).toBeTruthy();
  });

  test("renders trending emojis link", () => {
    render(<ExploreLinks />);

    expect(screen.getByText("Trending Emojis")).toBeTruthy();
    expect(screen.getByText("Most popular emojis")).toBeTruthy();
  });

  test("renders collections link", () => {
    render(<ExploreLinks />);

    expect(screen.getByText("Collections")).toBeTruthy();
    expect(screen.getByText("Emojis by occasion")).toBeTruthy();
  });

  test("renders emoji guide link", () => {
    render(<ExploreLinks />);

    expect(screen.getByText("Emoji Guide")).toBeTruthy();
    expect(screen.getByText("How to use emojis")).toBeTruthy();
  });

  test("renders all explore icons", () => {
    render(<ExploreLinks />);

    expect(screen.getByText("🔥")).toBeTruthy();
    expect(screen.getByText("📚")).toBeTruthy();
    expect(screen.getByText("📖")).toBeTruthy();
  });

  test("renders links with correct href attributes", () => {
    render(<ExploreLinks />);

    const trendingLink = screen.getByText("Trending Emojis").closest("a");
    expect(trendingLink?.getAttribute("href")).toBe("/trending");

    const collectionsLink = screen.getByText("Collections").closest("a");
    expect(collectionsLink?.getAttribute("href")).toBe("/collections");

    const guideLink = screen.getByText("Emoji Guide").closest("a");
    expect(guideLink?.getAttribute("href")).toBe("/guide");
  });

  test("has correct layout structure", () => {
    const { container } = render(<ExploreLinks />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeTruthy();
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("sm:grid-cols-3");
  });

  test("all links have hover effects", () => {
    const { container } = render(<ExploreLinks />);

    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link.className).toContain("hover:");
    });
  });
});
