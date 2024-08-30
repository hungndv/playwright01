import { Locator, type Page } from '@playwright/test';
import { text } from 'stream/consumers';
import { StringUtils } from '../utils/string-utils';
import { Constants } from '../utils/constants';
import path from 'path';

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

      await this.setText(locator, propValue);

    };
  }

  private async setText(locator: Locator, propValue: string) {
    const tagName: string = await locator.evaluate(e => e.tagName.toLowerCase());

    switch (tagName) {
      case Constants.TAG_TEXTAREA:
        await locator.fill(propValue);
        break;
      case Constants.TAG_INPUT:
        {
          const inputType = await locator.evaluate(e => e.getAttribute("type")?.toLocaleLowerCase());
          switch (inputType) {
            case Constants.INPUT_TYPE_CHECKBOX:
              await locator.setChecked(StringUtils.toBoolean(propValue));
              break;
            case Constants.INPUT_TYPE_FILE:
              const fileChooserPromise = this.page.waitForEvent('filechooser');
              await locator.click();
              const fileChooser = await fileChooserPromise;
              // File destination.txt will be created or overwritten by default.
              const fs = require('fs');
              fs.copyFile('sample.pdf', propValue, (err) => {
                if (err) throw err;
              });
              await fileChooser.setFiles(path.join(__dirname, '../', propValue));
              break;
            case Constants.INPUT_TYPE_TEXT:
            default:
              await locator.fill(propValue);
              break;
          }
        }
        break;
      default:
        break;
    }
  }
}