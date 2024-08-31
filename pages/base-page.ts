import { expect, Locator, type Page } from '@playwright/test';
import { StringUtils } from '../utils/string-utils';
import { Constants } from '../utils/constants';
import path from 'path';
import { LocatorUtils } from '../utils/locator-utils';
import { BooleanUtils } from '../utils/boolean-utils';
import loggedMethod from '../utils/logged-method';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickLink(linkText: string): Promise<void> {
    await this.page.locator('a', { hasText: linkText }).click();
  }

  @loggedMethod
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
    const tagName = await LocatorUtils.getTagName(locator);

    switch (tagName) {
      case Constants.TAG_TEXTAREA:
        await locator.fill(propValue);
        break;
      case Constants.TAG_INPUT:
        {
          const inputType = await LocatorUtils.getInputType(locator);
          switch (inputType) {
            case Constants.INPUT_TYPE_CHECKBOX:
              await locator.setChecked(StringUtils.toBoolean(propValue));
              break;
            case Constants.INPUT_TYPE_FILE:
              const fileChooserPromise = this.page.waitForEvent('filechooser');
              await locator.click();
              const fileChooser = await fileChooserPromise;
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

  private async getText(locator: Locator) {
    const tagName = await LocatorUtils.getTagName(locator);

    switch (tagName) {
      case Constants.TAG_TEXTAREA:
        return await locator.inputValue();
      case Constants.TAG_INPUT:
        {
          const inputType = await LocatorUtils.getInputType(locator);
          switch (inputType) {
            case Constants.INPUT_TYPE_CHECKBOX:
              return BooleanUtils.toYesNoString(await locator.isChecked());
            case Constants.INPUT_TYPE_FILE:
              break;
            case Constants.INPUT_TYPE_TEXT:
            default:
              return await locator.inputValue();
          }
        }
        break;
      default:
        return locator.innerText;
    }
  }

  @loggedMethod
  async verify(model: object[]): Promise<void> {
    for (const obj of model) {
      const propName = Object.keys(obj)[0];
      const propValue = obj[propName];

      if (!propValue) return;

      const locator: Locator = this[propName];

      if (!locator) return;

      await this.expectLocatorToBe(locator, propValue)

    };
  }

  async expectLocatorToBe(locator: Locator, expected: string) {
    const tagName = await LocatorUtils.getTagName(locator);

    switch (tagName) {
      case Constants.TAG_TEXTAREA:
        await expect(locator).toHaveValue(expected);
        break;
      case Constants.TAG_INPUT:
        {
          const inputType = await LocatorUtils.getInputType(locator);
          switch (inputType) {
            case Constants.INPUT_TYPE_CHECKBOX:
              const actual = await this.getText(locator);
              expect(actual).toBe(expected);
              break;
            case Constants.INPUT_TYPE_FILE:
              expect(await locator.inputValue()).toContain(expected);
              break;
            case Constants.INPUT_TYPE_TEXT:
            default:
              await expect(locator).toHaveValue(expected);
              break;
          }
        }
        break;
      default:
        await expect(locator).toHaveText(expected);
        break;
    }
  }

  @loggedMethod
  async gotoUrl(url: string) {
    await this.page.goto(url);
  }
}