import Interface from "./Interface";

/**
 * Interface for data containing text, e.g. Ch. 1 of Moby Dick, an excerpt from Wikipedia
 */
export default class TextSource extends Interface {
    constructor() {
        super();
    }

    /**
     * returns the source's doc id
     * @returns the source's doc id
     */
    getDocId() {}

    /**
     * iterates over the source's text in batches
     * @returns iterator
     */
    iterator() {}
}
