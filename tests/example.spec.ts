import test, { expect } from '@playwright/test';

import shouldSkipTestAsync from '../utils/should-skip-test-async';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwrighteee/);
  await page.goto('https://playwright.dev/');
  await page.goto('https://playwright.dev/');
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
