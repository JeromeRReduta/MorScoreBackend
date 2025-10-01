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
  #postingsListSupplier;
  #data;

  constructor({ preprocessor, batchMapper, postingsListSupplier }) {
    this.#preprocessor = preprocessor;
    this.#batchMapper = batchMapper;
    this.#postingsListSupplier = postingsListSupplier;
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
        this.#data.set(stem, this.#postingsListSupplier());
      }
      this.#data.get(stem).mergeWith(postingsList);
    }
  }

  getPostingsList(term) {}

  toString() {
    let str = "";
    str += "{";
    for (let [key, value] of this.#data) {
      str += `\n\t${key}: ${value.toString()}`;
    }

    str += "\n}";
    return str;
  }

  //   add(textSource) {
  //     // const stemmedSource = [];
  //     // for (let batch of textSource) {
  //     //     const stemmedBatch = this.#preprocessor.run(batch);
  //     // stemmedSource.push(stemmedBatch);
  //     // }

  //     // for (let batchedTokens of textSource) {
  //     //     const

  //     //   if (!this.#data.has(term)) {
  //     //     const newPostingsList = this.#postingsListSupplier();
  //     //     this.#data.set(term, newPostingsList);
  //     //   }
  //     //   this.#data.get(term).add(posting);
  //     // }
  //   }

  //   add(term, posting) {
  //     if (!this.#data.has(term)) {
  //       const newPostingsList = this.#postingsListSupplier();
  //       this.#data.set(term, newPostingsList);
  //     }
  //     this.#data.get(term).add(posting);
  //   }
  // }

  // export default class SimpleInvertedIndex {
  //   #preprocessor;
  //   #batchMapper;
  //   #data;

  //   constructor(preprocessor, batchMapper) {
  //     this.#preprocessor = preprocessor;
  //     this.#batchMapper = batchMapper;
  //     this.#data = new Map();
  //   }

  //   /** reads a TextSource into index */
  //   read(source) {
  //     const docId = source.getDocId();
  //     source
  //       .asArray()
  //       .map((batch) => this.#preprocessor.run(batch))
  //       .filter((stem) => stem !== "")
  //       .map((stems) => this.#batchMapper.run(docId, stems))
  //       .forEach((map) => this.#merge(map));
  //   }

  //   get(stem) {
  //     return this.#data.get(stem).clone();
  //   }

  //   #merge(otherMap) {
  //     // Todo: O(stems * postings)?
  //     for (let [stem, postingsList] of otherMap) {
  //       if (!this.#data.has(stem)) {
  //         this.#data.set(stem, new PostingsList());
  //       }

  //       this.#data.get(stem).merge(postingsList);
  //     }
  //   }
  //   /**
  //    *
  //    * resultMap()
  //    * uniqueTokens = new Set(process(queryTokens))
  //    * for (token : uniqueTokens) {
  //    *  if (token === "") {
  //    *      continue
  //    *  }
  //    *  if (this.#data.has(token)) {
  //    *      resultMap.set(token, this.#data.get(token)
  //    *  }
  //    * return resultMap
  //    * }
  //    *
  //    */
  //   searchFor(queryTokens) {
  //     const results = new Map();
  //     const stems = this.#preprocessor.run(queryTokens);
  //     const unique = new Set(stems);
  //     for (let uniqueStem of unique) {
  //       if (uniqueStem === "") {
  //         continue;
  //       }
  //       if (this.#data.has(uniqueStem)) {
  //         const postingsList = this.#data.get(uniqueStem).clone();
  //         results.set(uniqueStem, postingsList);
  //       }
  //     }
  //     return results;
  //   }

  //   searchAnyMatch(docId, queryTokens) {
  //     const uniqueQueryStems = new Set(this.#preprocessor.run(queryTokens));
  //     const mapClone = new Map();
  //     for (let stem of uniqueQueryStems) {
  //       this.#data
  //         .get(stem)
  //         ?.postings.filter((posting) => posting.docId === docId)
  //         .forEach((posting) => {
  //           if (!mapClone.has(stem)) {
  //             mapClone.set(stem, new PostingsList());
  //           }
  //           mapClone.get(stem).add(posting);
  //         });
  //     }
  //     return mapClone;
  //   }

  //   searchAllMatch(docId, queryTokens) {}
  // }

  // export default class InvertedIndex {
  //   #preprocessor;
  //   #partitioner;
  //   #data;

  //   constructor(preprocessor, partitioner) {
  //     this.#preprocessor = preprocessor;
  //     this.#data = new Map();
  //     this.#partitioner = partitioner;
  //   }
  //   /** Note that any string (input from text source or query) must be preprocessed w/ the same preprocessor or behavior will be undefined */

  //   /** reads a TextSource into index */
  //   read(source) {
  //     source
  //       .asArray()
  //       .map((batch) => this.#preprocessor.runWithCollection(batch))
  //       .filter((stem) => stem !== "")
  //       .map((stems) => this.#partitioner.partition(stems))
  //       .forEach((counts) => this.#add(counts));
  //   }

  //   #add(tempCounts) {
  //     for (let [key, value] of tempCounts) {
  //       console.log(`{${key}, ${value}}`);
  //       if (this.#data.has(key)) {
  //         this.#data.get(key).tf+= value;
  //       }
  //       else {
  //         this.#data.set(key, Posting.create)
  //       }

  //       const count = this.#stemCounts.get(key);
  //       if (!Number.isInteger(count)) {
  //         this.#stemCounts.set(key, value);
  //         continue;
  //       }
  //       this.#stemCounts.set(key, count + value);
  //     }
  //   }

  //   searchAnyMatch(queryTokens) {
  //     const results = new Map();
  //     const processedTokens = this.#preprocessor.runWithCollection(queryTokens);
  //     const uniqueTokens = new Set(processedTokens);
  //     for (let token of uniqueTokens) {
  //       const result = this.#stemCounts.get(token);
  //       if (!result) {
  //         continue;
  //       }
  //       results.set(token, result);
  //     }
  //     return results;
  //   }

  //   searchAllMatch(queryTokens) {
  //     // TODO
  //   }
  // }
}
