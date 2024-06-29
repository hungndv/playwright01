import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickLink(linkText: string): Promise<void> {
    this.page.locator('a', { hasText: linkText }).click();
  }
}