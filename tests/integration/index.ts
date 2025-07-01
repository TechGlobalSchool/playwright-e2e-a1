// import { test, chromium } from "@playwright/test";
const { chromium } = require('@playwright/test')

async function visitPage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.techglobal-training.com/");

  await page.waitForTimeout(3000)

  await page.close()
  await browser.close()
}


visitPage()
