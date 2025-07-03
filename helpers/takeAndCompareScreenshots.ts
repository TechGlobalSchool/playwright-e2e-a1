import { Locator, expect } from "@playwright/test";


async function takeAndCompareScreenshot(locator: Locator, fileName?: string , options = {}) {
  await expect(locator).toHaveScreenshot(fileName!, { threshold: 0.2, ...options} )
}

export default takeAndCompareScreenshot