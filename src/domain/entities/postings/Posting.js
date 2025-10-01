import SortedSet from "collections/sorted-set";
import Interface from "../../../interfaces/Interface";
import Cloneable from "../../../interfaces/Cloneable";

/**
 * Posting:
 * {
 *      docId: #
 *      payload: {
 *          tf: #
 *      }
 * }
 */

export default class Posting {
  #docId;

  #payload;

  constructor(docId, tf) {
    this.#docId = docId;
    this.#payload = { tf: tf };
    Interface.implements(Cloneable, this);
  }

  get docId() {
    return this.#docId;
  }

  get tf() {
    return this.#payload.tf;
  }

  set tf(newValue) {
    this.#payload.tf = newValue;
  }

  equals(other) {
    if (!(other instanceof Posting)) {
      console.error("other obj is of type " + typeof other + ", not Posting");
      return false;
    }
    return this.docId === other.docId;
  }

  compare(other) {
    if (!(other instanceof Posting)) {
      console.error("other obj is of type " + typeof other + ", not Posting");
      return 0;
    }
    if (this.docId < other.docId) {
      return -1;
    } else if (this.docId > other.docId) {
      return 1;
    }
    return 0;
  }

  clone() {
    return PostingFactory.create({ docId: this.#docId, tf: this.#payload.tf });
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
