import Interface from "./Interface";

export default class MorScoreCalculator extends Interface {
  constructor() {
    super("MorScoreCalculator", ["calculate"]);
  }

  static calculate(invertedIndex, badWordRegex) {
    /** Todo: think about what a static impl would like like? */
  }

  calculate() {}
}
