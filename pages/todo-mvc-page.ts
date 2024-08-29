import { expect, type Locator, type Page } from '@playwright/test';
import { App1BasePage } from './app1-base-page';

export class TodoMvcPage extends App1BasePage {
  readonly newTodo: Locator;

  constructor(page: Page) {
    super(page);

    this.newTodo = page.getByPlaceholder("What needs to be done?");
  }

  async gotoPage() {
    console.log("gotoPage");
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }
}