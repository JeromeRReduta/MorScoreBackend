import Preprocessor from "./Preprocessor";

export default class SimplePreprocessor {
  #stemmer;

  #stopwordChecker;

  constructor(stemmer, stopwordChecker) {
    this.#stemmer = stemmer;
    this.#stopwordChecker = stopwordChecker;
  }

  run(batchedTokens) {
    return Preprocessor.run(
      batchedTokens,
      this.#stemmer,
      this.#stopwordChecker
    );
  }
}
