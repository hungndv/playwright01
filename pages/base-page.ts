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


  @loggedMethod
  async clickLink(linkText: string): Promise<void> {
    await this.page.locator('a', { hasText: linkText }).click();
  }

  @loggedMethod
  async populate(model: object[]): Promise<void> {
    for (const obj of model) {
      const propName = Object.keys(obj)[0];
      const propValue = obj[propName];

      if (!propValue) continue;

      const locator: Locator = this[propName];

      if (!await locator.isVisible()) continue;

      await this.setText(locator, propValue);

    };
  }

  @loggedMethod
  private async setText(locator: Locator, propValue: string) {
    const tagName = await LocatorUtils.getTagName(locator);

    switch (tagName) {
      case Constants.TAG_INPUT:
        {
          const inputType = await LocatorUtils.getInputType(locator);
          switch (inputType) {
            case Constants.INPUT_TYPE_CHECKBOX:
            case Constants.INPUT_TYPE_RADIO:
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
      case Constants.TAG_SELECT:
        await locator.selectOption({ label: propValue });
        break;
      case Constants.TAG_TEXTAREA:
        await locator.fill(propValue);
        break;
      default:
        break;
    }
  }

  private async getText(locator: Locator) {
    const tagName = await LocatorUtils.getTagName(locator);

    switch (tagName) {
      case Constants.TAG_INPUT:
        {
          const inputType = await LocatorUtils.getInputType(locator);
          switch (inputType) {
            case Constants.INPUT_TYPE_CHECKBOX:
            case Constants.INPUT_TYPE_RADIO:
              return BooleanUtils.toYesNoString(await locator.isChecked());
            case Constants.INPUT_TYPE_FILE:
              break;
            case Constants.INPUT_TYPE_TEXT:
            default:
              return await locator.inputValue();
          }
        }
      case Constants.TAG_SELECT:
        return await locator.evaluate((node: HTMLSelectElement) => node.options[node.options.selectedIndex].textContent);
      case Constants.TAG_TEXTAREA:
        return await locator.inputValue();
      default:
        return locator.innerText;
    }
  }

  @loggedMethod
  async verify(model: object[]): Promise<void> {
    for (const obj of model) {
      const propName = Object.keys(obj)[0];
      const propValue = obj[propName];

      if (!propValue) continue;

      const locator: Locator = this[propName];

      if (!await locator.isVisible()) continue;

      await this.expectLocatorToBe(locator, propValue)

    };
  }

  @loggedMethod
  async expectLocatorToBe(locator: Locator, expected: string) {
    const tagName = await LocatorUtils.getTagName(locator);

    switch (tagName) {
      case Constants.TAG_INPUT:
        {
          const inputType = await LocatorUtils.getInputType(locator);
          switch (inputType) {
            case Constants.INPUT_TYPE_CHECKBOX:
            case Constants.INPUT_TYPE_RADIO:
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
      case Constants.TAG_SELECT:
        const selectedText = await this.getText(locator);
        expect(selectedText).toEqual(expected);
        break;
      case Constants.TAG_TEXTAREA:
        await expect(locator).toHaveValue(expected);
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

  @loggedMethod
  async clickAndVerifyFileDownloaded(locator: Locator, filename: string) {
    // Start waiting for download before clicking. Note no await.
    const downloadPromise = this.page.waitForEvent('download');
    await locator.click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    const actual = download.suggestedFilename();
    await download.saveAs(path.join(Constants.FOLDER_AUTO_FILES, actual));
    expect(actual).toEqual(filename);
  }
}