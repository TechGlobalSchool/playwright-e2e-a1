import { test, expect } from '@playwright/test';

test.describe('', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.facebook.com/');
    });

    test('Assertions - auto-retry', async ({ page }) => {
        test.fail();
        await expect(page.getByAltText('acebook', { exact: true })).toBeVisible();
    });

    test('Assertions - non-retry', async ({ page }) => {
        test.fail();
        expect(await page.title()).toBe('acebook - log in or sign up');
    });

    test('Assertions - toPass() command', async ({ page }) => {
        // toPass() can be used to change the behavior of non-retry assertion
        test.fail();

        await expect(async() => {
            expect(await page.title()).toBe('acebook - log in or sign up');
        }).toPass({ timeout: 4000 });
    });

    test.only('Soft Assertions', async({ page }) => {
        test.fail();
        console.log('1');
        expect.soft(await page.locator('._8eso').innerText()).toContain('abcde');
        console.log('2');
        await expect.soft(page.locator('._8eso')).toContainText('abcde');
        console.log('3');
    });
})