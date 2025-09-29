import { profaneWords } from "@2toad/profanity";

export default class MockMorScoreCalculator {
  #badWords;

  constructor() {
    this.#badWords = profaneWords.get("en");
  }
  calculate(docId, invertedIndex) {
    let score = 100;
    const searchResults = invertedIndex.searchAnyMatch(docId, this.#badWords);
    for (let [stem, postingsList] of searchResults) {
      if (this.#badWords.find((elem) => elem === stem)) {
        const negative = postingsList.postings
          .map((posting) => posting.payload.tf * 5)
          .reduce((acc, current) => acc + current, 0);
        score -= negative;
      }
    }

    return score;
  }
}
