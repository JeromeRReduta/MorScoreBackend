import Interface from "../interfaces/Interface.js";

import TextSource from "../interfaces/TextSource";

/** Inverted Index interface. @see https://en.wikipedia.org/wiki/Inverted_index */
export default class InvertedIndex extends Interface {
  constructor() {
    super();
  }

  /**
   * Reads a TextSource into the index
   * @param {TextSource} textSource
   */
  add(textSource) {}

  /**
   *
   * @param {String[]} tokens an array of tokens
   * @returns {PostingsList} a postingList
   */
  getPostingsListsFor(tokens) {}
}
