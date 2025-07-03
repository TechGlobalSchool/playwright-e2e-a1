import { test, expect } from "@playwright/test";

test.describe("Timeouts & Waits", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/frontend/waits");
  });

  test("Should wait for an element to be visible", async ({ page }) => {
    // test.setTimeout(8000)

    const redBoxButton = page.locator("#red");
    await redBoxButton.click();

    const redBox = page.locator('button[class*="red_box__sadsa"]');
    await expect(redBox).toBeVisible({ timeout: 11000 });

    // await redBox.click()
  });

  test("Waits", async ({ page }) => {
    const redBoxButton = page.locator("#red");

    // 1st
    await redBoxButton.waitFor({ state: 'visible' })
    await page.waitForSelector('#main_heading', { state: 'visible' })

    await page.waitForLoadState()

    // await page.waitForResponse()
  });
});
