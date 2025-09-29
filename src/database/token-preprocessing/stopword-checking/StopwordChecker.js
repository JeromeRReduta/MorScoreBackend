export default class StopwordChecker {
  static isStopword(stem, stopwordRegex) {
    return stem.match(stopwordRegex);
  }

  isStopword(stem) {}
}
