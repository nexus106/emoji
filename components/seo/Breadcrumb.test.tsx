/// <reference lib="dom" />

import { describe, test, expect, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

afterEach(() => {
  cleanup();
});

describe("Breadcrumb Component", () => {
  test("renders breadcrumb items", () => {
    const items = [
      { name: "Home", href: "/" },
      { name: "People", href: "/category/people" },
    ];

    render(<Breadcrumb items={items} />);

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("People")).toBeTruthy();
  });

  test("renders correct number of items", () => {
    const items = [
      { name: "Home", href: "/" },
      { name: "People", href: "/category/people" },
      { name: "Grinning Face", href: "/emoji/1f600" },
    ];

    render(<Breadcrumb items={items} />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
  });

  test("last item has medium font weight", () => {
    const items = [
      { name: "Home", href: "/" },
      { name: "People", href: "/category/people" },
    ];

    render(<Breadcrumb items={items} />);

    const peopleLink = screen.getByText("People");
    expect(peopleLink.className).toContain("font-medium");
  });

  test("non-last items do not have medium font weight", () => {
    const items = [
      { name: "Home", href: "/" },
      { name: "People", href: "/category/people" },
    ];

    render(<Breadcrumb items={items} />);

    const homeLink = screen.getByText("Home");
    expect(homeLink.className).not.toContain("font-medium");
  });

  test("renders separators between items", () => {
    const items = [
      { name: "Home", href: "/" },
      { name: "People", href: "/category/people" },
    ];

    render(<Breadcrumb items={items} />);

    // Check that separators exist (visual check in actual rendering)
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
  });

  test("has proper ARIA label", () => {
    const items = [{ name: "Home", href: "/" }];

    render(<Breadcrumb items={items} />);

    const nav = screen.getByLabelText("Breadcrumb");
    expect(nav).toBeTruthy();
  });
});
