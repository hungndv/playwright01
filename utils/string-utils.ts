export class StringUtils {
  static toBoolean(str: string) {
    return ["true", "yes"].includes(str.toLowerCase());
  }
}