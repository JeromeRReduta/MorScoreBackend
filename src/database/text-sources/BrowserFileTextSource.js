export default class BrowserFileTextSource {
  #batches;
  #current;
  #batchSize;
  static DEFAULT_BATCH_SIZE = 100;

  constructor(
    fileReaderResult,
    batchSize = BrowserFileTextSource.DEFAULT_BATCH_SIZE
  ) {
    console.log("beginning processing");
    console.log("file result", fileReaderResult);
    const tokens = fileReaderResult.split(/\W+/);
    console.log("tokens are", tokens);
    this.#current = 0;
    this.#batches = [];
    this.#batchSize = batchSize;
    let currentBatch = [];
    for (let token of tokens) {
      console.log("pushing", token);
      currentBatch.push(token);
      if (currentBatch.length === this.#batchSize) {
        console.log(`Found ${this.#batchSize} tokens; adding batch to batches`);
        this.#batches.push(currentBatch);
        currentBatch = [];
        console.log("batches is now", this.#batches);
      }
    }
    console.log("currentBatch", currentBatch, "batches", this.#batches);
    if (currentBatch.length > 0) {
      // in case last batch is not batchSize tokens long
      this.#batches.push(currentBatch);
    }

    console.log("batches after processing is", this.#batches);
  }

  /** Returns next batch of text from source */
  next() {
    const batch = this.#batches[this.#current];
    this.#current++;
    return batch;
  }

  /** returns whether source has data left */
  isEmpty() {
    return this.#current >= this.#batches.length;
  }
}
