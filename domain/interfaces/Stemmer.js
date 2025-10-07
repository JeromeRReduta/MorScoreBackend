import Interface from "./Interface";

/** Interface for stemming a word */
export default class Stemmer extends Interface {
    constructor() {
        super("Stemmer", ["stem"]);
    }

    /** Stems a word
     * @param {String} word word
     * @returns stemmed version of that word. Might return "" depending on implementation, so need to check for this
     */
    stem(word) {}
}
