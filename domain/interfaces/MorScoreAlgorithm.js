import Interface from "./Interface.js";
import InvertedIndex from "./InvertedIndex.js";
/**
 * Scoring strategy for determining the MorScoreResult of an InvertedIndex
 */
export default class MorScoreAlgorithm extends Interface {
  constructor() {
    super();
  }

  /**
   *
   * @param {InvertedIndex} invertedIndex determines the MorScoreResult of an InvertedIndex.
   * @returns {MorScoreResult} a morScoreResult
   */
  run(invertedIndex) {}
}
