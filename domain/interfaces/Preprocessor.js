import Interface from "./Interface.js";
import Stemmer from "./Stemmer.js";
import StopwordChecker from "./StopwordChecker.js";

/**
 * Pre-processes tokens. In this case, takes in an already tokenized and batched string, lowercases all tokens, stems tokens, filters out empty stems and stopwords
 */
export default class Preprocessor extends Interface {
  constructor() {
    super();
  }

  /**
   * Default method. Processes tokens to be: 1. lowercase, 2. stemmed, 3. not empty, 4. not a stopword
   * @param {String[]} batchedTokens a batch of tokens
   * @param {Stemmer} stemmer a stemmer
   * @param {StopwordChecker} stopwordChecker something to check for stopwords
   * @returns A processed stem array
   */
  static run(batchedTokens, stemmer, stopwordChecker) {
    return batchedTokens
      .map((token) => token.toLowerCase())
      .map((token) => stemmer.stem(token))
      .filter((stem) => stem !== "")
      .filter((stem) => !stopwordChecker.isStopword(stem));
  }

  /** Implementation-specific run()
   * @returns A processed stem array
   */
  run(batchedTokens) {}
}
