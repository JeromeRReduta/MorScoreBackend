import porterStemmer from "@stdlib/nlp-porter-stemmer";

export default class PorterStemmer {
  constructor() {}

  /** Credit to https://github.com/stdlib-js/nlp-porter-stemmer */
  stem(word) {
    return porterStemmer(word);
  }
}
