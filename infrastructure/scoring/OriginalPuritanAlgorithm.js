import { profaneWords } from "@2toad/profanity";
import Interface from "../../domain/interfaces/Interface.js";
import MorScoreAlgorithm from "../../domain/interfaces/MorScoreAlgorithm.js";
import MorScoreResult, {
  MorScoreResultFactory,
} from "../../domain/mor-score-results/MorScoreResult.js";

export default class OriginalPuritanAlgorithm {
  #badWords;
  #badWordMultiplier;

  static categories = [
    "ABSOLUTELY DIABOLICAL",
    "AND THAT'S TERRIBLE",
    "UNACCEPTABLE",
    "OKAY",
    "SIMPLY DIVINE",
  ];

  constructor(multiplier = 5) {
    this.#badWords = profaneWords.get("en");
    this.#badWordMultiplier = multiplier;
    Interface.implements(MorScoreAlgorithm, OriginalPuritanAlgorithm);
  }

  run(invertedIndex) {
    console.log("running here");
    let score = 100;
    let count = 0;
    const results = invertedIndex.getPostingsListsFor(this.#badWords);
    for (let [stem, postingsList] of results) {
      const iterator = postingsList.getPostings().iterator();
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
    score = Math.max(score, 1);
    const category =
      OriginalPuritanAlgorithm.categories[Math.floor((score - 1) / 20)];
    const offenseCounts = new Map([
      [1, count],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);
    console.log("info: ", category, score, offenseCounts);
    console.log(
      "mor score result",
      new MorScoreResult({ category, score, offenseCounts }).toString()
    );
    console.log(
      "factory result",
      MorScoreResultFactory.create({ category, score, offenseCounts })
    );
    return MorScoreResultFactory.create({ category, score, offenseCounts });
  }
}
