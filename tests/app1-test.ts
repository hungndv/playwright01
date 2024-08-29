import { PlaywrightDevPage } from '../pages/playwright-dev-page';
import { TodoMvcPage } from '../pages/todo-mvc-page';
import { test as base } from '@playwright/test';

type App1Fixture = {
  playwrightDevPage: PlaywrightDevPage;
  todoMvcPage: TodoMvcPage;
};

export const test = base.extend<App1Fixture>({
  playwrightDevPage: async ({ page }, use) => {
    await use(new PlaywrightDevPage(page));
  },
  todoMvcPage: async ({ page }, use) => {
    await use(new TodoMvcPage(page));
  },
});

export { expect } from "@playwright/test";