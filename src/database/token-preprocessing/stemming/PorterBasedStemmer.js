import porterStemmer from "@stdlib/nlp-porter-stemmer";
import Interface from "../../../interfaces/Interface.js";
import Stemmer from "../../../interfaces/Stemmer.js";

export default class PorterBasedStemmer {
    constructor() {
        Interface.implements(Stemmer, PorterBasedStemmer);
    }

    /** Credit to https://github.com/stdlib-js/nlp-porter-stemmer */
    stem(word) {
        return porterStemmer(word);
    }
}
