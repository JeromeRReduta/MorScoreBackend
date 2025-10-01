import Interface from "./Interface";

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
