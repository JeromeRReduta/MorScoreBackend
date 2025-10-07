import Interface from "./Interface";

/**
 * Implementation of a postings list in an inverted index
 */
export default class PostingsList extends Interface {
    constructor() {
        super("PostingsList", ["getPostings", "has", "add", "mergeWith"]);
    }

    /**
     * Returns CLONE of postings present
     * @returns clone of postings present
     */
    getPostings() {}

    /**
     * Returns whether this list contains a specific posting.
     * @param {Posting} posting
     * @returns if this list has a given posting
     */
    has(posting) {}

    /**
     * Adds a posting to this list
     * @param {Posting} posting
     */
    add(posting) {}

    /**
     * Utility method for merging 2 postings lists together. Specifically, this posting list adds all the values of the other list to itself
     * @param {PostingsList} other
     */
    mergeWith(other) {}
}
