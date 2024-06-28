import test, { expect } from '@playwright/test';

import { PlaywrightDevPage } from './playwright-dev-page';
import shouldSkipTestAsync from '../utils/shouldSkipTestAsync';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('[2] Title 2', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
});

test('[3] Title 3', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
});

test('[5] Title 5', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
});