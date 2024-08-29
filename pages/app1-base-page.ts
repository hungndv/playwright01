import { type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class App1BasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}