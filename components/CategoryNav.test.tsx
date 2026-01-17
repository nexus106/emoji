/// <reference lib="dom" />

import { describe, test, expect, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import { CategoryNav } from "./CategoryNav";

afterEach(() => {
  cleanup();
});

describe("CategoryNav Component", () => {
  test("renders category navigation heading", () => {
    render(<CategoryNav />);

    expect(screen.getByText("Browse by Category")).toBeTruthy();
  });

  test("renders all category links", () => {
    render(<CategoryNav />);

    // Check for some known categories
    expect(screen.getByText("People")).toBeTruthy();
    expect(screen.getByText("Nature")).toBeTruthy();
    expect(screen.getByText("Foods")).toBeTruthy();
  });

  test("renders category icons", () => {
    const { container } = render(<CategoryNav />);

    // Check that emojis/icons are rendered
    expect(container.textContent).toMatch(/😀|🌿|🍕/);
  });

  test("renders links with correct href attributes", () => {
    render(<CategoryNav />);

    // Check for specific category links
    const peopleLink = screen.getByText("People").closest("a");
    expect(peopleLink?.getAttribute("href")).toBe("/category/people");

    const natureLink = screen.getByText("Nature").closest("a");
    expect(natureLink?.getAttribute("href")).toBe("/category/nature");
  });

  test("has correct styling classes", () => {
    render(<CategoryNav />);

    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("overflow-x-auto");
  });
});
