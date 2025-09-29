class Preprocessor {
  /** Converts tokens into a stem count map */

  stem(token) {}

  isStopword(token) {}

  mergeStems(stem, stemCounts) {
    const count = stemCounts.get(stem);
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
      .filter((stem) => stem !== "")
      .filter((stem) => !this.isStopword(stem))
      .forEach((validStem) => this.mergeStems(validStem, stemCounts));
  }
}
