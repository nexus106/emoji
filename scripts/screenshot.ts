import { chromium } from "playwright";

async function takeScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // ページのサイズを設定
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 開発サーバーにアクセス
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // スクリーンショットを保存
  await page.screenshot({
    path: "screenshot.png",
    fullPage: true,
  });

  console.log("スクリーンショットを保存しました: screenshot.png");

  await browser.close();
}

takeScreenshot().catch(console.error);
