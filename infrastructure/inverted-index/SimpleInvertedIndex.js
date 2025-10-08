// import { PostingFactory } from "../../domain/entities/postings/Posting";
// import Cloneable from "../../interfaces/Cloneable";
// import Interface from "../../interfaces/Interface";
// import InvertedIndex from "../../interfaces/InvertedIndex";

import { PostingFactory } from "../../domain/postings/Posting.js";
import Cloneable from "../../domain/interfaces/Cloneable.js";
import Interface from "../../domain/interfaces/Interface.js";
import InvertedIndex from "../../domain/interfaces/InvertedIndex.js";

export default class SimpleInvertedIndex {
  #preprocessor;
  #postingsListFactory;
  #data;

  constructor({ preprocessor, postingsListFactory }) {
    this.#preprocessor = preprocessor;
    this.#postingsListFactory = postingsListFactory;
    this.#data = new Map();
    Interface.implements(InvertedIndex, SimpleInvertedIndex);
  }

  add(textSource) {
    const docId = textSource.getDocId();
    for (let batch of textSource) {
      const stemmedBatch = this.#preprocessor.run(batch);
      const stemCounts = this.#batchStemCounts(stemmedBatch);
      this.#mergeMap(docId, stemCounts);
    }
  }

  #batchStemCounts(stemmedBatch) {
    const stemCounts = new Map();
    for (let stem of stemmedBatch) {
      const count = stemCounts.get(stem) ?? 0;
      stemCounts.set(stem, count + 1);
    }
    return stemCounts;
  }

  #mergeMap(docId, stemCounts) {
    for (let [stem, count] of stemCounts) {
      if (!this.#data.has(stem)) {
        this.#data.set(stem, this.#postingsListFactory.create());
      }
      const posting = PostingFactory.create({ docId, tf: count });
      this.#data.get(stem).add(posting);
    }
  }

  getPostingsListsFor(tokens) {
    const stems = this.#preprocessor.run(tokens);
    const result = new Map();
    for (let stem of stems) {
      const postingsList = this.#data.get(stem)?.clone();
      if (postingsList) {
        result.set(stem, postingsList);
      }
    }
    return result;
  }

  toString() {
    let str = "";
    str += "{";
    for (let [key, value] of this.#data) {
      str += `\n\t${key}: ${value.toString()}`;
    }

    str += "\n}";
    return str;
  }
}
