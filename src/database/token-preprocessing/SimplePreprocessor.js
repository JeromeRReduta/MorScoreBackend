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

  mergeStems(stem, stemCounts) {
    const count = stemCounts.get(stem);
    // console.log("checking", stem, count, !Number.isInteger(count));
    if (!Number.isInteger(count)) {
      stemCounts.set(stem, 1);
      return;
    }
    stemCounts.set(stem, count + 1);
  }

  runWithBatch(batch, stemCounts) {
    batch
      .map((token) => token.toLowerCase())
      .map((token) => this.stem(token))
      .filter((stem) => !this.isStopword(stem))
      .forEach((validStem) => this.mergeStems(validStem, stemCounts));
  }
}
