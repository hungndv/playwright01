import { expect, test } from './app1-test';

import shouldSkipTestAsync from '../utils/should-skip-test';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('[1] Title 1', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
});

test('[4] Title 4', async ({ playwrightDevPage, page }) => {
  await playwrightDevPage.gotoHomePage();
  await playwrightDevPage.clickPageObjectModelLink();
  await expect(page.locator("article")).toContainText('Page Object Model is a common pattern');
});