import { Locator } from "@playwright/test";

export class LocatorUtils {
  static async getTagName(locator: Locator) {
    return await locator.evaluate(e => e.tagName.toLowerCase());
  }
  static async getInputType(locator: Locator) {
    return await locator.evaluate(e => e.getAttribute("type")?.toLocaleLowerCase());
  }
}