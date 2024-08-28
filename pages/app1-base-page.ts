import { type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class App1BasePage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
  }
}