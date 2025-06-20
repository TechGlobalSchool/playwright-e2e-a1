import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await page
      .getByRole("link", { name: "HTML Elements", exact: true })
      .click();


    await page.click('#register_buttonqwe')
});

test('has title2', async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await page
      .getByRole("link", { name: "HTML Elements", exact: true })
      .click();


    await page.click('#register_buttonqwe')
});