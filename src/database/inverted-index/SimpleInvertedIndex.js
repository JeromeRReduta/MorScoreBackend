class InvertedIndex {
  #preprocessor;
  #stemCounts;

  constructor(preprocessor) {
    this.#preprocessor = preprocessor;
  }
  /** Note that any string (input from text source or query) must be preprocessed w/ the same preprocessor or behavior will be undefined */

  /** reads a TextSource into index */
  read(source) {
    const batches = source.asArray();
    for (let batch of batches) {
      const tempCounts = new Map();
      this.#preprocessor.runWithBatch(batch, tempCounts);
      this.#add(tempCounts);
    }
  }

  #add(tempCounts) {
    for (let { key, value } of tempCounts) {
      const count = this.#stemCounts.get(key);
      if (!Number.isInteger(count)) {
        this.#stemCounts.set(key, value);
        continue;
      }
      this.#stemCounts.set(key, count + value);
    }
  }

  /** searches index for one word) */
  searchFor(queryWord) {}
}

// const preprocessor = new SimplePreprocessor(
//   new PorterStemmer(),
//   new StopwordChecker(stopwordRegexes.Ntlk)
// );
// const batches = thing.asArray();
// for (let batch of batches) {
//   const stemCounts = new Map();
//   preprocessor.runWithBatch(batch, stemCounts);
//   console.log("stemcounts is", stemCounts);
// }
