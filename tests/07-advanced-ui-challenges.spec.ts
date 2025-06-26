import { test, expect } from '@playwright/test';

test.describe('IFrames', () => {
    test.beforeEach(async({ page }) => {
        await page.goto("https://www.techglobal-training.com/");
        await page.hover('#dropdown-testing');
        await page.click('#frontend-option')
    });

    test('IFrames 1', async({ page }) => {
        await page.getByRole('link', { name: 'IFrames' }).click();

        const frame = page.locator('#form_frame');

        const [ fname, lname ] = [ 'John', 'Doe' ];
        
        // IFrame actions
        await frame.contentFrame().getByRole('textbox', { name: 'Please enter your first name' }).fill(fname);
        await frame.contentFrame().getByRole('textbox', { name: 'Please enter your last name' }).fill(lname);
        await frame.contentFrame().getByRole('button', { name: 'SUBMIT' }).click();

        await expect(page.locator('#result')).toContainText(`You entered: ${fname} ${lname}`);
    });

    test('IFrames 2', async({ page }) => {
        await page.getByRole('link', { name: 'IFrames' }).click();

        const frame = page.frameLocator('#form_frame');

        const [ fname, lname ] = [ 'Alex', 'Smith' ];
        
        // IFrame actions
        await frame.locator('#first_name').fill(fname);
        await frame.locator('#last_name').fill(lname);
        await frame.locator('#submit').click();

        await expect(page.locator('#result')).toContainText(`You entered: ${fname} ${lname}`);
    });
});

test.describe('Multiple Windows', () => {
    test('Multiple tabs', async({ context }) => {
        test.slow();
        const page1 = await context.newPage();
        await page1.goto('https://www.techglobal-training.com/');
        await page1.getByRole('link', {name: 'See Our Programs'}).click();

        await page1.close(); // close the tab

        const page2 = await context.newPage();
        await page2.goto('https://www.facebook.com/');
        await page2.getByTestId('open-registration-form-button').click()

        await page2.close(); // close the tab

        const page3 = await context.newPage();
        await page3.goto('https://www.wikipedia.org/');
        await page3.locator('#searchInput').fill('Playwright');
        await page3.keyboard.press('Enter');
    });

    test.only('Multiple tabs when a button/link clicked', async({ page }) => {
        await page.goto('https://www.techglobal-training.com/');

        const [ newTab ] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('link', {name: 'See Our Programs'}).click()
        ]);
        
        await expect(newTab.getByText('What do we offer?')).toBeVisible();
        await page.waitForTimeout(2000);


        await page.bringToFront();
        await page.waitForTimeout(2000);

        await expect(page.getByText('Welcome to TechGlobal')).toBeVisible();
    });
});


