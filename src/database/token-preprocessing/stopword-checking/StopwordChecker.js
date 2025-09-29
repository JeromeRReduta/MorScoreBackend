export default class StopwordChecker {
  #stopwordRegex;

  constructor(stopwordRegex) {
    this.#stopwordRegex = stopwordRegex;
  }

  isStopword(stem) {
    return stem.match(this.#stopwordRegex);
  }
}
