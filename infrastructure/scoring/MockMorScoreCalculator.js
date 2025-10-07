import { profaneWords } from "@2toad/profanity";
import Interface from "../../domain/interfaces/Interface.js";
import MorScoreCalculator from "../../domain/interfaces/MorScoreCalculator.js";

export default class MockMorScoreCalculator {
  #badWords;
  #badWordMultiplier;
  #index;
  static categories = [
    "ABSOLUTELY DIABOLICAL",
    "AND THAT'S TERRIBLE",
    "UNACCEPTABLE",
    "OKAY",
    "SIMPLY DIVINE",
  ];

  constructor(invertedIndex, multiplier = 5) {
    this.#badWords = profaneWords.get("en");
    this.#badWordMultiplier = multiplier;
    this.#index = invertedIndex;
    Interface.implements(MorScoreCalculator, MockMorScoreCalculator);
  }

  calculate() {
    let score = 100;
    let count = 0;
    const results = this.#index.getPostingsListsFor(this.#badWords);
    for (let [stem, postingsList] of results) {
      const postings = postingsList.getPostings();
      const iterator = postings.iterator();
      let isDone = false;
      while (!isDone) {
        const { value, done } = iterator.next();
        isDone = done;
        if (!isDone) {
          score -= value.tf * this.#badWordMultiplier;
          count += value.tf;
        }
      }
    }
    const morScoreResult = {
      score: Math.max(score, 1),
      category: MockMorScoreCalculator.categories[Math.floor((score - 1) / 20)],
      offenses: [`${count} category 1 offenses`],
    };
    return morScoreResult;
  }
}
