export default class BrowserFileTextSource {
  #docId;
  #batches;
  #batchSize;
  static DEFAULT_BATCH_SIZE = 100;

  constructor({
    docId,
    fileReaderResult,
    batchSize = BrowserFileTextSource.DEFAULT_BATCH_SIZE,
  }) {
    this.#docId = docId;
    this.#batchSize = batchSize;
    this.#batches = this.#batchResults(fileReaderResult);
  }

  #batchResults(fileReaderResult) {
    const batches = [];
    const tokens = fileReaderResult.split(/\W+/);
    let currentBatch = [];
    for (let token of tokens) {
      currentBatch.push(token);
      if (currentBatch.length === this.#batchSize) {
        batches.push(currentBatch);
        currentBatch = [];
      }
    }
    if (currentBatch.length > 0) {
      batches.push(currentBatch);
    }
    return batches;
  }

  getDocId() {
    return this.#docId;
  }

  iterator() {
    return this[Symbol.iterator]();
  }

  /** Implementation based on https://stackoverflow.com/questions/28739745/how-to-make-an-iterator-out-of-an-es6-class */
  [Symbol.iterator]() {
    let i = 0;
    let data = this.#batches;
    return {
      next() {
        return this.done() ? { done: true } : { value: data[i++], done: false };
      },
      done() {
        return i >= data.length;
      },
    };
  }
}
