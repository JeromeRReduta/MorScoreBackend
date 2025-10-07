import porterStemmer from "@stdlib/nlp-porter-stemmer";
import Interface from "../../../domain/interfaces/Interface.js";
import Stemmer from "../../../domain/interfaces/Stemmer.js";

export default class PorterBasedStemmer {
  constructor() {
    Interface.implements(Stemmer, this);
  }

  /** Credit to https://github.com/stdlib-js/nlp-porter-stemmer */
  stem(word) {
    return porterStemmer(word);
  }
}
