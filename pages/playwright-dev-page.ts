import { expect, type Locator, type Page } from '@playwright/test';
import { App1BasePage } from './app1-base-page';

export class PlaywrightDevPage extends App1BasePage {
  readonly getStartedLink: Locator;
  readonly gettingStartedHeader: Locator;
  readonly pomLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    super(page);

    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
    this.pomLink = page.locator('li', {
      hasText: 'Guides',
    }).locator('a', {
      hasText: 'Page Object Model',
    });
    this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async gotoHomePage() {
    console.log("gotoHomePage");
    await this.page.goto('https://playwright.dev');
  }

  async clickStartedLink() {
    console.log("clickStartedLink");
    // await this.getStartedLink.first().click();
    await this.clickLink('Get started');
    await expect(this.gettingStartedHeader).toBeVisible();
  }

  async clickPageObjectModelLink() {
    console.log("clickPageObjectModelLink");
    await this.clickStartedLink();
    await this.pomLink.click();
  }
}