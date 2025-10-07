import Interface from "../../domain/interfaces/Interface.js";
import Preprocessor from "../../domain/interfaces/Preprocessor.js";

export default class SimplePreprocessor {
  #stemmer;

  #stopwordChecker;

  constructor(stemmer, stopwordChecker) {
    this.#stemmer = stemmer;
    this.#stopwordChecker = stopwordChecker;
    Interface.implements(Preprocessor, SimplePreprocessor);
  }

  run(batchedTokens) {
    return Preprocessor.run(
      batchedTokens,
      this.#stemmer,
      this.#stopwordChecker
    );
  }
}
