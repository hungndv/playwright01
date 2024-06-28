import test, { expect } from '@playwright/test';

import { Constants } from '../Constants';
import { PlaywrightDevPage } from './playwright-dev-page';
import { promises } from 'fs';
import shouldSkipTestAsync from '../utils/shouldSkipTestAsync';

test.beforeEach(async ({ page }) => {
  await shouldSkipTestAsync(test);
});

test('[1] Title 1', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
});

test('[4] Title 4', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
});