export default class InvertedIndex {
  #preprocessor;
  #stemCounts;
  #partitioner;

  constructor(preprocessor, partitioner) {
    this.#preprocessor = preprocessor;
    this.#stemCounts = new Map();
    this.#partitioner = partitioner;
  }
  /** Note that any string (input from text source or query) must be preprocessed w/ the same preprocessor or behavior will be undefined */

  /** reads a TextSource into index */
  read(source) {
    source
      .asArray()
      .map((batch) => this.#preprocessor.runWithCollection(batch))
      .filter((stem) => stem !== "")
      .map((stems) => this.#partitioner.partition(stems))
      .forEach((counts) => this.#add(counts));
  }

  #add(tempCounts) {
    for (let [key, value] of tempCounts) {
      console.log(`{${key}, ${value}}`);
      const count = this.#stemCounts.get(key);
      if (!Number.isInteger(count)) {
        this.#stemCounts.set(key, value);
        continue;
      }
      this.#stemCounts.set(key, count + value);
    }
  }

  searchAnyMatch(queryTokens) {
    const results = new Map();
    const processedTokens = this.#preprocessor.runWithCollection(queryTokens);
    const uniqueTokens = new Set(processedTokens);
    for (let token of uniqueTokens) {
      const result = this.#stemCounts.get(token);
      if (!result) {
        continue;
      }
      results.set(token, result);
    }
    return results;
  }

  searchAllMatch(queryTokens) {
    // TODO
  }
}
