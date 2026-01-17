import { describe, it, expect } from "bun:test";
import { getPopularEmojis, getTrendingEmojis } from "@/lib/popular-emojis";

// Test the underlying data functions instead of the server component
describe("PopularEmojis (data)", () => {
  it("returns popular emojis", async () => {
    const emojis = await getPopularEmojis(10);
    expect(emojis.length).toBe(10);
    expect(emojis[0]).toHaveProperty("id");
    expect(emojis[0]).toHaveProperty("emoji");
    expect(emojis[0]).toHaveProperty("name");
  });

  it("returns trending emojis", async () => {
    const emojis = await getTrendingEmojis(5);
    expect(emojis.length).toBe(5);
  });

  it("respects limit parameter", async () => {
    const emojis = await getPopularEmojis(20);
    expect(emojis.length).toBeLessThanOrEqual(20);
  });

  it("returns emojis with valid structure", async () => {
    const emojis = await getPopularEmojis(1);
    expect(emojis[0].id).toBeTruthy();
    expect(emojis[0].emoji.length).toBeGreaterThan(0);
    expect(emojis[0].name.length).toBeGreaterThan(0);
    expect(Array.isArray(emojis[0].keywords)).toBe(true);
  });
});
