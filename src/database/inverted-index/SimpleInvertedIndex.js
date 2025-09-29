import { PostingsList } from "../../domain/Postings";

export default class SimpleInvertedIndex {
  #preprocessor;
  #batchMapper;
  #data;

  constructor(preprocessor, batchMapper) {
    this.#preprocessor = preprocessor;
    this.#batchMapper = batchMapper;
    this.#data = new Map();
  }

  /** reads a TextSource into index */
  read(source) {
    const docId = source.getDocId();
    source
      .asArray()
      .map((batch) => this.#preprocessor.run(batch))
      .filter((stem) => stem !== "")
      .map((stems) => this.#batchMapper.run(docId, stems))
      .forEach((map) => this.#merge(map));
    console.log("final merged map is", this.#data);
  }

  #merge(otherMap) {
    // Todo: O(stems * postings)?
    for (let [stem, postingsList] of otherMap) {
      if (!this.#data.has(stem)) {
        this.#data.set(stem, new PostingsList());
      }
      console.log(
        `comparing types: map.get(stem) ${typeof this.#data.get(
          stem
        )} other postingsList ${typeof postingsList}`
      );

      this.#data.get(stem).merge(postingsList);
    }
  }

  searchAnyMatch(docId, queryTokens) {
    const uniqueQueryStems = new Set(this.#preprocessor.run(queryTokens));
    const mapClone = new Map();
    for (let stem of uniqueQueryStems) {
      this.#data
        .get(stem)
        ?.postings.filter((posting) => posting.docId === docId)
        .forEach((posting) => {
          if (!mapClone.has(stem)) {
            mapClone.set(stem, new PostingsList());
          }
          mapClone.get(stem).add(posting);
        });
    }
    return mapClone;
  }

  searchAllMatch(docId, queryTokens) {}
}

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
