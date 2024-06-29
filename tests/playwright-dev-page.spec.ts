import { expect, test } from './app-test';

import shouldSkipTestAsync from '../utils/shouldSkipTestAsync';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test.afterEach(async ({ page }) => {
  const info = test.info();
  const status = test.info().status;

  if (status == "skipped") return;

  if (status == "passed") {
    // log result to test plan
    return;
  }

  await page.screenshot({ path: 'screenshot.png' });

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