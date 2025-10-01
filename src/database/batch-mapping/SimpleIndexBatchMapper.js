// import {
//   PostingsList,
//   PostingFactory,
// } from "../../domain/entities/postings/Postings";

import BatchMapper from "../../interfaces/BatchMapper";
import Interface from "../../interfaces/Interface";

// export default class SimpleIndexBatchMapper {
//   static run(docId, stems) {
//     const map = new Map();
//     for (let stem of stems) {
//       if (!map.has(stem)) {
//         map.set(stem, new PostingsList());
//       }
//       const posting = PostingFactory.create({ docId, tf: 1 });
//       if (map.get(stem).has(posting)) {
//       }
//       map.get(stem).add(posting);
//     }
//     return map;
//   }
// }

export default class SimpleIndexBatchMapper {
  #postingsListSupplier;
  #postingFactory;

  constructor({ postingsListSupplier, postingFactory }) {
    this.#postingsListSupplier = postingsListSupplier;
    this.#postingFactory = postingFactory;
    Interface.implements(BatchMapper, this);
  }

  run({ docId, stems }) {
    return BatchMapper.run({
      docId,
      stems,
      postingsListSupplier: this.#postingsListSupplier,
      postingFactory: this.#postingFactory,
    });
  }
}

/**
 * import Interface from "./Interface";
 
 export default class BatchMapper extends Interface {
   constructor() {
     super("BatchMapper", ["run"]);
   }
 
   run() {}
 
   static run({ docId, stems, postingsListSupplier, postingFactory }) {
     const batchMap = new Map();
     for (let stem of stems) {
       if (!batchMap.has(stem)) {
         batchMap.set(stem, postingsListSupplier());
       }
       const posting = postingFactory.create({ docId, tf: 1 });
       batchMap.get(stem).add(posting);
     }
     return batchMap;
   }
 }
 
 */
