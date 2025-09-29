import SortedSet from "collections/sorted-set";

/**
 * Posting:
 * {
 *      docId: #
 *      payload: {
 *          tf: #
 *      }
 * }
 */

export class PostingsList {
  #data;

  constructor() {
    this.#data = new SortedSet();
  }

  //   getData() { /** For debugging - todo: remove once done */
  //     return this.#data;
  //   }

  get postings() {
    const cloneArr = [];
    this.#data
      .map((posting) => posting.clone())
      .forEach((clone) => cloneArr.push(clone));
    return cloneArr;
  }

  has(posting) {
    const found = this.#data.get(posting);
    return found != null && found != undefined;
  }

  add(posting) {
    const found = this.#data.get(posting);
    if (!found) {
      this.#data.add(posting);
      return;
    }
    console.log(
      `incrementing tf (${found.payload.tf}) by posting.payload.tf (${posting.payload.tf})`
    );
    found.incrementTfBy(posting.payload.tf);
  }

  merge(other) {
    if (!(other instanceof PostingsList)) {
      console.error("Attempting to merge w/ non-PostingsList - cancelling");
      return;
    }
    other.#data.forEach((posting) => this.add(posting));
  }

  toString() {
    return this.#data.map((elem) => elem.toString()).join(", ");
  }
}

class Posting {
  #docId;

  #payload;

  constructor(docId, tf) {
    this.#docId = docId;
    this.#payload = { tf: tf };
  }

  get docId() {
    return this.#docId;
  }

  get payload() {
    return structuredClone(this.#payload);
  }

  incrementTfBy(value) {
    this.#payload.tf += value;
  }

  equals(other) {
    return this.docId === other.docId;
  }

  compare(other) {
    if (this.docId < other.docId) {
      return -1;
    } else if (this.docId > other.docId) {
      return 1;
    }
    return 0;
  }

  clone() {
    return new Posting(this.#docId, this.#payload.tf);
  }

  toString() {
    return `<${this.#docId}:${this.#payload.tf}>`;
  }
}

export class PostingFactory {
  static create({ docId, tf }) {
    return new Posting(docId, tf);
  }
}
