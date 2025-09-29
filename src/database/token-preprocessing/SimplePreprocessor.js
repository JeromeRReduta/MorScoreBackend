export default class SimplePreprocessor {
  #stemmer;

  #stopwordChecker;

  constructor(stemmer, stopwordChecker) {
    this.#stemmer = stemmer;
    this.#stopwordChecker = stopwordChecker;
  }

  stem(token) {
    return this.#stemmer.stem(token);
  }

  isStopword(token) {
    return this.#stopwordChecker.isStopword(token);
  }

  runWithCollection(collection) {
    return collection
      .map((token) => token.toLowerCase())
      .map((token) => this.stem(token))
      .filter((stem) => stem !== "")
      .filter((stem) => !this.isStopword(stem));
  }
}
