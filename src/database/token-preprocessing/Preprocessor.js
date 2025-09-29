export default class Preprocessor {
  /** Converts tokens into a stem count map */

  static run(batchedTokens, stemmer, stopwordChecker) {
    return batchedTokens
      .map((token) => stemmer.stem(token))
      .filter((stem) => stem !== "")
      .filter((stem) => !stopwordChecker.isStopword(stem));
  }

  run(batchedTokens) {}
}
