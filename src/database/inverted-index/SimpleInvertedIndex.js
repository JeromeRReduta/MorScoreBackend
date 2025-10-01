/**
 * import Interface from "./Interface";
 
 export default class InvertedIndex extends Interface {
   constructor() {
     super("InvertedIndex", ["add", "getPostingsList"]);
   }
 
   add(textSource) {}
 
   getPostingsList(term) {}
 }
 
 */

import Cloneable from "../../interfaces/Cloneable";
import Interface from "../../interfaces/Interface";
import InvertedIndex from "../../interfaces/InvertedIndex";

export default class SimpleInvertedIndex {
  #preprocessor;
  #batchMapper;
  #postingsListFactory;
  #data;

  constructor({ preprocessor, batchMapper, postingsListFactory }) {
    this.#preprocessor = preprocessor;
    this.#batchMapper = batchMapper;
    this.#postingsListFactory = postingsListFactory;
    this.#data = new Map();
    Interface.implements(InvertedIndex, this);
    // Interface.implements(Cloneable, this); // Todo: implement
  }

  add(textSource) {
    const docId = textSource.getDocId();
    for (let batch of textSource) {
      const stemmedBatch = this.#preprocessor.run(batch);
      const batchMap = this.#batchMapper.run({ docId, stems: stemmedBatch });
      this.#mergeMap(batchMap);
    }
  }

  #mergeMap(batchMap) {
    for (let [stem, postingsList] of batchMap) {
      if (!this.#data.has(stem)) {
        this.#data.set(stem, this.#postingsListFactory.create());
      }
      this.#data.get(stem).mergeWith(postingsList);
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
