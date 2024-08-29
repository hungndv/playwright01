import test, { expect } from '@playwright/test';

import shouldSkipTestAsync from '../utils/shouldSkipTestAsync';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('[6] Title 6', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwrighteee/);
  await page.goto('https://playwright.dev/');
  await page.goto('https://playwright.dev/');
});
