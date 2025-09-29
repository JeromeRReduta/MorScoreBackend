/**
 * preprocessor that:
 * 1. lowercases
 * 2. stems
 * 3. remove stopwords
 * 3. converts to count map
 */ class Preprocessor {
  /** Converts tokens into a stem count map */
  run(tokens) {}

  runWithSource(source) {
    while (!source.isEmpty()) {
      const tokens = source.next();
      this.run(tokens);
    }
  }
}

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

  isStopWord(token) {
    return this.#stopwordChecker.isStopword(token);
  }

  mergeStems(stem, stemCounts) {
    const count = stemCounts.get(stem);
    if (Number.isNaN(count)) {
      stemCounts.set(stem, 1);
      return;
    }
    stemCounts.set(stem, count + 1);
  }

  runWithSource(source) {
    const stemCounts = new Map();
    source
      .asArray()
      .map((token) => this.stem(token))
      .filter((stem) => !this.isStopWord(stem))
      .forEach((validStem) => this.mergeStems(validStem, stemCounts));
    return stemCounts;
  }
}
