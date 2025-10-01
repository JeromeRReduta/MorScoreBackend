/**
 * import Interface from "./Interface";

export default class Preprocessor extends Interface {
  constructor() {
    super("Preprocessor", ["run"]);
  }

  static run(batchedTokens, stemmer, stopwordChecker) {
    return batchedTokens
      .map((token) => stemmer.stem(token))
      .filter((stem) => stem !== "")
      .filter((stem) => !stopwordChecker.isStopword(stem));
  }
  run(batchedTokens) {}
}

 */

import Interface from "../../interfaces/Interface.js";
import Preprocessor from "../../interfaces/Preprocessor.js";

export default class SimplePreprocessor {
  #stemmer;

  #stopwordChecker;

  constructor(stemmer, stopwordChecker) {
    this.#stemmer = stemmer;
    this.#stopwordChecker = stopwordChecker;
    Interface.implements(Preprocessor, this);
  }

  run(batchedTokens) {
    return Preprocessor.run(
      batchedTokens,
      this.#stemmer,
      this.#stopwordChecker
    );
  }
}
