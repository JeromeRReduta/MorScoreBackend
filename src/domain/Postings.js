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

  contains(posting) {
    const found = this.#data.get(posting);
    return found != null && found != undefined;
  }

  add(posting) {
    const found = this.#data.get(posting);
    if (!found) {
      this.#data.add(posting);
      return;
    }
    found.incrementTfBy(posting.payload.tf);
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

  toString() {
    return `<${this.#docId}:${this.#payload.tf}>`;
  }
}

export class PostingFactory {
  static create({ docId, tf }) {
    return new Posting(docId, tf);
  }
}
