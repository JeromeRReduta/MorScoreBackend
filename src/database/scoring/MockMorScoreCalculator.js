import { profaneWords } from "@2toad/profanity";

export default class MockMorScoreCalculator {
  #badWords;
  #badWordMultiplier;

  constructor(multiplier = 5) {
    this.#badWords = profaneWords.get("en");
    this.#badWordMultiplier = multiplier;
  }

  calculate(invertedIndex) {
    let score = 100;
    const searchResults = invertedIndex.searchFor(this.#badWords);
    /** for each post in posting list, subtract score by posting.payload.tf * 5 */
    for (let [stem, postingsList] of searchResults) {
      if (!this.#badWords.find((elem) => elem === stem)) {
        continue;
      }
      const postings = postingsList.postings; // TODO: performance issues w/ all the copying?
      for (let posting of postings) {
        score -= posting.payload.tf * this.#badWordMultiplier;
      }
    }
    return score;
  }
}
