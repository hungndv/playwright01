import { PlaywrightDevPage } from '../pages/playwright-dev-page';
import { test as base } from '@playwright/test';

type App1Fixture = {
  playwrightDevPage: PlaywrightDevPage;
};

export const test = base.extend<App1Fixture>({
  playwrightDevPage: async ({ page }, use) => {
    await use(new PlaywrightDevPage(page));
  },
});

export { expect } from "@playwright/test";