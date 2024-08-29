import { Locator, type Page } from '@playwright/test';
import { text } from 'stream/consumers';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickLink(linkText: string): Promise<void> {
    await this.page.locator('a', { hasText: linkText }).click();
  }

  async populate(model: object[]): Promise<void> {
    for (const obj of model) {
      const propName = Object.keys(obj)[0];
      const propValue = obj[propName];

      if (!propValue) return;

      const locator: Locator = this[propName];

      if (!locator) return;

      const tagName: string = await locator.evaluate(e => e.tagName);

      switch (tagName) {
        case "INPUT":
          {
            const inputType = await locator.evaluate(e => e.getAttribute("type"));
            switch (inputType) {
              case "checkbox":
                await locator.setChecked(propValue)
                break;
              case "text":
              default:
                await locator.fill(propValue);
                break;
            }
          }
          break;

        default:
          break;
      }

    };
  }
}