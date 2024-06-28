import { expect, test } from './app-test';

import shouldSkipTestAsync from '../utils/shouldSkipTestAsync';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('[1] Title 1', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
});

test('[4] Title 4', async ({ playwrightDevPage, page }) => {
  await playwrightDevPage.goto();
  await playwrightDevPage.pageObjectModel();
  await expect(page.locator("article")).toContainText('Page Object Model is a common pattern');
});