import { PlaywrightDevPage } from '../pages/playwright-dev-page';
import { test as base } from '@playwright/test';

type AppFixtures = {
  playwrightDevPage: PlaywrightDevPage;
};

export const test = base.extend<AppFixtures>({
  playwrightDevPage: async ({ page }, use) => {
    await use(new PlaywrightDevPage(page));
  },
});

export { expect } from "@playwright/test";