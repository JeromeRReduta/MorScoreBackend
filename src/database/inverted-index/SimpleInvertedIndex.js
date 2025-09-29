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

  /** searches index for one word */
  //   searchFor(queryTokens) {
  //     const results = new Map();
  //     const uniqueTokens = new Set(queryTokens);
  //     /** process tokens - unique, lowercase, stemmed */
  //     for (let token of uniqueTokens) {
  //     }
  //   }
}
