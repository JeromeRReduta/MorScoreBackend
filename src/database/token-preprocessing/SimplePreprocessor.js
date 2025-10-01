import Interface from "../../interfaces/Interface.js";
import Preprocessor from "../../interfaces/Preprocessor.js";

export default class SimplePreprocessor {
    #stemmer;

    #stopwordChecker;

    constructor(stemmer, stopwordChecker) {
        this.#stemmer = stemmer;
        this.#stopwordChecker = stopwordChecker;
        Interface.implements(Preprocessor, this);
    }

    run(batchedTokens) {
        return Preprocessor.run(
            batchedTokens,
            this.#stemmer,
            this.#stopwordChecker
        );
    }
}
