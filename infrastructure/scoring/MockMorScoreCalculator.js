import { profaneWords } from "@2toad/profanity";
import Interface from "../../domain/interfaces/Interface.js";
import MorScoreCalculator from "../../domain/interfaces/MorScoreCalculator.js";

export default class MockMorScoreCalculator {
  #morScoreAlgorithm;
  #invertedIndex;

  constructor(
    morScoreAlgorithm = new OriginalPuritanAlgorithm(),
    invertedIndex
  ) {
    this.#morScoreAlgorithm = morScoreAlgorithm;
    this.#invertedIndex = invertedIndex;
    Interface.implements(MorScoreCalculator, MockMorScoreCalculator);
  }

  set scoringAlgorithm(morScoreAlgorithm) {
    this.#morScoreAlgorithm = morScoreAlgorithm;
  }

  calculate() {
    return MorScoreCalculator.calculate(
      this.#morScoreAlgorithm,
      this.#invertedIndex
    );
  }
}
