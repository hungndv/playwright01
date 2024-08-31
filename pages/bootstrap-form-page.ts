import { expect, type Locator, type Page } from '@playwright/test';
import { App1BasePage } from './app1-base-page';

export class BootstrapFormPage extends App1BasePage {
  readonly emailAddress: Locator;
  readonly exampleTextarea: Locator;
  readonly password: Locator;
  readonly multiFileInput: Locator;
  readonly select: Locator;

  constructor(page: Page) {
    super(page);

    this.emailAddress = page.getByLabel("Email address");
    this.exampleTextarea = page.getByLabel("Example textarea");
    this.password = page.locator("css=#inputPassword");
    this.multiFileInput = page.getByLabel("Multiple files input example");
    this.select = page.locator("css=select").locator('nth=0');
  }
}