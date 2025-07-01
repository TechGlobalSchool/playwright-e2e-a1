import { test, expect } from '@playwright/test';

test.describe('Playwright Actions 1 @Smoke', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.techglobal-training.com/");
        // await page.locator('#dropdown-testing').hover(); // hover action
        // await page.locator('#frontend-option').click(); // click action

        await page.hover('#dropdown-testing');
        await page.click('#frontend-option')

        await page.getByRole('link', { name: 'HTML Elements' }).click();
    });

    test('Check and uncheck checkboxes 1', async ({ page }) => {
        const appleCheckBox = page.locator('#apple_check');

        await appleCheckBox.check();

        await expect(appleCheckBox).toBeChecked();

        await appleCheckBox.uncheck();
        await expect(appleCheckBox).not.toBeChecked();
    });

    test('Check and uncheck checkboxes 2', async ({ page }) => {
        await page.check('#checkbox_3');
        await page.uncheck('#checkbox_3');
    });

    test('Check and uncheck radio buttons 1', async ({ page }) => {
        const javaRadio = page.locator('#java_radio');
        const jsRadio = page.locator('#js_radio');
        const csharpRadio = page.locator('#radio_1_option_3');

        await javaRadio.check();
        await expect(javaRadio).toBeChecked();
        await expect(jsRadio).not.toBeChecked();
        await expect(csharpRadio).not.toBeChecked();

        await csharpRadio.check();
        await expect(javaRadio).not.toBeChecked();
        await expect(jsRadio).not.toBeChecked();
        await expect(csharpRadio).toBeChecked();
    });

    test('Fill and clear input boxes', async ({ page }) => {
        await page.setViewportSize({
            width: 1920,
            height: 1080
        });

        const input = page.getByPlaceholder('Your Email');

        const email = 'TechGlobal@gmail.com';
        await input.fill(email);
        expect(await input.getAttribute('value')).toBe(email);

        await input.clear();
        expect(await input.getAttribute('value')).toBeFalsy();
    });

    test('Select dropdown options', async ({ page }) => {
        const companyDropdown = page.locator('#company_dropdown2');

        await companyDropdown.scrollIntoViewIfNeeded(); // it scrolls element to the middle of the page

        await companyDropdown.selectOption({ index: 1 }); // zero-based index
        await companyDropdown.selectOption({ label: 'Apple' });
        await companyDropdown.selectOption({ value: 'Tesla' });
    });
});


test.describe('Playwright Actions 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.techglobal-training.com/");

        await page.hover('#dropdown-testing');
        await page.click('#frontend-option')

        await page.getByRole('link', { name: 'Actions' }).click();
    });

    test('Double click and right click @Regression', async ({ page }) => {
        await page.locator('#right-click').click({ button: 'right' });
        await expect(page.locator('#right_click_result')).toBeVisible();

        await page.locator('#double-click').dblclick();
        await expect(page.locator('#double_click_result')).toBeVisible();
    });

    test('Drag and drop @E2E', async ({ page }) => {
        await page.dragAndDrop('#drag_element', '#drop_element');
        await expect(page.getByText('An element dropped here!')).toBeVisible();
    });
});

test('Valid search on Wiki @Regression', async ({ page }) => {
    const query = 'JavaScript';
    await page.goto('https://www.wikipedia.org/');
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill(query);
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).press('Enter');
    //await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('#firstHeading')).toContainText(query);
    await expect(page.getByRole('heading', { name: query }).locator('span')).toBeVisible();
});

test('Invalid search on Wiki @Smoke', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('asdaasfasfa');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('#mw-content-text')).toContainText('There were no results matching the query.');
    await expect(page.getByLabel('Search results').locator('i')).toContainText('The page "Asdaasfasfa" does not exist. You can create a draft and submit it for review or request that a redirect be created.');
});