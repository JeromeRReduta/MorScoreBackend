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

  containsDocId(docId) {
    const posting = this.#data.get({ docId });
    return posting != null && posting != undefined;
  }

  addReference(docId) {
    if (!this.containsDocId(docId)) {
      this.#data.add(new Posting(docId));
    }
    this.#data.get({ docId }).increment();
  }

  toString() {
    return this.#data.map((elem) => elem.toString()).join(", ");
  }
}

export class Posting {
  #docId;

  #payload;

  constructor(docId) {
    this.#docId = docId;
    this.#payload = { tf: 0 };
  }

  get docId() {
    return this.#docId;
  }

  get payload() {
    return structuredClone(this.#payload);
  }

  increment() {
    this.#payload.tf++;
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

// export class PostingsList {
//   equals = (a, b) => {
//     console.log("comparing for equality", a, b);
//     return a.docId === b.docId;
//   };

//   compare = (a, b) => {
//     console.log("comparing values of a and b", a, b);
//     if (a.docId === b.docId) {
//       return 0;
//     } else if (a.docId < b.docId) {
//       return -1;
//     }
//     return 1;
//   };

//   #store;

//   constructor() {
//     this.#store = new SortedSet([], this.equals, this.compare);
//   }

//   get(docId) {
//     return this.#store.get(docId);
//   }

//   merge(docId) {
//     if (this.has(docId)) {
//     }
//   }

//   remove(docId) {
//     return this.#store.remove(docId);
//   }

//   has(docId) {
//     console.log("this is running");
//     console.log("get func calls", this.#store.get(docId));
//     return this.#store.has(docId);
//   }

//   delete(docId) {
//     return this.#store.delete(docId);
//   }

//   toString() {
//     return this.#store.join(", ");
//   }
// }
