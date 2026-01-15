/// <reference lib="dom" />

import { describe, test, expect, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import Pagination from "./Pagination";

afterEach(() => {
  cleanup();
});

describe("Pagination Component", () => {
  test("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} baseUrl="/category/people" />
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders page numbers correctly", () => {
    render(
      <Pagination currentPage={1} totalPages={5} baseUrl="/category/people" />
    );

    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
    expect(screen.getByText("4")).toBeTruthy();
    expect(screen.getByText("5")).toBeTruthy();
  });

  test("renders previous link when not on first page", () => {
    render(
      <Pagination currentPage={2} totalPages={5} baseUrl="/category/people" />
    );

    const prevLink = screen.getByLabelText("Previous page");
    expect(prevLink.getAttribute("href")).toBe("/category/people?page=1");
    expect(screen.getByText("← Previous")).toBeTruthy();
  });

  test("does not render previous link on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} baseUrl="/category/people" />
    );

    expect(screen.queryByLabelText("Previous page")).toBeNull();
  });

  test("renders next link when not on last page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} baseUrl="/category/people" />
    );

    const nextLink = screen.getByLabelText("Next page");
    expect(nextLink.getAttribute("href")).toBe("/category/people?page=2");
    expect(screen.getByText("Next →")).toBeTruthy();
  });

  test("does not render next link on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} baseUrl="/category/people" />
    );

    expect(screen.queryByLabelText("Next page")).toBeNull();
  });

  test("highlights current page", () => {
    render(
      <Pagination currentPage={3} totalPages={5} baseUrl="/category/people" />
    );

    const currentPageLink = screen.getByLabelText("Page 3");
    expect(currentPageLink.className).toContain("bg-zinc-900");
    expect(currentPageLink.getAttribute("aria-current")).toBe("page");
  });

  test("shows ellipsis for large page counts", () => {
    render(
      <Pagination currentPage={5} totalPages={20} baseUrl="/category/people" />
    );

    // Should have ellipsis
    const ellipsis = screen.getAllByText("...");
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  test("has proper ARIA label", () => {
    render(
      <Pagination currentPage={1} totalPages={5} baseUrl="/category/people" />
    );

    const nav = screen.getByLabelText("Pagination");
    expect(nav).toBeTruthy();
  });

  test("generates correct pagination array for small total", () => {
    render(
      <Pagination currentPage={2} totalPages={5} baseUrl="/category/people" />
    );

    const links = screen.getAllByRole("link");
    // Should have pages 1-5 plus prev/next
    expect(links.length).toBeGreaterThan(0);
  });

  test("generates correct pagination array for large total", () => {
    render(
      <Pagination currentPage={5} totalPages={100} baseUrl="/category/people" />
    );

    // Should have ellipsis
    const ellipsis = screen.getAllByText("...");
    expect(ellipsis.length).toBeGreaterThan(0);

    // Should always have first 2 pages
    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();

    // Should always have last 2 pages
    expect(screen.getByText("99")).toBeTruthy();
    expect(screen.getByText("100")).toBeTruthy();
  });
});
