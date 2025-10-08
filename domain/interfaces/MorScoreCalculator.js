// import Interface from "./Interface";
// import InvertedIndex from "./InvertedIndex";
// import MorScoreAlgorithm from "./MorScoreAlgorithm";

import Interface from "./Interface.js";
import InvertedIndex from "./InvertedIndex.js";
import MorScoreAlgorithm from "./MorScoreAlgorithm.js";

/** Given an index, scores the index and returns a MorScoreResult */
export default class MorScoreCalculator extends Interface {
  constructor() {
    super();
  }

  /**
   * Sets scoring strategy
   * @param {MorScoreAlgorithm} morScoreAlgorithm scoring strategy
   */
  set scoringAlgorithm(morScoreAlgorithm) {}
  /**
   * Implementation-specific calculate()
   * @returns {MorScoreResult} The MorScoreResult
   * */
  calculate() {}

  /**
   *
   * @param {MorScoreAlgorithm} morScoreAlgorithm
   * @param {InvertedIndex} invertedIndex
   * @returns
   */
  static calculate(morScoreAlgorithm, invertedIndex) {
    return morScoreAlgorithm.run(invertedIndex);
  }
}
