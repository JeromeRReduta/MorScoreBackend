import Interface from "./Interface";

/**
 * Interface for checking if a word counts as a stopword (e.g. "a", "the", "but")
 */
export default class StopwordChecker extends Interface {
    constructor() {
        super();
    }

    /**
     * Default implementation. Returns whether a given stem is a stopword
     * @param {String} stem stem
     * @param {String} stopwordRegex regex for matching against stopwords
     * @returns whether the stem is a stopword, according to the regex
     */
    static isStopword(stem, stopwordRegex) {
        return Boolean(stem.match(stopwordRegex));
    }

    /**
     * Returns whether a given stem is a stopword
     * @param {String} stem stem
     * @returns wheter the stem is a stopword
     */
    isStopword(stem) {}
}
