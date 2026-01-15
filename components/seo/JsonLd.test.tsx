/// <reference lib="dom" />

import { describe, test, expect, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import JsonLd from "./JsonLd";

afterEach(() => {
  cleanup();
});

describe("JsonLd Component", () => {
  test("renders JSON-LD script tag with correct data", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Thing",
      name: "Test",
    };

    render(<JsonLd data={data} />);

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    expect(script?.textContent).toBe(JSON.stringify(data));
  });

  test("renders multiple JSON-LD scripts", () => {
    const data1 = { "@context": "https://schema.org", "@type": "Thing", name: "Test1" };
    const data2 = { "@context": "https://schema.org", "@type": "Thing", name: "Test2" };

    render(
      <>
        <JsonLd data={data1} />
        <JsonLd data={data2} />
      </>
    );

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(2);
  });

  test("handles complex nested objects", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home" },
        { "@type": "ListItem", position: 2, name: "Category" },
      ],
    };

    render(<JsonLd data={data} />);

    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toBe(JSON.stringify(data));
  });
});
