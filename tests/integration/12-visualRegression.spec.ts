import { test, expect } from "@playwright/test";
import takeAndCompareScreenshot from "../../helpers/takeAndCompareScreenshots";

test.describe("Visual Regression", () => {
  test("Should take a screenshot of the page", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveScreenshot(`${test.info().title} homepage.png`);
  });

  test("Should take a screenshot of a web element", async ({ page }) => {
    await page.goto("/");

    const sect = page.locator(".Header_header__HXQOm");

    await expect(sect).toHaveScreenshot({ threshold: 0.2 });
  });

  test("Take a screenshot of a fullpage", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  test("Take a screenshot of a page, but ignore some web elements", async ({
    page,
  }) => {
    await page.goto("/frontend");

    const card3 = page.locator("#card-3");
    const card5 = page.locator("#card-5");
    const card7 = page.locator("#card-7");

    await expect(page).toHaveScreenshot({ mask: [card3, card5, card7] });
  });

  test("Take screenshot first, then validate", async ({ page }) => {
    await page.goto("/frontend");

    const allCards = page.locator(".CardGrids_CardGrids__qDdyI");
    const card5 = page.locator("#card-5");
    const card8 = page.locator("#card-8");

    const snapshot = await allCards.screenshot({
      mask: [card5, card8],
      maskColor: "yellow",
    });

    expect(snapshot).toMatchSnapshot();
  });

  test("Screenshot using method", async ({ page }) => {
    await page.goto("/frontend");

    const allCards = page.locator(".CardGrids_CardGrids__qDdyI");

    const card8 = page.locator("#card-8");

    await takeAndCompareScreenshot(allCards)
    await takeAndCompareScreenshot(allCards, 'allCardsMasked.png', { mask: [card8]} )

    await takeAndCompareScreenshot.call(this, page)
  });
});