import { expect, type Locator, type Page } from '@playwright/test';
import { App1BasePage } from './app1-base-page';

export class BootstrapFormPage extends App1BasePage {
  readonly emailAddress: Locator;
  readonly exampleTextarea: Locator;
  readonly password: Locator;
  readonly multiFileInput: Locator;

  constructor(page: Page) {
    super(page);

    this.emailAddress = page.getByLabel("Email address");
    this.exampleTextarea = page.getByLabel("Example textarea");
    this.password = page.locator("css=#inputPassword");
    this.multiFileInput = page.getByLabel("Multiple files input example");
  }

  async gotoFormControlPage() {
    console.log("gotoPage");
    await this.page.goto('https://getbootstrap.com/docs/5.0/forms/form-control/');
  }
}