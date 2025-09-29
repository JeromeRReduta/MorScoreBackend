// import { PostingsList, Posting } from "./Postings";
// import SortedMap from "collections/sorted-map";

// export default class InvertedIndex {
//   #map;

//   constructor() {
//     this.#map = new SortedMap();
//   }

//   add(term, docId) {
//     if (!this.#map.has(term)) {
//       this.#map.set(term, new PostingsList());
//     }
//     const postingsList = this.#map.get(term);
//     postingsList.addReference(docId);
//   }

//   getTerms() {
//     return Array.from(this.#map.keys());
//   }

//   getPostings() {
//     const arr = [];
//     const entries = this.#map.entries();
//     for (let [key, value] of entries) {
//       arr.push(structuredClone(value));
//     }
//     return arr;
//   }

//   // export default class InvertedIndex {
//   //   #map;

//   //   constructor() {
//   //     this.#map = new SortedMap();
//   //   }

//   //   add(term, docId) {
//   //     if (!this.#map.has(term)) {
//   //         this.#map.set(term, new SortedMap());
//   //     }
//   //     const postingsList = this.#map.get(term);
//   //     if (
//   //   }

//   //   getTerms() {}

//   //   getPostings() {}

//   //   searchFor(term) {}

//   toString() {
//     let result = "";
//     const entries = this.#map.entries();
//     let isFirst = true;
//     for (let entry of entries) {
//       //   console.log("entry 1 is", entry[1].toString());
//       if (!isFirst) {
//         result += "\n";
//       }
//       result += `${entry[0]}\t${entry[1].toString()}`;
//       isFirst = false;
//     }
//     return result;
//   }
// }
// // }

// // /** TODO:
// //  *  USE https://github.com/montagejs/collections/blob/master/sorted-set.js
// //  * postings list = sortedset of Postings
// //  * comparison done by posting.docId
// //  *
// //  * implement merge(docId):
// //  *  if !sortedset.has(docId) {
// //  *      sortedset.add(Posting: <docId: 1>)
// //  *  }
// //  * else {
// //  *  sortedset.get(docId).tf++;
// //  * }
// //  *
// //  */
