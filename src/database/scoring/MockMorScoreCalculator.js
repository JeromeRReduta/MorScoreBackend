import { profaneWords } from "@2toad/profanity";
import Interface from "../../interfaces/Interface";
import MorScoreCalculator from "../../interfaces/MorScoreCalculator";
import SimpleInvertedIndex from "../inverted-index/SimpleInvertedIndex";
import SimplePostingsList from "../../domain/entities/postings/SimplePostingsList";

export default class MockMorScoreCalculator {
  #badWords;
  #badWordMultiplier;
  #index;

  constructor(invertedIndex, multiplier = 5) {
    this.#badWords = profaneWords.get("en");
    this.#badWordMultiplier = multiplier;
    this.#index = invertedIndex;
    Interface.implements(MorScoreCalculator, this);
  }

  calculate() {
    let score = 100;
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
        }
      }
    }
    return Math.max(score, 0);
  }
}
