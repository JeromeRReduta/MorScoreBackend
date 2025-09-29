class Preprocessor {
  /** Converts tokens into a stem count map */

  stem(token) {}

  isStopWord(token) {}

  mergeStems(stem, stemCounts) {
    const count = stemCounts.get(stem);
    if (Number.isNaN(count)) {
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
