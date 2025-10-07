import Interface from "./Interface";
import TextSource from "./TextSource";

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
