import { test, expect } from "../../fixtures/pom-fixtures";

test.describe('Login Function', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('frontend/login')
  })

  test('Test', async ({ page, loginPage }) => {

    // await page.pause()

    await loginPage.userLogin(process.env.USER_NAME!, process.env.USER_PASSWORD!)
    await expect(loginPage.loginMessage).toHaveText('You are logged in')

    console.log(loginPage.errorMessage._selector)
  })
})